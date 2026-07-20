"use client";

import { motion } from "framer-motion";
import type { QuestionData } from "@/hooks/use-tech-logo-match-game";

const TYPE_LABELS: Record<string, string> = {
  "logo-to-name": "What technology does this logo represent?",
  "name-to-logo": "Which logo matches this technology?",
  "logo-to-category": "What category does this technology belong to?",
};

export function QuestionCard({ question }: { question: QuestionData }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <p className="text-sm font-medium uppercase tracking-wider text-gold">
        Question {question.id + 1}
      </p>
      <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
        {TYPE_LABELS[question.type] || "Identify the technology"}
      </h2>
    </motion.div>
  );
}
