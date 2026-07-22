import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Quote, QuoteItem } from "@/lib/quote";

// Almacén del CRM con dos drivers:
//  - Supabase (producción): se activa solo con SUPABASE_URL y
//    SUPABASE_SERVICE_ROLE_KEY en el entorno. Tabla: crm_quotes
//    (ver supabase/schema.sql).
//  - Archivo JSON (.data/crm.json): respaldo para desarrollo local
//    sin credenciales.
// El resto de la web solo usa las funciones exportadas al final.

// lead      = contacto por WhatsApp, aún sin presupuesto montado
// enviado   = presupuesto generado y mandado
// pagado    = cobrado
// perdido   = presupuesto o lead que no cerró (ver lostReason)
// cancelado = anulado por el equipo
export type QuoteStatus = "lead" | "enviado" | "pagado" | "perdido" | "cancelado";
export type PaymentMethod = "stripe" | "efectivo" | "bizum" | "transferencia" | "otro";
// Lista cerrada (no texto libre) para que el motivo de pérdida sea analizable.
export type LostReason =
  | "precio"
  | "no_contesta"
  | "compro_otro_sitio"
  | "pieza_no_disponible"
  | "solo_consultaba"
  | "otro";

export interface CrmRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: QuoteStatus;
  customerName?: string;
  customerPhone?: string;
  plate?: string;
  // Datos básicos del vehículo (un solo vehículo por cliente, de momento).
  vin?: string;
  brand?: string;
  model?: string;
  note?: string;
  items: QuoteItem[];
  total: number;
  // Par firmado del link (/presupuesto?d=...&s=...). Un lead sin presupuesto
  // todavía no lo tiene.
  d?: string;
  s?: string;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  stripeSessionId?: string;
  // Pipeline: quién atiende la conversación, de dónde vino y cuándo fue el
  // primer contacto real (puede ser anterior a createdAt si el lead se
  // convierte más tarde en presupuesto).
  owner?: string;
  source?: string;
  firstContactAt?: string;
  lostReason?: LostReason;
}

type CrmPatch = Partial<Omit<CrmRecord, "id" | "createdAt">>;

interface CrmDriver {
  list(): Promise<CrmRecord[]>;
  get(id: string): Promise<CrmRecord | null>;
  findByData(d: string): Promise<CrmRecord | null>;
  create(record: CrmRecord): Promise<CrmRecord>;
  update(id: string, patch: CrmPatch): Promise<CrmRecord | null>;
  remove(id: string): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// Driver Supabase
// ---------------------------------------------------------------------------

interface DbRow {
  id: string;
  created_at: string;
  updated_at: string;
  status: QuoteStatus;
  customer_name: string | null;
  customer_phone: string | null;
  plate: string | null;
  vin: string | null;
  brand: string | null;
  model: string | null;
  note: string | null;
  // Un lead recién creado aún no tiene líneas de presupuesto ni link firmado.
  items: QuoteItem[] | null;
  total: number | string | null;
  d: string | null;
  s: string | null;
  paid_at: string | null;
  payment_method: PaymentMethod | null;
  stripe_session_id: string | null;
  owner: string | null;
  source: string | null;
  first_contact_at: string | null;
  lost_reason: LostReason | null;
}

let supabaseClient: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return supabaseClient;
}

function fromRow(row: DbRow): CrmRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    customerName: row.customer_name ?? undefined,
    customerPhone: row.customer_phone ?? undefined,
    plate: row.plate ?? undefined,
    vin: row.vin ?? undefined,
    brand: row.brand ?? undefined,
    model: row.model ?? undefined,
    note: row.note ?? undefined,
    items: row.items ?? [],
    total: row.total != null ? Number(row.total) : 0,
    d: row.d ?? undefined,
    s: row.s ?? undefined,
    paidAt: row.paid_at ?? undefined,
    paymentMethod: row.payment_method ?? undefined,
    stripeSessionId: row.stripe_session_id ?? undefined,
    owner: row.owner ?? undefined,
    source: row.source ?? undefined,
    firstContactAt: row.first_contact_at ?? undefined,
    lostReason: row.lost_reason ?? undefined,
  };
}

// Solo se convierten las claves presentes en el patch: un undefined explícito
// (p. ej. al reactivar un presupuesto) borra la columna con null.
function patchToRow(patch: CrmPatch): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if ("updatedAt" in patch) row.updated_at = patch.updatedAt;
  if ("status" in patch) row.status = patch.status;
  if ("customerName" in patch) row.customer_name = patch.customerName ?? null;
  if ("customerPhone" in patch) row.customer_phone = patch.customerPhone ?? null;
  if ("plate" in patch) row.plate = patch.plate ?? null;
  if ("vin" in patch) row.vin = patch.vin ?? null;
  if ("brand" in patch) row.brand = patch.brand ?? null;
  if ("model" in patch) row.model = patch.model ?? null;
  if ("note" in patch) row.note = patch.note ?? null;
  if ("items" in patch) row.items = patch.items;
  if ("total" in patch) row.total = patch.total;
  if ("d" in patch) row.d = patch.d ?? null;
  if ("s" in patch) row.s = patch.s ?? null;
  if ("paidAt" in patch) row.paid_at = patch.paidAt ?? null;
  if ("paymentMethod" in patch) row.payment_method = patch.paymentMethod ?? null;
  if ("stripeSessionId" in patch) row.stripe_session_id = patch.stripeSessionId ?? null;
  if ("owner" in patch) row.owner = patch.owner ?? null;
  if ("source" in patch) row.source = patch.source ?? null;
  if ("firstContactAt" in patch) row.first_contact_at = patch.firstContactAt ?? null;
  if ("lostReason" in patch) row.lost_reason = patch.lostReason ?? null;
  return row;
}

const supabaseDriver: CrmDriver = {
  async list() {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`Supabase (list): ${error.message}`);
    return (data as DbRow[]).map(fromRow);
  },

  async get(id) {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(`Supabase (get): ${error.message}`);
    return data ? fromRow(data as DbRow) : null;
  },

  async findByData(d) {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .select("*")
      .eq("d", d)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`Supabase (findByData): ${error.message}`);
    return data ? fromRow(data as DbRow) : null;
  },

  async create(record) {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .insert({
        id: record.id,
        created_at: record.createdAt,
        updated_at: record.updatedAt,
        status: record.status,
        customer_name: record.customerName ?? null,
        customer_phone: record.customerPhone ?? null,
        plate: record.plate ?? null,
        vin: record.vin ?? null,
        brand: record.brand ?? null,
        model: record.model ?? null,
        note: record.note ?? null,
        items: record.items,
        total: record.total,
        d: record.d ?? null,
        s: record.s ?? null,
        owner: record.owner ?? null,
        source: record.source ?? null,
        first_contact_at: record.firstContactAt ?? null,
        lost_reason: record.lostReason ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(`Supabase (create): ${error.message}`);
    return fromRow(data as DbRow);
  },

  async update(id, patch) {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .update(patchToRow(patch))
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) throw new Error(`Supabase (update): ${error.message}`);
    return data ? fromRow(data as DbRow) : null;
  },

  async remove(id) {
    const { data, error } = await getSupabase()
      .from("crm_quotes")
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throw new Error(`Supabase (remove): ${error.message}`);
    return (data?.length ?? 0) > 0;
  },
};

// ---------------------------------------------------------------------------
// Driver de archivo JSON (desarrollo local sin Supabase)
// ---------------------------------------------------------------------------

const DATA_DIR = process.env.CRM_DATA_DIR || path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "crm.json");

// Serializa las escrituras para que dos peticiones simultáneas no se pisen.
let writeLock: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<CrmRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CrmRecord[]) : [];
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    // Archivo corrupto: se aparta con timestamp en vez de machacarlo.
    if (err instanceof SyntaxError) {
      const backup = `${DATA_FILE}.corrupto-${Date.now()}`;
      await fs.rename(DATA_FILE, backup).catch(() => {});
      console.error(`CRM: crm.json corrupto, apartado como ${backup}`);
      return [];
    }
    throw err;
  }
}

async function writeAll(records: CrmRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
}

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeLock.then(fn, fn);
  writeLock = run.catch(() => {});
  return run;
}

const fileDriver: CrmDriver = {
  async list() {
    const all = await readAll();
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async get(id) {
    const all = await readAll();
    return all.find((r) => r.id === id) ?? null;
  },

  async findByData(d) {
    const all = await readAll();
    return all.find((r) => r.d === d) ?? null;
  },

  async create(record) {
    return withLock(async () => {
      const all = await readAll();
      all.push(record);
      await writeAll(all);
      return record;
    });
  },

  async update(id, patch) {
    return withLock(async () => {
      const all = await readAll();
      const idx = all.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...patch };
      await writeAll(all);
      return all[idx];
    });
  },

  async remove(id) {
    return withLock(async () => {
      const all = await readAll();
      const next = all.filter((r) => r.id !== id);
      if (next.length === all.length) return false;
      await writeAll(next);
      return true;
    });
  },
};

// ---------------------------------------------------------------------------
// API pública (selección de driver por entorno)
// ---------------------------------------------------------------------------

function driver(): CrmDriver {
  return process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? supabaseDriver
    : fileDriver;
}

function newId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export async function listQuotes(): Promise<CrmRecord[]> {
  return driver().list();
}

export async function getQuote(id: string): Promise<CrmRecord | null> {
  return driver().get(id);
}

// Localiza un presupuesto por su payload firmado (lo que llega al checkout).
export async function findQuoteByData(d: string): Promise<CrmRecord | null> {
  return driver().findByData(d);
}

export async function createQuoteRecord(
  quote: Quote,
  signed: { d: string; s: string },
  customerPhone?: string,
): Promise<CrmRecord> {
  const now = new Date().toISOString();
  const record: CrmRecord = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    status: "enviado",
    customerName: quote.customerName,
    customerPhone,
    plate: quote.plate,
    note: quote.note,
    items: quote.items,
    total: quote.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0),
    d: signed.d,
    s: signed.s,
    firstContactAt: now,
  };
  return driver().create(record);
}

// Alta de un contacto de WhatsApp que todavía no tiene presupuesto montado.
// Se rellena a mano en el CRM en los primeros segundos de la conversación —
// sin esto, todo lead que no llega a presupuesto queda invisible y no se
// puede medir la tasa real lead→venta.
export async function createLeadRecord(input: {
  customerName?: string;
  customerPhone?: string;
  plate?: string;
  vin?: string;
  brand?: string;
  model?: string;
  note?: string;
  source?: string;
  owner?: string;
}): Promise<CrmRecord> {
  const now = new Date().toISOString();
  const record: CrmRecord = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    status: "lead",
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    plate: input.plate,
    vin: input.vin,
    brand: input.brand,
    model: input.model,
    note: input.note,
    items: [],
    total: 0,
    source: input.source,
    owner: input.owner,
    firstContactAt: now,
  };
  return driver().create(record);
}

export async function updateQuoteRecord(id: string, patch: CrmPatch): Promise<CrmRecord | null> {
  return driver().update(id, { ...patch, updatedAt: new Date().toISOString() });
}

export async function markQuotePaid(
  id: string,
  method: PaymentMethod,
  stripeSessionId?: string,
): Promise<CrmRecord | null> {
  return updateQuoteRecord(id, {
    status: "pagado",
    paidAt: new Date().toISOString(),
    paymentMethod: method,
    ...(stripeSessionId ? { stripeSessionId } : {}),
  });
}

export async function deleteQuoteRecord(id: string): Promise<boolean> {
  return driver().remove(id);
}
