import HeroSection from "@/frontend/components/home/HeroSection";
import CategorySection from "@/frontend/components/home/CategorySection";
import PopularProducts from "@/frontend/components/home/PopularProducts";
import OffersSection from "@/frontend/components/home/OffersSection";
import WhyChooseUs from "@/frontend/components/home/WhyChooseUs";
import ReviewsSection from "@/frontend/components/home/ReviewsSection";
import InstagramGallery from "@/frontend/components/home/InstagramGallery";
import LocationSection from "@/frontend/components/home/LocationSection";
import FinalCTA from "@/frontend/components/home/FinalCTA";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <PopularProducts />
      <OffersSection />
      <WhyChooseUs />
      <ReviewsSection />
      <InstagramGallery />
      <LocationSection />
      <FinalCTA />
    </div>
  );
}
