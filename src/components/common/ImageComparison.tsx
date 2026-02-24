import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function downloadDataUrl(dataUrl: string, filename: string) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

interface ImageComparisonProps {
    original: string;
    processed: string;
    onReset?: () => void;
    className?: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
    original,
    processed,
    onReset,
    className
}) => {
    return (
        <div className={cn("glass-panel rounded-lg p-1 glow-blue-lg w-full max-w-5xl mx-auto", className)}>
            <div className="bg-card rounded-md overflow-hidden p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Original Image */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Original</span>
                        </div>
                        <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                            <img
                                src={original}
                                alt="Original"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Processed Image */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary">Background Removed</span>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 text-xs gap-1"
                                onClick={() => downloadDataUrl(processed, "clearframe-removed-bg.png")}
                            >
                                <Download size={12} />
                                Download
                            </Button>
                        </div>
                        <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-border bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] flex items-center justify-center">
                            <img
                                src={processed}
                                alt="Processed"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-2">
                    <Button variant="outline" onClick={onReset}>
                        Upload Another Image
                    </Button>
                </div>
            </div>
        </div>
    );
};
