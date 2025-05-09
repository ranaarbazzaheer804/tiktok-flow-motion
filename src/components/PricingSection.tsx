
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Free Trial",
      description: "Try all features for 30 days",
      price: "$0",
      period: "for 30 days",
      features: [
        { title: "Full access to all features", included: true },
        { title: "AI script generation", included: true },
        { title: "Basic templates", included: true },
        { title: "Community support", included: true },
        { title: "ChatGPT AI assistant", included: true },
        { title: "Advanced analytics", included: false },
      ],
      ctaText: "Start Free Trial",
      ctaLink: "/signup",
    },
    {
      name: "Starter",
      description: "Great for content creators",
      price: "$29",
      period: "month",
      features: [
        { title: "5 scripts per day", included: true },
        { title: "All script templates", included: true },
        { title: "ChatGPT AI assistant", included: true },
        { title: "Email support", included: true },
        { title: "Basic analytics", included: true },
        { title: "Export to all platforms", included: true },
      ],
      popular: true,
      ctaText: "Get Started",
      ctaLink: "/signup",
    },
    {
      name: "Pro",
      description: "For serious content creators",
      price: "$50",
      period: "month",
      features: [
        { title: "10 scripts per day", included: true },
        { title: "Advanced insights & analytics", included: true },
        { title: "Premium ChatGPT AI assistant", included: true },
        { title: "Priority support", included: true },
        { title: "Custom script templates", included: true },
        { title: "Team collaboration", included: true },
      ],
      ctaText: "Upgrade to Pro",
      ctaLink: "/signup",
    },
    {
      name: "Custom Agent",
      description: "For agencies and businesses",
      price: "$149",
      period: "month",
      features: [
        { title: "Unlimited scripts", included: true },
        { title: "Dedicated AI assistant", included: true },
        { title: "White-label exports", included: true },
        { title: "API access", included: true },
        { title: "Client management tools", included: true },
        { title: "Dedicated account manager", included: true },
      ],
      ctaText: "Contact Sales",
      ctaLink: "/contact",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
              ctaLink={plan.ctaLink}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Our goal: 200 active users by the end of month 3
          </p>
        </div>
      </div>
    </section>
  );
}
