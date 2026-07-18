export type Language = {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  snippetPreview: string;
};

export type Difficulty = {
  id: "easy" | "medium" | "hard";
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

export type Duration = {
  id: string;
  label: string;
  seconds: number | null;
  description: string;
};

export type ComingSoonFeature = {
  icon: string;
  title: string;
  description: string;
};

export const codeSprintLanguages: Language[] = [
  {
    id: "html",
    name: "HTML",
    color: "#E34F26",
    bgColor: "bg-orange-500/10",
    description: "Semantic markup, accessibility, and modern HTML5 APIs.",
    snippetPreview: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>",
  },
  {
    id: "css",
    name: "CSS",
    color: "#1572B6",
    bgColor: "bg-blue-500/10",
    description: "Flexbox, Grid, animations, and responsive design patterns.",
    snippetPreview: "display: grid;\ngap: 1rem;\ngrid-template-columns:",
  },
  {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    bgColor: "bg-yellow-400/10",
    description: "ES2024+, async/await, closures, and modern patterns.",
    snippetPreview: "const fetchData = async (url) => {\n  const res =",
  },
  {
    id: "react",
    name: "React",
    color: "#61DAFB",
    bgColor: "bg-cyan-400/10",
    description: "Components, hooks, state management, and JSX patterns.",
    snippetPreview: "export function Counter() {\n  const [count,",
  },
  {
    id: "nextjs",
    name: "Next.js",
    color: "#000000",
    bgColor: "bg-gray-500/10",
    description: "App Router, server components, and full-stack patterns.",
    snippetPreview: "export default async function Page() {\n  const data",
  },
  {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    bgColor: "bg-blue-600/10",
    description: "Type safety, generics, utility types, and inference.",
    snippetPreview: "interface User {\n  id: string;\n  name: string;",
  },
  {
    id: "dart",
    name: "Dart",
    color: "#0175C2",
    bgColor: "bg-blue-500/10",
    description: "Flutter-ready syntax, null safety, and async streams.",
    snippetPreview: "class UserRepository {\n  final Database db;",
  },
  {
    id: "angular",
    name: "Angular",
    color: "#DD0031",
    bgColor: "bg-red-500/10",
    description: "Components, services, decorators, and RxJS patterns.",
    snippetPreview: "@Component({\n  selector: 'app-user',\n  template:",
  },
  {
    id: "vue",
    name: "Vue",
    color: "#4FC08D",
    bgColor: "bg-green-400/10",
    description: "Composition API, reactivity, and single-file components.",
    snippetPreview: "const count = ref(0)\nconst doubled = computed(",
  },
];

export const codeSprintDifficulties: Difficulty[] = [
  {
    id: "easy",
    label: "Easy",
    description: "Simple syntax, short snippets. Perfect for warm-ups.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Real-world code patterns with moderate complexity.",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "hard",
    label: "Hard",
    description: "Production-grade code with advanced patterns.",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
];

export const codeSprintDurations: Duration[] = [
  { id: "1min", label: "1 min", seconds: 60, description: "Quick sprint" },
  { id: "3min", label: "3 min", seconds: 180, description: "Standard practice" },
  { id: "5min", label: "5 min", seconds: 300, description: "Deep focus" },
  { id: "unlimited", label: "Unlimited", seconds: null, description: "No time limit" },
];

export const codeSprintComingSoon: ComingSoonFeature[] = [
  { icon: "🏆", title: "Leaderboard", description: "Compete with developers worldwide in real-time rankings." },
  { icon: "📅", title: "Daily Challenge", description: "New code snippet every day to keep your skills sharp." },
  { icon: "🏅", title: "Achievements", description: "Unlock badges and milestones as you improve." },
  { icon: "📜", title: "Certificates", description: "Earn verified certificates for your typing proficiency." },
  { icon: "🤖", title: "AI Feedback", description: "Intelligent analysis of your typing patterns and weaknesses." },
  { icon: "📊", title: "Progress Analytics", description: "Detailed charts showing your improvement over time." },
  { icon: "📈", title: "History", description: "Complete history of all your typing sessions and scores." },
  { icon: "🎯", title: "Custom Snippets", description: "Practice with your own code from real projects." },
];

export const codeSprintStats = [
  { value: "9+", label: "Languages" },
  { value: "500+", label: "Code Snippets" },
  { value: "3", label: "Difficulty Levels" },
  { value: "∞", label: "Practice Time" },
];

export const codeSprintBenefits = [
  {
    icon: "⚡",
    title: "Build Muscle Memory",
    description: "Repetition trains your fingers to type code patterns automatically, freeing your mind for problem-solving.",
  },
  {
    icon: "🧠",
    title: "Learn Syntax Faster",
    description: "Typing real code snippets helps you internalize syntax better than reading documentation alone.",
  },
  {
    icon: "🎯",
    title: "Improve Accuracy",
    description: "Reduce typos and syntax errors that slow down your development workflow.",
  },
  {
    icon: "🚀",
    title: "Boost Productivity",
    description: "Faster typing means faster prototyping, faster debugging, and faster shipping.",
  },
];

export const codeSprintHowItWorks = [
  { step: "1", title: "Choose Language", description: "Select from 9+ programming languages you want to practice." },
  { step: "2", title: "Pick Difficulty", description: "Easy, Medium, or Hard — match your current skill level." },
  { step: "3", title: "Set Duration", description: "Quick 1-minute sprint or deep 5-minute session." },
  { step: "4", title: "Start Typing", description: "Type the code snippet as fast and accurately as you can." },
];
