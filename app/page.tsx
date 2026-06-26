import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import Categories from "@/components/landing/categories";
import PopularDestinations from "@/components/landing/popular-destinations";
import PopularListings from "@/components/landing/popular-listings";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import Stats from "@/components/landing/stats";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import AppDownload from "@/components/landing/app-download";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <PopularDestinations />
        <PopularListings />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
