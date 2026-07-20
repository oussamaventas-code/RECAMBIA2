import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Almacén de leads (emails del descuento de bienvenida). Mismo patrón que
// crm-store: Supabase en producción, fichero JSON local sin credenciales.
// Tabla: leads (ver supabase/schema.sql).

export interface Lead {
  id: string;
  createdAt: string;
  email: string;
  source?: string;
  discountCode?: string;
  consent: boolean;
}

export type LeadResult = "created" | "exists";

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

function usingSupabase(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function newId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

// ---------------------------------------------------------------------------
// Driver Supabase
// ---------------------------------------------------------------------------

async function saveSupabase(lead: Lead): Promise<LeadResult> {
  const { error } = await getSupabase().from("leads").insert({
    id: lead.id,
    created_at: lead.createdAt,
    email: lead.email,
    source: lead.source ?? null,
    discount_code: lead.discountCode ?? null,
    consent: lead.consent,
  });
  if (error) {
    // 23505 = unique_violation → el email ya estaba suscrito.
    if (error.code === "23505") return "exists";
    throw new Error(`Supabase (leads insert): ${error.message}`);
  }
  return "created";
}

// ---------------------------------------------------------------------------
// Driver fichero (desarrollo local sin Supabase)
// ---------------------------------------------------------------------------

const DATA_DIR = process.env.CRM_DATA_DIR || path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");
let writeLock: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    if (err instanceof SyntaxError) return [];
    throw err;
  }
}

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeLock.then(fn, fn);
  writeLock = run.catch(() => {});
  return run;
}

async function saveFile(lead: Lead): Promise<LeadResult> {
  return withLock(async () => {
    const all = await readAll();
    if (all.some((l) => l.email === lead.email)) return "exists";
    all.push(lead);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DATA_FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(all, null, 2), "utf-8");
    await fs.rename(tmp, DATA_FILE);
    return "created";
  });
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

export async function saveLead(input: {
  email: string;
  source?: string;
  discountCode?: string;
  consent: boolean;
}): Promise<LeadResult> {
  const lead: Lead = {
    id: newId(),
    createdAt: new Date().toISOString(),
    email: input.email.trim().toLowerCase(),
    source: input.source,
    discountCode: input.discountCode,
    consent: input.consent,
  };
  return usingSupabase() ? saveSupabase(lead) : saveFile(lead);
}
