import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { getSiteData } from "@/lib/content";
import { ReserveForm } from "./reserve-form";

export const metadata: Metadata = {
  title: "Reserve",
  description: "Reserve a table at Leen's Middle East Kitchen in TTDI, Kuala Lumpur.",
};

export default async function ReservePage() {
  const { restaurant } = await getSiteData();
  return (
    <div className="studio-glow pt-[72px]">
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Reserve a table
              </h1>
              <p className="mt-5 max-w-[42ch] text-base text-fg-muted">
                Tell us when you&apos;re coming. For same-day seats, calling is
                fastest.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-10 space-y-5 text-sm text-fg-muted">
                <li className="flex gap-3">
                  <MapPin size={20} className="shrink-0 text-accent" weight="duotone" />
                  <div>
                    <p className="font-medium text-fg">Address</p>
                    <p className="mt-1">
                      {restaurant.address}
                      <br />
                      {restaurant.neighbourhood}, {restaurant.city} {restaurant.postcode}
                    </p>
                    <a
                      href={restaurant.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-accent hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={20} className="shrink-0 text-accent" weight="duotone" />
                  <div>
                    <p className="font-medium text-fg">Phone</p>
                    <a className="mt-1 block hover:text-fg" href={restaurant.phoneHref}>
                      {restaurant.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock size={20} className="shrink-0 text-accent" weight="duotone" />
                  <div>
                    <p className="font-medium text-fg">Hours</p>
                    <div className="mt-1 space-y-1">
                      {restaurant.hours.map((h) => (
                        <p key={h.label}>
                          {h.label}: {h.value}
                        </p>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ReserveForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
