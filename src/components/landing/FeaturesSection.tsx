import { Zap, Shield, Image, Globe, Clock, Code2 } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Results in under 5 seconds with enterprise-grade AI." },
  { icon: Image, title: "Pixel Perfect", desc: "Preserves fine details like hair, fur, and transparent objects." },
  { icon: Shield, title: "Secure & Private", desc: "Images auto-delete after 24 hours. Zero permanent storage." },
  { icon: Globe, title: "Scalable API", desc: "RESTful API for bulk processing and integrations." },
  { icon: Clock, title: "Batch Processing", desc: "Process hundreds of images with credit packs." },
  { icon: Code2, title: "Developer Friendly", desc: "Simple API with cURL, JS, and Python examples." },
];

const FeaturesSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Built for <span className="text-gradient-brand">precision</span>
        </h2>
        <p className="text-muted-foreground">
          Enterprise-grade background removal with zero compromise on quality.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="glass-panel rounded-lg p-6 hover-glow transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
