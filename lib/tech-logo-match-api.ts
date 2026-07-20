import { api } from "@/lib/api-client";

export type FinishGamePayload = {
  category: string;
  difficulty: string;
  mode: string;
  score: number;
  correct: number;
  wrong: number;
  accuracy: number;
  avg_time: number;
  best_streak: number;
  stars: number;
  total_questions: number;
  duration_seconds: number;
};

export type FinishGameResult = {
  game_id: string;
  saved: boolean;
  message: string;
  total_games: number;
  current_streak: number;
  xp_awarded: number;
  total_xp: number;
  level: number;
  level_up: boolean;
  new_achievements: Array<{
    id: string; title: string; description: string;
    icon: string; xp_reward: number; newly_unlocked: boolean;
  }>;
  new_badges: Array<{
    id: string; name: string; description: string;
    icon: string; tier: string; newly_unlocked: boolean;
  }>;
};

export type GameHistoryItem = {
  id: string;
  category: string;
  difficulty: string;
  mode: string;
  score: number;
  correct: number;
  wrong: number;
  accuracy: number;
  avg_time: number;
  best_streak: number;
  stars: number;
  total_questions: number;
  duration_seconds: number;
  created_at: string;
};

export type GameHistoryResult = {
  games: GameHistoryItem[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
};

export type StatisticsResult = {
  total_games: number;
  total_correct: number;
  total_wrong: number;
  average_accuracy: number;
  average_score: number;
  highest_score: number;
  fastest_completion: number | null;
  favorite_category: string | null;
  favorite_difficulty: string | null;
  favorite_mode: string | null;
  current_streak: number;
  longest_streak: number;
  three_star_games: number;
  total_duration: number;
};

export type ProfileResult = {
  full_name: string;
  email: string;
  username: string;
  games_played: number;
  games_won: number;
  overall_accuracy: number;
  best_score: number;
  best_response_time: number | null;
  favorite_technology: string | null;
  favorite_category: string | null;
  favorite_difficulty: string | null;
  current_streak: number;
  longest_streak: number;
  total_stars: number;
  registered: string;
};

export type DashboardResult = {
  total_games: number;
  total_stars: number;
  average_accuracy: number;
  current_streak: number;
  longest_streak: number;
  favorite_category: string | null;
  favorite_difficulty: string | null;
  favorite_mode: string | null;
  best_score: number;
  highest_accuracy: number;
  fastest_completion: number | null;
  recent_games: GameHistoryItem[];
};

export type Settings = {
  sound_enabled: boolean;
  animations_enabled: boolean;
  timer_visible: boolean;
  high_contrast: boolean;
  reduced_motion: boolean;
  preferred_difficulty: string | null;
  preferred_category: string | null;
  preferred_mode: string | null;
};

export type SaveSettingsPayload = Partial<Settings>;

const BASE = "/tech-logo-match";

export const techLogoMatchApi = {
  async finishGame(payload: FinishGamePayload): Promise<FinishGameResult> {
    const { data } = await api.post(`${BASE}/games`, payload);
    return data;
  },

  async getGameHistory(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sort_by?: string;
    sort_order?: number;
    difficulty?: string;
    mode?: string;
    category?: string;
  }): Promise<GameHistoryResult> {
    const { data } = await api.get(`${BASE}/games`, { params });
    return data;
  },

  async getStatistics(): Promise<StatisticsResult> {
    const { data } = await api.get(`${BASE}/statistics`);
    return data;
  },

  async getDashboard(): Promise<DashboardResult> {
    const { data } = await api.get(`${BASE}/dashboard`);
    return data;
  },

  async getProfile(): Promise<ProfileResult> {
    const { data } = await api.get(`${BASE}/profile`);
    return data;
  },

  async getSettings(): Promise<Settings> {
    const { data } = await api.get(`${BASE}/settings`);
    return data;
  },

  async saveSettings(payload: SaveSettingsPayload): Promise<Settings> {
    const { data } = await api.put(`${BASE}/settings`, payload);
    return data;
  },

  async getAnalytics(): Promise<AnalyticsResult> {
    const { data } = await api.get(`${BASE}/analytics`);
    return data;
  },

  async exportAnalytics(format: "csv" | "json"): Promise<Blob> {
    const { data } = await api.get(`${BASE}/analytics/export`, {
      params: { format },
      responseType: "blob",
    });
    return data;
  },

  // ── Gamification ──
  async getPlayerLevel(): Promise<LevelInfo> {
    const { data } = await api.get(`${BASE}/xp/level`);
    return data;
  },

  async awardDailyLoginXp(): Promise<{ awarded: boolean; xp: number; message: string }> {
    const { data } = await api.post(`${BASE}/xp/daily-login`);
    return data;
  },

  async getAchievements(): Promise<AchievementItem[]> {
    const { data } = await api.get(`${BASE}/achievements`);
    return data;
  },

  async getBadges(): Promise<BadgeItem[]> {
    const { data } = await api.get(`${BASE}/badges`);
    return data;
  },

  async getLeaderboard(params?: {
    metric?: string; scope?: string; page?: number; limit?: number;
  }): Promise<LeaderboardResult> {
    const { data } = await api.get(`${BASE}/leaderboard`, { params });
    return data;
  },

  async getMyRank(params?: {
    metric?: string; scope?: string;
  }): Promise<PlayerRank> {
    const { data } = await api.get(`${BASE}/leaderboard/my-rank`, { params });
    return data;
  },

  async getDailyChallenge(): Promise<DailyChallengeResult> {
    const { data } = await api.get(`${BASE}/daily-challenge`);
    return data;
  },

  async getWeeklyChallenge(): Promise<WeeklyChallengeResult> {
    const { data } = await api.get(`${BASE}/weekly-challenge`);
    return data;
  },

  async getChallengeHistory(): Promise<ChallengeHistoryResult> {
    const { data } = await api.get(`${BASE}/challenge-history`);
    return data;
  },

  async getRewards(): Promise<RewardsResult> {
    const { data } = await api.get(`${BASE}/rewards`);
    return data;
  },

  async getNotifications(): Promise<NotificationsResult> {
    const { data } = await api.get(`${BASE}/notifications`);
    return data;
  },

  async markNotificationRead(id: string): Promise<void> {
    await api.post(`${BASE}/notifications/${id}/read`);
  },

  async markAllNotificationsRead(): Promise<void> {
    await api.post(`${BASE}/notifications/read-all`);
  },

  async getPlayerProfile(): Promise<PlayerProfileResult> {
    const { data } = await api.get(`${BASE}/player-profile`);
    return data;
  },
};

export type CategoryMetric = {
  category: string;
  games_played: number;
  average_accuracy: number;
  average_score: number;
  completion_rate: number;
  total_stars: number;
};

export type ModeMetric = {
  mode: string;
  games_played: number;
  average_accuracy: number;
  average_time: number;
  best_score: number;
};

export type DifficultyMetric = {
  difficulty: string;
  games_played: number;
  average_accuracy: number;
  average_time: number;
  success_rate: number;
  average_score: number;
};

export type HeatmapEntry = {
  date: string;
  count: number;
};

export type ActivityEntry = {
  date: string;
  games: number;
  accuracy: number;
};

export type InsightEntry = {
  type: string;
  message: string;
  direction: string;
};

export type PersonalBest = {
  label: string;
  value: string;
  icon: string;
};

export type AnalyticsResult = {
  total_games: number;
  total_stars: number;
  overall_accuracy: number;
  average_accuracy: number;
  highest_score: number;
  average_score: number;
  fastest_completion: number | null;
  average_response_time: number;
  current_streak: number;
  longest_streak: number;
  favorite_category: string | null;
  favorite_difficulty: string | null;
  favorite_mode: string | null;
  categories: CategoryMetric[];
  modes: ModeMetric[];
  difficulties: DifficultyMetric[];
  heatmap: HeatmapEntry[];
  daily_activity: ActivityEntry[];
  weekly_activity: ActivityEntry[];
  monthly_activity: ActivityEntry[];
  personal_bests: PersonalBest[];
  insights: InsightEntry[];
  recent_games: GameHistoryItem[];
};

// ── Gamification Types ──

export type LevelInfo = {
  level: number;
  current_xp: number;
  xp_for_next: number;
  progress: number;
  rank: string;
  rank_icon: string;
};

export type AchievementItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  progress_current: number;
  progress_target: number;
  unlocked: boolean;
  unlocked_at: string | null;
};

export type BadgeItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: string;
  unlocked: boolean;
  unlocked_at: string | null;
};

export type LeaderboardEntry = {
  rank: number;
  user_id: string;
  username: string;
  avatar: string | null;
  value: number;
  level: number;
  rank_title: string;
};

export type LeaderboardResult = {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
  my_rank: LeaderboardEntry | null;
  metric: string;
  scope: string;
};

export type PlayerRank = {
  rank: number;
  total: number;
  value: number;
  metric: string;
};

export type ChallengeBase = {
  id: string;
  title: string;
  description: string;
  type: string;
  target: number;
  progress: number;
  completed: boolean;
  xp_reward: number;
  expires_at: string;
};

export type DailyChallengeResult = {
  challenge: ChallengeBase | null;
  completed: boolean;
};

export type WeeklyChallengeResult = {
  challenge: ChallengeBase | null;
  completed: boolean;
};

export type ChallengeHistoryItem = {
  id: string;
  title: string;
  type: string;
  challenge_type: string;
  completed: boolean;
  xp_reward: number;
  completed_at: string;
};

export type ChallengeHistoryResult = {
  challenges: ChallengeHistoryItem[];
  total: number;
};

export type RewardItem = {
  id: string;
  xp: number;
  reason: string;
  icon: string;
  created_at: string;
};

export type RewardsResult = {
  total_xp: number;
  level: number;
  rank: string;
  recent_rewards: RewardItem[];
};

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type NotificationsResult = {
  notifications: NotificationItem[];
  unread_count: number;
};

export type PlayerProfileResult = {
  username: string;
  full_name: string;
  level: number;
  current_xp: number;
  xp_for_next: number;
  progress: number;
  rank: string;
  rank_icon: string;
  games_played: number;
  average_accuracy: number;
  current_streak: number;
  longest_streak: number;
  achievements_unlocked: number;
  total_achievements: number;
  badges_unlocked: number;
  total_badges: number;
  favorite_category: string | null;
  favorite_difficulty: string | null;
  favorite_mode: string | null;
};
