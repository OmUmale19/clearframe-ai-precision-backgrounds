import Layout from "@/components/Layout";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingPreview from "@/components/landing/PricingPreview";
import CTASection from "@/components/landing/CTASection";

const Index = () => (
  <Layout>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PricingPreview />
    <CTASection />
  </Layout>
);

export default Index;
