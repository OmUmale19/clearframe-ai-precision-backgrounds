import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

    <div className="container mx-auto px-4 py-24 md:py-36 relative">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary">
          <Sparkles size={14} />
          AI-Powered Background Removal
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
          Remove backgrounds{" "}
          <span className="text-gradient-brand">instantly</span>{" "}
          with AI precision
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Upload any image and get a clean, transparent background in seconds. 
          Powered by cutting-edge AI for pixel-perfect results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" size="lg" className="text-base px-8 py-6" asChild>
            <Link to="/signup">
              <Upload size={18} />
              Start Removing — Free
            </Link>
          </Button>
          <Button variant="cta-outline" size="lg" className="text-base px-8 py-6" asChild>
            <Link to="/api-docs">
              View API Docs
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          5 free images daily · No credit card required
        </p>
      </div>

      {/* Demo preview */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="glass-panel rounded-lg p-1 glow-blue-lg">
          <div className="bg-card rounded-md overflow-hidden aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] opacity-30" />
            <div className="relative text-center space-y-4 p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-cta mx-auto flex items-center justify-center">
                <Upload size={28} className="text-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Drag & drop your image here or click to upload
              </p>
              <p className="text-xs text-muted-foreground/60">
                JPG, PNG, WEBP · Max 10MB · Up to 5000×5000px
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
