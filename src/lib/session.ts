export function base64url(input: ArrayBuffer): string {
  const bytes = new Uint8Array(input);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function fromBase64url(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const getSessionSecret = () => {
  const secret = process.env.QUOTE_SIGNING_SECRET;
  if (!secret) throw new Error("Falta QUOTE_SIGNING_SECRET en el entorno para firmar sesiones.");
  return secret;
};

async function getCryptoKey() {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return `${payload}.${base64url(signature)}`;
}

export async function verifySession(token: string): Promise<string | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payload, sig64] = parts;
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const signature = fromBase64url(sig64) as BufferSource;
    const key = await getCryptoKey();
    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    return isValid ? payload : null;
  } catch {
    return null;
  }
}
