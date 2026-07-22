import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BusinessInfo, WizardStepNumber, FieldErrors } from "@/types/website-generator";

export const defaultBusinessInfo: BusinessInfo = {
  companyName: "",
  logoUrl: "",
  category: "Software Company",
  description: "",
  phone: "",
  altPhone: "",
  whatsapp: "",
  email: "",
  existingWebsite: "",
  country: "India",
  state: "",
  city: "",
  pincode: "",
  fullAddress: "",
  googleMapsUrl: "",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
};

interface WebsiteGeneratorState {
  step: WizardStepNumber;
  businessInfo: BusinessInfo;
  selectedWebsiteType: string | null;
  selectedTheme: string | null;
  selectedFeatures: string[];
  fieldErrors: FieldErrors;
  touchedFields: Record<string, boolean>;
  draftSavedAt: string | null;
  isDraftModalOpen: boolean;

  // Actions
  setStep: (step: WizardStepNumber) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  updateBusinessInfo: (updates: Partial<BusinessInfo>) => void;
  updateSocialLinks: (social: Partial<BusinessInfo["socialLinks"]>) => void;
  selectWebsiteType: (typeId: string) => void;
  selectTheme: (themeId: string) => void;
  toggleFeature: (featureId: string) => void;
  validateCurrentStep: () => boolean;
  setFieldTouched: (field: string) => void;
  saveDraft: () => void;
  clearDraft: () => void;
  setIsDraftModalOpen: (isOpen: boolean) => void;
  calculateProgress: () => number;
  getMissingRequiredFields: () => { field: string; label: string; step: WizardStepNumber }[];
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidUrl = (url: string) => !url || /^https?:\/\/.+/i.test(url);
const isValidPhone = (phone: string) => /^[\d\s+\-()]{7,15}$/.test(phone);

export const useWebsiteGeneratorStore = create<WebsiteGeneratorState>()(
  persist(
    (set, get) => ({
      step: 1,
      businessInfo: defaultBusinessInfo,
      selectedWebsiteType: "Software Company",
      selectedTheme: "White",
      selectedFeatures: ["Contact Form", "Services", "SEO Ready", "Analytics Ready"],
      fieldErrors: {},
      touchedFields: {},
      draftSavedAt: null,
      isDraftModalOpen: false,

      setStep: (step) => set({ step }),

      nextStep: () => {
        const isValid = get().validateCurrentStep();
        if (isValid) {
          const currentStep = get().step;
          if (currentStep < 5) {
            set({ step: (currentStep + 1) as WizardStepNumber });
            get().saveDraft();
            return true;
          }
        }
        return false;
      },

      prevStep: () => {
        const currentStep = get().step;
        if (currentStep > 1) {
          set({ step: (currentStep - 1) as WizardStepNumber });
        }
      },

      updateBusinessInfo: (updates) => {
        set((state) => ({
          businessInfo: { ...state.businessInfo, ...updates },
        }));
        get().validateCurrentStep();
      },

      updateSocialLinks: (socialUpdates) => {
        set((state) => ({
          businessInfo: {
            ...state.businessInfo,
            socialLinks: { ...state.businessInfo.socialLinks, ...socialUpdates },
          },
        }));
      },

      selectWebsiteType: (typeId) => {
        set({ selectedWebsiteType: typeId });
        get().saveDraft();
      },

      selectTheme: (themeId) => {
        set({ selectedTheme: themeId });
        get().saveDraft();
      },

      toggleFeature: (featureId) => {
        set((state) => {
          const exists = state.selectedFeatures.includes(featureId);
          const updated = exists
            ? state.selectedFeatures.filter((id) => id !== featureId)
            : [...state.selectedFeatures, featureId];
          return { selectedFeatures: updated };
        });
        get().saveDraft();
      },

      setFieldTouched: (field) => {
        set((state) => ({
          touchedFields: { ...state.touchedFields, [field]: true },
        }));
        get().validateCurrentStep();
      },

      validateCurrentStep: () => {
        const { step, businessInfo, selectedWebsiteType, selectedTheme, selectedFeatures } = get();
        const errors: FieldErrors = {};

        if (step === 1) {
          if (!businessInfo.companyName.trim()) {
            errors.companyName = "Company name is required";
          } else if (businessInfo.companyName.length < 2) {
            errors.companyName = "Company name must be at least 2 characters";
          }

          if (!businessInfo.category.trim()) {
            errors.category = "Business category is required";
          }

          if (!businessInfo.description.trim()) {
            errors.description = "Business description is required";
          } else if (businessInfo.description.length < 10) {
            errors.description = "Description should be at least 10 characters";
          }

          if (!businessInfo.phone.trim()) {
            errors.phone = "Phone number is required";
          } else if (!isValidPhone(businessInfo.phone)) {
            errors.phone = "Invalid phone number format";
          }

          if (businessInfo.altPhone && !isValidPhone(businessInfo.altPhone)) {
            errors.altPhone = "Invalid alternative phone format";
          }

          if (businessInfo.whatsapp && !isValidPhone(businessInfo.whatsapp)) {
            errors.whatsapp = "Invalid WhatsApp number format";
          }

          if (!businessInfo.email.trim()) {
            errors.email = "Email address is required";
          } else if (!isValidEmail(businessInfo.email)) {
            errors.email = "Please enter a valid email address";
          }

          if (businessInfo.existingWebsite && !isValidUrl(businessInfo.existingWebsite)) {
            errors.existingWebsite = "Website URL must start with http:// or https://";
          }

          if (!businessInfo.country.trim()) errors.country = "Country is required";
          if (!businessInfo.state.trim()) errors.state = "State is required";
          if (!businessInfo.city.trim()) errors.city = "City is required";
          if (!businessInfo.pincode.trim()) errors.pincode = "Pincode is required";
          if (!businessInfo.fullAddress.trim()) errors.fullAddress = "Full address is required";
          if (!businessInfo.workingHours.trim()) errors.workingHours = "Working hours are required";

          if (businessInfo.googleMapsUrl && !isValidUrl(businessInfo.googleMapsUrl)) {
            errors.googleMapsUrl = "Google Maps URL must start with http:// or https://";
          }

          // Social links validation
          const { facebook, instagram, linkedin, twitter, youtube } = businessInfo.socialLinks;
          if (facebook && !isValidUrl(facebook)) errors.facebook = "Invalid Facebook URL";
          if (instagram && !isValidUrl(instagram)) errors.instagram = "Invalid Instagram URL";
          if (linkedin && !isValidUrl(linkedin)) errors.linkedin = "Invalid LinkedIn URL";
          if (twitter && !isValidUrl(twitter)) errors.twitter = "Invalid Twitter/X URL";
          if (youtube && !isValidUrl(youtube)) errors.youtube = "Invalid YouTube URL";
        }

        if (step === 2 && !selectedWebsiteType) {
          errors.websiteType = "Please select a website type";
        }

        if (step === 3 && !selectedTheme) {
          errors.theme = "Please select a theme preview";
        }

        if (step === 4 && selectedFeatures.length === 0) {
          errors.features = "Please select at least one website feature";
        }

        set({ fieldErrors: errors });
        return Object.keys(errors).length === 0;
      },

      saveDraft: () => {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        set({ draftSavedAt: timestamp });
      },

      clearDraft: () => {
        set({
          step: 1,
          businessInfo: defaultBusinessInfo,
          selectedWebsiteType: "Software Company",
          selectedTheme: "White",
          selectedFeatures: ["Contact Form", "Services", "SEO Ready"],
          fieldErrors: {},
          touchedFields: {},
          draftSavedAt: null,
          isDraftModalOpen: false,
        });
      },

      setIsDraftModalOpen: (isOpen) => set({ isDraftModalOpen: isOpen }),

      calculateProgress: () => {
        const { businessInfo, selectedWebsiteType, selectedTheme, selectedFeatures } = get();
        let total = 0;
        let filled = 0;

        // Step 1 key fields
        const reqFields = [
          businessInfo.companyName,
          businessInfo.category,
          businessInfo.description,
          businessInfo.phone,
          businessInfo.email,
          businessInfo.country,
          businessInfo.state,
          businessInfo.city,
          businessInfo.pincode,
          businessInfo.fullAddress,
          businessInfo.workingHours,
        ];

        total += reqFields.length + 3; // + type, theme, features

        reqFields.forEach((val) => {
          if (val && val.trim().length > 0) filled += 1;
        });

        if (selectedWebsiteType) filled += 1;
        if (selectedTheme) filled += 1;
        if (selectedFeatures.length > 0) filled += 1;

        return Math.round((filled / total) * 100);
      },

      getMissingRequiredFields: () => {
        const { businessInfo, selectedWebsiteType, selectedTheme, selectedFeatures } = get();
        const missing: { field: string; label: string; step: WizardStepNumber }[] = [];

        if (!businessInfo.companyName.trim())
          missing.push({ field: "companyName", label: "Company Name", step: 1 });
        if (!businessInfo.category.trim())
          missing.push({ field: "category", label: "Business Category", step: 1 });
        if (!businessInfo.description.trim())
          missing.push({ field: "description", label: "Business Description", step: 1 });
        if (!businessInfo.phone.trim())
          missing.push({ field: "phone", label: "Phone Number", step: 1 });
        if (!businessInfo.email.trim())
          missing.push({ field: "email", label: "Email Address", step: 1 });
        if (!businessInfo.city.trim())
          missing.push({ field: "city", label: "City", step: 1 });
        if (!businessInfo.fullAddress.trim())
          missing.push({ field: "fullAddress", label: "Full Address", step: 1 });

        if (!selectedWebsiteType)
          missing.push({ field: "websiteType", label: "Website Type", step: 2 });
        if (!selectedTheme)
          missing.push({ field: "theme", label: "Theme Selection", step: 3 });
        if (selectedFeatures.length === 0)
          missing.push({ field: "features", label: "At least 1 Feature", step: 4 });

        return missing;
      },
    }),
    {
      name: "iwp_website_generator_draft_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        businessInfo: state.businessInfo,
        selectedWebsiteType: state.selectedWebsiteType,
        selectedTheme: state.selectedTheme,
        selectedFeatures: state.selectedFeatures,
        draftSavedAt: state.draftSavedAt,
      }),
    }
  )
);
