"use client";

import Link from "next/link";
import { MapPin, Phone, Clock } from "@phosphor-icons/react";
import { useContent } from "@/lib/content-context";

export function Footer() {
  const { restaurant } = useContent();

  return (
    <footer className="border-t border-border bg-bg-muted/50">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-12 md:px-8 md:py-16">
        <div className="md:col-span-5">
          <p className="text-2xl font-semibold tracking-tight">{restaurant.name}</p>
          <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-fg-muted">
            Modern Syrian kitchen in {restaurant.neighbourhood}. Bold colour,
            smoke, and spice from chef {restaurant.chef}.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sage">
            Visit
          </p>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            <li className="flex gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" weight="duotone" />
              <span>
                {restaurant.address}
                <br />
                {restaurant.neighbourhood}, {restaurant.city} {restaurant.postcode}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone size={18} className="mt-0.5 shrink-0 text-accent" weight="duotone" />
              <a className="focus-ring rounded-sm hover:text-fg" href={restaurant.phoneHref}>
                {restaurant.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={18} className="mt-0.5 shrink-0 text-accent" weight="duotone" />
              <span>Evenings from 6:00 pm</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 md:justify-self-end">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sage">
            Explore
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
            <Link className="focus-ring rounded-sm hover:text-fg" href="/menu">
              Menu
            </Link>
            <Link className="focus-ring rounded-sm hover:text-fg" href="/about">
              Story
            </Link>
            <Link className="focus-ring rounded-sm hover:text-fg" href="/reserve">
              Reserve a table
            </Link>
            <a
              className="focus-ring rounded-sm hover:text-fg"
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-fg-soft md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {restaurant.fullName}. Unofficial fan site built for portfolio use.
          </p>
          <p>{restaurant.award}</p>
        </div>
      </div>
    </footer>
  );
}
