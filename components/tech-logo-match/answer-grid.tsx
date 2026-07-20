"use client";

import { motion } from "framer-motion";
import type { QuestionData } from "@/hooks/use-tech-logo-match-game";
import { technologies } from "@/lib/tech-logo-match-data";
import { AnswerButton } from "./answer-button";

export function AnswerGrid({
  question,
  selectedAnswer,
  showingResult,
  onSelect,
}: {
  question: QuestionData;
  selectedAnswer: number | null;
  showingResult: boolean;
  onSelect: (index: number) => void;
}) {
  const showLogoOptions = question.type === "name-to-logo";

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="grid w-full max-w-2xl gap-3 sm:grid-cols-2"
    >
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = option === question.correctAnswer;

        let state: "idle" | "selected-correct" | "selected-wrong" | "revealed" = "idle";
        if (showingResult) {
          if (isCorrect) state = "revealed";
          else if (isSelected) state = "selected-wrong";
          else state = "idle";
        } else if (isSelected) {
          state = isCorrect ? "selected-correct" : "selected-wrong";
        }

        const tech = showLogoOptions
          ? technologies.find((t) => t.id === option)
          : null;

        return (
          <AnswerButton
            key={`${question.id}-${index}`}
            index={index}
            label={option}
            state={state}
            disabled={showingResult}
            showLogo={showLogoOptions}
            tech={tech}
            onClick={() => onSelect(index)}
          />
        );
      })}
    </motion.div>
  );
}
