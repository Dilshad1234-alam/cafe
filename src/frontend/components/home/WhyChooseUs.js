import { Leaf, ShieldCheck, Clock, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Leaf className="w-8 h-8 text-brand-yellow" />,
      title: "Fresh Ingredients",
      description: "We use only the freshest, locally sourced ingredients for every meal we prepare."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-yellow" />,
      title: "Hygienic Preparation",
      description: "Your health is our priority. Our kitchen follows strict hygiene protocols."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-yellow" />,
      title: "Fast Takeaway",
      description: "No long waiting times. Hot and delicious food ready when you arrive."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-brand-yellow" />,
      title: "Affordable Combos",
      description: "Premium taste doesn&apos;t have to be expensive. Explore our budget-friendly combos."
    }
  ];

  return (
    <section className="py-20 bg-brand-charcoal text-brand-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200')] opacity-[0.03] bg-cover bg-center pointer-events-none"></div>
      
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-yellow mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We don&apos;t just serve food; we serve happiness on a plate. Here is what makes The Tasty Zone special.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/30 transition-all duration-300 group-hover:-translate-y-2">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
