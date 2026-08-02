"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/lib/content-context";
import { useMounted } from "@/lib/use-mounted";

export function SignatureStack() {
  const { signatures } = useContent();
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  return (
    <section className="bg-bg-muted/40">
      <div className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8 md:pt-28">
        <h2 className="max-w-[14ch] text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Three plates people order first
        </h2>
        <p className="mt-4 max-w-[48ch] text-base text-fg-muted">
          Start here if it is your first visit. Portions are generous, so share.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] space-y-8 px-4 pb-20 md:mt-14 md:space-y-10 md:px-8 md:pb-28">
        {signatures.map((dish, i) => {
          const reverse = i % 2 === 1;
          const body = (
            <article
              className={`surface-soft grid items-stretch overflow-hidden md:grid-cols-12 ${
                reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] bg-bg-muted md:col-span-7 md:aspect-auto md:min-h-[360px] lg:min-h-[420px]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              <div className="flex flex-col justify-center bg-bg-elevated/80 px-6 py-7 md:col-span-5 md:px-8 md:py-10 lg:px-10">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {dish.name}
                </h3>
                <p className="mt-2 text-lg font-medium text-accent">RM {dish.price}</p>
                <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-fg-muted">
                  {dish.note}
                </p>
              </div>
            </article>
          );

          if (!animate) {
            return <div key={dish.name}>{body}</div>;
          }

          return (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {body}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
