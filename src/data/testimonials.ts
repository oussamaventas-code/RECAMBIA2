export interface Testimonial {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  comment: string;
  rating: number;
  image?: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos M.",
    city: "Madrid",
    vehicle: "BMW Serie 3 (E46)",
    comment: "Llevaba días buscando un kit de embrague bimasa que no me costara un riñón. Les escribí por WhatsApp a las 11:00, me confirmaron que servía para mi motor con el número de bastidor, y al día siguiente a las 10:00 ya lo tenía en el taller. Un 10.",
    rating: 5,
    date: "Hace 1 semana",
  },
  {
    id: "t2",
    name: "Lucía F.",
    city: "Valencia",
    vehicle: "Volkswagen Golf VII",
    comment: "Me daba miedo pedir la EGR por internet porque hay 3 referencias distintas para mi coche. El mecánico por WhatsApp me pidió una foto de la ficha técnica y me mandaron exactamente la que necesitaba. Montada y funcionando perfecta.",
    rating: 5,
    date: "Hace 2 semanas",
  },
  {
    id: "t3",
    name: "Talleres Hnos. Ruiz",
    city: "Murcia",
    vehicle: "Profesional",
    comment: "Como taller, el trato directo es lo más importante. Les pedimos un kit de distribución completo a última hora de la tarde y al día siguiente lo teníamos aquí con el servicio de reparto. Mucho mejor que pelearse con catálogos online confusos.",
    rating: 5,
    date: "Hace 1 mes",
  },
];
