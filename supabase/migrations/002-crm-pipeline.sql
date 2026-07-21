-- Migración 002: pipeline real de CRM (leads + motivo de pérdida).
-- Cómo aplicarla: Supabase Dashboard → SQL Editor → pegar este archivo → Run.
-- Es idempotente: se puede ejecutar más de una vez sin romper nada ni
-- perder datos existentes.
--
-- Qué cambia y por qué: hasta ahora crm_quotes solo registraba un presupuesto
-- cuando el recambista decidía montarlo. Todo el que escribe por WhatsApp y
-- no llega a presupuesto no dejaba ningún rastro, así que no había forma de
-- medir la tasa lead→venta ni de saber por qué se perdía una conversación.
-- Esta migración añade el estado 'lead' (contacto sin presupuesto todavía) y
-- 'perdido' (presupuesto o lead que no cerró, con motivo), más los campos de
-- trazabilidad (responsable, origen, primer contacto).

-- d y s (el link firmado del presupuesto) ya no son obligatorios: un lead
-- recién creado todavía no tiene presupuesto que firmar.
alter table public.crm_quotes alter column d drop not null;
alter table public.crm_quotes alter column s drop not null;

-- items/total tampoco tienen sentido rellenados en un lead sin presupuestar.
alter table public.crm_quotes alter column items drop not null;
alter table public.crm_quotes alter column total drop not null;

-- Nuevos campos de pipeline.
alter table public.crm_quotes add column if not exists owner text;
alter table public.crm_quotes add column if not exists source text;
alter table public.crm_quotes add column if not exists first_contact_at timestamptz;
alter table public.crm_quotes add column if not exists lost_reason text;

-- Ampliar el conjunto de estados válidos.
alter table public.crm_quotes drop constraint if exists crm_quotes_status_check;
alter table public.crm_quotes add constraint crm_quotes_status_check
  check (status in ('lead', 'enviado', 'pagado', 'perdido', 'cancelado'));

-- Motivo de pérdida: lista cerrada para que sea analizable (no texto libre).
alter table public.crm_quotes drop constraint if exists crm_quotes_lost_reason_check;
alter table public.crm_quotes add constraint crm_quotes_lost_reason_check
  check (lost_reason is null or lost_reason in (
    'precio', 'no_contesta', 'compro_otro_sitio', 'pieza_no_disponible', 'solo_consultaba', 'otro'
  ));

create index if not exists crm_quotes_owner_idx on public.crm_quotes (owner);

-- Registros existentes ya tenían presupuesto enviado desde el primer
-- momento: usamos created_at como su first_contact_at retroactivo.
update public.crm_quotes set first_contact_at = created_at where first_contact_at is null;
