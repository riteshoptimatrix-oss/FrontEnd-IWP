"use client";

import { motion } from "framer-motion";
import type { Technology } from "@/lib/tech-logo-match-data";
import type { QuestionType } from "@/hooks/use-tech-logo-match-game";

export function LogoCard({
  technology,
  type,
  showName,
}: {
  technology: Technology;
  type: QuestionType;
  showName?: boolean;
}) {
  const showLogo = type === "logo-to-name" || type === "logo-to-category";

  return (
    <motion.div
      key={technology.id + type}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-4"
    >
      {showLogo && (
        <div
          className="flex size-28 items-center justify-center rounded-2xl border-2 border-border/40 bg-gradient-to-b from-background/80 to-background/40 p-6 shadow-lg backdrop-blur-sm sm:size-36"
          style={{ borderColor: `${technology.color}30` }}
        >
          <div
            className="size-full"
            style={{ color: technology.color }}
            dangerouslySetInnerHTML={{ __html: technology.svg }}
          />
        </div>
      )}
      {showName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/40 bg-gradient-to-b from-background/80 to-background/40 px-6 py-3 shadow-lg backdrop-blur-sm"
        >
          <span className="text-2xl font-bold">{technology.name}</span>
        </motion.div>
      )}
      <span className="text-xs uppercase tracking-widest text-muted-foreground/60">
        {showLogo ? "Logo" : "Technology"}
      </span>
    </motion.div>
  );
}
