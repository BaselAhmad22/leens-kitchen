"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PageHeader } from "@/components/save-bar";
import type { Restaurant } from "@/lib/types";

const ease = [0.32, 0.72, 0, 1] as const;

type Card = { label: string; value: string; href: string };

export function DashboardClient({
  cards,
  restaurant,
}: {
  cards: Card[];
  restaurant: Restaurant;
}) {
  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Kitchen content at a glance"
        description="Edit once here. The public site reads the same shared folder, so guests always see the latest plates and details."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 * i, ease }}
          >
            <Link href={c.href} className="surface surface-interactive group block p-5">
              <p className="text-xs font-medium text-soft">{c.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-fg transition-colors group-hover:text-sage">
                {c.value}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease }}
        className="surface mt-6 grid gap-6 overflow-hidden p-6 md:grid-cols-[1.2fr_1fr] md:p-8"
      >
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sage">
            Live profile
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">
            {restaurant.fullName}
          </p>
          <p className="mt-2 text-sm text-muted">
            {restaurant.award} · Chef {restaurant.chef}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {restaurant.address}, {restaurant.neighbourhood}, {restaurant.city}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[16px] border border-[color-mix(in_oklab,var(--sage)_25%,var(--border))] bg-sage-soft/80 p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sage/20 blur-2xl" />
          <p className="relative text-sm font-medium text-fg">Quick path</p>
          <ul className="relative mt-3 space-y-2 text-sm text-muted">
            <li>1. Update dishes in Menu</li>
            <li>2. Upload photos in Media</li>
            <li>3. Save, then refresh localhost:3000</li>
          </ul>
          <Link href="/menu" className="btn btn-accent relative mt-5">
            Edit menu
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
