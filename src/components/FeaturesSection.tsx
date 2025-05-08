
import { TrendingUp, Zap, BarChart, Sparkles } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Trend Analysis",
      description: "Our AI continuously analyzes trending TikTok content and patterns to keep your scripts relevant and engaging.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Script Generation",
      description: "Generate attention-grabbing scripts tailored to your niche and audience preferences in seconds.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Performance Insights",
      description: "Get detailed analytics on your content performance and recommendations for improvements.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Style Customization",
      description: "Customize the tone, style, and length of your scripts to match your unique brand voice.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features to <span className="text-gradient">Boost</span> Your TikTok Growth
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered tools help you create content that resonates with your audience and drives engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
