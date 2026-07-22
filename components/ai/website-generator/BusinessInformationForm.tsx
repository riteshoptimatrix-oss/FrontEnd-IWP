"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { UploadField } from "./UploadField";
import { SocialLinksForm } from "./SocialLinksForm";
import { ValidationMessage } from "./ValidationMessage";
import { Building2, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { m } from "framer-motion";

const CATEGORIES = [
  "Software Company",
  "Digital Agency",
  "E-Commerce & Retail",
  "Healthcare & Clinic",
  "Real Estate & Construction",
  "Restaurant & Cafe",
  "Education & Coaching",
  "Hotel & Hospitality",
  "Law Firm & Legal",
  "Fitness & Gym",
  "Salon & Spa",
  "Travel & Tourism",
  "Portfolio & Professional",
  "Other Business",
];

export function BusinessInformationForm() {
  const { businessInfo, updateBusinessInfo, fieldErrors, setFieldTouched } =
    useWebsiteGeneratorStore();

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Step 1: Business Information
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Provide your core business details to customize website branding, contact sections, and SEO tags.
        </p>
      </div>

      {/* Company Name, Category, Logo */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Building2 className="h-4 w-4" />
          <span>Core Brand Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company Name */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.companyName}
              onChange={(e) => updateBusinessInfo({ companyName: e.target.value })}
              onBlur={() => setFieldTouched("companyName")}
              placeholder="e.g. Acme Web Solutions"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.companyName} />
          </div>

          {/* Business Category */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Business Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={businessInfo.category}
              onChange={(e) => updateBusinessInfo({ category: e.target.value })}
              onBlur={() => setFieldTouched("category")}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ValidationMessage message={fieldErrors.category} />
          </div>
        </div>

        {/* Logo Upload */}
        <UploadField />

        {/* Business Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Business Description <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-zinc-400">
              {businessInfo.description.length}/500 chars
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={500}
            value={businessInfo.description}
            onChange={(e) => updateBusinessInfo({ description: e.target.value })}
            onBlur={() => setFieldTouched("description")}
            placeholder="Briefly describe your company services, mission, and target clients..."
            className="w-full p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm leading-relaxed"
          />
          <ValidationMessage message={fieldErrors.description} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <Phone className="h-4 w-4" />
          <span>Contact Channels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Primary Phone <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={businessInfo.phone}
              onChange={(e) => updateBusinessInfo({ phone: e.target.value })}
              onBlur={() => setFieldTouched("phone")}
              placeholder="+91 98765 43210"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.phone} />
          </div>

          {/* Alt Phone */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Alt Phone <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={businessInfo.altPhone || ""}
              onChange={(e) => updateBusinessInfo({ altPhone: e.target.value })}
              onBlur={() => setFieldTouched("altPhone")}
              placeholder="+91 11 2345 6789"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.altPhone} />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              WhatsApp <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={businessInfo.whatsapp || ""}
              onChange={(e) => updateBusinessInfo({ whatsapp: e.target.value })}
              onBlur={() => setFieldTouched("whatsapp")}
              placeholder="+91 98765 43210"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.whatsapp} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={businessInfo.email}
              onChange={(e) => updateBusinessInfo({ email: e.target.value })}
              onBlur={() => setFieldTouched("email")}
              placeholder="contact@company.com"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.email} />
          </div>

          {/* Existing Website */}
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Existing Website <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              value={businessInfo.existingWebsite || ""}
              onChange={(e) => updateBusinessInfo({ existingWebsite: e.target.value })}
              onBlur={() => setFieldTouched("existingWebsite")}
              placeholder="https://yourcompany.com"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.existingWebsite} />
          </div>
        </div>
      </div>

      {/* Physical Address & Location */}
      <div className="space-y-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
          <MapPin className="h-4 w-4" />
          <span>Location & Address</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Country <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.country}
              onChange={(e) => updateBusinessInfo({ country: e.target.value })}
              onBlur={() => setFieldTouched("country")}
              placeholder="India"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.country} />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              State <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.state}
              onChange={(e) => updateBusinessInfo({ state: e.target.value })}
              onBlur={() => setFieldTouched("state")}
              placeholder="Delhi / Maharashtra"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.state} />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.city}
              onChange={(e) => updateBusinessInfo({ city: e.target.value })}
              onBlur={() => setFieldTouched("city")}
              placeholder="New Delhi / Mumbai"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.city} />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Pincode <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.pincode}
              onChange={(e) => updateBusinessInfo({ pincode: e.target.value })}
              onBlur={() => setFieldTouched("pincode")}
              placeholder="110001"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.pincode} />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
            Full Address <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            value={businessInfo.fullAddress}
            onChange={(e) => updateBusinessInfo({ fullAddress: e.target.value })}
            onBlur={() => setFieldTouched("fullAddress")}
            placeholder="Plot No. 42, Cyber City, Phase 2, New Delhi"
            className="w-full p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
          />
          <ValidationMessage message={fieldErrors.fullAddress} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Google Maps URL <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              value={businessInfo.googleMapsUrl || ""}
              onChange={(e) => updateBusinessInfo({ googleMapsUrl: e.target.value })}
              onBlur={() => setFieldTouched("googleMapsUrl")}
              placeholder="https://maps.google.com/..."
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.googleMapsUrl} />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Working Hours <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={businessInfo.workingHours}
              onChange={(e) => updateBusinessInfo({ workingHours: e.target.value })}
              onBlur={() => setFieldTouched("workingHours")}
              placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm"
            />
            <ValidationMessage message={fieldErrors.workingHours} />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <SocialLinksForm />
    </m.div>
  );
}
