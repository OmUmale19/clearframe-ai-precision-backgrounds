import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useImageHistory } from "@/hooks/useImageHistory";
import { Button } from "@/components/ui/button";
import { Trash2, Download, Clock, ImageOff, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Triggers a local download of a data URL without navigating away */
function downloadDataUrl(dataUrl: string, filename: string) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const History = () => {
    const { history, removeEntry, clearHistory } = useImageHistory();

    const handleClearAll = () => {
        clearHistory();
        toast.success("History cleared.");
    };

    return (
        <Layout>
            <section className="relative min-h-screen">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 py-32 relative">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary mb-3">
                                <Clock size={12} />
                                Processing History
                            </div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                                Your{" "}
                                <span className="text-gradient-brand">History</span>
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {history.length === 0
                                    ? "No images processed yet."
                                    : `${history.length} image${history.length !== 1 ? "s" : ""} processed`}
                            </p>
                        </div>

                        {history.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                                onClick={handleClearAll}
                            >
                                <Trash2 size={14} />
                                Clear All
                            </Button>
                        )}
                    </div>

                    {/* Empty state */}
                    {history.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-32 text-center space-y-5">
                            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                                <ImageOff size={32} className="text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-foreground">No history yet</p>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    Upload and process your first image to see it here.
                                </p>
                            </div>
                            <Button variant="cta" asChild>
                                <Link to="/">
                                    <Sparkles size={14} className="mr-2" />
                                    Remove a Background
                                </Link>
                            </Button>
                        </div>
                    )}

                    {/* Grid */}
                    {history.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {history.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="group relative glass-panel rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
                                >
                                    {/* Delete button */}
                                    <button
                                        onClick={() => {
                                            removeEntry(entry.id);
                                            toast.success("Entry removed.");
                                        }}
                                        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:border-destructive/50"
                                        title="Remove"
                                    >
                                        <X size={13} className="text-muted-foreground hover:text-destructive" />
                                    </button>

                                    {/* Image pair preview */}
                                    <div className="grid grid-cols-2 h-40">
                                        {/* Original */}
                                        <div className="relative overflow-hidden bg-muted/30 border-r border-border/30">
                                            <img
                                                src={entry.originalDataUrl}
                                                alt="Original"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute bottom-1 left-1 text-[9px] font-medium bg-background/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-muted-foreground">
                                                Original
                                            </span>
                                        </div>

                                        {/* Processed — checkerboard bg to show transparency */}
                                        <div className="relative overflow-hidden bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,transparent_0%_50%)] bg-[length:14px_14px]">
                                            <img
                                                src={entry.processedDataUrl}
                                                alt="Processed"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute bottom-1 right-1 text-[9px] font-medium bg-primary/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white">
                                                Removed
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="p-3 space-y-2">
                                        <p
                                            className="text-xs font-medium text-foreground truncate"
                                            title={entry.filename}
                                        >
                                            {entry.filename}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <Clock size={9} />
                                            {formatDate(entry.processedAt)}
                                        </p>

                                        {/* Download button — fully local, no CORS issues */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full h-7 text-xs gap-1.5"
                                            onClick={() =>
                                                downloadDataUrl(
                                                    entry.processedDataUrl,
                                                    `clearframe-${entry.filename}`
                                                )
                                            }
                                        >
                                            <Download size={11} />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default History;
