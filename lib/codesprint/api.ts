import { api } from "@/lib/api-client";

export interface FinishSessionPayload {
  language: string;
  difficulty: string;
  category: string;
  snippet_id: string;
  snippet_title?: string;
  duration_seconds?: number;
  start_time?: string;
  end_time?: string;
  completion_time: number;
  characters_typed: number;
  correct_characters: number;
  incorrect_characters: number;
  total_mistakes: number;
  backspaces: number;
  accuracy: number;
  cpm: number;
  wpm: number;
  completion_pct: number;
  finished: boolean;
}

export interface FinishSessionResponse {
  session_id: string;
  wpm: number;
  accuracy: number;
  is_new_best_wpm: boolean;
  is_new_best_accuracy: boolean;
  created_at: string;
  xp_earned?: number;
  level_up?: boolean;
  new_level?: number;
  achievements_unlocked?: string[];
  streak?: number;
}

export interface TypingSessionRecord {
  id: string;
  language: string;
  difficulty: string;
  category: string;
  snippet_title?: string;
  wpm: number;
  accuracy: number;
  cpm: number;
  characters_typed: number;
  correct_characters: number;
  incorrect_characters: number;
  total_mistakes: number;
  completion_time: number;
  completion_pct: number;
  finished: boolean;
  duration_seconds?: number;
  created_at: string;
}

export interface HistoryResponse {
  sessions: TypingSessionRecord[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface PersonalRecords {
  best_wpm: number;
  best_accuracy: number;
  best_cpm: number;
  longest_session_seconds: number;
  best_language?: string;
  best_difficulty?: string;
}

export interface ProfileStats {
  total_tests: number;
  total_practice_hours: number;
  avg_wpm: number;
  avg_accuracy: number;
  best_wpm: number;
  best_accuracy: number;
  favorite_language?: string;
  most_practiced_category?: string;
  languages_practiced: string[];
  current_streak: number;
  longest_streak: number;
  personal_records: PersonalRecords;
}

export interface LanguageStats {
  language: string;
  tests: number;
  avg_wpm: number;
  avg_accuracy: number;
  best_wpm: number;
  best_accuracy: number;
}

export interface DifficultyStats {
  difficulty: string;
  tests: number;
  avg_wpm: number;
  avg_accuracy: number;
}

export interface StatisticsResponse {
  overall: ProfileStats;
  by_language: LanguageStats[];
  by_difficulty: DifficultyStats[];
}

export interface ProfileResponse {
  user_id: string;
  display_name: string;
  email: string;
  avatar?: string;
  joined_at: string;
  stats: ProfileStats;
}

export const codesprintApi = {
  finishSession: async (data: FinishSessionPayload): Promise<FinishSessionResponse> => {
    const { data: res } = await api.post("/codesprint/finish", data);
    return res;
  },

  getHistory: async (params: {
    page?: number;
    limit?: number;
    language?: string;
    difficulty?: string;
    category?: string;
  } = {}): Promise<HistoryResponse> => {
    const { data: res } = await api.get("/codesprint/history", { params });
    return res;
  },

  getStatistics: async (): Promise<StatisticsResponse> => {
    const { data: res } = await api.get("/codesprint/statistics");
    return res;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const { data: res } = await api.get("/codesprint/profile");
    return res;
  },

  getRecent: async (limit: number = 5): Promise<{ sessions: TypingSessionRecord[] }> => {
    const { data: res } = await api.get("/codesprint/recent", { params: { limit } });
    return res;
  },
};
