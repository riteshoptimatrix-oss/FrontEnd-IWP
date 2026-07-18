export type DifficultyLevel = "easy" | "medium" | "hard";

export type CharState = "pending" | "correct" | "incorrect";

export interface Snippet {
  id: string;
  title: string;
  content: string;
}

export interface SnippetCategory {
  name: string;
  snippets: {
    easy: Snippet[];
    medium: Snippet[];
    hard: Snippet[];
  };
}

export interface LanguageDefinition {
  id: string;
  name: string;
  color: string;
  icon: string;
  categories: SnippetCategory[];
}

export interface TypingState {
  charStates: CharState[];
  currentIndex: number;
  isStarted: boolean;
  isFinished: boolean;
  isPaused: boolean;
  startTime: number | null;
  totalChars: number;
  typedChars: number;
  correctChars: number;
  incorrectChars: number;
  currentLine: number;
  errors: number[];
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalTyped: number;
  elapsed: number;
  progress: number;
}

export type TimerDuration = 60 | 180 | 300 | null;

export interface TimerState {
  seconds: number;
  isRunning: boolean;
  duration: TimerDuration;
  formatted: string;
}

export interface PlayConfig {
  language: string;
  category: string;
  difficulty: DifficultyLevel;
  duration: TimerDuration;
}
