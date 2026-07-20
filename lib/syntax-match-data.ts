export type SyntaxMatchLanguage = {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  matchExample: string;
};

export type SyntaxMatchDifficulty = {
  id: "easy" | "medium" | "hard";
  label: string;
  description: string;
  cards: number;
  previewTime: number;
  color: string;
  bgColor: string;
  borderColor: string;
};

export type SyntaxMatchBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type SyntaxMatchComingSoon = {
  icon: string;
  title: string;
  description: string;
};

export type SyntaxMatchHowToPlay = {
  step: number;
  title: string;
  description: string;
};

export type SyntaxMatchPreviewPair = {
  language: string;
  term: string;
  match: string;
  color: string;
};

export type SyntaxMatchFAQ = {
  question: string;
  answer: string;
};

export const syntaxMatchLanguages: SyntaxMatchLanguage[] = [
  { id: "html", name: "HTML", color: "#e44d26", bgColor: "#fef2f0", icon: "🌐", description: "Tags, attributes, semantic elements, forms and document structure.", matchExample: "<div>" },
  { id: "css", name: "CSS", color: "#264de4", bgColor: "#f0f2fe", icon: "🎨", description: "Properties, selectors, flexbox, grid, animations and responsive patterns.", matchExample: "display: flex" },
  { id: "javascript", name: "JavaScript", color: "#f7df1e", bgColor: "#fefce8", icon: "⚡", description: "ES6+ syntax, arrow functions, promises, destructuring and modules.", matchExample: "const" },
  { id: "react", name: "React", color: "#61dafb", bgColor: "#f0f9ff", icon: "⚛️", description: "Hooks, components, props, state management and lifecycle patterns.", matchExample: "useState()" },
  { id: "nextjs", name: "Next.js", color: "#000000", bgColor: "#f5f5f5", icon: "▲", description: "App Router, server components, layouts, API routes and middleware.", matchExample: "layout.tsx" },
  { id: "typescript", name: "TypeScript", color: "#3178c6", bgColor: "#f0f4fe", icon: "📘", description: "Interfaces, types, generics, enums and advanced type utilities.", matchExample: "interface" },
  { id: "dart", name: "Dart", color: "#0175c2", bgColor: "#eef6fc", icon: "🎯", description: "Classes, widgets, null safety, streams and async patterns.", matchExample: "StatelessWidget" },
  { id: "angular", name: "Angular", color: "#dd0031", bgColor: "#fef0f2", icon: "🅰️", description: "Components, directives, services, pipes, modules and RxJS patterns.", matchExample: "@Component" },
  { id: "vue", name: "Vue", color: "#4fc08d", bgColor: "#f0faf4", icon: "💚", description: "Composition API, reactive data, directives, slots and transitions.", matchExample: "ref()" },
];

export const syntaxMatchDifficulties: SyntaxMatchDifficulty[] = [
  {
    id: "easy",
    label: "Easy",
    description: "Perfect for beginners. Match 4 pairs of common syntax with a relaxed preview.",
    cards: 8,
    previewTime: 5,
    color: "#22c55e",
    bgColor: "#f0fdf4",
    borderColor: "border-emerald-200",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Test your knowledge with 8 pairs. Shorter preview keeps you on your toes.",
    cards: 16,
    previewTime: 4,
    color: "#eab308",
    bgColor: "#fefce8",
    borderColor: "border-yellow-200",
  },
  {
    id: "hard",
    label: "Hard",
    description: "The ultimate challenge. 12 pairs with minimal preview time for experts only.",
    cards: 24,
    previewTime: 3,
    color: "#ef4444",
    bgColor: "#fef2f2",
    borderColor: "border-red-200",
  },
];

export const syntaxMatchBenefits: SyntaxMatchBenefit[] = [
  { icon: "🧠", title: "Improve Coding Memory", description: "Strengthen your recall of syntax patterns through active memory training." },
  { icon: "⚡", title: "Learn Faster", description: "Accelerate your learning curve by reinforcing concepts through matching." },
  { icon: "🔍", title: "Recognize Syntax Quickly", description: "Train your eyes to instantly identify code patterns and structures." },
  { icon: "📅", title: "Practice Daily", description: "Build a consistent learning habit with quick, daily matching sessions." },
  { icon: "💪", title: "Increase Coding Confidence", description: "Gain confidence as you master syntax without referencing documentation." },
  { icon: "🔄", title: "Improve Framework Recall", description: "Internalize framework-specific APIs, hooks, and component patterns." },
];

export const syntaxMatchHowToPlay: SyntaxMatchHowToPlay[] = [
  { step: 1, title: "Choose Language", description: "Pick from 9+ programming languages and frameworks to practice." },
  { step: 2, title: "Choose Difficulty", description: "Select Easy, Medium, or Hard based on your experience level." },
  { step: 3, title: "Memorize Cards", description: "Study the card positions during the preview phase." },
  { step: 4, title: "Cards Flip", description: "Cards turn face-down. Recall the positions from memory." },
  { step: 5, title: "Match Correct Pairs", description: "Flip cards to match syntax terms with their definitions." },
  { step: 6, title: "Complete Challenge", description: "Match all pairs to finish. Track your time and accuracy." },
];

export const syntaxMatchPreviewPairs: SyntaxMatchPreviewPair[] = [
  { language: "HTML", term: "Opening Tag", match: "<div>", color: "#e44d26" },
  { language: "CSS", term: "Flexbox", match: "display: flex", color: "#264de4" },
  { language: "React", term: "State Hook", match: "useState()", color: "#61dafb" },
  { language: "JavaScript", term: "Variable", match: "const", color: "#f7df1e" },
  { language: "TypeScript", term: "Shape", match: "interface", color: "#3178c6" },
  { language: "Next.js", term: "Route File", match: "layout.tsx", color: "#000000" },
  { language: "Angular", term: "Decorator", match: "@Component", color: "#dd0031" },
  { language: "Vue", term: "Reactive", match: "ref()", color: "#4fc08d" },
  { language: "Dart", term: "Widget", match: "StatelessWidget", color: "#0175c2" },
];

export const syntaxMatchComingSoon: SyntaxMatchComingSoon[] = [
  { icon: "🏆", title: "Leaderboard", description: "Compete with developers worldwide and climb the rankings." },
  { icon: "📅", title: "Daily Challenge", description: "A fresh matching challenge every day to keep your skills sharp." },
  { icon: "🏅", title: "Achievements", description: "Unlock badges and milestones as you master more languages." },
  { icon: "⭐", title: "XP & Coins", description: "Earn experience points and coins for every completed match." },
  { icon: "📊", title: "Statistics", description: "Deep insights into your performance, progress and weak areas." },
  { icon: "🤖", title: "AI Coach", description: "Personalized recommendations and adaptive difficulty powered by AI." },
  { icon: "📜", title: "Certificates", description: "Earn verifiable certificates for language mastery achievements." },
];

export const syntaxMatchFAQ: SyntaxMatchFAQ[] = [
  {
    question: "What is Syntax Match?",
    answer: "Syntax Match is an interactive memory card game designed to help developers memorize programming syntax, HTML tags, CSS properties, JavaScript keywords, React Hooks, and framework APIs through an engaging matching gameplay.",
  },
  {
    question: "How does the matching work?",
    answer: "Cards are laid face-up during a preview phase. After the preview, cards flip face-down. Your goal is to flip two cards at a time to find matching pairs — for example, matching a framework name with its corresponding syntax, or a code concept with its definition.",
  },
  {
    question: "Is Syntax Match free?",
    answer: "Yes, Syntax Match is completely free as part of the OptiMatrix learning platform. There are no hidden costs or subscription fees.",
  },
  {
    question: "What languages are supported?",
    answer: "We currently support HTML, CSS, JavaScript, React, Next.js, TypeScript, Dart, Angular, and Vue. More languages and frameworks are being added regularly.",
  },
  {
    question: "How are difficulty levels different?",
    answer: "Easy has 8 cards with 5 seconds of preview time. Medium has 16 cards with 4 seconds. Hard has 24 cards with just 3 seconds. Higher difficulties also include more complex syntax patterns.",
  },
  {
    question: "Will my progress be saved?",
    answer: "Progress tracking, leaderboards, and achievements are coming soon. For now, enjoy practicing and building your syntax recognition skills.",
  },
];
