"use client";
import React, { useCallback, useState, useRef, DragEvent } from "react";
import { Button } from "../Button";
import {
  ImageIcon,
  UploadIcon,
  XIcon,
  FileIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  Trash2Icon,
  EyeIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  required?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  aspectRatio?: number; // width/height
  showPreview?: boolean;
  multiple?: boolean;
  onError?: (error: string) => void;
  onSuccess?: (url: string) => void;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
}

const ACCEPTED_FORMATS = {
  "image/*": "All image formats",
  "image/png,image/jpeg,image/jpg,image/webp": "PNG, JPG, JPEG, WebP",
  "image/png": "PNG only",
  "image/jpeg,image/jpg": "JPEG only",
  "image/webp": "WebP only",
};

const MAX_FILE_SIZE = 5; // 5MB default

export function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  className = "",
  accept = "image/png,image/jpeg,image/jpg,image/webp",
  maxSize = MAX_FILE_SIZE,
  aspectRatio,
  showPreview = true,
  multiple = false,
  onError,
  onSuccess,
  disabled = false,
  placeholder = "Click to upload or drag and drop",
  helperText,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useRef(`image-upload-${label}-${Math.random().toString(36).substr(2, 9)}`);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const acceptedTypes = accept.split(",");
    const isValidType = acceptedTypes.some((type) => {
      if (type === "image/*") return file.type.startsWith("image/");
      return file.type === type;
    });

    if (!isValidType) {
      const formatText =
        ACCEPTED_FORMATS[accept as keyof typeof ACCEPTED_FORMATS] ||
        "supported formats";
      return `Please upload a file in ${formatText}`;
    }

    return null;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  };

  const handleFileChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0]; // For now, handle single file

      // Reset states
      setError(null);
      setIsUploading(true);

      try {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          throw new Error(validationError);
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        const uploadedUrl = await uploadFile(file);
        onChange(uploadedUrl);
        onSuccess?.(uploadedUrl);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload image";
        setError(errorMessage);
        onError?.(errorMessage);
        console.error("Image upload error:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, onSuccess, onError, accept, maxSize]
  );

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files);
      }
    },
    [handleFileChange]
  );

  const handleRemove = () => {
    onChange("");
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatText =
    ACCEPTED_FORMATS[accept as keyof typeof ACCEPTED_FORMATS] ||
    "supported formats";

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {helperText && (
          <span className="text-xs text-muted-foreground">{helperText}</span>
        )}
      </div>

      <div className="space-y-3">
        {/* Upload Area */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-all duration-200",
            dragActive && "border-primary bg-primary/5",
            error && "border-destructive bg-destructive/5",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:border-primary/50 hover:bg-muted/30"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label
            htmlFor={uniqueId.current}
            className={cn(
              "cursor-pointer block p-6",
              disabled && "cursor-not-allowed"
            )}
          >
            <div className="text-center space-y-3">
              {isUploading ? (
                <div className="space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <>
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    {value ? (
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <UploadIcon className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {value ? "Change image" : placeholder}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatText} • Max {maxSize}MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </label>

          <input
            ref={fileInputRef}
            id={uniqueId.current}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files)}
            className="sr-only"
            disabled={isUploading || disabled}
            multiple={multiple}
          />
        </div>

        {/* Preview Section */}
        {showPreview && (value || previewUrl) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Preview
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(value || previewUrl || "", "_blank")
                  }
                  className="h-8 px-2"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="h-8 px-2 text-destructive hover:text-destructive"
                >
                  <Trash2Icon className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                className={cn(
                  "relative rounded-lg overflow-hidden bg-muted",
                  aspectRatio ? `aspect-[${aspectRatio}]` : "aspect-video"
                )}
              >
                <img
                  src={value || previewUrl || ""}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircleIcon className="w-4 h-4 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {value && !error && !isUploading && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-600">
              Image uploaded successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
