import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["5 images/day", "Standard quality", "Web access", "Community support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["Unlimited images", "HD quality", "API access", "Priority support", "Batch processing"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Credits",
    price: "₹199",
    period: "50 credits",
    features: ["Pay as you go", "HD quality", "API access", "Never expires", "Bulk discounts"],
    cta: "Buy Credits",
    featured: false,
  },
];

const PricingPreview = () => (
  <section className="py-24" id="pricing">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Simple, transparent <span className="text-gradient-brand">pricing</span>
        </h2>
        <p className="text-muted-foreground">Start free. Scale as you grow.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg p-6 flex flex-col ${
              plan.featured
                ? "glass-panel glow-blue-lg border-primary/30 relative"
                : "glass-panel"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold rounded-full bg-gradient-cta text-foreground">
                Most Popular
              </span>
            )}
            <h3 className="font-heading font-semibold text-lg">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.featured ? "cta" : "cta-outline"}
              className="mt-6 w-full"
              asChild
            >
              <Link to="/signup">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingPreview;
