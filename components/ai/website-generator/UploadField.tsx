"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, X, Check } from "lucide-react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { m } from "framer-motion";

export function UploadField() {
  const { businessInfo, updateBusinessInfo } = useWebsiteGeneratorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBusinessInfo({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBusinessInfo({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateBusinessInfo({ logoUrl: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight block">
        Company Logo <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
      </label>

      {businessInfo.logoUrl ? (
        <div className="relative flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 overflow-hidden flex items-center justify-center p-1">
              <img
                src={businessInfo.logoUrl}
                alt="Uploaded company logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Logo Uploaded</span>
              </p>
              <p className="text-[11px] text-zinc-500">Ready for website header & favicon</p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeLogo}
            className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            aria-label="Remove uploaded logo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <m.div
          whileHover={{ scale: 1.005 }}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-800"
              : "border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mx-auto flex items-center justify-center text-zinc-500 mb-2 shadow-sm">
            <UploadCloud className="h-5 w-5" />
          </div>

          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Click to upload logo <span className="font-normal text-zinc-500">or drag and drop</span>
          </p>

          <p className="text-[11px] text-zinc-400 mt-1">SVG, PNG, JPG or WEBP (Max 5MB)</p>
        </m.div>
      )}
    </div>
  );
}
