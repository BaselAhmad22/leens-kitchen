import { Atmosphere } from "@/components/home/atmosphere";
import { DishMarquee } from "@/components/home/dish-marquee";
import { Hero } from "@/components/home/hero";
import { MenuBento } from "@/components/home/menu-bento";
import { SignatureStack } from "@/components/home/signature-stack";
import { StoryTeaser } from "@/components/home/story-teaser";
import { Testimonials } from "@/components/home/testimonials";
import { VisitCta } from "@/components/home/visit-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DishMarquee />
      <StoryTeaser />
      <SignatureStack />
      <MenuBento />
      <Atmosphere />
      <Testimonials />
      <VisitCta />
    </>
  );
}
