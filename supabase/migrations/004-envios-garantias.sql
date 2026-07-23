-- Migración 004: seguimiento de envío + garantías/devoluciones.
-- Cómo aplicarla: Supabase Dashboard → SQL Editor → pegar este archivo → Run.
-- Es idempotente: se puede ejecutar más de una vez sin romper nada ni
-- perder datos existentes.
--
-- Qué cambia y por qué: hasta ahora el pipeline paraba en "pagado". No había
-- forma de que el cliente supiera si su pieza ya se había enviado, ni de
-- registrar una devolución o una incidencia de garantía sin usar el campo
-- libre "note". Esto añade el estado de envío a la propia ficha (un pedido
-- solo tiene un envío) y una tabla aparte para incidencias, porque un mismo
-- pedido puede tener varias a lo largo del tiempo (una devolución hoy, una
-- garantía dentro de meses) y cada una necesita su propio ciclo de vida.

alter table public.crm_quotes add column if not exists shipping_status text
  check (shipping_status is null or shipping_status in ('preparando', 'enviado', 'entregado'));
alter table public.crm_quotes add column if not exists carrier text;
alter table public.crm_quotes add column if not exists tracking_number text;
alter table public.crm_quotes add column if not exists tracking_url text;
alter table public.crm_quotes add column if not exists shipped_at timestamptz;
alter table public.crm_quotes add column if not exists delivered_at timestamptz;

-- ---------------------------------------------------------------------------
-- Incidencias post-venta: garantías y devoluciones.
-- ---------------------------------------------------------------------------
create table if not exists public.crm_cases (
  id text primary key,
  quote_id text not null references public.crm_quotes (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  type text not null check (type in ('garantia', 'devolucion')),
  -- abierto     = incidencia creada, sin revisar todavía
  -- en_revision = el equipo la está gestionando (con el fabricante, recogida...)
  -- resuelto    = cerrada a favor del cliente (cambio, reembolso, reparación)
  -- rechazado   = cerrada sin acción (fuera de garantía, mal uso, etc.)
  status text not null default 'abierto'
    check (status in ('abierto', 'en_revision', 'resuelto', 'rechazado')),
  reason text,
  resolution text,
  resolved_at timestamptz
);

create index if not exists crm_cases_quote_id_idx on public.crm_cases (quote_id);

-- Igual que crm_quotes: RLS activo, sin políticas públicas. Solo service_role.
alter table public.crm_cases enable row level security;
