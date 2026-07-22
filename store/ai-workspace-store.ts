import { create } from "zustand";
import { WorkspacePreferences } from "@/types/ai";

interface AIWorkspaceState {
  isSidebarOpen: boolean;
  isMobileDrawerOpen: boolean;
  searchQuery: string;
  preferences: WorkspacePreferences;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleMobileDrawer: () => void;
  setMobileDrawerOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  updatePreferences: (updates: Partial<WorkspacePreferences>) => void;
}

export const useAIWorkspaceStore = create<AIWorkspaceState>((set) => ({
  isSidebarOpen: true,
  isMobileDrawerOpen: false,
  searchQuery: "",
  preferences: {
    theme: "light",
    defaultFramework: "nextjs",
    autoSave: true,
    emailNotifications: true,
    soundEnabled: false,
  },
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleMobileDrawer: () => set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),
  setMobileDrawerOpen: (isOpen) => set({ isMobileDrawerOpen: isOpen }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  updatePreferences: (updates) =>
    set((state) => ({
      preferences: { ...state.preferences, ...updates },
    })),
}));
