export type SyntaxPair = {
  term: string;
  definition: string;
};

export type LanguageQuestions = {
  id: string;
  name: string;
  pairs: SyntaxPair[];
};

export const syntaxQuestions: LanguageQuestions[] = [
  {
    id: "html",
    name: "HTML",
    pairs: [
      { term: "HTML", definition: "<html>" },
      { term: "DIV", definition: "<div>" },
      { term: "FORM", definition: "<form>" },
      { term: "INPUT", definition: "<input>" },
      { term: "BUTTON", definition: "<button>" },
      { term: "HEADER", definition: "<header>" },
      { term: "NAV", definition: "<nav>" },
      { term: "SECTION", definition: "<section>" },
      { term: "ARTICLE", definition: "<article>" },
      { term: "TABLE", definition: "<table>" },
      { term: "ANCHOR", definition: "<a>" },
      { term: "IMAGE", definition: "<img>" },
      { term: "LIST", definition: "<ul>" },
      { term: "PARAGRAPH", definition: "<p>" },
    ],
  },
  {
    id: "css",
    name: "CSS",
    pairs: [
      { term: "Flexbox", definition: "display: flex" },
      { term: "Grid", definition: "display: grid" },
      { term: "Center", definition: "justify-content: center" },
      { term: "Align", definition: "align-items: center" },
      { term: "Gap", definition: "gap" },
      { term: "Absolute", definition: "position: absolute" },
      { term: "Relative", definition: "position: relative" },
      { term: "Hidden", definition: "overflow: hidden" },
      { term: "Shadow", definition: "box-shadow" },
      { term: "Rounded", definition: "border-radius" },
      { term: "Gradient", definition: "linear-gradient()" },
      { term: "Transition", definition: "transition" },
      { term: "Transform", definition: "transform" },
      { term: "Animation", definition: "@keyframes" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    pairs: [
      { term: "Variable", definition: "const" },
      { term: "Mutable", definition: "let" },
      { term: "Promise", definition: "async" },
      { term: "Await", definition: "await" },
      { term: "Loop", definition: "forEach()" },
      { term: "Map", definition: "map()" },
      { term: "Filter", definition: "filter()" },
      { term: "Reduce", definition: "reduce()" },
      { term: "Spread", definition: "..." },
      { term: "Destructure", definition: "{} =" },
      { term: "Arrow", definition: "=>" },
      { term: "Template", definition: "`${}`" },
      { term: "Class", definition: "class" },
      { term: "Module", definition: "export" },
    ],
  },
  {
    id: "react",
    name: "React",
    pairs: [
      { term: "State", definition: "useState()" },
      { term: "Effects", definition: "useEffect()" },
      { term: "Memo", definition: "useMemo()" },
      { term: "Callback", definition: "useCallback()" },
      { term: "Reference", definition: "useRef()" },
      { term: "Context", definition: "useContext()" },
      { term: "Reducer", definition: "useReducer()" },
      { term: "Fragment", definition: "<>" },
      { term: "Props", definition: "interface Props" },
      { term: "Children", definition: "ReactNode" },
      { term: "Portal", definition: "createPortal()" },
      { term: "Suspense", definition: "<Suspense>" },
      { term: "Lazy", definition: "lazy()" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    pairs: [
      { term: "Routing", definition: "page.tsx" },
      { term: "Layout", definition: "layout.tsx" },
      { term: "Metadata", definition: "metadata" },
      { term: "Link", definition: "Link" },
      { term: "Image", definition: "Image" },
      { term: "Server", definition: "Server Component" },
      { term: "Client", definition: "\"use client\"" },
      { term: "Loading", definition: "loading.tsx" },
      { term: "Error", definition: "error.tsx" },
      { term: "Not Found", definition: "not-found.tsx" },
      { term: "Route Group", definition: "(group)" },
      { term: "Dynamic", definition: "[param]" },
      { term: "Middleware", definition: "middleware.ts" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    pairs: [
      { term: "Interface", definition: "interface" },
      { term: "Alias", definition: "type" },
      { term: "Optional", definition: "Partial" },
      { term: "Record", definition: "Record" },
      { term: "Generic", definition: "<T>" },
      { term: "Readonly", definition: "Readonly" },
      { term: "Union", definition: "|" },
      { term: "Intersection", definition: "&" },
      { term: "Tuple", definition: "[string, number]" },
      { term: "Enum", definition: "enum" },
      { term: "Never", definition: "never" },
      { term: "Unknown", definition: "unknown" },
      { term: "Pick", definition: "Pick" },
    ],
  },
  {
    id: "dart",
    name: "Dart",
    pairs: [
      { term: "Widget", definition: "StatelessWidget" },
      { term: "Stateful", definition: "StatefulWidget" },
      { term: "Future", definition: "Future" },
      { term: "Async", definition: "async" },
      { term: "Await", definition: "await" },
      { term: "Stream", definition: "Stream" },
      { term: "Material", definition: "MaterialApp" },
      { term: "Scaffold", definition: "Scaffold" },
      { term: "Container", definition: "Container" },
      { term: "Row", definition: "Row" },
      { term: "Column", definition: "Column" },
      { term: "Padding", definition: "Padding" },
      { term: "Nullable", definition: "?" },
    ],
  },
  {
    id: "angular",
    name: "Angular",
    pairs: [
      { term: "Component", definition: "@Component" },
      { term: "Module", definition: "@NgModule" },
      { term: "Injectable", definition: "@Injectable" },
      { term: "Route", definition: "Router" },
      { term: "Service", definition: "service" },
      { term: "Pipe", definition: "pipe" },
      { term: "Directive", definition: "@Directive" },
      { term: "Observable", definition: "Observable" },
      { term: "Subscription", definition: "subscribe" },
      { term: "Input", definition: "@Input" },
      { term: "Output", definition: "@Output" },
      { term: "Lifecycle", definition: "ngOnInit" },
    ],
  },
  {
    id: "vue",
    name: "Vue",
    pairs: [
      { term: "Reactive", definition: "ref()" },
      { term: "Computed", definition: "computed()" },
      { term: "Watch", definition: "watch()" },
      { term: "Loop", definition: "v-for" },
      { term: "Condition", definition: "v-if" },
      { term: "Model", definition: "v-model" },
      { term: "Event", definition: "@click" },
      { term: "Slot", definition: "<slot>" },
      { term: "Component", definition: "defineComponent" },
      { term: "Props", definition: "defineProps" },
      { term: "Emit", definition: "defineEmits" },
      { term: "Transition", definition: "<Transition>" },
    ],
  },
];

export function getPairsForLanguage(languageId: string): SyntaxPair[] {
  const lang = syntaxQuestions.find((l) => l.id === languageId);
  return lang?.pairs ?? [];
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
