import { siteConfig } from "@/frontend/data/siteConfig";
import ContactHero from "@/frontend/components/contact/ContactHero";
import ContactInfo from "@/frontend/components/contact/ContactInfo";
import BusinessHours from "@/frontend/components/contact/BusinessHours";
import ContactForm from "@/frontend/components/contact/ContactForm";
import LocationMap from "@/frontend/components/contact/LocationMap";
import ContactCTA from "@/frontend/components/contact/ContactCTA";

export const metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. Call us at ${siteConfig.formattedPhone} or visit us at ${siteConfig.address}.`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <BusinessHours />
      <ContactForm />
      <LocationMap />
      <ContactCTA />
    </main>
  );
}
