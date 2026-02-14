import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2, Key, Zap } from "lucide-react";

const codeExample = `curl -X POST https://api.clearframe.ai/v1/remove \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg"`;

const jsExample = `const res = await fetch("https://api.clearframe.ai/v1/remove", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
  body: formData,
});
const blob = await res.blob();`;

const ApiDocs = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold mb-4">
            <span className="text-gradient-brand">API</span> Documentation
          </h1>
          <p className="text-muted-foreground">
            Integrate background removal into your workflow with our simple REST API.
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key size={20} className="text-primary" />
              <h2 className="font-heading font-semibold text-lg">Authentication</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              All requests require an API key in the Authorization header. Generate your key from the dashboard.
            </p>
            <Button variant="cta" size="sm" asChild>
              <Link to="/signup">Get API Key</Link>
            </Button>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 size={20} className="text-primary" />
              <h2 className="font-heading font-semibold text-lg">cURL Example</h2>
            </div>
            <pre className="bg-background rounded-md p-4 text-sm text-muted-foreground overflow-x-auto font-mono">
              {codeExample}
            </pre>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-primary" />
              <h2 className="font-heading font-semibold text-lg">JavaScript Example</h2>
            </div>
            <pre className="bg-background rounded-md p-4 text-sm text-muted-foreground overflow-x-auto font-mono">
              {jsExample}
            </pre>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ApiDocs;
