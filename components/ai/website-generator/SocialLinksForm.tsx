"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { ValidationMessage } from "./ValidationMessage";

export function SocialLinksForm() {
  const { businessInfo, updateSocialLinks, fieldErrors, setFieldTouched } =
    useWebsiteGeneratorStore();

  const handleSocialChange = (key: keyof typeof businessInfo.socialLinks, val: string) => {
    updateSocialLinks({ [key]: val });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
      <div>
        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
          Social Profiles <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
        </h4>
        <p className="text-xs text-zinc-500 mt-0.5">
          Provide links to display in your website footer and contact section.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
            Facebook URL
          </label>
          <input
            type="url"
            value={businessInfo.socialLinks.facebook || ""}
            onChange={(e) => handleSocialChange("facebook", e.target.value)}
            onBlur={() => setFieldTouched("facebook")}
            placeholder="https://facebook.com/yourcompany"
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          <ValidationMessage message={fieldErrors.facebook} />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
            Instagram URL
          </label>
          <input
            type="url"
            value={businessInfo.socialLinks.instagram || ""}
            onChange={(e) => handleSocialChange("instagram", e.target.value)}
            onBlur={() => setFieldTouched("instagram")}
            placeholder="https://instagram.com/yourcompany"
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          <ValidationMessage message={fieldErrors.instagram} />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={businessInfo.socialLinks.linkedin || ""}
            onChange={(e) => handleSocialChange("linkedin", e.target.value)}
            onBlur={() => setFieldTouched("linkedin")}
            placeholder="https://linkedin.com/company/yourcompany"
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          <ValidationMessage message={fieldErrors.linkedin} />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
            Twitter / X URL
          </label>
          <input
            type="url"
            value={businessInfo.socialLinks.twitter || ""}
            onChange={(e) => handleSocialChange("twitter", e.target.value)}
            onBlur={() => setFieldTouched("twitter")}
            placeholder="https://x.com/yourcompany"
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          <ValidationMessage message={fieldErrors.twitter} />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
            YouTube URL
          </label>
          <input
            type="url"
            value={businessInfo.socialLinks.youtube || ""}
            onChange={(e) => handleSocialChange("youtube", e.target.value)}
            onBlur={() => setFieldTouched("youtube")}
            placeholder="https://youtube.com/@yourcompany"
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          />
          <ValidationMessage message={fieldErrors.youtube} />
        </div>
      </div>
    </div>
  );
}
