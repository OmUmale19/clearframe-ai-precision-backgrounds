import React, { useState, useRef, useEffect, DragEvent, ClipboardEvent } from 'react';
import { Upload, FileImage, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void;
  className?: string;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFileSelect, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handlePaste = (e: globalThis.ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) {
              handleFile(file);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div 
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        className
      )}
      onClick={handleClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/png, image/jpeg, image/webp"
      />
      
      <div className={cn(
        "glass-panel rounded-lg p-1 glow-blue-lg transition-all duration-300",
        isDragging ? "ring-2 ring-primary scale-[1.02]" : ""
      )}>
        <div className="bg-card rounded-md overflow-hidden aspect-video flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] opacity-30" />
          
          {preview ? (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-full max-w-full object-contain rounded shadow-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={clearImage}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div className="relative text-center space-y-4 p-8">
              <div className={cn(
                "w-16 h-16 rounded-full bg-gradient-cta mx-auto flex items-center justify-center transition-transform duration-300",
                isDragging ? "scale-110" : "group-hover:scale-110"
              )}>
                <Upload size={28} className="text-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {isDragging ? "Drop image here" : "Drag & drop your image here or click to upload"}
              </p>
              <p className="text-xs text-muted-foreground/60">
                JPG, PNG, WEBP · Max 10MB · Ctrl+V to paste
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
