import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, setAccessToken } from "@/lib/api-client";

export type User = {
  id: string;
  full_name: string;
  email: string;
  avatar: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  email_verified: boolean;
  two_factor_enabled: boolean;
  account_status: string;
  theme_preference: string;
  notification_settings: Record<string, boolean>;
  timezone: string;
  language: string;
  company: string | null;
  bio: string | null;
  social_links: Record<string, string>;
  location: string | null;
  website: string | null;
  subscription: {
    plan: string;
    status: string;
  };
  security: {
    last_password_change: string | null;
    connected_devices: number;
    recent_login_ip: string | null;
  };
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  register: (data: {
    full_name: string;
    email: string;
    password: string;
    company?: string;
  }) => Promise<boolean>;

  login: (data: {
    email: string;
    password: string;
    remember_me?: boolean;
  }) => Promise<boolean>;

  logout: () => Promise<void>;

  fetchMe: () => Promise<void>;

  updateUser: (user: User) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;

  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await api.post("/auth/register", data);
          setAccessToken(res.access_token);
          set({ user: res.user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
            "Registration failed. Please try again.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await api.post("/auth/login", data);
          setAccessToken(res.access_token);
          set({ user: res.user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
            "Invalid email or password.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch {
          // ignore
        } finally {
          setAccessToken(null);
          set({ user: null, isAuthenticated: false });
        }
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get("/auth/me");
          set({ user: data.user, isAuthenticated: true });
        } catch {
          setAccessToken(null);
          set({ user: null, isAuthenticated: false });
        }
      },

      updateUser: (user) => {
        set({ user });
      },

      updateProfile: async (data) => {
        const { user } = get();
        if (!user) throw new Error("Not authenticated");

        // Optimistic UI update
        const previousUser = { ...user };
        const updatedUser = { ...user, ...data };
        set({ user: updatedUser });

        try {
          const { data: res } = await api.patch("/auth/profile", data);
          // Update with whatever the server returns as the definitive state
          if (res && res.user) {
             set({ user: res.user });
          }
        } catch (err: unknown) {
          // Revert optimistic update on error
          set({ user: previousUser });
          const message =
            (err as { response?: { data?: { detail?: string }; status?: number } })?.response?.data?.detail ||
            "Failed to update profile. Please try again.";
            
          // If the endpoint doesn't exist yet (404), we can log a warning but keep the optimistic state for demo purposes in dev
          if ((err as { response?: { status?: number } })?.response?.status === 404) {
            console.warn("API /auth/profile not implemented yet. Keeping optimistic state.");
            set({ user: updatedUser }); // keep it
          } else {
            throw new Error(message);
          }
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "iwp-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
