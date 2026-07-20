export type Technology = {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  category: string;
  categoryId: string;
  difficulty: 1 | 2 | 3;
  svg: string;
};

export type Category = {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
};

export type GameMode = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type DifficultyLevel = {
  id: "easy" | "medium" | "hard" | "expert";
  label: string;
  description: string;
  questions: number;
  timePerQuestion: number;
  scoreMultiplier: number;
  color: string;
  bgColor: string;
};

export type HowToPlayStep = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type ComingSoon = {
  icon: string;
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type PreviewExample = {
  logoId: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  { id: "all", label: "All Technologies", description: "Test yourself across all 23 frontend technologies", icon: "🎯", color: "from-gold/15 to-gold/5" },
  { id: "framework", label: "Frameworks", description: "React, Vue, Angular, Next.js, Nuxt, Svelte, Astro, Remix, Express.js", icon: "⚛️", color: "from-cyan-500/10 to-cyan-600/5" },
  { id: "language", label: "Languages", description: "JavaScript, TypeScript, HTML", icon: "🔤", color: "from-yellow-500/10 to-yellow-600/5" },
  { id: "styling", label: "Styling", description: "CSS, Tailwind, Bootstrap", icon: "🎨", color: "from-blue-500/10 to-blue-600/5" },
  { id: "tool", label: "Build & Dev Tools", description: "Vite, Git, GitHub, Docker, Figma", icon: "🛠️", color: "from-gray-500/10 to-gray-600/5" },
  { id: "platform", label: "Platforms & Services", description: "Node.js, MongoDB, Firebase", icon: "☁️", color: "from-orange-500/10 to-orange-600/5" },
];

export const technologies: Technology[] = [
  {
    id: "html", name: "HTML5", color: "#E44D26", bgColor: "from-orange-500/10 to-orange-600/5",
    description: "Standard markup language for creating web pages and web applications.",
    category: "Markup", categoryId: "language", difficulty: 1,
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E44D26" stroke-width="1.5"><path d="M4 2l2 18 6 2 6-2 2-18H4z"/><path d="M9 7h6l-.6 6H9.6l.4 4h4l.4-2" stroke="#E44D26" fill="none"/></svg>`,
  },
  {
    id: "css", name: "CSS3", color: "#1572B6", bgColor: "from-blue-500/10 to-blue-600/5",
    description: "Style sheet language used for describing the presentation of documents.",
    category: "Styling", categoryId: "styling", difficulty: 1,
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#1572B6" stroke-width="1.5"><path d="M4 2l2 18 6 2 6-2 2-18H4z"/><path d="M9 13h6l-.5 5-2.5 1-2.5-1-.2-2" stroke="#1572B6" fill="none"/><path d="M8 7h8l-.3 2H8.3l.2 2h6" stroke="#1572B6" fill="none"/></svg>`,
  },
  {
    id: "javascript", name: "JavaScript", color: "#F7DF1E", bgColor: "from-yellow-400/10 to-yellow-500/5",
    description: "High-level scripting language that powers interactive web experiences.",
    category: "Language", categoryId: "language", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#F7DF1E" stroke-width="1.5" fill="none"/><path d="M10 13v4c0 1-.5 1.5-1.5 1.5S7 18 7 17M14 13v4c0 1 .5 1.5 1.5 1.5s1.5-.5 1.5-1.5" stroke="#F7DF1E" stroke-width="1.5" fill="none"/><path d="M14 10v2M10 10v2" stroke="#F7DF1E" stroke-width="1.5"/></svg>`,
  },
  {
    id: "typescript", name: "TypeScript", color: "#3178C6", bgColor: "from-blue-600/10 to-blue-700/5",
    description: "Typed superset of JavaScript that compiles to plain JavaScript.",
    category: "Language", categoryId: "language", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#3178C6" stroke-width="1.5" fill="none"/><path d="M7 12h4M9 12v6" stroke="#3178C6" stroke-width="1.5"/><path d="M14 15v1.5c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5h-1c-.8 0-1.5-.7-1.5-1.5V12c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5" stroke="#3178C6" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "react", name: "React", color: "#61DAFB", bgColor: "from-cyan-400/10 to-cyan-500/5",
    description: "JavaScript library for building dynamic user interfaces and single-page applications.",
    category: "Framework", categoryId: "framework", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" stroke="#61DAFB" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" stroke-width="1" fill="none" transform="rotate(0 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" stroke-width="1" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" stroke-width="1" fill="none" transform="rotate(-60 12 12)"/></svg>`,
  },
  {
    id: "nextjs", name: "Next.js", color: "#000000", bgColor: "from-neutral-800/10 to-neutral-900/5",
    description: "React framework for production-grade applications with SSR and SSG.",
    category: "Framework", categoryId: "framework", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 16V8l8 8V8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "vue", name: "Vue.js", color: "#4FC08D", bgColor: "from-emerald-500/10 to-emerald-600/5",
    description: "Progressive JavaScript framework for building user interfaces.",
    category: "Framework", categoryId: "framework", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L2 20h6l4-8 4 8h6L12 3z" stroke="#4FC08D" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "angular", name: "Angular", color: "#DD0031", bgColor: "from-red-600/10 to-red-700/5",
    description: "TypeScript-based web application framework for building scalable single-page apps.",
    category: "Framework", categoryId: "framework", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DD0031" stroke-width="1.5" fill="none"/><path d="M12 7l-4 8h3l1-2 1 2h3l-4-8z" stroke="#DD0031" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "tailwind", name: "Tailwind CSS", color: "#06B6D4", bgColor: "from-cyan-500/10 to-cyan-600/5",
    description: "Utility-first CSS framework for rapid custom UI development.",
    category: "Styling", categoryId: "styling", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5c-3 0-4.5 1.5-4.5 4.5 1.5-1.5 3-2 4.5-1.5.98.35 1.68 1.04 2.45 1.82 1.26 1.27 2.7 2.68 6.05 2.68 3 0 4.5-1.5 4.5-4.5-1.5 1.5-3 2-4.5 1.5-.98-.35-1.68-1.04-2.45-1.82C16.29 5.9 14.85 5 12 5z" stroke="#06B6D4" stroke-width="1.2" fill="none"/><path d="M3 13c3 0 4.5 1.5 4.5 4.5-1.5-1.5-3-2-4.5-1.5-.98.35-1.68 1.04-2.45 1.82C1.29 19.1 2.85 20 5 20c3 0 4.5-1.5 4.5-4.5C8 17 6.5 17.5 5 17c-.98-.35-1.68-1.04-2.45-1.82C1.29 13.9 2.85 13 5 13z" stroke="#06B6D4" stroke-width="1.2" fill="none"/></svg>`,
  },
  {
    id: "bootstrap", name: "Bootstrap", color: "#7952B3", bgColor: "from-purple-600/10 to-purple-700/5",
    description: "Popular CSS framework for building responsive, mobile-first websites.",
    category: "Styling", categoryId: "styling", difficulty: 1,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="3" stroke="#7952B3" stroke-width="1.5" fill="none"/><path d="M9 12h5.5M9 8h4M9 16h6" stroke="#7952B3" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "vite", name: "Vite", color: "#646CFF", bgColor: "from-indigo-500/10 to-indigo-600/5",
    description: "Next-generation frontend build tool that significantly improves development experience.",
    category: "Build Tool", categoryId: "tool", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 20h4l4-8 4 8h4L12 3z" stroke="#646CFF" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "astro", name: "Astro", color: "#FF5D01", bgColor: "from-orange-500/10 to-orange-600/5",
    description: "All-in-one web framework for building content-focused websites with minimal JS.",
    category: "Framework", categoryId: "framework", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19l4 1 2-3h8l2 3 4-1L12 2z" stroke="#FF5D01" stroke-width="1.5" fill="none"/><path d="M10 14l2-5 2 5" stroke="#FF5D01" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "svelte", name: "Svelte", color: "#FF3E00", bgColor: "from-red-500/10 to-orange-500/5",
    description: "Radical UI framework that shifts work from runtime to compile time.",
    category: "Framework", categoryId: "framework", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M15 3C9 3 6 7 6 11c0 4 2 6 6 6s5-2 5-4" stroke="#FF3E00" stroke-width="1.5" fill="none"/><path d="M9 21c6 0 9-4 9-8s-2-6-6-6-5 2-5 4" stroke="#FF3E00" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "nuxt", name: "Nuxt", color: "#00DC82", bgColor: "from-emerald-400/10 to-emerald-500/5",
    description: "Intuitive Vue framework for building performant and scalable web applications.",
    category: "Framework", categoryId: "framework", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4L3 20h6l3-6 3 6h6L12 4z" stroke="#00DC82" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "remix", name: "Remix", color: "#121212", bgColor: "from-neutral-900/10 to-neutral-950/5",
    description: "Full-stack web framework that leverages web fundamentals for modern UX.",
    category: "Framework", categoryId: "framework", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4L3 20h6l3-6 3 6h6L12 4z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8l-2 4h4l-2-4z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "nodejs", name: "Node.js", color: "#339933", bgColor: "from-green-600/10 to-green-700/5",
    description: "JavaScript runtime built on Chrome's V8 engine for building scalable server-side applications.",
    category: "Runtime", categoryId: "platform", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" stroke="#339933" stroke-width="1.5" fill="none"/><path d="M12 7l-5 3v6l5 3 5-3v-6l-5-3z" stroke="#339933" stroke-width="1.2" fill="none"/><path d="M7 10v6l5 3V13l-5-3z" fill="#339933" opacity="0.25"/><path d="M17 10v6l-5 3V13l5-3z" fill="#339933" opacity="0.12"/></svg>`,
  },
  {
    id: "expressjs", name: "Express.js", color: "#000000", bgColor: "from-neutral-800/10 to-neutral-900/5",
    description: "Fast, unopinionated, minimalist web framework for Node.js applications.",
    category: "Framework", categoryId: "framework", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 9l3 6 3-6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M17 9l-3 6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M14 15l3-6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "mongodb", name: "MongoDB", color: "#47A248", bgColor: "from-green-500/10 to-green-600/5",
    description: "NoSQL document database designed for scalability and developer productivity.",
    category: "Database", categoryId: "platform", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="10" stroke="#47A248" stroke-width="1.5" fill="none"/><path d="M12 3C9 8 9 16 12 21c3-5 3-13 0-18z" stroke="#47A248" stroke-width="1.2" fill="none"/></svg>`,
  },
  {
    id: "firebase", name: "Firebase", color: "#FFCA28", bgColor: "from-yellow-400/10 to-yellow-500/5",
    description: "Google's platform for building mobile and web applications with backend services.",
    category: "Platform", categoryId: "platform", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 3L4 18l3 2 7-8-4-9z" stroke="#FFCA28" stroke-width="1.5" fill="none"/><path d="M14 5l-3 7 8 7-5-14z" stroke="#FFCA28" stroke-width="1.5" fill="none"/><path d="M4 18l7 3 9-10" stroke="#FFCA28" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "git", name: "Git", color: "#F05032", bgColor: "from-orange-600/10 to-orange-700/5",
    description: "Distributed version control system for tracking changes in source code.",
    category: "Tool", categoryId: "tool", difficulty: 2,
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="6" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/><circle cx="7" cy="18" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/><circle cx="18" cy="16" r="3" stroke="#F05032" stroke-width="1.5" fill="none"/><path d="M7 9v6" stroke="#F05032" stroke-width="1.5" fill="none"/><path d="M7 15c3 0 5 1 8-1" stroke="#F05032" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "github", name: "GitHub", color: "#181717", bgColor: "from-neutral-900/10 to-neutral-950/5",
    description: "Web-based platform for version control and collaborative software development.",
    category: "Platform", categoryId: "tool", difficulty: 1,
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 19v-3c0-1 .5-2 2-2.5M16 19v-3c0-1-.5-2-2-2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 14c-1 .5-2 2-2 3h8c0-1-1-2.5-2-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    id: "docker", name: "Docker", color: "#2496ED", bgColor: "from-blue-500/10 to-blue-600/5",
    description: "Platform for developing, shipping, and running applications in containers.",
    category: "Tool", categoryId: "tool", difficulty: 3,
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="5" height="4" rx="1" stroke="#2496ED" stroke-width="1.2" fill="none"/><rect x="9" y="10" width="5" height="4" rx="1" stroke="#2496ED" stroke-width="1.2" fill="none"/><rect x="15" y="10" width="5" height="4" rx="1" stroke="#2496ED" stroke-width="1.2" fill="none"/><path d="M3 14c0 2 2 5 9 5s9-3 9-5" stroke="#2496ED" stroke-width="1.2" fill="none"/><rect x="9" y="5" width="5" height="4" rx="1" stroke="#2496ED" stroke-width="1.2" fill="none"/></svg>`,
  },
  {
    id: "figma", name: "Figma", color: "#F24E1E", bgColor: "from-red-500/10 to-purple-600/5",
    description: "Cloud-based design tool for collaborative interface design and prototyping.",
    category: "Design", categoryId: "tool", difficulty: 1,
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4.5" stroke="#F24E1E" stroke-width="1.5" fill="none"/><rect x="7.5" y="11.5" width="9" height="9" rx="4.5" stroke="#A259FF" stroke-width="1.5" fill="none"/><path d="M12 7v9" stroke="#F24E1E" stroke-width="1.5"/><path d="M7.5 16A4.5 4.5 0 0012 20.5V16H7.5z" stroke="#0ACF83" stroke-width="1" fill="none"/></svg>`,
  },
];

export const gameModes: GameMode[] = [
  {
    id: "logo-to-name",
    title: "Logo → Name",
    description: "See the technology logo and identify its name from multiple choices.",
    icon: "🎯",
    color: "from-gold/15 to-gold/5",
  },
  {
    id: "name-to-logo",
    title: "Name → Logo",
    description: "Read the technology name and pick the correct logo from the options.",
    icon: "🔍",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: "logo-to-category",
    title: "Logo → Category",
    description: "Classify the technology into its correct category — framework, language, styling, or build tool.",
    icon: "🏷️",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    id: "mixed",
    title: "Mixed Challenge",
    description: "Random mix of all question types for the ultimate test of your frontend knowledge.",
    icon: "⚡",
    color: "from-gold/15 to-gold/5",
  },
];

export const difficultyLevels: DifficultyLevel[] = [
  {
    id: "easy", label: "Easy", description: "Perfect for beginners. Focus on popular technologies only.",
    questions: 10, timePerQuestion: 30, scoreMultiplier: 1,
    color: "#10b981", bgColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "medium", label: "Medium", description: "Broaden your knowledge with more technologies.",
    questions: 20, timePerQuestion: 20, scoreMultiplier: 2,
    color: "#f59e0b", bgColor: "bg-amber-50 text-amber-600",
  },
  {
    id: "hard", label: "Hard", description: "Challenge yourself with advanced technologies.",
    questions: 30, timePerQuestion: 15, scoreMultiplier: 3,
    color: "#ef4444", bgColor: "bg-red-50 text-red-600",
  },
  {
    id: "expert", label: "Expert", description: "Master all technologies with mixed categories.",
    questions: 50, timePerQuestion: 10, scoreMultiplier: 5,
    color: "#8b5cf6", bgColor: "bg-purple-50 text-purple-600",
  },
];

export const howToPlaySteps: HowToPlayStep[] = [
  { step: 1, title: "Choose Category", description: "Select a technology category to focus on.", icon: "📂" },
  { step: 2, title: "Choose Difficulty", description: "Pick easy, medium, hard, or expert mode.", icon: "🎮" },
  { step: 3, title: "Choose Game Mode", description: "Select how you want to be tested.", icon: "🎯" },
  { step: 4, title: "View the Challenge", description: "A logo or technology name appears on screen.", icon: "👁️" },
  { step: 5, title: "Choose Correct Answer", description: "Select the correct answer from four options.", icon: "✅" },
  { step: 6, title: "Complete & Review", description: "Finish all questions and review your score.", icon: "🏆" },
];

export const benefits: Benefit[] = [
  { icon: "🧠", title: "Improve Recognition", description: "Train your brain to instantly recognize any frontend technology by its official logo." },
  { icon: "📚", title: "Learn Faster", description: "Visual association helps you learn and retain technology names more effectively." },
  { icon: "💼", title: "Prepare for Interviews", description: "Be confident discussing any frontend technology in technical interviews." },
  { icon: "👁️", title: "Strengthen Visual Memory", description: "Build a mental library of official logos for rapid technology identification." },
  { icon: "🌐", title: "Master Frontend Ecosystem", description: "Understand the full landscape of modern frontend development tools and frameworks." },
  { icon: "📅", title: "Daily Practice", description: "Short daily sessions build lasting knowledge of the frontend technology ecosystem." },
];

export const comingSoon: ComingSoon[] = [
  { icon: "🏆", title: "Leaderboards", description: "Compete with other players globally." },
  { icon: "⭐", title: "Achievements", description: "Unlock badges for milestones." },
  { icon: "⚡", title: "XP & Progression", description: "Earn XP and level up your knowledge." },
  { icon: "🪙", title: "Coins & Rewards", description: "Earn coins and unlock cosmetic items." },
  { icon: "📆", title: "Daily Challenge", description: "New challenge every day to test your skills." },
  { icon: "📊", title: "Weekly Challenge", description: "Complete weekly objectives for bonus rewards." },
  { icon: "📈", title: "Analytics", description: "Detailed insights into your learning progress." },
  { icon: "🤖", title: "AI Coach", description: "Personalized recommendations powered by AI." },
  { icon: "📜", title: "Certificates", description: "Earn certificates for completing milestones." },
];

export const faqs: FAQ[] = [
  { question: "What is Tech Logo Match?", answer: "Tech Logo Match is an interactive game that helps developers learn and recognize frontend web technologies by their official logos. It covers 23 technologies across frameworks, languages, styling tools, build systems, platforms, and dev tools." },
  { question: "Is this suitable for beginners?", answer: "Absolutely! The Easy mode focuses on the most popular technologies like HTML, CSS, and JavaScript. As you progress, more advanced technologies are introduced at higher difficulties." },
  { question: "How many technologies are included?", answer: "Currently 23 technologies are available: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Vue.js, Angular, Tailwind CSS, Bootstrap, Vite, Astro, Svelte, Nuxt, Remix, Node.js, Express.js, MongoDB, Firebase, Git, GitHub, Docker, and Figma." },
  { question: "Are the logos official?", answer: "Yes, all logos are based on the official branding of each technology. The game helps you recognize them in real-world contexts." },
  { question: "How long does a game take?", answer: "An Easy game (10 questions) takes about 2-3 minutes, while Expert mode (50 questions) can take 10-15 minutes depending on your familiarity." },
  { question: "What game modes are available?", answer: "Four modes: Logo → Name (identify by logo), Name → Logo (pick correct logo), Logo → Category (classify the technology), and Mixed Challenge (random question types)." },
  { question: "Will more technologies be added?", answer: "Yes! We plan to add more frontend and backend technologies in future updates based on community feedback." },
  { question: "Can I track my progress?", answer: "Progress tracking, analytics, achievements, and leaderboards are coming soon in future updates." },
];

export const previewExamples: PreviewExample[] = [
  { logoId: "react", name: "React", description: "A JavaScript library for building user interfaces" },
  { logoId: "vue", name: "Vue.js", description: "The Progressive JavaScript Framework" },
  { logoId: "angular", name: "Angular", description: "The web framework for building modern apps" },
  { logoId: "nextjs", name: "Next.js", description: "The React framework for production" },
  { logoId: "tailwind", name: "Tailwind CSS", description: "A utility-first CSS framework" },
  { logoId: "typescript", name: "TypeScript", description: "JavaScript with syntax for types" },
];
