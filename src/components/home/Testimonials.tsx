"use client";

import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/shared/Reveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-warning">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-transparent stroke-current"}`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-surface-2 border-b border-line overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark mb-4">
            Confianza 100%
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-3 text-ink-muted max-w-lg mx-auto">
            Piezas correctas a la primera. Así da gusto reparar.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Reveal
              key={testimonial.id}
              delay={i * 0.1}
              className="flex flex-col rounded-2xl bg-surface-1 p-6 border border-line shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs text-ink-faint">{testimonial.date}</span>
              </div>
              
              <blockquote className="flex-1 text-sm text-ink-muted leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </blockquote>
              
              <div className="mt-auto flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-3 text-ink font-semibold">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-ink-faint">{testimonial.vehicle} · {testimonial.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
