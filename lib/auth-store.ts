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
  }) => Promise<void>;

  login: (data: {
    email: string;
    password: string;
    remember_me?: boolean;
  }) => Promise<void>;

  logout: () => Promise<void>;

  fetchMe: () => Promise<void>;

  updateUser: (user: User) => void;

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
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
            "Registration failed. Please try again.";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await api.post("/auth/login", data);
          setAccessToken(res.access_token);
          set({ user: res.user, isAuthenticated: true, isLoading: false });
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
            "Invalid email or password.";
          set({ error: message, isLoading: false });
          throw new Error(message);
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
