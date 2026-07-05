import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Javier M.",
    vehicle: "Seat León 1.5 TSI",
    part: "Pastillas de freno Brembo",
    rating: 5,
    text: "Pedí a las 11 y lo tenía al día siguiente antes de las 10. Encajaron a la primera, ni un milímetro de diferencia.",
  },
  {
    id: "r2",
    author: "Marta R.",
    vehicle: "Volkswagen Golf VII",
    part: "Kit de distribución Gates",
    rating: 5,
    text: "En el taller de siempre me decían una semana. Aquí lo tuve en 24 horas y más barato.",
  },
  {
    id: "r3",
    author: "Antonio P.",
    vehicle: "Peugeot 308",
    part: "Amortiguadores Sachs",
    rating: 4,
    text: "Todo correcto, referencia exacta con solo la matrícula. El seguimiento del pedido muy claro.",
  },
  {
    id: "r4",
    author: "Lucía G.",
    vehicle: "Renault Clio V",
    part: "Batería Bosch",
    rating: 5,
    text: "No sabía ni el amperaje que necesitaba. Con la matrícula me lo dieron resuelto en dos clics.",
  },
];
