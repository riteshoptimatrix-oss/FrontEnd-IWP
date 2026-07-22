import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "account"
  | "security"
  | "projects"
  | "ai";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  read: boolean;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "created_at">) => void;
  getUnreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "ai",
    title: "OptiMatrix Code Analysis Completed",
    description: "The AI Assistant completed analyzing your frontend repository. 12 optimization recommendations generated.",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  },
  {
    id: "notif-2",
    type: "success",
    title: "Achievement Unlocked: Speed Demon",
    description: "Congratulations! You exceeded 80 WPM in the CodeSprint Typing Playground challenge.",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "notif-3",
    type: "projects",
    title: "Project Sync Alert",
    description: "Repository IndiaWebProgrammers synchronized successfully with GitHub staging branch.",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "notif-4",
    type: "security",
    title: "New Login Detected",
    description: "A new login was detected from IP 192.168.1.45 using Chrome on Windows.",
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "notif-5",
    type: "warning",
    title: "API Key Expiring soon",
    description: "Your development API token is set to expire in 3 days. Please regenerate it in settings.",
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: "notif-6",
    type: "error",
    title: "Compile Error on Staging Build",
    description: "Compilation failed on build #452 due to a strict TypeScript type checking error in profile page component.",
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,
      isLoading: false,

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      addNotification: (notification) => {
        const newNotif: Notification = {
          ...notification,
          id: `notif-${Math.random().toString(36).substr(2, 9)}`,
          read: false,
          created_at: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: "iwp-notifications",
    }
  )
);
