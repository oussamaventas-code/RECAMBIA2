-- Migración 003: datos básicos de vehículo en la ficha del cliente.
-- Cómo aplicarla: Supabase Dashboard → SQL Editor → pegar este archivo → Run.
-- Es idempotente: se puede ejecutar más de una vez sin romper nada ni
-- perder datos existentes.
--
-- Qué cambia y por qué: para agilizar futuras consultas de recambios, la
-- ficha del cliente guarda ahora el vehículo asociado (uno solo por cliente,
-- de momento). Reutiliza la misma tabla crm_quotes: no hace falta una tabla
-- ni una relación nueva para esto.

alter table public.crm_quotes add column if not exists vin text;
alter table public.crm_quotes add column if not exists brand text;
alter table public.crm_quotes add column if not exists model text;
