"use client";

import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/lib/content-context";
import { useMounted } from "@/lib/use-mounted";

export function Testimonials() {
  const { testimonials } = useContent();
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  return (
    <section className="border-y border-border bg-bg-muted/70">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What people say after the hummus
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) =>
            animate ? (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="surface-soft flex flex-col p-6"
              >
                <Quote item={item} />
              </motion.li>
            ) : (
              <li key={item.name} className="surface-soft flex flex-col p-6">
                <Quote item={item} />
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}

function Quote({
  item,
}: {
  item: { quote: string; name: string; role: string };
}) {
  return (
    <>
      <blockquote className="text-lg leading-snug text-fg md:text-xl">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <footer className="mt-6 text-sm text-fg-muted">
        <span className="font-medium text-fg">{item.name}</span>
        <span className="mx-2 text-fg-soft">-</span>
        <span>{item.role}</span>
      </footer>
    </>
  );
}
