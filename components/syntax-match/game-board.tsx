"use client";

import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";

import { useSyntaxMatchGame } from "@/hooks/use-syntax-match-game";
import { useAudio } from "@/hooks/use-audio";
import { syntaxQuestions } from "@/lib/syntax-match-questions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { LanguageSelector } from "./language-selector";
import { DifficultySelector } from "./difficulty-selector";
import { MemoryCard } from "./memory-card";
import { GameHUD } from "./game-hud";
import { PreviewOverlay } from "./preview-overlay";
import { PauseModal } from "./pause-modal";
import { VictoryModal } from "./victory-modal";

export function GameBoard() {
  const router = useRouter();
  const audio = useAudio();

  const game = useSyntaxMatchGame();
  const { phase, language, difficulty, cards, matchedPairIds, previewCountdown, result } = game;

  const languageName =
    syntaxQuestions.find((l) => l.id === language)?.name ?? language ?? "";

  /* ── Exit handlers ── */
  const handleExit = () => {
    if (phase === "paused") {
      game.backToHome();
    }
    router.push("/optimatrix/syntax-match");
  };

  const handleBackToOptiMatrix = () => {
    router.push("/optimatrix");
  };

  /* ── Render phase ── */
  if (phase === "language") {
    return (
      <LanguageSelector
        onSelect={game.selectLanguage}
        onBack={handleBackToOptiMatrix}
      />
    );
  }

  if (phase === "difficulty") {
    return (
      <DifficultySelector
        language={languageName}
        onSelect={game.selectDifficulty}
        onBack={game.backToLanguages}
      />
    );
  }

  /* ── Playing / Preview / Paused / Completed ── */
  const totalPairs = difficulty?.pairs ?? 0;
  const isPlaying = phase === "playing" || phase === "preview" || phase === "paused";

  // Grid columns based on card count
  const cardCount = cards.length;
  const gridCols =
    cardCount <= 8
      ? "grid-cols-2 sm:grid-cols-4"
      : cardCount <= 16
        ? "grid-cols-3 sm:grid-cols-4"
        : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-4 py-6 sm:py-10">
      {/* ── Back button (always visible during game) ── */}
      <div className="flex w-full items-start">
        <Button
          onClick={handleExit}
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Exit
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isPlaying && (
          <m.div
            key="game-area"
            className="flex w-full flex-col items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ── HUD ── */}
            {difficulty && (
              <GameHUD
                language={languageName}
                difficulty={difficulty}
                matchedPairs={matchedPairIds.length}
                totalPairs={totalPairs}
                moves={game.moves}
                correct={game.correct}
                elapsed={game.elapsed}
                audioEnabled={audio.enabled}
                onPause={game.pause}
                onRestart={game.restart}
                onToggleAudio={audio.toggle}
                onExit={handleExit}
              />
            )}

            {/* ── Card grid ── */}
            <div className="relative w-full">
              <div
                className={cn(
                  "mx-auto grid w-full max-w-4xl gap-2.5 sm:gap-3",
                  gridCols,
                )}
              >
                {cards.map((card, i) => (
                  <MemoryCard
                    key={card.id}
                    card={card}
                    onClick={game.handleCardClick}
                    disabled={game.isChecking || phase === "preview"}
                    index={i}
                  />
                ))}
              </div>

              {/* ── Preview overlay ── */}
              <PreviewOverlay
                visible={phase === "preview"}
                countdown={previewCountdown}
              />

              {/* ── Pause modal ── */}
              <PauseModal
                visible={phase === "paused"}
                onResume={game.resume}
                onRestart={game.restart}
                onExit={handleExit}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Victory modal (rendered at body level via portal-like fixed position) ── */}
      {result && (
        <VictoryModal
          visible={phase === "completed"}
          result={result}
          language={languageName}
          onPlayAgain={game.restart}
          onBackToHome={() => router.push("/optimatrix/syntax-match")}
        />
      )}

      {/* ── Empty state (fallback for unexpected states) ── */}
      {!["language", "difficulty", "playing", "preview", "paused", "completed"].includes(
        phase,
      ) && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Zap className="size-12 text-gold/40" />
          <h3 className="text-xl font-semibold">Select a Language to Start</h3>
          <Button onClick={game.backToLanguages} variant="gold">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
}
