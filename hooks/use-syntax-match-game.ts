"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getPairsForLanguage, shuffle, type SyntaxPair } from "@/lib/syntax-match-questions";
import { useAudio } from "./use-audio";

export type Difficulty = {
  id: string;
  label: string;
  pairs: number;
  previewTime: number;
};

export const DIFFICULTIES: Difficulty[] = [
  { id: "easy", label: "Easy", pairs: 4, previewTime: 5 },
  { id: "medium", label: "Medium", pairs: 8, previewTime: 4 },
  { id: "hard", label: "Hard", pairs: 12, previewTime: 3 },
];

export type CardState = "hidden" | "preview" | "selected" | "matched" | "incorrect";

export type CardData = {
  id: string;
  pairId: string;
  content: string;
  type: "term" | "definition";
  state: CardState;
};

export type GamePhase = "language" | "difficulty" | "preview" | "playing" | "paused" | "completed";

export type GameResult = {
  totalPairs: number;
  moves: number;
  correct: number;
  wrong: number;
  accuracy: number;
  elapsed: number;
  stars: number;
  perfect: boolean;
  difficulty: string;
};

function calculateStars(wrong: number, totalPairs: number): number {
  if (wrong === 0) return 3;
  if (wrong <= Math.ceil(totalPairs * 0.25)) return 2;
  return 1;
}

export function useSyntaxMatchGame() {
  const [phase, setPhase] = useState<GamePhase>("language");
  const [language, setLanguageState] = useState<string | null>(null);
  const [difficulty, setDifficultyState] = useState<Difficulty | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [previewCountdown, setPreviewCountdown] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);

  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const countdownRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const { playFlip, playMatch, playWrong, playVictory } = useAudio();

  /* ── Timer helpers ── */
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 250);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  /* ── Select language ── */
  const selectLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    setPhase("difficulty");
  }, []);

  /* ── Select difficulty → generate cards → start preview ── */
  const selectDifficulty = useCallback(
    (diff: Difficulty) => {
      if (!language) return;
      setDifficultyState(diff);

      const allPairs = getPairsForLanguage(language);
      const selectedPairs = shuffle(allPairs).slice(0, diff.pairs);

      const generated: CardData[] = [];
      selectedPairs.forEach((pair, i) => {
        generated.push({
          id: `term-${i}`,
          pairId: `pair-${i}`,
          content: pair.term,
          type: "term",
          state: "preview",
        });
        generated.push({
          id: `def-${i}`,
          pairId: `pair-${i}`,
          content: pair.definition,
          type: "definition",
          state: "preview",
        });
      });

      setCards(shuffle(generated));
      setSelectedIds([]);
      setMatchedPairIds([]);
      setMoves(0);
      setCorrect(0);
      setWrong(0);
      setElapsed(0);
      setResult(null);
      setPhase("preview");
      setPreviewCountdown(diff.previewTime);

      countdownRef.current = setInterval(() => {
        setPreviewCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            setCards((prevCards) =>
              prevCards.map((c) => ({ ...c, state: "hidden" as const })),
            );
            setPhase("playing");
            startTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [language, startTimer],
  );

  /* ── Card click handler ── */
  const handleCardClick = useCallback(
    (cardId: string) => {
      if (phase !== "playing" || isChecking) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.state !== "hidden") return;
      if (selectedIds.includes(cardId)) return;

      const newSelected = [...selectedIds, cardId];

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, state: "selected" as const } : c)),
      );
      setSelectedIds(newSelected);
      playFlip();

      if (newSelected.length < 2) return;

      /* Two cards selected — check match */
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const firstCard = cards.find((c) => c.id === newSelected[0])!;

      const isMatch =
        firstCard.pairId === card.pairId && firstCard.type !== card.type;

      if (isMatch) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === firstCard.pairId ? { ...c, state: "matched" as const } : c,
            ),
          );
          setMatchedPairIds((prev) => [...prev, firstCard.pairId]);
          setCorrect((prev) => prev + 1);
          setSelectedIds([]);
          setIsChecking(false);
          playMatch();
        }, 500);
      } else {
        playWrong();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newSelected.includes(c.id) ? { ...c, state: "incorrect" as const } : c,
            ),
          );
        }, 300);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newSelected.includes(c.id) ? { ...c, state: "hidden" as const } : c,
            ),
          );
          setWrong((prev) => prev + 1);
          setSelectedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    },
    [phase, isChecking, cards, selectedIds, playFlip, playMatch, playWrong],
  );

  /* ── Detect game completion ── */
  useEffect(() => {
    if (phase !== "playing" || !difficulty) return;
    if (matchedPairIds.length !== difficulty.pairs) return;

    stopTimer();
    const totalPairs = difficulty.pairs;
    const totalMoves = moves || 1;
    const accuracy = Math.round((correct / totalMoves) * 100);
    const stars = calculateStars(wrong, totalPairs);

    setResult({
      totalPairs,
      moves,
      correct,
      wrong,
      accuracy,
      elapsed,
      stars,
      perfect: wrong === 0,
      difficulty: difficulty.id,
    });
    setPhase("completed");
    playVictory();
  }, [matchedPairIds.length, phase, difficulty, moves, correct, wrong, elapsed, stopTimer, playVictory]);

  /* ── Pause / Resume ── */
  const pause = useCallback(() => {
    if (phase !== "playing") return;
    stopTimer();
    setPhase("paused");
  }, [phase, stopTimer]);

  const resume = useCallback(() => {
    if (phase !== "paused") return;
    startTimer();
    setPhase("playing");
  }, [phase, startTimer]);

  /* ── Restart ── */
  const restart = useCallback(() => {
    stopTimer();
    clearInterval(countdownRef.current);
    if (language && difficulty) {
      selectDifficulty(difficulty);
    }
  }, [language, difficulty, selectDifficulty, stopTimer]);

  /* ── Back to language selection ── */
  const backToLanguages = useCallback(() => {
    stopTimer();
    clearInterval(countdownRef.current);
    setPhase("language");
    setLanguageState(null);
    setDifficultyState(null);
    setCards([]);
    setResult(null);
  }, [stopTimer]);

  /* ── Back to home ── */
  const backToHome = useCallback(() => {
    stopTimer();
    clearInterval(countdownRef.current);
  }, [stopTimer]);

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      stopTimer();
      clearInterval(countdownRef.current);
    };
  }, [stopTimer]);

  return {
    /* State */
    phase,
    language,
    difficulty,
    cards,
    selectedIds,
    matchedPairIds,
    moves,
    correct,
    wrong,
    elapsed,
    previewCountdown,
    isChecking,
    result,

    /* Actions */
    selectLanguage,
    selectDifficulty,
    handleCardClick,
    pause,
    resume,
    restart,
    backToLanguages,
    backToHome,
  };
}
