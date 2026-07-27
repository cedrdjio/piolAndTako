import { Hero } from "@/components/landing/hero";
import { Trust } from "@/components/landing/trust";
import { Verticals } from "@/components/landing/verticals";
import {
  FeaturedListings,
  FeaturedCars,
  FeaturedExperiences,
} from "@/components/landing/featured-listings";
import { Destinations } from "@/components/landing/destinations";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { Cta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust bar overlaps the hero for a premium, layered feel */}
      <div className="relative z-10 -mt-8 sm:-mt-12">
        <Trust />
      </div>

      <Verticals />
      <FeaturedListings />
      <Destinations />
      <FeaturedCars />
      <HowItWorks />
      <FeaturedExperiences />
      <Testimonials />
      <Cta />
      <Faq />
    </>
  );
}
