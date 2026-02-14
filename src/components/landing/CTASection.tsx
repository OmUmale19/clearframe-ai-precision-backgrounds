import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    <div className="container mx-auto px-4 relative">
      <div className="glass-panel rounded-2xl p-12 md:p-16 text-center max-w-3xl mx-auto glow-blue-lg">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Ready to remove backgrounds?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join thousands of designers, developers, and businesses using ClearFrame AI.
        </p>
        <Button variant="cta" size="lg" className="text-base px-8 py-6" asChild>
          <Link to="/signup">
            Start Free Today
            <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
