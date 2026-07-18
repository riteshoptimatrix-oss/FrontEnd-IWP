"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { TimerDuration } from "@/lib/codesprint/types";

export function useTimer(duration: TimerDuration) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    startTimeRef.current = Date.now() - seconds * 1000;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
      setSeconds(elapsed);
      if (duration && elapsed >= duration) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
      }
    }, 100);
  }, [seconds, duration]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setSeconds(0);
    startTimeRef.current = null;
  }, [stop]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (!isRunning && seconds > 0) {
      startTimeRef.current = Date.now() - seconds * 1000;
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
        setSeconds(elapsed);
        if (duration && elapsed >= duration) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
        }
      }, 100);
    }
  }, [isRunning, seconds, duration]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const elapsed = duration ? Math.max(0, duration - seconds) : seconds;
  const formatted = formatTime(elapsed, !!duration);
  const progress = duration ? Math.min(1, seconds / duration) : 0;
  const isTimeUp = !!duration && seconds >= duration;

  return {
    seconds,
    isRunning,
    formatted,
    progress,
    isTimeUp,
    start,
    stop,
    reset,
    pause,
    resume,
  };
}

function formatTime(totalSeconds: number, countDown: boolean): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
