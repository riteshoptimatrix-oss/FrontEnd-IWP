"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTechLogoMatchGame } from "@/hooks/use-tech-logo-match-game";
import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type FinishGameResult } from "@/lib/tech-logo-match-api";

import { CategorySelector } from "./category-selector";
import { DifficultySelector } from "./difficulty-selector";
import { GameModeSelector } from "./game-mode-selector";
import { QuestionCard } from "./question-card";
import { LogoCard } from "./logo-card";
import { AnswerGrid } from "./answer-grid";
import { GameTimer } from "./game-timer";
import { ProgressBar } from "./progress-bar";
import { ScoreBoard } from "./score-board";
import { ResultModal } from "./result-modal";
import { PauseModal } from "./pause-modal";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function GameBoard() {
  const game = useTechLogoMatchGame();
  const user = useAuthStore((s) => s.user);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveResult, setSaveResult] = useState<FinishGameResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (game.phase === "completed" && game.result && user && !savedRef.current) {
      savedRef.current = true;
      setSaveStatus("saving");
      const totalTime = game.result.answers.reduce((sum, a) => sum + a.timeSpent, 0);
      techLogoMatchApi.finishGame({
        category: game.result.category.label,
        difficulty: game.result.difficulty.id,
        mode: game.result.mode.id,
        score: game.result.score,
        correct: game.result.correct,
        wrong: game.result.wrong,
        accuracy: game.result.accuracy,
        avg_time: game.result.avgTime,
        best_streak: game.result.bestStreak,
        stars: game.result.stars,
        total_questions: game.result.total,
        duration_seconds: Math.round(totalTime),
      }).then((res) => {
        setSaveResult(res);
        setSaveStatus("saved");
      }).catch((err) => {
        setSaveError(err?.response?.data?.detail || "Failed to save game");
        setSaveStatus("error");
      });
    }
    if (game.phase !== "completed") {
      savedRef.current = false;
      setSaveStatus("idle");
      setSaveResult(null);
      setSaveError(null);
    }
  }, [game.phase, game.result, user]);

  return (
    <div className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {game.phase === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 items-center justify-center"
          >
            <CategorySelector onSelect={game.selectCategory} />
          </motion.div>
        )}

        {game.phase === "difficulty" && (
          <motion.div
            key="difficulty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 items-center justify-center"
          >
            <DifficultySelector
              category={game.selectedCategory}
              onSelect={game.selectDifficulty}
              onBack={game.goBackToCategory}
            />
          </motion.div>
        )}

        {game.phase === "mode" && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 items-center justify-center"
          >
            <GameModeSelector
              difficulty={game.selectedDifficulty}
              onStart={game.startGame}
              category={game.selectedCategory}
              onBack={game.goBackToDifficulty}
            />
          </motion.div>
        )}

        {game.phase === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <ScoreBoard
                score={game.score}
                correct={game.correctCount}
                wrong={game.wrongCount}
                streak={game.streak}
                total={game.totalQuestions}
              />
              <GameTimer
                remaining={game.timeRemaining}
                total={game.currentQuestion?.timeLimit ?? 30}
              />
              <button
                onClick={game.pauseGame}
                className="flex size-10 items-center justify-center rounded-xl border border-border/40 bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Pause game"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </button>
            </div>

            <ProgressBar
              current={game.currentIndex + (game.showingResult ? 1 : 0)}
              total={game.totalQuestions}
            />

            <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-8">
              {game.currentQuestion && (
                <LogoCard
                  technology={game.currentQuestion.technology}
                  type={game.currentQuestion.type}
                  showName={game.currentQuestion.type === "name-to-logo"}
                />
              )}

              {game.currentQuestion && (
                <QuestionCard question={game.currentQuestion} />
              )}

              {game.currentQuestion && (
                <AnswerGrid
                  question={game.currentQuestion}
                  selectedAnswer={game.selectedAnswer}
                  showingResult={game.showingResult}
                  onSelect={game.selectAnswer}
                />
              )}
            </div>
          </motion.div>
        )}

        {game.phase === "paused" && (
          <PauseModal
            onResume={game.resumeGame}
            onRestart={game.restartGame}
            onQuit={game.quitGame}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {game.phase === "completed" && game.result && (
          <ResultModal
            result={game.result}
            saveStatus={saveStatus}
            saveResult={saveResult}
            saveError={saveError}
            onPlayAgain={() => game.startGame(game.selectedCategory, game.selectedDifficulty, game.selectedMode!)}
            onNewCategory={game.restartGame}
            onHome={() => { window.location.href = "/optimatrix/tech-logo-match"; }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
