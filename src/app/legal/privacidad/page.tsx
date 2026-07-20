import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo tratamos tus datos personales en RECAMBIA (RGPD).",
  robots: { index: false },
};

// BORRADOR: sustituir los campos [ENTRE CORCHETES] por los datos reales de
// la empresa antes de lanzar. Conviene revisión por un profesional legal.
export default function PrivacidadPage() {
  return (
    <InfoPage
      title="Política de privacidad"
      subtitle="Última actualización: julio de 2026 · Documento en borrador, pendiente de revisión legal."
    >
      <div className="flex flex-col gap-8 text-sm text-ink-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg text-ink mb-2">1. Responsable del tratamiento</h2>
          <p>
            [RAZÓN SOCIAL / NOMBRE], con NIF [NIF] y domicilio en
            [DIRECCIÓN], España. Email de contacto:{" "}
            <a href="mailto:hola@recambiax.es" className="text-accent hover:underline">
              hola@recambiax.es
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">2. Qué datos tratamos y para qué</h2>
          <p>
            Tratamos los datos que nos facilitas al hacer un pedido o
            contactarnos (nombre, teléfono, email, dirección de entrega,
            matrícula del vehículo) con las siguientes finalidades: gestionar
            tu pedido y su entrega, identificar las piezas compatibles con tu
            vehículo, atender tus consultas y, solo si lo consientes, enviarte
            comunicaciones comerciales.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">3. Base legal</h2>
          <p>
            La ejecución del contrato de compraventa (art. 6.1.b RGPD) para
            pedidos y entregas; tu consentimiento (art. 6.1.a RGPD) para
            comunicaciones comerciales; y el interés legítimo (art. 6.1.f
            RGPD) para la mejora de nuestros servicios.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">4. Destinatarios</h2>
          <p>
            Compartimos los datos imprescindibles con: empresas de mensajería
            (para la entrega), nuestro proveedor de almacén (para preparar el
            pedido) y proveedores tecnológicos (alojamiento web, WhatsApp
            Business de Meta Platforms). No vendemos tus datos a terceros.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">5. Conservación</h2>
          <p>
            Conservamos los datos de pedidos durante los plazos legales
            (mínimo 3 años por la garantía legal y los que exija la normativa
            fiscal). Los datos de consultas sin compra se eliminan a los 12
            meses.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">6. Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión,
            oposición, limitación y portabilidad escribiendo a{" "}
            <a href="mailto:hola@recambiax.es" className="text-accent hover:underline">
              hola@recambiax.es
            </a>
            . También puedes reclamar ante la Agencia Española de Protección
            de Datos (aepd.es).
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
