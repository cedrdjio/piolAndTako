import { Section } from "@/components/ui/container";
import { ListingCarousel } from "@/components/listings/listing-carousel";
import { getListingsByCategory } from "@/lib/data/listings";

export async function FeaturedListings() {
  const listings = await getListingsByCategory("property", 8);

  return (
    <Section spacing="sm">
      <ListingCarousel
        title="Destinations populaires"
        description="Les logements les plus prisés du moment, sélectionnés pour vous."
        href="/search?category=property"
        listings={listings}
      />
    </Section>
  );
}

export async function FeaturedExperiences() {
  const listings = await getListingsByCategory("experience", 8);

  return (
    <Section spacing="sm">
      <ListingCarousel
        title="Nos expériences"
        description="Des moments uniques à vivre, au-delà du séjour."
        href="/search?category=experience"
        listings={listings}
      />
    </Section>
  );
}

export async function FeaturedCars() {
  const listings = await getListingsByCategory("car", 8);

  return (
    <Section spacing="sm">
      <ListingCarousel
        title="Voitures de prestige"
        description="Du quotidien au prestige, avec ou sans chauffeur."
        href="/search?category=car"
        listings={listings}
      />
    </Section>
  );
}
