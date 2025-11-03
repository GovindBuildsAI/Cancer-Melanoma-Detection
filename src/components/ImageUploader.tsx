import { Upload, X } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "./ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

export const ImageUploader = ({ onImageSelect, selectedImage, onClear }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        if (files[0].type.startsWith("image/")) {
          onImageSelect(files[0]);
        }
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your skin lesion image here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse files
            </p>
            <Button type="button" variant="outline" size="lg">
              Select Image
            </Button>
          </label>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden shadow-medium bg-card p-4">
          <button
            onClick={onClear}
            className="absolute top-6 right-6 z-10 bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90 transition-colors shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected lesion"
            className="w-full h-auto max-h-[500px] object-contain rounded"
          />
          <p className="text-sm text-muted-foreground mt-4 text-center">
            {selectedImage.name}
          </p>
        </div>
      )}
    </div>
  );
};
