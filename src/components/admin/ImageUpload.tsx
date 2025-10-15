"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  onUpload?: (url: string) => void;
  maxSize?: number; // in MB
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: "square" | "video" | "auto";
}

export function ImageUpload({
  label,
  name,
  defaultValue = "",
  required = false,
  className = "",
  onUpload,
  maxSize = 5, // Default 5MB
  minWidth = 100,
  minHeight = 100,
  aspectRatio = "auto",
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageDimensions = useCallback(
    (file: File): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(url);
          if (img.width < minWidth || img.height < minHeight) {
            toast.error(
              `Image too small. Minimum dimensions: ${minWidth}x${minHeight}px`
            );
            resolve(false);
          } else {
            resolve(true);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          toast.error("Invalid image file");
          resolve(false);
        };

        img.src = url;
      });
    },
    [minWidth, minHeight]
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
        );
        return;
      }

      // Validate file size
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`File too large. Maximum size is ${maxSize}MB.`);
        return;
      }

      // Validate image dimensions
      const isValidDimensions = await validateImageDimensions(file);
      if (!isValidDimensions) {
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          // Use the Cloudinary URL directly (no need to prepend origin)
          setImageUrl(result.url);
          onUpload?.(result.url);
          toast.success(
            `Image uploaded successfully! (${result.width}x${result.height}px)`
          );
        } else {
          toast.error(result.error || "Failed to upload image");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onUpload, validateImageDimensions]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    onUpload?.(url);
  };

  const clearImage = () => {
    setImageUrl("");
    onUpload?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>

      {/* Hidden input for form submission */}
      <Input type="hidden" name={name} value={imageUrl} />

      {/* Image Preview */}
      {imageUrl && (
        <Card className="relative">
          <CardContent className="p-4">
            <div
              className={`relative w-full overflow-hidden rounded-lg bg-muted ${
                aspectRatio === "square"
                  ? "aspect-square"
                  : aspectRatio === "video"
                    ? "aspect-video"
                    : "aspect-video"
              }`}
            >
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                onError={() => {
                  toast.error("Failed to load image");
                  setImageUrl("");
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted p-4">
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {isUploading ? "Uploading..." : "Upload Image"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPEG, PNG, GIF, WebP (max {maxSize}MB, min {minWidth}x
                {minHeight}px)
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* URL Input Alternative */}
      <div className="space-y-2">
        <Label
          htmlFor={`${name}-url`}
          className="text-sm text-muted-foreground"
        >
          Or enter image URL directly
        </Label>
        <Input
          id={`${name}-url`}
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={handleUrlChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
