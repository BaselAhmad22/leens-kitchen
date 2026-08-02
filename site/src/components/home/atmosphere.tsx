import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Atmosphere() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-12">
      <div className="surface relative min-h-[60dvh] overflow-hidden md:min-h-[75dvh]">
        <Image
          src="/images/atmosphere-interior.png"
          alt="Brick oven glow and evening dining room at Leen's"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,#2c3330_62%,transparent)] via-[color-mix(in_oklab,#2c3330_18%,transparent)] to-transparent" />
        <div className="relative flex min-h-[60dvh] items-end p-6 md:min-h-[75dvh] md:p-10 lg:p-12">
          <Reveal className="max-w-xl rounded-[14px] border border-border bg-bg-elevated/95 p-6 shadow-[var(--shadow)] backdrop-blur-md md:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              An upstairs room warmed by the oven
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              Sit by the windows as TTDI softens at dusk, or take the chef&apos;s
              counter where bread lands hot and spice hits the pan.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
