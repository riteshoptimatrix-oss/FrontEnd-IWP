import * as React from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/**
 * Production-ready image wrapper around `next/image`.
 *
 * - Sensible defaults (lazy loading, no layout shift via `fill`/dimensions).
 * - Centralized so image policy (sizes, priority, placeholder) is consistent.
 * - Swap `src` for real raster assets later; `next.config` is already set to
 *   emit AVIF/WebP for modern browsers.
 */
type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Optional blur placeholder shown before the image loads. */
  blur?: string;
  className?: string;
};

export function OptimizedImage({
  alt,
  blur,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      sizes={sizes}
      loading={loading}
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur}
      className={cn(className)}
      {...props}
    />
  );
}
