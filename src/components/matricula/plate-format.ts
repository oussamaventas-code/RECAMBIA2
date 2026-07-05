export function formatPlateInput(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const digits = clean.slice(0, 4).replace(/[^0-9]/g, "");
  const letters = clean
    .slice(4, 7)
    .replace(/[^A-Z]/g, "")
    .replace(/[AEIOUÑQ]/g, "");
  if (digits.length === 4 && letters.length > 0) {
    return `${digits} ${letters}`;
  }
  return digits + clean.slice(digits.length, 7).replace(/[AEIOUÑQ]/g, "");
}

export function isPlateComplete(value: string): boolean {
  return /^\d{4} [A-Z]{3}$/.test(value);
}
