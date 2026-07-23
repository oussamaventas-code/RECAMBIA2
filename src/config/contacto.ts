// Fuente única del horario y la promesa de respuesta. Antes "menos de 2
// horas" y "9:00 a 18:30" estaban repetidos a mano en media docena de
// archivos (hero, WhatsApp flotante, contacto, ayuda, diagnóstico,
// talleres...) y se iban a desincronizar. Ahora todo importa de aquí.
export const HORARIO = {
  laborables: "L-V de 9:00 a 18:30",
  sabado: "", // TODO OUSSAMA: rellenar si cubrís sábado mañana, o dejar vacío
  respuestaEnHorario: "15 minutos", // TODO OUSSAMA: solo si lo podéis cumplir SIEMPRE
} as const;

// Texto de horario para mostrar en la web. Añade el sábado solo si está
// relleno, sin condicionales sueltos repartidos por los componentes.
export function horarioTexto(): string {
  return HORARIO.sabado ? `${HORARIO.laborables} · ${HORARIO.sabado}` : HORARIO.laborables;
}

// Línea corta para poner justo debajo de los CTA principales de WhatsApp.
export function promesaRespuesta(): string {
  return `Te responde una persona en ${HORARIO.respuestaEnHorario} · ${horarioTexto()}`;
}
