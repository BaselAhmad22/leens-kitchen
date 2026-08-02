"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useContent } from "@/lib/content-context";

export function Nav() {
  const { navLinks, restaurant } = useContent();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[40] transition-[background,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled || open
          ? "border-b border-border bg-[color-mix(in_oklab,var(--bg-elevated)_92%,transparent)] shadow-[var(--shadow-sm)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="focus-ring flex items-baseline gap-2 rounded-[10px]">
          <span className="text-[1.35rem] font-semibold tracking-tight text-fg">
            {restaurant.name}
          </span>
          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sage sm:inline">
            TTDI
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring relative rounded-[10px] px-3.5 py-2 text-sm transition-colors ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 rounded-[10px] bg-sage-soft"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-[1]">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/reserve" className="btn-primary hidden sm:inline-flex">
            Reserve a table
          </Link>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-bg-muted text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 1, height: 0 } : { opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border bg-bg-muted/95 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[10px] px-3 py-3 text-base text-fg hover:bg-sage-soft/60"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/reserve" className="btn-primary mt-2 w-full">
                Reserve a table
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
