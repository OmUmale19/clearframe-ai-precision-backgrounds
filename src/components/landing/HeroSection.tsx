import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Sparkles } from "lucide-react";
import { FileUploadZone } from "../common/FileUploadZone";
import { useState } from "react";
import { toast } from "sonner";
import { ImageComparison } from "../common/ImageComparison";
import { useImageHistory } from "@/hooks/useImageHistory";

const HeroSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDataUrl, setOriginalDataUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addEntry } = useImageHistory();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setProcessedUrl(null);

    // Read as data URL so we can persist it in history (object URLs don't survive page reload)
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalDataUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveBackground = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image", file, file.name);

      const response = await fetch(
        "https://bitflipper96.app.n8n.cloud/webhook/remove-background",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const rawText = await response.text();
      console.log("Webhook raw response:", rawText);

      if (!rawText || rawText.trim() === "") {
        throw new Error("Webhook returned an empty response. Please check the n8n workflow.");
      }

      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Webhook returned invalid JSON: ${rawText.slice(0, 200)}`);
      }

      const resultUrl = data.url;
      if (!resultUrl) throw new Error("No image URL found in response. Received: " + rawText.slice(0, 200));

      // Fetch the processed image locally and convert to base64 so it:
      // 1. Persists in localStorage after page refresh
      // 2. Can be downloaded without CORS issues
      const imgFetch = await fetch(resultUrl);
      const imgBlob = await imgFetch.blob();
      const processedDataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imgBlob);
      });

      setProcessedUrl(processedDataUrl);

      // Persist to history (both images stored as base64 data URLs)
      if (originalDataUrl && file) {
        addEntry({
          originalDataUrl,
          processedDataUrl,
          filename: file.name,
        });
      }

      toast.success("Background removed successfully!");
    } catch (error: any) {
      console.error("Background removal failed:", error);
      toast.error(error?.message ?? "Failed to remove background. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setOriginalDataUrl(null);
    setProcessedUrl(null);
  };

  return (
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

          {!file && (
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
          )}

          <p className="text-xs text-muted-foreground">
            5 free images daily · No credit card required
          </p>
        </div>

        {/* Demo preview / Upload Zone / Comparison */}
        <div className="mt-16 max-w-5xl mx-auto">
          {processedUrl && previewUrl ? (
            <ImageComparison
              original={previewUrl}
              processed={processedUrl}
              onReset={handleReset}
            />
          ) : (
            <div className="flex flex-col items-center gap-8">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                className="w-full max-w-4xl"
              />

              {file && (
                <Button
                  size="lg"
                  variant="cta"
                  className="px-12 py-6 text-lg shadow-xl shadow-primary/20 animate-in fade-in zoom-in duration-300"
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Remove Background
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
