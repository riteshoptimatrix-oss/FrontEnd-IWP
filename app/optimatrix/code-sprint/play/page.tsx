"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Award } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/components/container";
import { useTypingEngine } from "@/hooks/use-typing-engine";
import { useTimer } from "@/hooks/use-timer";
import { getRandomSnippet, allLanguages } from "@/lib/codesprint/snippets";
import type { Snippet, DifficultyLevel, TimerDuration, PlayConfig } from "@/lib/codesprint/types";
import { useAuthStore } from "@/lib/auth-store";
import { codesprintApi, type FinishSessionResponse } from "@/lib/codesprint/api";
import { TypingEditor } from "@/components/codesprint/typing-editor";
import { TypingHeader } from "@/components/codesprint/typing-header";
import { TypingFooter } from "@/components/codesprint/typing-footer";
import { SnippetSelector } from "@/components/codesprint/snippet-selector";
import { AuthGate } from "@/components/codesprint/auth-gate";
import { FinishScreen } from "@/components/codesprint/finish-screen";

const DEFAULT_CONFIG: PlayConfig = {
  language: "javascript",
  category: "Functions",
  difficulty: "medium",
  duration: 180,
};

function PlayContent() {
  const { user } = useAuthStore();
  const [config, setConfig] = React.useState<PlayConfig>(DEFAULT_CONFIG);
  const [snippet, setSnippet] = React.useState<Snippet | null>(null);
  const [showFinish, setShowFinish] = React.useState(false);
  const [finishResult, setFinishResult] = React.useState<FinishSessionResponse | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const startTimeRef = React.useRef<number | null>(null);

  const snippetText = snippet?.content || "";
  const engine = useTypingEngine(snippetText);
  const timer = useTimer(config.duration);

  const completionTime = React.useMemo(() => {
    if (engine.isFinished && engine.startTime) {
      return (Date.now() - engine.startTime) / 1000;
    }
    if (engine.startTime) {
      return (Date.now() - engine.startTime) / 1000;
    }
    return 0;
  }, [engine.isFinished, engine.startTime, engine.typedChars]);

  const handleSnippetSelect = React.useCallback(
    (selected: Snippet, newConfig: PlayConfig) => {
      setSnippet(selected);
      setConfig(newConfig);
      engine.updateSnippet(selected.content);
      timer.reset();
      setShowFinish(false);
      setFinishResult(null);
      startTimeRef.current = null;
    },
    [engine, timer],
  );

  const handleRestart = React.useCallback(() => {
    engine.reset();
    timer.reset();
    setShowFinish(false);
    setFinishResult(null);
    startTimeRef.current = null;
  }, [engine, timer]);

  const handleLanguageChange = React.useCallback(
    (lang: string) => {
      const langDef = allLanguages.find((l) => l.id === lang);
      const cats = langDef?.categories || [];
      const newCat = cats[0]?.name || "";
      const newConfig = { ...config, language: lang, category: newCat };
      setConfig(newConfig);
      const s = getRandomSnippet(lang, newCat, config.difficulty);
      if (s) {
        setSnippet(s);
        engine.updateSnippet(s.content);
        timer.reset();
        setShowFinish(false);
        startTimeRef.current = null;
      }
    },
    [config, engine, timer],
  );

  const handleDifficultyChange = React.useCallback(
    (diff: DifficultyLevel) => {
      const newConfig = { ...config, difficulty: diff };
      setConfig(newConfig);
      const s = getRandomSnippet(config.language, config.category, diff);
      if (s) {
        setSnippet(s);
        engine.updateSnippet(s.content);
        timer.reset();
        setShowFinish(false);
        startTimeRef.current = null;
      }
    },
    [config, engine, timer],
  );

  const handleCategoryChange = React.useCallback(
    (cat: string) => {
      const newConfig = { ...config, category: cat };
      setConfig(newConfig);
      const s = getRandomSnippet(config.language, cat, config.difficulty);
      if (s) {
        setSnippet(s);
        engine.updateSnippet(s.content);
        timer.reset();
        setShowFinish(false);
        startTimeRef.current = null;
      }
    },
    [config, engine, timer],
  );

  const handleDurationChange = React.useCallback(
    (dur: TimerDuration) => {
      setConfig((prev) => ({ ...prev, duration: dur }));
      timer.reset();
      setShowFinish(false);
      startTimeRef.current = null;
    },
    [timer],
  );

  const handleFullscreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const saveSession = React.useCallback(
    async (finished: boolean) => {
      if (!snippet || !user) return;
      setIsSaving(true);
      try {
        const now = new Date();
        const timeSec = completionTime > 0 ? completionTime : (engine.startTime ? (now.getTime() - engine.startTime) / 1000 : 0);
        const cpm = timeSec > 0 ? (engine.correctChars / timeSec) * 60 : 0;
        const result = await codesprintApi.finishSession({
          language: config.language,
          difficulty: config.difficulty,
          category: config.category,
          snippet_id: snippet.id,
          snippet_title: snippet.title,
          duration_seconds: config.duration || undefined,
          start_time: startTimeRef.current ? new Date(startTimeRef.current).toISOString() : undefined,
          end_time: now.toISOString(),
          completion_time: timeSec,
          characters_typed: engine.typedChars,
          correct_characters: engine.correctChars,
          incorrect_characters: engine.incorrectChars,
          total_mistakes: engine.incorrectChars,
          backspaces: 0,
          accuracy: engine.accuracy,
          cpm: Math.round(cpm),
          wpm: engine.wpm,
          completion_pct: Math.round(engine.progress * 100),
          finished,
        });
        setFinishResult(result);
      } catch (err) {
        console.error("Failed to save session:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [snippet, user, config, engine, completionTime],
  );

  React.useEffect(() => {
    if (finishResult && !isSaving) {
      if (finishResult.xp_earned && finishResult.xp_earned > 0) {
        toast("Session saved", {
          description: `+${finishResult.xp_earned} XP earned`,
          icon: React.createElement(Trophy, { className: "size-4 text-gold" }),
        });
      }
      if (finishResult.level_up && finishResult.new_level) {
        setTimeout(() => {
          toast("Level Up!", {
            description: `You reached Level ${finishResult.new_level}`,
          });
        }, 500);
      }
      if (finishResult.achievements_unlocked && finishResult.achievements_unlocked.length > 0) {
        finishResult.achievements_unlocked.forEach((key: string, i: number) => {
          setTimeout(() => {
            toast("Achievement Unlocked!", {
              description: key.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
              icon: React.createElement(Award, { className: "size-4 text-gold" }),
            });
          }, 1000 + i * 500);
        });
      }
    }
  }, [finishResult, isSaving]);

  React.useEffect(() => {
    if (engine.isStarted && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [engine.isStarted]);

  React.useEffect(() => {
    if (engine.isStarted && !timer.isRunning && !timer.isTimeUp) {
      timer.start();
    }
  }, [engine.isStarted, timer]);

  React.useEffect(() => {
    if ((engine.isFinished || timer.isTimeUp) && !showFinish && snippet && user) {
      timer.stop();
      saveSession(engine.isFinished);
      setShowFinish(true);
    }
  }, [engine.isFinished, timer.isTimeUp, showFinish, snippet, user, saveSession, timer]);

  React.useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [handleRestart]);

  const handleChooseAnother = React.useCallback(() => {
    setSnippet(null);
    engine.reset();
    timer.reset();
    setShowFinish(false);
    setFinishResult(null);
    startTimeRef.current = null;
  }, [engine, timer]);

  if (showFinish && snippet) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-[#0a0a0f]">
          <Container className="py-8">
            <FinishScreen
              wpm={engine.wpm}
              accuracy={engine.accuracy}
              cpm={engine.typedChars > 0 && completionTime > 0 ? (engine.correctChars / completionTime) * 60 : 0}
              charactersTyped={engine.typedChars}
              correctCharacters={engine.correctChars}
              incorrectCharacters={engine.incorrectChars}
              completionTime={completionTime}
              completionPct={engine.progress * 100}
              finished={engine.isFinished}
              language={config.language}
              difficulty={config.difficulty}
              category={config.category}
              isNewBestWpm={finishResult?.is_new_best_wpm}
              isNewBestAccuracy={finishResult?.is_new_best_accuracy}
              onPracticeAgain={handleRestart}
              onChooseAnother={handleChooseAnother}
            />
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="dark">
      <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] bg-[radial-gradient(ellipse_at_top,_rgba(200,170,80,0.03)_0%,_transparent_60%)]">
        <Container className="py-6">
          {/* Top bar */}
          <div className="mb-5 flex items-center justify-between">
            <Link
              href="/optimatrix/code-sprint"
              className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to CodeSprint
            </Link>
            {snippet && (
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold border border-gold/20">
                  {allLanguages.find((l) => l.id === config.language)?.name}
                </span>
                <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-400 capitalize border border-zinc-700/50">
                  {config.difficulty}
                </span>
                <span className="text-xs text-zinc-600">{snippet.title}</span>
              </div>
            )}
          </div>

          {/* Header controls */}
          <TypingHeader
            language={config.language}
            difficulty={config.difficulty}
            category={config.category}
            duration={config.duration}
            timerDisplay={timer.formatted}
            isRunning={timer.isRunning}
            onLanguageChange={handleLanguageChange}
            onDifficultyChange={handleDifficultyChange}
            onCategoryChange={handleCategoryChange}
            onDurationChange={handleDurationChange}
            onRestart={handleRestart}
            onFullscreen={handleFullscreen}
          />

          {/* Main content */}
          <div className="mt-4">
            {!snippet ? (
              <SnippetSelector config={config} onSelect={handleSnippetSelect} />
            ) : (
              <>
                {isSaving && (
                  <div className="mb-2 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <span className="size-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                    Saving result...
                  </div>
                )}
                <TypingEditor
                  lines={engine.lines}
                  charStates={engine.charStates}
                  currentIndex={engine.currentIndex}
                  lineStartIndices={engine.lineStartIndices}
                  isStarted={engine.isStarted}
                  isFinished={engine.isFinished}
                  isPaused={false}
                  onKey={engine.handleKey}
                />

                {/* Footer stats */}
                <div className="mt-4">
                  <TypingFooter
                    wpm={engine.wpm}
                    accuracy={engine.accuracy}
                    correctChars={engine.correctChars}
                    incorrectChars={engine.incorrectChars}
                    totalChars={engine.totalChars}
                    currentIndex={engine.currentIndex}
                    progress={engine.progress}
                  />
                </div>

                {/* Keyboard shortcuts */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">Ctrl</kbd>
                    <span className="text-zinc-700">+</span>
                    <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">Enter</kbd>
                    <span className="ml-0.5">Restart</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">Tab</kbd>
                    <span>2 spaces</span>
                  </span>
                  <span className="text-zinc-700">Type to start</span>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default function CodeSprintPlayPage() {
  return (
    <AuthGate>
      <PlayContent />
    </AuthGate>
  );
}
