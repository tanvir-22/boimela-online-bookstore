import HeroSection from "@/components/pages/home/HeroSection";
import { FeaturedBooksSection } from "@/components/pages/home/ProductsSection";
import { ServiceSection } from "@/components/pages/home/ServiceSection";
import { SubscribeSection } from "@/components/pages/home/SubscribeSection";
import { TestimonialSection } from "@/components/pages/home/TestimonialSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServiceSection />
      <FeaturedBooksSection />
      <TestimonialSection />
      <SubscribeSection />
    </div>
  );
}
