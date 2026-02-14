import { Upload, Cpu, Download } from "lucide-react";

const steps = [
  { icon: Upload, step: "01", title: "Upload", desc: "Drop your image — JPG, PNG, or WEBP up to 10MB." },
  { icon: Cpu, step: "02", title: "AI Processes", desc: "Our AI detects and removes the background in seconds." },
  { icon: Download, step: "03", title: "Download", desc: "Get your transparent PNG, ready for any use." },
];

const HowItWorksSection = () => (
  <section className="py-24 bg-card/30">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Three steps. <span className="text-gradient-brand">That's it.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.step} className="text-center space-y-4 relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
            )}
            <div className="w-20 h-20 rounded-full glass-panel mx-auto flex items-center justify-center glow-blue">
              <s.icon size={28} className="text-primary" />
            </div>
            <span className="text-xs font-mono text-primary">{s.step}</span>
            <h3 className="font-heading font-semibold text-lg">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
