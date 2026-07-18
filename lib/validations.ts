import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Auth Schemas                                                       */
/* ------------------------------------------------------------------ */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  remember_me: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Include a lowercase letter")
    .regex(/[A-Z]/, "Include an uppercase letter")
    .regex(/\d/, "Include a number"),
  company: z.string().optional().default(""),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/* ------------------------------------------------------------------ */
/*  Profile Schemas                                                    */
/* ------------------------------------------------------------------ */

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  phone: z.string().default(""),
  company: z.string().default(""),
  bio: z.string().max(500, "Bio must be at most 500 characters").default(""),
  social_twitter: z.string().url("Enter a valid URL").or(z.literal("")).default(""),
  social_linkedin: z.string().url("Enter a valid URL").or(z.literal("")).default(""),
  social_github: z.string().url("Enter a valid URL").or(z.literal("")).default(""),
  social_website: z.string().url("Enter a valid URL").or(z.literal("")).default(""),
});

export type ProfileInput = z.infer<typeof profileSchema>;

/* ------------------------------------------------------------------ */
/*  Settings Schemas                                                   */
/* ------------------------------------------------------------------ */

export const settingsSchema = z.object({
  theme_preference: z.enum(["light", "dark", "system"]).default("system"),
  timezone: z.string().min(1, "Timezone is required").default("UTC"),
  language: z.string().min(1, "Language is required").default("en"),
  notification_settings: z.object({
    email_notifications: z.boolean().default(true),
    project_updates: z.boolean().default(true),
    ai_reports: z.boolean().default(true),
    security_alerts: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

/* ------------------------------------------------------------------ */
/*  Security Schemas                                                   */
/* ------------------------------------------------------------------ */

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "Current password is required"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/\d/, "Include a number"),
    confirm_password: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })
  .refine((data) => data.current_password !== data.new_password, {
    message: "New password must be different from current password",
    path: ["new_password"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
