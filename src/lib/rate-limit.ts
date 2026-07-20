// Rate-limit en memoria por IP. Válido dentro de una misma instancia
// serverless (se resetea en cold start, no se comparte entre instancias) —
// suficiente como primera barrera; para límites estrictos hace falta un
// almacén compartido (Redis/Upstash).
export function createRateLimiter(windowMs: number, max: number) {
  const hits = new Map<string, { count: number; expires: number }>();

  return {
    check(key: string): boolean {
      const now = Date.now();

      // Limpieza oportunista: evita crecimiento sin límite del Map en
      // instancias de larga vida.
      if (hits.size > 1000) {
        for (const [k, v] of hits) {
          if (v.expires <= now) hits.delete(k);
        }
      }

      const entry = hits.get(key);
      if (entry && entry.expires > now) {
        if (entry.count >= max) return false;
        entry.count++;
        return true;
      }
      hits.set(key, { count: 1, expires: now + windowMs });
      return true;
    },

    reset(key: string): void {
      hits.delete(key);
    },
  };
}
