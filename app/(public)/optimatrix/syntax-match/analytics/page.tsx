"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Brain, Clock, Target, TrendingUp, Flame, Star,
  Trophy, Zap, BarChart3, Download, Search, Filter, ChevronLeft,
  ChevronRight, Calendar, BookOpen, Award, Sparkles, Activity,
  Layers, Hash, ThumbsUp, Eye, Gauge, List,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import {
  getAnalytics,
  exportAnalytics,
  getHistory,
  type AnalyticsResult,
  type LanguagePerformanceItem,
  type DifficultyPerformanceItem,
  type HeatmapItem,
  type InsightItem,
  type PersonalBestItem,
  type AchievementProgressItem,
  type ActivityItem,
  type GameHistoryItem,
  type GameHistoryResult,
} from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

// ── Constants ──

const LANGUAGES = ["html", "css", "javascript", "react", "next.js", "typescript", "dart", "angular", "vue"];
const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const DATE_PRESETS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "this-month" },
  { label: "Last Month", value: "last-month" },
  { label: "This Year", value: "this-year" },
] as const;
const SORT_OPTIONS = [
  { label: "Date", value: "created_at" },
  { label: "Accuracy", value: "accuracy" },
  { label: "Stars", value: "stars" },
  { label: "Moves", value: "moves" },
  { label: "Time", value: "completion_time_seconds" },
] as const;
const ITEMS_PER_PAGE = 10;

// ── Helpers ──

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getDayOfWeek(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
}

function cnIcon(icon: string): string {
  const map: Record<string, string> = {
    target: "text-emerald-500", clock: "text-gold", "trending-up": "text-blue-500",
    code: "text-purple-500", flame: "text-orange-500", award: "text-gold",
    star: "text-gold", trophy: "text-gold", zap: "text-yellow-500",
    brain: "text-violet-500",
  };
  return map[icon] || "text-gold";
}

// ── Animated Counter ──

function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 800;
    const step = Math.max(1, Math.floor(end / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, duration / Math.ceil(end / step));
    return () => clearInterval(timer);
  }, [value]);
  return <>{display.toFixed(decimals)}{suffix}</>;
}

// ── Icon resolver ──

function MetricIcon({ icon }: { icon: string }) {
  const cls = "size-4";
  switch (icon) {
    case "brain": return <Brain className={cls} />;
    case "clock": return <Clock className={cls} />;
    case "target": return <Target className={cls} />;
    case "trending-up": return <TrendingUp className={cls} />;
    case "flame": return <Flame className={cls} />;
    case "star": return <Star className={cls} />;
    case "trophy": return <Trophy className={cls} />;
    case "zap": return <Zap className={cls} />;
    case "bar-chart": return <BarChart3 className={cls} />;
    case "book": return <BookOpen className={cls} />;
    case "award": return <Award className={cls} />;
    case "activity": return <Activity className={cls} />;
    case "layers": return <Layers className={cls} />;
    case "hash": return <Hash className={cls} />;
    case "thumbs-up": return <ThumbsUp className={cls} />;
    case "eye": return <Eye className={cls} />;
    case "gauge": return <Gauge className={cls} />;
    default: return <Sparkles className={cls} />;
  }
}

// ── Loading Skeleton ──

function AnalyticsSkeleton() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="skeleton mb-8 h-10 w-72 rounded-lg" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="skeleton h-80 rounded-2xl" />
        <div className="skeleton h-80 rounded-2xl" />
      </div>
      <div className="mt-8 skeleton h-64 rounded-2xl" />
      <div className="mt-8 skeleton h-48 rounded-2xl" />
    </Container>
  );
}

// ── Auth Guard ──

function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">
            Sign in to access your Syntax Match analytics dashboard.
          </p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/syntax-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back to Syntax Match
          </Button>
        </Container>
      </Section>
    );
  }
  return <>{children}</>;
}

// ── Main Page ──

export default function SyntaxMatchAnalyticsPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [data, setData] = useState<AnalyticsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [datePreset, setDatePreset] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  // Filtered games for recent performance
  const [allGames, setAllGames] = useState<GameHistoryItem[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesTotal, setGamesTotal] = useState(0);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [analyticsRes, historyRes] = await Promise.all([
        getAnalytics(),
        getHistory({ page: 1, limit: 1000, sort_by: "created_at", sort_order: "desc" }),
      ]);
      setData(analyticsRes);
      setAllGames(historyRes.games);
      setGamesTotal(historyRes.total);
    } catch {
      setError("Failed to load analytics. Please try again.");
    } finally {
      setLoading(false);
      setGamesLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Filtered + Sorted + Paginated Games ──
  const filteredGames = useMemo(() => {
    let games = [...allGames];

    // Date filter
    if (datePreset !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let from: Date | null = null;
      switch (datePreset) {
        case "today": from = today; break;
        case "yesterday": from = new Date(today.getTime() - 86400000); break;
        case "7d": from = new Date(today.getTime() - 7 * 86400000); break;
        case "30d": from = new Date(today.getTime() - 30 * 86400000); break;
        case "this-month": from = new Date(today.getFullYear(), today.getMonth(), 1); break;
        case "last-month": from = new Date(today.getFullYear(), today.getMonth() - 1, 1); break;
        case "this-year": from = new Date(today.getFullYear(), 0, 1); break;
      }
      if (from) {
        const to = today.getTime() + 86400000;
        games = games.filter((g) => {
          const d = new Date(g.created_at).getTime();
          return d >= from!.getTime() && d < to;
        });
      }
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      games = games.filter(
        (g) =>
          g.language.toLowerCase().includes(q) ||
          g.difficulty.toLowerCase().includes(q) ||
          String(g.accuracy).includes(q) ||
          String(g.stars).includes(q),
      );
    }

    // Language filter
    if (langFilter !== "all") {
      games = games.filter((g) => g.language === langFilter);
    }

    // Difficulty filter
    if (diffFilter !== "all") {
      games = games.filter((g) => g.difficulty === diffFilter);
    }

    // Sort
    games.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "created_at": cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); break;
        case "accuracy": cmp = a.accuracy - b.accuracy; break;
        case "stars": cmp = a.stars - b.stars; break;
        case "moves": cmp = a.moves - b.moves; break;
        case "completion_time_seconds": cmp = a.completion_time_seconds - b.completion_time_seconds; break;
      }
      return sortOrder === "desc" ? -cmp : cmp;
    });

    return games;
  }, [allGames, datePreset, searchQuery, langFilter, diffFilter, sortBy, sortOrder]);

  const totalFiltered = filteredGames.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / ITEMS_PER_PAGE));
  const pagedGames = filteredGames.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [datePreset, searchQuery, langFilter, diffFilter, sortBy, sortOrder]);

  // ── Export handlers ──
  const handleExport = async (format: "csv" | "json") => {
    try {
      const blob = await exportAnalytics(format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `syntax-match-analytics.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silent
    }
  };

  // ── Render ──

  return (
    <AuthGuard>
      <Section>
        <Container className="py-10 sm:py-16">
          {loading ? (
            <AnalyticsSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-destructive">{error}</p>
              <Button onClick={fetchData} variant="outline">Retry</Button>
            </div>
          ) : data ? (
            <AnalyticsDashboard
              data={data}
              user={user!}
              router={router}
              datePreset={datePreset}
              setDatePreset={setDatePreset}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              langFilter={langFilter}
              setLangFilter={setLangFilter}
              diffFilter={diffFilter}
              setDiffFilter={setDiffFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              page={page}
              setPage={setPage}
              totalFiltered={totalFiltered}
              totalPages={totalPages}
              pagedGames={pagedGames}
              handleExport={handleExport}
            />
          ) : null}
        </Container>
      </Section>
    </AuthGuard>
  );
}

// ── Dashboard Body ──

function AnalyticsDashboard({
  data, user, router,
  datePreset, setDatePreset,
  searchQuery, setSearchQuery,
  langFilter, setLangFilter,
  diffFilter, setDiffFilter,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
  page, setPage,
  totalFiltered, totalPages, pagedGames, handleExport,
}: {
  data: AnalyticsResult; user: any; router: any;
  datePreset: string; setDatePreset: (v: string) => void;
  searchQuery: string; setSearchQuery: (v: string) => void;
  langFilter: string; setLangFilter: (v: string) => void;
  diffFilter: string; setDiffFilter: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
  sortOrder: string; setSortOrder: (v: string) => void;
  page: number; setPage: (v: number) => void;
  totalFiltered: number; totalPages: number;
  pagedGames: GameHistoryItem[];
  handleExport: (fmt: "csv" | "json") => void;
}) {
  const hasGames = data.total_games > 0;

  return (
    <>
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/15">
              <BarChart3 className="size-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.full_name || "Player"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleExport("csv")} variant="outline" size="sm">
            <Download className="size-4" /> CSV
          </Button>
          <Button onClick={() => handleExport("json")} variant="outline" size="sm">
            <Download className="size-4" /> JSON
          </Button>
          <Button href="/optimatrix/syntax-match/dashboard" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Dashboard
          </Button>
          <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm">
            <Zap className="size-4" /> Play
          </Button>
        </div>
      </div>

      {!hasGames ? (
        <EmptyAnalytics />
      ) : (
        <>
          <MetricCards data={data} />
          <DateFilters datePreset={datePreset} setDatePreset={setDatePreset} />
          <SearchAndFilters
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            langFilter={langFilter} setLangFilter={setLangFilter}
            diffFilter={diffFilter} setDiffFilter={setDiffFilter}
            sortBy={sortBy} setSortBy={setSortBy}
            sortOrder={sortOrder} setSortOrder={setSortOrder}
          />
          <RecentPerformance
            games={pagedGames}
            page={page} totalPages={totalPages} totalFiltered={totalFiltered}
            setPage={setPage}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <LanguagePerformance languages={data.languages} />
            <DifficultyAnalysis difficulties={data.difficulties} />
          </div>
          <HeatmapSection heatmap={data.heatmap} />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ActivitySection
              title="Daily Activity"
              data={data.daily_activity.slice(-14)}
              icon={<Calendar className="size-4" />}
            />
            <ActivitySection
              title="Weekly Activity"
              data={data.weekly_activity.slice(-12)}
              icon={<Activity className="size-4" />}
            />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <PersonalBests bests={data.personal_bests} />
            <LearningInsights insights={data.insights} />
          </div>
          <AchievementProgress items={data.achievement_progress} />
        </>
      )}
    </>
  );
}

// ── Empty State ──

function EmptyAnalytics() {
  return (
    <Card className="mt-8">
      <CardHeader className="items-center py-20 text-center">
        <BarChart3 className="size-16 text-muted-foreground/20" />
        <CardTitle className="mt-4 text-2xl">No Data Yet</CardTitle>
        <CardDescription className="max-w-md">
          Play your first Syntax Match game to unlock your analytics dashboard
          with performance insights, heatmaps, language analysis, and more.
        </CardDescription>
        <Button href="/optimatrix/syntax-match/play" variant="gold" size="lg" className="mt-6">
          <Zap className="size-4" /> Play Your First Game
        </Button>
      </CardHeader>
    </Card>
  );
}

// ── Premium Metric Cards ──

function MetricCards({ data }: { data: AnalyticsResult }) {
  const metrics = useMemo(() => [
    { label: "Total Games", value: data.total_games, icon: "brain", color: "from-violet-500/10 to-violet-500/5 text-violet-600" },
    { label: "Completed", value: data.games_completed, icon: "trophy", color: "from-gold/15 to-gold/5 text-gold" },
    { label: "Total Matches", value: data.total_matches, icon: "target", color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600" },
    { label: "Wrong Matches", value: data.total_wrong_matches, icon: "hash", color: "from-red-500/10 to-red-500/5 text-red-600" },
    { label: "Overall Accuracy", value: `${data.overall_accuracy}%`, icon: "thumbs-up", color: "from-blue-500/10 to-blue-500/5 text-blue-600" },
    { label: "Avg Accuracy", value: `${data.average_accuracy}%`, icon: "gauge", color: "from-cyan-500/10 to-cyan-500/5 text-cyan-600" },
    { label: "Fastest Game", value: data.fastest_game ? formatTime(data.fastest_game) : "—", icon: "zap", color: "from-yellow-500/10 to-yellow-500/5 text-yellow-600" },
    { label: "Avg Time", value: data.average_completion_time ? formatTime(Math.round(data.average_completion_time)) : "—", icon: "clock", color: "from-gold/15 to-gold/5 text-gold" },
    { label: "Avg Moves", value: Math.round(data.average_moves), icon: "activity", color: "from-purple-500/10 to-purple-500/5 text-purple-600" },
    { label: "Best Stars", value: `★ ${data.best_star_rating}`, icon: "star", color: "from-amber-500/10 to-amber-500/5 text-amber-600" },
    { label: "Current Streak", value: `${data.current_streak} days`, icon: "flame", color: "from-orange-500/10 to-orange-500/5 text-orange-600" },
    { label: "Longest Streak", value: `${data.longest_streak} days`, icon: "award", color: "from-gold/15 to-gold/5 text-gold" },
    { label: "Favorite Lang", value: data.favorite_language ? data.favorite_language.charAt(0).toUpperCase() + data.favorite_language.slice(1) : "—", icon: "book", color: "from-violet-500/10 to-violet-500/5 text-violet-600" },
    { label: "Favorite Diff", value: data.favorite_difficulty ? data.favorite_difficulty.charAt(0).toUpperCase() + data.favorite_difficulty.slice(1) : "—", icon: "layers", color: "from-gold/15 to-gold/5 text-gold" },
  ], [data]);

  return (
    <m.div
      className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {metrics.map((m, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className={cn("gap-1 p-4", m.color)}>
            <div className="flex items-center gap-1.5">
              <MetricIcon icon={m.icon} />
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">{m.label}</span>
            </div>
            <div className="mt-0.5 flex items-baseline gap-0.5">
              <span className="text-lg font-bold tabular-nums">
                {typeof m.value === "number" ? <AnimatedCounter value={m.value} /> : m.value}
              </span>
            </div>
          </CardHeader>
        </Card>
      ))}
    </m.div>
  );
}

// ── Date Filters ──

function DateFilters({ datePreset, setDatePreset }: { datePreset: string; setDatePreset: (v: string) => void }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <Calendar className="size-4 text-muted-foreground" />
      {DATE_PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => setDatePreset(p.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            datePreset === p.value
              ? "bg-gold text-white shadow-sm"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

// ── Search & Filters ──

function SearchAndFilters({
  searchQuery, setSearchQuery,
  langFilter, setLangFilter,
  diffFilter, setDiffFilter,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  langFilter: string; setLangFilter: (v: string) => void;
  diffFilter: string; setDiffFilter: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
  sortOrder: string; setSortOrder: (v: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
        <Search className="size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-32 border-none bg-transparent text-sm outline-none sm:w-44"
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
        <Filter className="size-4 text-muted-foreground" />
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="border-none bg-transparent text-sm outline-none"
          aria-label="Filter language"
        >
          <option value="all">All Languages</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l} className="capitalize">{l.charAt(0).toUpperCase() + l.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
        <Filter className="size-4 text-muted-foreground" />
        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className="border-none bg-transparent text-sm outline-none"
          aria-label="Filter difficulty"
        >
          <option value="all">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
        <span className="text-xs text-muted-foreground">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-none bg-transparent text-sm outline-none"
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label={`Sort ${sortOrder === "desc" ? "ascending" : "descending"}`}
        >
          {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>
    </div>
  );
}

// ── Recent Performance Table ──

function RecentPerformance({
  games, page, totalPages, totalFiltered, setPage,
}: {
  games: GameHistoryItem[];
  page: number; totalPages: number; totalFiltered: number;
  setPage: (v: number) => void;
}) {
  return (
    <m.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          Recent Performance
          <span className="ml-2 text-sm font-normal text-muted-foreground">({totalFiltered} games)</span>
        </h2>
      </div>

      {games.length === 0 ? (
        <Card>
          <CardHeader className="items-center py-12 text-center">
            <List className="size-10 text-muted-foreground/20" />
            <CardTitle className="mt-3">No matching games</CardTitle>
            <CardDescription>Try changing your filters or search query.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Language</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Difficulty</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Moves</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Accuracy</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Stars</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Time</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {games.map((g) => (
                  <tr key={g.id} className="border-b border-border/30 transition-colors hover:bg-secondary/20">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {formatShortDate(g.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium capitalize">{g.language}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium capitalize",
                        g.difficulty === "easy" && "bg-emerald-50 text-emerald-600",
                        g.difficulty === "medium" && "bg-amber-50 text-amber-600",
                        g.difficulty === "hard" && "bg-red-50 text-red-600",
                      )}>
                        {g.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{g.moves}</td>
                    <td className="px-4 py-3 tabular-nums font-medium">{g.accuracy}%</td>
                    <td className="px-4 py-3">{Array.from({ length: 3 }).map((_, s) => (
                      <span key={s} className={s < g.stars ? "text-gold" : "text-muted-foreground/20"}>★</span>
                    ))}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">
                      {formatTime(g.completion_time_seconds)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                        g.stars === 3 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600",
                      )}>
                        {g.stars === 3 ? "Completed" : "Partial"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </>
      )}
    </m.div>
  );
}

// ── Language Performance ──

function LanguagePerformance({ languages }: { languages: LanguagePerformanceItem[] }) {
  const allLangs = useMemo(() => {
    const map = new Map(languages.map((l) => [l.language, l]));
    return LANGUAGES.map((name) => map.get(name) || {
      language: name, games_played: 0, average_accuracy: 0, average_time: 0,
      best_time: null, best_moves: null, completion_rate: 0, total_stars: 0,
      favorite_difficulty: null,
    });
  }, [languages]);

  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Language Performance</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {allLangs.map((lang) => (
          <Card key={lang.language}>
            <CardHeader className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm capitalize">{lang.language}</CardTitle>
                {lang.games_played > 0 && (
                  <span className="text-xs text-muted-foreground">{lang.games_played} games</span>
                )}
              </div>
              {lang.games_played === 0 ? (
                <p className="text-xs text-muted-foreground/50">No games played yet</p>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium tabular-nums">{lang.average_accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Time</span>
                    <span className="font-medium tabular-nums">{formatTime(Math.round(lang.average_time))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Time</span>
                    <span className="font-medium tabular-nums">{lang.best_time ? formatTime(lang.best_time) : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Moves</span>
                    <span className="font-medium tabular-nums">{lang.best_moves ?? "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium">{lang.completion_rate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fav Diff</span>
                    <span className="font-medium capitalize">{lang.favorite_difficulty ?? "—"}</span>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </m.div>
  );
}

// ── Difficulty Analysis ──

function DifficultyAnalysis({ difficulties }: { difficulties: DifficultyPerformanceItem[] }) {
  const allDiffs = useMemo(() => {
    const map = new Map(difficulties.map((d) => [d.difficulty, d]));
    return DIFFICULTIES.map((name) => map.get(name) || {
      difficulty: name, games_played: 0, average_accuracy: 0, average_time: 0,
      success_rate: 0, average_moves: 0,
    });
  }, [difficulties]);

  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Difficulty Analysis</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {allDiffs.map((d) => (
          <Card key={d.difficulty}>
            <CardHeader className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  "text-sm capitalize",
                  d.difficulty === "easy" && "text-emerald-600",
                  d.difficulty === "medium" && "text-amber-600",
                  d.difficulty === "hard" && "text-red-600",
                )}>
                  {d.difficulty}
                </CardTitle>
                <span className="text-xs text-muted-foreground">{d.games_played} games</span>
              </div>
              {d.games_played === 0 ? (
                <p className="text-xs text-muted-foreground/50">No games at this difficulty</p>
              ) : (
                <div className="mt-3 space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Accuracy</span>
                      <span className="font-medium text-foreground tabular-nums">{d.average_accuracy}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-secondary/70">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          d.difficulty === "easy" && "bg-emerald-500",
                          d.difficulty === "medium" && "bg-amber-500",
                          d.difficulty === "hard" && "bg-red-500",
                        )}
                        style={{ width: `${Math.min(d.average_accuracy, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Success Rate</span>
                      <span className="font-medium text-foreground tabular-nums">{d.success_rate}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-secondary/70">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-500"
                        style={{ width: `${Math.min(d.success_rate, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avg Time</span>
                    <span className="font-medium text-foreground tabular-nums">{formatTime(Math.round(d.average_time))}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avg Moves</span>
                    <span className="font-medium text-foreground tabular-nums">{d.average_moves}</span>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </m.div>
  );
}

// ── GitHub-Style Heatmap ──

function HeatmapSection({ heatmap }: { heatmap: HeatmapItem[] }) {
  const [view, setView] = useState<"year" | "month">("year");

  const heatmapData = useMemo(() => {
    const map = new Map(heatmap.map((h) => [h.date, h.count]));
    const today = new Date();
    const data: { date: string; count: number; day: number; month: number }[] = [];

    const days = view === "year" ? 365 : 31;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      data.push({
        date: key,
        count: map.get(key) || 0,
        day: d.getDay(),
        month: d.getMonth(),
      });
    }
    return data;
  }, [heatmap, view]);

  const maxCount = Math.max(...heatmapData.map((d) => d.count), 1);

  const getColor = (count: number) => {
    if (count === 0) return "bg-secondary/30";
    const intensity = count / maxCount;
    if (intensity <= 0.25) return "bg-gold/20";
    if (intensity <= 0.5) return "bg-gold/40";
    if (intensity <= 0.75) return "bg-gold/60";
    return "bg-gold";
  };

  const totalActiveDays = heatmapData.filter((d) => d.count > 0).length;
  const totalGamesInPeriod = heatmapData.reduce((s, d) => s + d.count, 0);

  return (
    <m.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Activity Heatmap</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("month")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              view === "month" ? "bg-gold text-white" : "bg-secondary/50 text-muted-foreground hover:bg-secondary",
            )}
          >
            Month
          </button>
          <button
            onClick={() => setView("year")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              view === "year" ? "bg-gold text-white" : "bg-secondary/50 text-muted-foreground hover:bg-secondary",
            )}
          >
            Year
          </button>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{totalActiveDays} active days · {totalGamesInPeriod} games</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="size-3 rounded-sm bg-secondary/30" />
              <div className="size-3 rounded-sm bg-gold/20" />
              <div className="size-3 rounded-sm bg-gold/40" />
              <div className="size-3 rounded-sm bg-gold/60" />
              <div className="size-3 rounded-sm bg-gold" />
              <span>More</span>
            </div>
          </div>

          {view === "year" ? (
            <div className="flex gap-1 overflow-x-auto pb-2">
              {[0, 1, 2, 3, 4, 5, 6].map((dow) => (
                <div key={dow} className="flex flex-col gap-1">
                  {heatmapData.filter((d) => d.day === dow).map((d) => (
                    <div
                      key={d.date}
                      className={cn("size-3 rounded-sm transition-colors", getColor(d.count))}
                      title={`${d.date}: ${d.count} game${d.count !== 1 ? "s" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day} className="text-[10px] text-muted-foreground text-center">{day[0]}</span>
              ))}
              {Array.from({ length: heatmapData[0]?.day || 0 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {heatmapData.map((d) => (
                <div
                  key={d.date}
                  className={cn(
                    "group relative aspect-square rounded-sm transition-all hover:scale-125",
                    getColor(d.count),
                  )}
                  title={`${d.date}: ${d.count} game${d.count !== 1 ? "s" : ""}`}
                >
                  <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {d.date}: {d.count} game{d.count !== 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </m.div>
  );
}

// ── Activity Charts ──

function ActivitySection({ title, data, icon }: { title: string; data: ActivityItem[]; icon: React.ReactNode }) {
  const maxGames = Math.max(...data.map((d) => d.games), 1);

  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        {icon} {title}
      </h2>
      <Card>
        <CardContent className="p-5 sm:p-6">
          {data.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No activity data yet.</p>
          ) : (
            <div className="flex items-end gap-1.5 overflow-x-auto pb-2">
              {data.map((d) => {
                const height = maxGames > 0 ? (d.games / maxGames) * 100 : 0;
                return (
                  <div key={d.date} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-medium tabular-nums text-muted-foreground">{d.games}</span>
                    <div
                      className="w-4 rounded-t-md bg-gradient-to-t from-gold/40 to-gold transition-all duration-300 hover:from-gold/60 hover:to-gold"
                      style={{ height: `${Math.max(height, 4)}px` }}
                      title={`${d.date}: ${d.games} games, ${d.accuracy}% accuracy`}
                    />
                    <span className="text-[9px] text-muted-foreground/60">
                      {title === "Daily Activity"
                        ? new Date(d.date).getDate()
                        : title === "Weekly Activity"
                          ? `W${d.date.split("-W")[1] || d.date.slice(-2)}`
                          : d.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </m.div>
  );
}

// ── Personal Bests ──

function PersonalBests({ bests }: { bests: PersonalBestItem[] }) {
  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Personal Bests</h2>
      <div className="grid grid-cols-2 gap-3">
        {bests.length === 0 ? (
          <Card className="col-span-2">
            <CardHeader className="items-center py-10 text-center">
              <Trophy className="size-10 text-muted-foreground/20" />
              <CardTitle className="mt-2 text-sm">No records yet</CardTitle>
              <CardDescription>Play games to set personal bests.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          bests.map((b, i) => (
            <Card key={i}>
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className={cnIcon(b.icon)}>
                    <MetricIcon icon={b.icon} />
                  </span>
                  <CardTitle className="text-xs text-muted-foreground">{b.label}</CardTitle>
                </div>
                <div className="mt-1 text-lg font-bold">{b.value}</div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </m.div>
  );
}

// ── Learning Insights ──

function LearningInsights({ insights }: { insights: InsightItem[] }) {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "strength": return "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/30";
      case "improvement": return "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/30";
      case "achievement": return "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/30";
      case "milestone": return "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/30";
      case "streak": return "border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/30";
      case "performance": return "border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100/30";
      case "speed": return "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/30";
      default: return "border-border/60 bg-card";
    }
  };

  const getDirectionIcon = (dir: string) => {
    if (dir === "up") return "↑";
    if (dir === "down") return "↓";
    return "→";
  };

  const getDirectionColor = (dir: string) => {
    if (dir === "up") return "text-emerald-600";
    if (dir === "down") return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Learning Insights</h2>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <Card key={i} className={cn("border", getTypeStyle(insight.type))}>
            <CardHeader className="flex-row items-start gap-3 p-4 sm:p-5">
              <span className={cn("mt-0.5 text-sm font-bold", getDirectionColor(insight.direction))}>
                {getDirectionIcon(insight.direction)}
              </span>
              <div>
                <CardTitle className="text-sm font-medium capitalize">{insight.type}</CardTitle>
                <CardDescription className="mt-0.5 text-xs">{insight.message}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </m.div>
  );
}

// ── Achievement Progress ──

function AchievementProgress({ items }: { items: AchievementProgressItem[] }) {
  return (
    <m.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Achievement Progress</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((item) => (
          <Card key={item.label}>
            <CardHeader className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs text-muted-foreground">{item.label}</CardTitle>
                <span className="text-xs font-medium tabular-nums">
                  {Math.round(item.current)}/{Math.round(item.target)}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">{Math.min(Math.round(item.percent), 100)}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-700"
                    style={{ width: `${Math.min(item.percent, 100)}%` }}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </m.div>
  );
}
