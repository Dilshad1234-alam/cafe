import AboutHero from "@/frontend/components/about/AboutHero";
import OurStory from "@/frontend/components/about/OurStory";
import OurValues from "@/frontend/components/about/OurValues";
import WhyChooseUsAbout from "@/frontend/components/about/WhyChooseUsAbout";
import CafeExperience from "@/frontend/components/about/CafeExperience";
import AboutCTA from "@/frontend/components/about/AboutCTA";

export const metadata = {
  title: "About Us | The Tasty Zone Cafe",
  description: "Learn about The Tasty Zone Cafe, our food, values, service and commitment to fresh, affordable cafe favourites in Gondia.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-16 md:pt-0">
      <AboutHero />
      <OurStory />
      <OurValues />
      <WhyChooseUsAbout />
      <CafeExperience />
      <AboutCTA />
    </main>
  );
}
