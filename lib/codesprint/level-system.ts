const LEVEL_TABLE: Record<number, number> = {
  1: 0, 2: 250, 3: 600, 4: 1200, 5: 2000,
  6: 3500, 7: 5500, 8: 8000, 9: 12000, 10: 18000,
};

const LEVEL_TITLES: Record<number, string> = {
  1: "Beginner", 2: "Typist", 3: "Coder", 4: "Fast Fingers", 5: "Speed Demon",
  6: "Code Warrior", 7: "Keyboard Master", 8: "Elite Typist", 9: "Code Ninja", 10: "Legendary",
};

const TIER_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  bronze: { bg: "bg-amber-600/10", text: "text-amber-600", ring: "ring-amber-600/20" },
  silver: { bg: "bg-gray-400/10", text: "text-gray-500", ring: "ring-gray-400/20" },
  gold: { bg: "bg-gold/10", text: "text-gold", ring: "ring-gold/20" },
};

export function getLevelForXP(xp: number): number {
  let level = 1;
  for (const [lvl, required] of Object.entries(LEVEL_TABLE).sort(([a], [b]) => Number(a) - Number(b))) {
    if (xp >= required) level = Number(lvl);
    else break;
  }
  return level;
}

export function getXPForLevel(level: number): number {
  return LEVEL_TABLE[level] ?? 18000;
}

export function getTitleForLevel(level: number): string {
  return LEVEL_TITLES[level] ?? "Legendary";
}

export function getProgressToNext(xp: number) {
  const level = getLevelForXP(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  if (nextLevelXP <= currentLevelXP) return { progress: 1, xpInLevel: 0, xpNeeded: 0, nextLevel: level };
  const xpInLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  return {
    progress: Math.min(1, xpInLevel / xpNeeded),
    xpInLevel,
    xpNeeded,
    nextLevel: level + 1,
  };
}

export function getTierColors(tier: string) {
  return TIER_COLORS[tier] ?? TIER_COLORS.bronze;
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return String(xp);
}
