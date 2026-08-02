"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/lib/content-context";
import { useMounted } from "@/lib/use-mounted";

export function Hero() {
  const { restaurant } = useContent();
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animated = mounted && !reduce;

  return (
    <section className="studio-glow relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1400px] items-center gap-10 px-4 py-12 md:grid-cols-12 md:gap-12 md:px-8 md:py-16">
        <div className="md:col-span-5 lg:col-span-5">
          {animated ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
                {restaurant.award}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Syrian flavour, smoked and shared
              </h1>
              <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-fg-muted md:text-lg">
                Chef {restaurant.chef} brings modern Damascus cooking to a warm upstairs kitchen in TTDI.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/reserve" className="btn-primary">
                  Reserve a table
                </Link>
                <Link href="/menu" className="btn-secondary">
                  View menu
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
                {restaurant.award}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Syrian flavour, smoked and shared
              </h1>
              <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-fg-muted md:text-lg">
                Chef {restaurant.chef} brings modern Damascus cooking to a warm upstairs kitchen in TTDI.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/reserve" className="btn-primary">
                  Reserve a table
                </Link>
                <Link href="/menu" className="btn-secondary">
                  View menu
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="md:col-span-7 lg:col-span-7">
          <motion.div
            initial={animated ? { opacity: 0, y: 22, scale: 0.98 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="surface relative aspect-[4/3] overflow-hidden md:aspect-[16/11] md:min-h-[460px]"
          >
            <Image
              src="/images/hero-hummus.png"
              alt="Smoked hummus with Arabic bread at Leen's"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
