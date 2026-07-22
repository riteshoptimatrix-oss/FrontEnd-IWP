"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import type { CharState, TypingState } from "@/lib/codesprint/types";

const createInitialState = (text: string): TypingState => ({
  charStates: new Array(text.length).fill("pending" as CharState),
  currentIndex: 0,
  isStarted: false,
  isFinished: false,
  isPaused: false,
  startTime: null,
  totalChars: text.length,
  typedChars: 0,
  correctChars: 0,
  incorrectChars: 0,
  currentLine: 0,
  errors: [],
});

export function useTypingEngine(text: string) {
  const [state, setState] = useState<TypingState>(() => createInitialState(text));
  const textRef = useRef(text);
  const stateRef = useRef(state);
  stateRef.current = state;

  const lines = useMemo(() => {
    return text.split("\n");
  }, [text]);

  const lineStartIndices = useMemo(() => {
    const indices: number[] = [0];
    let pos = 0;
    for (const line of lines) {
      pos += line.length + 1;
      indices.push(pos);
    }
    return indices;
  }, [lines]);

  const getCurrentLine = useCallback((index: number): number => {
    for (let i = lineStartIndices.length - 1; i >= 0; i--) {
      if (index >= lineStartIndices[i]) return i;
    }
    return 0;
  }, [lineStartIndices]);

  const handleKey = useCallback((key: string): boolean => {
    const current = stateRef.current;
    if (current.isFinished || current.isPaused) return false;

    setState((prev) => {
      if (prev.isFinished || prev.isPaused) return prev;

      const expected = textRef.current[prev.currentIndex];

      let nextIndex = prev.currentIndex;
      const nextStates = [...prev.charStates];
      let correct = prev.correctChars;
      let incorrect = prev.incorrectChars;
      let errors = [...prev.errors];

      if (key === "Backspace") {
        if (prev.currentIndex > 0) {
          const prevState = nextStates[prev.currentIndex - 1];
          if (prevState === "correct") correct--;
          else if (prevState === "incorrect") {
            incorrect--;
            errors = errors.filter((e) => e !== prev.currentIndex - 1);
          }
          nextStates[prev.currentIndex - 1] = "pending";
          nextIndex = prev.currentIndex - 1;
        }
        return {
          ...prev,
          charStates: nextStates,
          currentIndex: nextIndex,
          typedChars: Math.max(0, prev.typedChars - 1),
          correctChars: correct,
          incorrectChars: incorrect,
          errors,
          currentLine: getCurrentLine(nextIndex),
        };
      }

      if (key === "Tab") {
        const spaces = "  ";
        let inserted = 0;
        for (const ch of spaces) {
          if (nextIndex >= textRef.current.length) break;
          if (textRef.current[nextIndex] === ch) {
            nextStates[nextIndex] = "correct";
            correct++;
          } else {
            nextStates[nextIndex] = "incorrect";
            incorrect++;
            errors.push(nextIndex);
          }
          nextIndex++;
          inserted++;
        }
        return {
          ...prev,
          charStates: nextStates,
          currentIndex: nextIndex,
          typedChars: prev.typedChars + inserted,
          correctChars: correct,
          incorrectChars: incorrect,
          errors,
          currentLine: getCurrentLine(nextIndex),
          isStarted: true,
          startTime: prev.startTime || Date.now(),
        };
      }

      if (key === "Enter") {
        const enterExpected = textRef.current[nextIndex] === "\n";
        if (enterExpected) {
          nextStates[nextIndex] = "correct";
          correct++;
          nextIndex++;
        } else {
          nextStates[nextIndex] = "incorrect";
          incorrect++;
          errors.push(nextIndex);
          nextIndex++;
        }
        return {
          ...prev,
          charStates: nextStates,
          currentIndex: nextIndex,
          typedChars: prev.typedChars + 1,
          correctChars: correct,
          incorrectChars: incorrect,
          errors,
          currentLine: getCurrentLine(nextIndex),
          isStarted: true,
          startTime: prev.startTime || Date.now(),
          isFinished: nextIndex >= textRef.current.length,
        };
      }

      if (key.length === 1) {
        const isCorrect = key === expected;
        nextStates[nextIndex] = isCorrect ? "correct" : "incorrect";
        if (isCorrect) {
          correct++;
        } else {
          incorrect++;
          errors.push(nextIndex);
        }
        nextIndex++;
        return {
          ...prev,
          charStates: nextStates,
          currentIndex: nextIndex,
          typedChars: prev.typedChars + 1,
          correctChars: correct,
          incorrectChars: incorrect,
          errors,
          currentLine: getCurrentLine(nextIndex),
          isStarted: true,
          startTime: prev.startTime || Date.now(),
          isFinished: nextIndex >= textRef.current.length,
        };
      }

      return prev;
    });
    return true;
  }, [getCurrentLine]);

  const handleValueChange = useCallback((newValue: string) => {
    const current = stateRef.current;
    if (current.isFinished || current.isPaused) return;

    setState((prev) => {
      if (prev.isFinished || prev.isPaused) return prev;
      
      const targetText = textRef.current;
      
      let correct = 0;
      let incorrect = 0;
      const nextStates = new Array(targetText.length).fill("pending" as CharState);
      const errors: number[] = [];
      
      // We process characters up to the length of what's currently in the editor
      for (let i = 0; i < newValue.length; i++) {
        if (i >= targetText.length) {
           // Typed beyond snippet
           incorrect++;
           errors.push(i);
           continue;
        }
        
        // Exact character matching
        if (newValue[i] === targetText[i]) {
          nextStates[i] = "correct";
          correct++;
        } else {
          nextStates[i] = "incorrect";
          incorrect++;
          errors.push(i);
        }
      }
      
      const typed = newValue.length;
      const nextIndex = Math.min(newValue.length, targetText.length - 1);
      
      // Determine if finished: must match length exactly (or more) and have all correct chars
      const isFinished = typed >= targetText.length && correct === targetText.length;
      
      return {
        ...prev,
        charStates: nextStates,
        currentIndex: nextIndex,
        typedChars: typed,
        correctChars: correct,
        incorrectChars: incorrect,
        errors,
        currentLine: getCurrentLine(nextIndex),
        isStarted: true,
        startTime: prev.startTime || Date.now(),
        isFinished,
      };
    });
  }, [getCurrentLine]);

  const reset = useCallback(() => {
    setState(createInitialState(textRef.current));
  }, []);

  const updateSnippet = useCallback((newText: string) => {
    textRef.current = newText;
    setState(createInitialState(newText));
  }, []);

  const wpm = useMemo(() => {
    if (!state.startTime || state.typedChars < 5) return 0;
    const elapsed = (Date.now() - state.startTime) / 1000 / 60;
    if (elapsed <= 0) return 0;
    const words = state.correctChars / 5;
    return Math.round(words / elapsed);
  }, [state.startTime, state.correctChars, state.typedChars]);

  const accuracy = useMemo(() => {
    if (state.typedChars === 0) return 100;
    return Math.round((state.correctChars / state.typedChars) * 100);
  }, [state.correctChars, state.typedChars]);

  const progress = useMemo(() => {
    return Math.min(1, state.currentIndex / state.totalChars);
  }, [state.currentIndex, state.totalChars]);

  return {
    ...state,
    lines,
    lineStartIndices,
    wpm,
    accuracy,
    progress,
    handleKey,
    handleValueChange,
    reset,
    updateSnippet,
  };
}
