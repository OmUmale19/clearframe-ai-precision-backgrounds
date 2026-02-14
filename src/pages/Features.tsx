import Layout from "@/components/Layout";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

const Features = () => (
  <Layout>
    <div className="py-12">
      <FeaturesSection />
      <HowItWorksSection />
    </div>
  </Layout>
);

export default Features;
