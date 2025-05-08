
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PricingFeature {
  title: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function PricingCard({
  name,
  description,
  price,
  period,
  features,
  popular = false,
  className,
  ctaText = "Subscribe",
  ctaLink = "/signup",
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "glass-card relative p-6 flex flex-col justify-between h-full",
        popular && "border-viral-purple/50 dark:border-viral-purple/50 shadow-glow",
        className
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-viral-purple text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>

        <ul className="space-y-2 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={cn(
                "flex items-center gap-2 text-sm",
                !feature.included && "text-muted-foreground/70"
              )}
            >
              <span
                className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center text-white",
                  feature.included ? "bg-viral-purple" : "bg-muted"
                )}
              >
                {feature.included ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="h-3 w-0.5 bg-white/60"></span>
                )}
              </span>
              {feature.title}
            </li>
          ))}
        </ul>
      </div>

      <Link to={ctaLink}>
        <Button
          className={cn(
            "w-full",
            popular
              ? "bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90"
              : "bg-primary/10 hover:bg-primary/20 text-foreground"
          )}
        >
          {ctaText}
        </Button>
      </Link>
    </div>
  );
}
