import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const inter = Inter({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Tipografía de titulares: le da a la marca un rasgo propio en vez de
// usar el mismo Inter en negrita para todo (cuerpo de texto y títulos).
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
