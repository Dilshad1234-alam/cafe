import { siteConfig } from "@/frontend/data/siteConfig";
import CheckoutForm from "@/frontend/components/checkout/CheckoutForm";

export const metadata = {
  title: `Checkout | ${siteConfig.name}`,
  description: `Complete your order at ${siteConfig.name}.`,
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-charcoal mb-2">
            Checkout
          </h1>
          <p className="text-gray-500">
            Please provide your details to complete the order.
          </p>
        </div>

        <CheckoutForm />

      </div>
    </main>
  );
}
