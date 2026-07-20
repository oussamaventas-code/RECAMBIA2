import { ImageResponse } from "next/og";

// Imagen OG generada en el momento (1200x630 correctos) en vez de depender de
// un fichero estático: se ve igual de bien la compartan donde la compartan
// (WhatsApp, Meta Ads, Twitter/X) sin arriesgarse a un recorte raro por un
// tamaño de archivo desajustado.
export const alt = "RECAMBIA — Tu pieza, mañana en tu puerta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #14171f 55%, #182c66 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#4863ad" }} />
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, color: "#93a5d1" }}>
            RECAMBIA
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Tu pieza,</span>
          <span style={{ color: "#6f89d6" }}>mañana en tu puerta.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#c7d0e6", display: "flex" }}>
          Stock real en España · Entrega en 24h
        </div>
      </div>
    ),
    { ...size },
  );
}
