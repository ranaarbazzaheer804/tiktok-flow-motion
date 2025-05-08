
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for trying out the platform",
      price: "$0",
      period: "month",
      features: [
        { title: "5 script generations per month", included: true },
        { title: "Basic trend analysis", included: true },
        { title: "Standard script templates", included: true },
        { title: "Community support", included: true },
        { title: "Advanced customization", included: false },
        { title: "Performance analytics", included: false },
      ],
      ctaText: "Get Started",
    },
    {
      name: "Starter",
      description: "Great for content creators",
      price: "$19",
      period: "month",
      features: [
        { title: "50 script generations per month", included: true },
        { title: "Advanced trend analysis", included: true },
        { title: "All script templates", included: true },
        { title: "Email support", included: true },
        { title: "Advanced customization", included: true },
        { title: "Basic performance analytics", included: true },
      ],
      popular: true,
      ctaText: "Start Free Trial",
    },
    {
      name: "Pro",
      description: "For serious TikTok influencers",
      price: "$49",
      period: "month",
      features: [
        { title: "Unlimited script generations", included: true },
        { title: "Real-time trend analysis", included: true },
        { title: "All script templates", included: true },
        { title: "Priority support", included: true },
        { title: "Advanced customization", included: true },
        { title: "Advanced performance analytics", included: true },
      ],
      ctaText: "Start Free Trial",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that's right for your content creation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              popular={plan.popular}
              ctaText={plan.ctaText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
