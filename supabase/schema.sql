-- Esquema del CRM de RECAMBIA para Supabase.
-- Cómo aplicarlo: Supabase Dashboard → SQL Editor → pegar este archivo → Run.
-- Solo hace falta ejecutarlo una vez por proyecto.

create table if not exists public.crm_quotes (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'enviado'
    check (status in ('enviado', 'pagado', 'cancelado')),
  customer_name text,
  customer_phone text,
  plate text,
  note text,
  items jsonb not null,
  total numeric(10, 2) not null,
  -- Par firmado del link del presupuesto (/presupuesto?d=...&s=...).
  d text not null,
  s text not null,
  paid_at timestamptz,
  payment_method text
    check (payment_method in ('stripe', 'efectivo', 'bizum', 'transferencia', 'otro')),
  stripe_session_id text
);

-- El checkout localiza la ficha por su payload firmado.
create index if not exists crm_quotes_d_idx on public.crm_quotes (d);
create index if not exists crm_quotes_status_idx on public.crm_quotes (status);

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
