import { api } from "@/lib/api-client";

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  avatar?: string;
  score: number;
  level: number;
  xp: number;
  title: string;
  best_wpm: number;
  current_streak: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface UserRankResponse {
  current_rank: number;
  previous_rank?: number;
  rank_change?: number;
  top_percentage: number;
  xp: number;
  level: number;
  title: string;
  progress_to_next: number;
  xp_for_next_level: number;
  metric_score: number;
}

export interface DailyChallenge {
  id: string;
  language: string;
  category: string;
  difficulty: string;
  duration_seconds: number;
  xp_reward: number;
  bonus_xp: number;
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string;
}

export interface DailyChallengesResponse {
  challenges: DailyChallenge[];
  date: string;
  streak_days: number;
}

export interface WeeklyMission {
  id: string;
  type: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  progress_pct: number;
  language?: string;
  xp_reward: number;
  completed: boolean;
}

export interface WeeklyChallengesResponse {
  missions: WeeklyMission[];
  week_start: string;
  week_end: string;
  completed_count: number;
  total_count: number;
}

export interface Achievement {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tier: string;
  xp_reward: number;
  unlocked: boolean;
  unlocked_at?: string;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  total_unlocked: number;
  total_available: number;
}

export interface XPInfo {
  xp: number;
  level: number;
  title: string;
  xp_for_current_level: number;
  xp_for_next_level: number;
  progress_to_next: number;
  total_xp_earned: number;
  recent_transactions: Array<{
    amount: number;
    type: string;
    description: string;
    created_at: string;
  }>;
}

export interface StreakInfo {
  current_streak: number;
  longest_streak: number;
  last_practice_date?: string;
  streak_calendar: string[];
  today_practiced: boolean;
}

export interface GamificationProfile {
  user_id: string;
  display_name: string;
  avatar?: string;
  xp: number;
  level: number;
  title: string;
  total_xp_earned: number;
  current_streak: number;
  longest_streak: number;
  achievements_count: number;
  total_achievements: number;
  rank?: number;
  top_percentage?: number;
}

export const gamificationApi = {
  getLeaderboard: async (params: {
    period?: string;
    language?: string;
    metric?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<LeaderboardResponse> => {
    const { data: res } = await api.get("/codesprint/leaderboard", { params });
    return res;
  },

  getMyRank: async (metric: string = "xp"): Promise<UserRankResponse> => {
    const { data: res } = await api.get("/codesprint/leaderboard/me", { params: { metric } });
    return res;
  },

  getDailyChallenges: async (): Promise<DailyChallengesResponse> => {
    const { data: res } = await api.get("/codesprint/challenges/daily");
    return res;
  },

  getWeeklyChallenges: async (): Promise<WeeklyChallengesResponse> => {
    const { data: res } = await api.get("/codesprint/challenges/weekly");
    return res;
  },

  completeChallenge: async (challengeId: string, challengeType: string): Promise<{ success: boolean; xp_earned: number; message: string }> => {
    const { data: res } = await api.post("/codesprint/challenges/complete", {
      challenge_id: challengeId,
      challenge_type: challengeType,
    });
    return res;
  },

  getAchievements: async (): Promise<AchievementsResponse> => {
    const { data: res } = await api.get("/codesprint/achievements");
    return res;
  },

  getXPInfo: async (): Promise<XPInfo> => {
    const { data: res } = await api.get("/codesprint/gamification/xp");
    return res;
  },

  getStreak: async (): Promise<StreakInfo> => {
    const { data: res } = await api.get("/codesprint/gamification/streak");
    return res;
  },

  getGamificationProfile: async (): Promise<GamificationProfile> => {
    const { data: res } = await api.get("/codesprint/gamification/profile");
    return res;
  },

  claimDailyLoginXP: async (): Promise<{ success: boolean; xp_earned: number; message: string; achievements_unlocked?: string[] }> => {
    const { data: res } = await api.post("/codesprint/gamification/daily-login");
    return res;
  },
};
