-- Esquema del CRM de RECAMBIA para Supabase.
-- Cómo aplicarlo: Supabase Dashboard → SQL Editor → pegar este archivo → Run.
-- Solo hace falta ejecutarlo una vez por proyecto (instalación nueva).
-- Si ya tenías el esquema anterior aplicado, usa en su lugar
-- supabase/migrations/002-crm-pipeline.sql.

create table if not exists public.crm_quotes (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- lead        = contacto por WhatsApp, aún sin presupuesto
  -- enviado     = presupuesto generado y mandado
  -- pagado      = cobrado
  -- perdido     = presupuesto o lead que no cerró (ver lost_reason)
  -- cancelado   = anulado por el equipo
  status text not null default 'lead'
    check (status in ('lead', 'enviado', 'pagado', 'perdido', 'cancelado')),
  customer_name text,
  customer_phone text,
  plate text,
  note text,
  -- Un lead recién creado aún no tiene líneas de presupuesto ni link firmado.
  items jsonb,
  total numeric(10, 2),
  -- Par firmado del link del presupuesto (/presupuesto?d=...&s=...).
  d text,
  s text,
  paid_at timestamptz,
  payment_method text
    check (payment_method in ('stripe', 'efectivo', 'bizum', 'transferencia', 'otro')),
  stripe_session_id text,
  -- Pipeline: quién atiende, de dónde vino y cuándo fue el primer contacto
  -- (no siempre coincide con created_at si el lead se convierte más tarde
  -- en presupuesto).
  owner text,
  source text,
  first_contact_at timestamptz,
  lost_reason text
    check (lost_reason is null or lost_reason in (
      'precio', 'no_contesta', 'compro_otro_sitio', 'pieza_no_disponible', 'solo_consultaba', 'otro'
    ))
);

-- El checkout localiza la ficha por su payload firmado.
create index if not exists crm_quotes_d_idx on public.crm_quotes (d);
create index if not exists crm_quotes_status_idx on public.crm_quotes (status);
create index if not exists crm_quotes_owner_idx on public.crm_quotes (owner);

-- RLS activado y SIN políticas públicas: la tabla solo es accesible con la
-- service_role key, que vive únicamente en el servidor de la web.
alter table public.crm_quotes enable row level security;

-- ---------------------------------------------------------------------------
-- Leads: emails captados a cambio del descuento de bienvenida.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id text primary key,
  created_at timestamptz not null default now(),
  email text not null unique,
  -- De dónde vino: 'portada' | 'popup' | otro.
  source text,
  discount_code text,
  -- Consentimiento RGPD (marcó el checkbox). Guardamos también cuándo.
  consent boolean not null default false
);

create index if not exists leads_created_at_idx on public.leads (created_at);

-- Igual que crm_quotes: RLS activo, sin políticas públicas. Solo service_role.
alter table public.leads enable row level security;
