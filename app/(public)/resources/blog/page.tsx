"use client";

import * as React from "react";
import { m } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Future of AI in Enterprise Web Applications",
    category: "Engineering",
    date: "Aug 15, 2026",
    excerpt: "How generative AI is reshaping the way we build, test, and deploy modern web architecture.",
  },
  {
    title: "Mastering Next.js App Router",
    category: "Frontend",
    date: "Aug 10, 2026",
    excerpt: "A deep dive into advanced caching strategies and server components in Next.js.",
  },
  {
    title: "Designing for Accessibility",
    category: "Design",
    date: "Aug 02, 2026",
    excerpt: "Why inclusive design is not just a feature, but a foundational requirement for software.",
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="size-6" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Engineering Blog</h1>
          </div>
          <p className="text-lg text-slate-500 max-w-2xl">
            Insights, tutorials, and thoughts from the India Web Programmers engineering team.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <m.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-blue-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>
              <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Read Article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </m.article>
          ))}
        </div>
      </div>
    </div>
  );
}
