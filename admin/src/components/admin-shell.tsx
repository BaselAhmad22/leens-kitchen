"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Storefront,
  ForkKnife,
  Star,
  ChatCircleText,
  Images,
  SignOut,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const links = [
  { href: "/dashboard", label: "Overview", icon: House },
  { href: "/restaurant", label: "Restaurant", icon: Storefront },
  { href: "/menu", label: "Menu", icon: ForkKnife },
  { href: "/signatures", label: "Signatures", icon: Star },
  { href: "/testimonials", label: "Testimonials", icon: ChatCircleText },
  { href: "/media", label: "Media", icon: Images },
];

const ease = [0.32, 0.72, 0, 1] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const firstPaint = useRef(true);
  const [pill, setPill] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/login");
    router.refresh();
  }

  function measurePill() {
    const nav = navRef.current;
    const activeIndex = links.findIndex((link) => isActivePath(pathname, link.href));
    const el = itemRefs.current[activeIndex];
    if (!nav || !el) {
      setPill((p) => ({ ...p, ready: false }));
      return;
    }

    const navBox = nav.getBoundingClientRect();
    const itemBox = el.getBoundingClientRect();
    setPill({
      top: itemBox.top - navBox.top + nav.scrollTop,
      left: itemBox.left - navBox.left + nav.scrollLeft,
      width: itemBox.width,
      height: itemBox.height,
      ready: true,
    });
  }

  useLayoutEffect(() => {
    measurePill();
  }, [pathname]);

  useEffect(() => {
    firstPaint.current = false;
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [pathname]);

  return (
    <div className="relative min-h-[100dvh] md:grid md:grid-cols-[272px_1fr]">
      <aside className="relative z-[1] border-b border-border/80 bg-panel/80 backdrop-blur-xl md:sticky md:top-0 md:h-[100dvh] md:border-b-0 md:border-r md:border-border/80">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(0,117,74,0.18),transparent_70%)]" />
        <div className="relative flex h-full flex-col">
          <div className="px-6 py-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel-2/70 px-2.5 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sage">
                Content studio
              </p>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-fg">
              Leen&apos;s
            </p>
            <p className="mt-1.5 text-sm text-muted">Shape what guests see</p>
          </div>

          <nav
            ref={navRef}
            className="relative flex gap-1 overflow-x-auto px-3 pb-4 md:flex-1 md:flex-col md:overflow-visible md:px-3"
          >
            {pill.ready ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute z-0 rounded-full border border-[color-mix(in_oklab,var(--sage)_28%,var(--border))] bg-sage-soft"
                initial={false}
                animate={{
                  top: pill.top,
                  left: pill.left,
                  width: pill.width,
                  height: pill.height,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
              />
            ) : null}

            {links.map((link, index) => {
              const active = isActivePath(pathname, link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`relative z-[1] flex items-center gap-2.5 whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm transition-colors duration-300 ${
                    active
                      ? "text-fg"
                      : "text-muted hover:bg-panel-2/80 hover:text-fg"
                  }`}
                >
                  <Icon
                    size={18}
                    weight={active ? "fill" : "light"}
                    className="relative z-[1] shrink-0"
                  />
                  <span className="relative z-[1] font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto hidden space-y-2 border-t border-border/80 p-4 md:block">
            <a
              href={siteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost w-full justify-between text-sm"
            >
              Open site
              <ArrowSquareOut size={16} weight="light" />
            </a>
            <button
              type="button"
              className="btn btn-ghost w-full justify-between text-sm"
              onClick={logout}
            >
              Sign out
              <SignOut size={16} weight="light" />
            </button>
          </div>
        </div>
      </aside>

      <div className="relative z-[1] min-w-0">
        <div className="flex items-center justify-end gap-2 border-b border-border/80 bg-panel/70 px-4 py-3 backdrop-blur-xl md:hidden">
          <a href={siteUrl} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
            Site
          </a>
          <button type="button" className="btn btn-ghost text-sm" onClick={logout}>
            Sign out
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={firstPaint.current ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease }}
            className="mx-auto max-w-5xl px-4 py-8 md:px-10 md:py-11"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
