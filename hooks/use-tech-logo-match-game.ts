"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  technologies, type Technology, type GameMode, type DifficultyLevel,
  type Category, difficultyLevels, categories,
} from "@/lib/tech-logo-match-data";

export type GamePhase = "category" | "difficulty" | "mode" | "playing" | "paused" | "completed";

export type QuestionType = "logo-to-name" | "name-to-logo" | "logo-to-category";

export type QuestionData = {
  id: number;
  technology: Technology;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
};

export type AnswerRecord = {
  questionIndex: number;
  selectedIndex: number;
  correct: boolean;
  timeSpent: number;
  points: number;
};

export type GameResult = {
  category: Category;
  difficulty: DifficultyLevel;
  mode: GameMode;
  score: number;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number;
  avgTime: number;
  bestStreak: number;
  stars: number;
  perfect: boolean;
  answers: AnswerRecord[];
};

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function calculateStars(accuracy: number): number {
  if (accuracy >= 90) return 3;
  if (accuracy >= 70) return 2;
  return 1;
}

function generateQuestions(
  categoryId: string,
  difficulty: DifficultyLevel,
  mode: GameMode,
): QuestionData[] {
  let pool = technologies;

  if (difficulty.id === "expert") {
    pool = shuffle([...technologies]);
  } else if (categoryId !== "all") {
    pool = technologies.filter((t) => t.categoryId === categoryId);
  }

  if (pool.length < 4) {
    const extra = technologies.filter((t) => !pool.includes(t));
    pool = [...pool, ...shuffle(extra)];
  }

  const shuffled = shuffle(pool);
  const count = Math.min(difficulty.questions, shuffled.length);
  const selected = shuffled.slice(0, count);

  return selected.map((tech, i) => {
    const type: QuestionType =
      mode.id === "mixed"
        ? (["logo-to-name", "name-to-logo", "logo-to-category"] as QuestionType[])[
            Math.floor(Math.random() * 3)
          ]
        : (mode.id as QuestionType);

    let options: string[];
    let correctAnswer: string;

    if (type === "logo-to-category") {
      const cats = [...new Set(technologies.map((t) => t.category))];
      correctAnswer = tech.category;
      const others = cats.filter((c) => c !== correctAnswer);
      options = shuffle([correctAnswer, ...shuffle(others).slice(0, 3)]);
    } else if (type === "name-to-logo") {
      correctAnswer = tech.id;
      const others = shuffled.filter((t) => t.id !== tech.id);
      options = shuffle([correctAnswer, ...shuffle(others).slice(0, 3).map((t) => t.id)]);
    } else {
      correctAnswer = tech.name;
      const others = technologies.filter((t) => t.id !== tech.id);
      options = shuffle([correctAnswer, ...shuffle(others).slice(0, 3).map((t) => t.name)]);
    }

    return { id: i, technology: tech, type, options, correctAnswer, timeLimit: difficulty.timePerQuestion };
  });
}

export function useTechLogoMatchGame() {
  const [phase, setPhase] = useState<GamePhase>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(difficultyLevels[0]);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = useMemo(
    () => (currentIndex < questions.length ? questions[currentIndex] : null),
    [currentIndex, questions],
  );

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + (showingResult ? 1 : 0)) / totalQuestions) * 100 : 0;

  const startGame = useCallback(
    (category: Category, difficulty: DifficultyLevel, mode: GameMode) => {
      const generated = generateQuestions(category.id, difficulty, mode);
      setSelectedCategory(category);
      setSelectedDifficulty(difficulty);
      setSelectedMode(mode);
      setQuestions(generated);
      setCurrentIndex(0);
      setScore(0);
      setCorrectCount(0);
      setWrongCount(0);
      setStreak(0);
      setBestStreak(0);
      setAnswers([]);
      setTimeRemaining(difficulty.timePerQuestion);
      setSelectedAnswer(null);
      setShowingResult(false);
      setQuestionStartTime(Date.now());
      setPhase("playing");
    },
    [],
  );

  const selectAnswer = useCallback(
    (index: number) => {
      if (showingResult || selectedAnswer !== null) return;
      if (!currentQuestion) return;

      setSelectedAnswer(index);
      const selected = currentQuestion.options[index];
      const correct = selected === currentQuestion.correctAnswer;
      const timeSpent = (Date.now() - questionStartTime) / 1000;

      const basePoints = correct ? 100 : 0;
      const difficultyMultiplier = selectedDifficulty.scoreMultiplier;
      const speedBonus = correct
        ? Math.round((timeRemaining / currentQuestion.timeLimit) * 50)
        : 0;
      const streakBonus = correct ? streak * 10 : 0;
      const points = basePoints * difficultyMultiplier + speedBonus + streakBonus;

      if (correct) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        setCorrectCount((c) => c + 1);
      } else {
        setStreak(0);
        setWrongCount((c) => c + 1);
      }

      setScore((s) => s + points);
      setAnswers((a) => [
        ...a,
        { questionIndex: currentIndex, selectedIndex: index, correct, timeSpent, points },
      ]);

      setShowingResult(true);

      questionTimerRef.current = setTimeout(() => {
        const nextIdx = currentIndex + 1;
        if (nextIdx >= totalQuestions) {
          setPhase("completed");
          setShowingResult(false);
        } else {
          setCurrentIndex(nextIdx);
          setTimeRemaining(selectedDifficulty.timePerQuestion);
          setSelectedAnswer(null);
          setShowingResult(false);
          setQuestionStartTime(Date.now());
        }
      }, 1500);
    },
    [
      showingResult, selectedAnswer, currentQuestion, questionStartTime,
      selectedDifficulty, streak, bestStreak, currentIndex, totalQuestions, timeRemaining,
    ],
  );

  const pauseGame = useCallback(() => {
    setPhase("paused");
  }, []);

  const resumeGame = useCallback(() => {
    setPhase("playing");
  }, []);

  const restartGame = useCallback(() => {
    setPhase("category");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setBestStreak(0);
    setAnswers([]);
    setTimeRemaining(30);
    setSelectedAnswer(null);
    setShowingResult(false);
    setSelectedMode(null);
  }, []);

  const quitGame = useCallback(() => {
    restartGame();
  }, [restartGame]);

  const selectCategory = useCallback((cat: Category) => {
    setSelectedCategory(cat);
    setPhase("difficulty");
  }, []);

  const selectDifficulty = useCallback((diff: DifficultyLevel) => {
    setSelectedDifficulty(diff);
    setPhase("mode");
  }, []);

  const goBackToCategory = useCallback(() => {
    setPhase("category");
  }, []);

  const goBackToDifficulty = useCallback(() => {
    setPhase("difficulty");
  }, []);

  const result: GameResult | null = useMemo(() => {
    if (phase !== "completed") return null;
    const correct = correctCount;
    const total = totalQuestions;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const avgTime =
      answers.length > 0
        ? Math.round(answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length * 10) / 10
        : 0;
    const perfect = wrongCount === 0 && total > 0;
    return {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      mode: selectedMode!,
      score,
      correct,
      wrong: wrongCount,
      total,
      accuracy,
      avgTime,
      bestStreak,
      stars: calculateStars(accuracy),
      perfect,
      answers: [...answers],
    };
  }, [phase, correctCount, wrongCount, totalQuestions, score, bestStreak, selectedCategory, selectedDifficulty, selectedMode, answers]);

  useEffect(() => {
    if (phase === "playing" && !showingResult) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (!showingResult && selectedAnswer === null) {
              selectAnswer(-1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, showingResult, selectedAnswer, selectAnswer]);

  useEffect(() => {
    return () => {
      if (questionTimerRef.current) clearTimeout(questionTimerRef.current);
    };
  }, []);

  return {
    phase,
    selectedCategory,
    selectedDifficulty,
    selectedMode,
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    correctCount,
    wrongCount,
    streak,
    bestStreak,
    timeRemaining,
    selectedAnswer,
    showingResult,
    progress,
    result,
    startGame,
    selectAnswer,
    pauseGame,
    resumeGame,
    restartGame,
    quitGame,
    selectCategory,
    selectDifficulty,
    goBackToCategory,
    goBackToDifficulty,
  };
}
