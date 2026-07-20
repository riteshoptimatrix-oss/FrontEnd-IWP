"use client";

import { motion } from "framer-motion";
import { categories, type Category } from "@/lib/tech-logo-match-data";

export function CategorySelector({
  onSelect,
}: {
  onSelect: (category: Category) => void;
}) {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        >
          Step 1 of 3
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-3xl font-bold sm:text-4xl"
        >
          Choose a Category
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mt-2 text-muted-foreground"
        >
          Select which technologies to focus on
        </motion.p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(cat)}
            className={`group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b ${cat.color} p-5 text-left transition-all hover:border-gold/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <h3 className="mt-2 text-base font-semibold">{cat.label}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {cat.description}
            </p>
            <div className="absolute inset-x-0 bottom-0 h-0.5 translate-y-full bg-gradient-to-r from-gold/40 to-gold/80 transition-transform duration-300 group-hover:translate-y-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
