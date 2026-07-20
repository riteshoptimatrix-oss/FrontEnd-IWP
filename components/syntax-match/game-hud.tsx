import { Pause, RotateCcw, Volume2, VolumeX, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/hooks/use-syntax-match-game";

export interface GameHUDProps {
  language: string;
  difficulty: Difficulty;
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  correct: number;
  elapsed: number;
  audioEnabled: boolean;
  onPause: () => void;
  onRestart: () => void;
  onToggleAudio: () => void;
  onExit: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function calculateAccuracy(correct: number, moves: number): number {
  if (moves === 0) return 100;
  return Math.round((correct / moves) * 100);
}

function getStars(wrong: number, totalPairs: number): number {
  if (wrong === 0) return 3;
  if (wrong <= Math.ceil(totalPairs * 0.25)) return 2;
  return 1;
}

export function GameHUD({
  language,
  difficulty,
  matchedPairs,
  totalPairs,
  moves,
  correct,
  elapsed,
  audioEnabled,
  onPause,
  onRestart,
  onToggleAudio,
  onExit,
}: GameHUDProps) {
  const accuracy = calculateAccuracy(correct, moves);
  const stars = getStars(moves - correct, totalPairs);
  const progress = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;
  const remaining = totalPairs - matchedPairs;

  return (
    <div className="w-full rounded-2xl border border-border/60 bg-card/90 p-4 shadow-sm backdrop-blur-md sm:p-5">
      {/* ── Top row: meta + buttons ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gold/8 px-2.5 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              {language}
            </span>
            <span className="text-[11px] text-muted-foreground/60">·</span>
            <span className="text-xs font-medium text-muted-foreground">
              {difficulty.label}
            </span>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {remaining} pair{remaining !== 1 ? "s" : ""} left
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleAudio}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={audioEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {audioEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
          <button
            onClick={onRestart}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Restart game"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            onClick={onPause}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Pause game"
          >
            <Pause className="size-4" />
          </button>
          <button
            onClick={onExit}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Exit game"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Stats row ── */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
        <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center sm:px-3">
          <div className="text-lg font-bold tabular-nums tracking-tight text-foreground">
            {formatTime(elapsed)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            Time
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center sm:px-3">
          <div className="text-lg font-bold tabular-nums tracking-tight text-foreground">
            {moves}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            Moves
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center sm:px-3">
          <div className="text-lg font-bold tabular-nums tracking-tight text-foreground">
            {accuracy}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            Accuracy
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center sm:px-3">
          <div className="text-lg tabular-nums tracking-tight" aria-label={`${stars} out of 3 stars`}>
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={cn(
                  s <= stars ? "text-gold" : "text-muted-foreground/20",
                )}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            Stars
          </div>
        </div>
      </div>
    </div>
  );
}
