import { api } from "@/lib/api-client";

export type FinishGamePayload = {
  language: string;
  difficulty: string;
  completion_time_seconds: number;
  moves: number;
  correct_matches: number;
  wrong_matches: number;
  accuracy: number;
  stars: number;
  total_pairs: number;
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
    id: string;
    title: string;
    description: string;
    icon: string;
    xp_reward: number;
    newly_unlocked: boolean;
  }>;
  new_badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    tier: string;
    newly_unlocked: boolean;
  }>;
};

export type GameHistoryItem = {
  id: string;
  language: string;
  difficulty: string;
  completion_time_seconds: number;
  moves: number;
  correct_matches: number;
  wrong_matches: number;
  accuracy: number;
  stars: number;
  total_pairs: number;
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
  total_matches: number;
  total_moves: number;
  total_correct: number;
  total_wrong: number;
  average_accuracy: number;
  average_moves: number;
  average_completion_time: number;
  best_accuracy: number;
  fastest_completion: number | null;
  best_moves: number | null;
  favorite_language: string | null;
  favorite_difficulty: string | null;
  current_streak: number;
  longest_streak: number;
  three_star_games: number;
};

export type DashboardResult = StatisticsResult & {
  total_stars: number;
  recent_games: GameHistoryItem[];
  weekly_activity: [];
  monthly_activity: [];
};

export type ProfileResult = {
  full_name: string;
  email: string;
  total_games: number;
  total_stars: number;
  average_accuracy: number;
  current_streak: number;
  best_accuracy: number;
  best_time: number | null;
  best_moves: number | null;
  favorite_language: string | null;
  favorite_difficulty: string | null;
};

export type SettingsResult = {
  card_flip_speed: string;
  animation_speed: string;
  sound_enabled: boolean;
  music_enabled: boolean;
  preview_duration: number | null;
  reduced_motion: boolean;
  last_language: string | null;
  last_difficulty: string | null;
};

export type SettingsPayload = {
  card_flip_speed?: string;
  animation_speed?: string;
  sound_enabled?: boolean;
  music_enabled?: boolean;
  preview_duration?: number;
  reduced_motion?: boolean;
  last_language?: string;
  last_difficulty?: string;
};

const BASE = "/v1/syntax-match";

export async function finishGame(
  payload: FinishGamePayload,
): Promise<FinishGameResult> {
  const { data } = await api.post(`${BASE}/games`, payload);
  return data;
}

export async function getHistory(params?: {
  page?: number;
  limit?: number;
  language?: string;
  difficulty?: string;
  sort_by?: string;
  sort_order?: string;
}): Promise<GameHistoryResult> {
  const { data } = await api.get(`${BASE}/history`, { params });
  return data;
}

export async function getStatistics(): Promise<StatisticsResult> {
  const { data } = await api.get(`${BASE}/statistics`);
  return data;
}

export async function getDashboard(): Promise<DashboardResult> {
  const { data } = await api.get(`${BASE}/dashboard`);
  return data;
}

export async function getProfile(): Promise<ProfileResult> {
  const { data } = await api.get(`${BASE}/profile`);
  return data;
}

export async function getSettings(): Promise<SettingsResult> {
  const { data } = await api.get(`${BASE}/settings`);
  return data;
}

export async function saveSettings(
  payload: SettingsPayload,
): Promise<SettingsResult> {
  const { data } = await api.put(`${BASE}/settings`, payload);
  return data;
}

// ══════════════════════════════════════════════
// Phase 21: Analytics Types
// ══════════════════════════════════════════════

export type LanguagePerformanceItem = {
  language: string;
  games_played: number;
  average_accuracy: number;
  average_time: number;
  best_time: number | null;
  best_moves: number | null;
  completion_rate: number;
  total_stars: number;
  favorite_difficulty: string | null;
};

export type DifficultyPerformanceItem = {
  difficulty: string;
  games_played: number;
  average_accuracy: number;
  average_time: number;
  success_rate: number;
  average_moves: number;
};

export type HeatmapItem = {
  date: string;
  count: number;
};

export type InsightItem = {
  type: string;
  message: string;
  direction: string;
  value?: string;
};

export type ActivityItem = {
  date: string;
  games: number;
  accuracy: number;
  completion_time: number;
};

export type PersonalBestItem = {
  label: string;
  value: string;
  icon: string;
};

export type AchievementProgressItem = {
  label: string;
  current: number;
  target: number;
  percent: number;
};

export type AnalyticsResult = {
  total_games: number;
  games_completed: number;
  total_matches: number;
  total_wrong_matches: number;
  overall_accuracy: number;
  average_accuracy: number;
  fastest_game: number | null;
  average_completion_time: number;
  average_moves: number;
  best_star_rating: number;
  current_streak: number;
  longest_streak: number;
  favorite_language: string | null;
  favorite_difficulty: string | null;
  languages: LanguagePerformanceItem[];
  difficulties: DifficultyPerformanceItem[];
  heatmap: HeatmapItem[];
  insights: InsightItem[];
  daily_activity: ActivityItem[];
  weekly_activity: ActivityItem[];
  monthly_activity: ActivityItem[];
  yearly_activity: ActivityItem[];
  personal_bests: PersonalBestItem[];
  achievement_progress: AchievementProgressItem[];
};

// ══════════════════════════════════════════════
// Analytics API Functions
// ══════════════════════════════════════════════

export async function getAnalytics(): Promise<AnalyticsResult> {
  const { data } = await api.get(`${BASE}/analytics`);
  return data;
}

export async function exportAnalytics(format: "csv" | "json" = "csv"): Promise<Blob> {
  const { data } = await api.get(`${BASE}/analytics/export`, {
    params: { format },
    responseType: "blob",
  });
  return data;
}

// ══════════════════════════════════════════════
// Phase 22: Gamification Types
// ══════════════════════════════════════════════

export type PlayerProfileResult = {
  full_name: string;
  email: string;
  total_games: number;
  total_stars: number;
  average_accuracy: number;
  current_streak: number;
  longest_streak: number;
  best_accuracy: number;
  best_time: number | null;
  best_moves: number | null;
  favorite_language: string | null;
  favorite_difficulty: string | null;
  level: number;
  current_xp: number;
  xp_for_next: number;
  rank_name: string;
  rank_icon: string;
  total_achievements: number;
  unlocked_achievements: number;
  total_badges: number;
  unlocked_badges: number;
  xp_progress_percent: number;
};

export type LevelInfo = {
  level: number;
  current_xp: number;
  xp_for_next: number;
  rank: string;
  progress_percent: number;
};

export type AchievementItem = {
  achievement_id: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  category: string;
  current: number;
  target: number;
  progress_percent: number;
  unlocked: boolean;
  unlocked_at: string | null;
};

export type BadgeItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: string;
  category: string;
  unlocked: boolean;
  unlocked_at: string | null;
};

export type LeaderboardEntry = {
  rank: number;
  user_id: string;
  username: string;
  level: number;
  rank_name: string;
  score: number;
  games_played: number;
  accuracy: number;
  streak: number;
};

export type LeaderboardResult = {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
  metric: string;
  scope: string;
};

export type PlayerRank = {
  rank: number;
  total_players: number;
  score: number;
};

export type ChallengeBase = {
  id: string;
  title: string;
  description: string;
  type: string;
  requirement_type: string;
  requirement_value: number | string;
  xp_reward: number;
  badge_reward: string | null;
  starts_at: string;
  expires_at: string;
  status: string;
};

export type DailyChallengeResult = {
  challenge: ChallengeBase | null;
  progress: number;
  completed: boolean;
};

export type WeeklyChallengeResult = {
  challenge: ChallengeBase | null;
  progress: number;
  completed: boolean;
};

export type ChallengeHistoryItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  xp_reward: number;
  progress: number;
  completed_at: string | null;
};

export type RewardItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  tier: string;
  xp_awarded: number;
  source: string;
  unlocked_at: string;
  claimed: boolean;
};

export type RewardsResult = {
  recent: RewardItem[];
  total_xp_earned: number;
  total_rewards: number;
};

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  icon: string;
  read: boolean;
  created_at: string;
};

export type NotificationsResult = {
  notifications: NotificationItem[];
  unread_count: number;
};

// ══════════════════════════════════════════════
// Gamification API Functions
// ══════════════════════════════════════════════

export async function getPlayerProfile(): Promise<PlayerProfileResult> {
  const { data } = await api.get(`${BASE}/profile`);
  return data;
}

export async function awardDailyLoginXp(): Promise<{ awarded: boolean; xp: number; message: string }> {
  const { data } = await api.post(`${BASE}/xp/daily-login`);
  return data;
}

export async function getPlayerLevel(): Promise<LevelInfo> {
  const { data } = await api.get(`${BASE}/xp/level`);
  return data;
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const { data } = await api.get(`${BASE}/achievements`);
  return data;
}

export async function getBadges(): Promise<BadgeItem[]> {
  const { data } = await api.get(`${BASE}/badges`);
  return data;
}

export async function getLeaderboard(params?: {
  metric?: string;
  scope?: string;
  page?: number;
  limit?: number;
}): Promise<LeaderboardResult> {
  const { data } = await api.get(`${BASE}/leaderboard`, { params });
  return data;
}

export async function getMyRank(): Promise<PlayerRank> {
  const { data } = await api.get(`${BASE}/leaderboard/my-rank`);
  return data;
}

export async function getDailyChallenge(): Promise<DailyChallengeResult> {
  const { data } = await api.get(`${BASE}/challenges/daily`);
  return data;
}

export async function getWeeklyChallenge(): Promise<WeeklyChallengeResult> {
  const { data } = await api.get(`${BASE}/challenges/weekly`);
  return data;
}

export async function getChallengeHistory(): Promise<ChallengeHistoryItem[]> {
  const { data } = await api.get(`${BASE}/challenges/history`);
  return data;
}

export async function getRewards(): Promise<RewardsResult> {
  const { data } = await api.get(`${BASE}/rewards`);
  return data;
}

export async function getNotifications(): Promise<NotificationsResult> {
  const { data } = await api.get(`${BASE}/notifications`);
  return data;
}

export async function markNotificationRead(id: string): Promise<{ success: boolean }> {
  const { data } = await api.post(`${BASE}/notifications/${id}/read`);
  return data;
}

export async function markAllNotificationsRead(): Promise<{ success: boolean; count: number }> {
  const { data } = await api.post(`${BASE}/notifications/read-all`);
  return data;
}
