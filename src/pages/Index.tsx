
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { DashboardSection } from "@/components/DashboardSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardSection />
      <PricingSection />
    </Layout>
  );
};

export default Index;
