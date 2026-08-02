"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMounted } from "@/lib/use-mounted";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const ease = [0.32, 0.72, 0, 1] as const;

export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.16, margin: "0px 0px -8% 0px" });
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const id = requestAnimationFrame(() => setMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  // Stay fully visible until after hydration + IO measurement.
  const visible = !measured || Boolean(reduce) || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y, scale: 0.985 }
      }
      transition={
        !measured || reduce
          ? { duration: 0 }
          : {
              duration: 0.75,
              delay: visible ? delay : 0,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}
