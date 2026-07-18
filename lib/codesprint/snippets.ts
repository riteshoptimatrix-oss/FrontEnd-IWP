import type { LanguageDefinition } from "./types";

const htmlSnippets: LanguageDefinition = {
  id: "html",
  name: "HTML",
  color: "#E34F26",
  icon: "<>",
  categories: [
    {
      name: "Basic HTML",
      snippets: {
        easy: [
          { id: "html-basic-e1", title: "Page Structure", content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>` },
          { id: "html-basic-e2", title: "Paragraph", content: `<p>This is a simple paragraph.\nIt contains some text content.\n</p>` },
        ],
        medium: [
          { id: "html-basic-m1", title: "Full Page", content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/about">About</a>\n    </nav>\n  </header>\n  <main>\n    <article>\n      <h1>Welcome</h1>\n      <p>Content goes here.</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2026</p>\n  </footer>\n</body>\n</html>` },
        ],
        hard: [
          { id: "html-basic-h1", title: "Accessible Page", content: `<!DOCTYPE html>\n<html lang="en" dir="ltr">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Accessible web application">\n  <link rel="canonical" href="https://example.com/">\n  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "WebApplication",\n    "name": "My App"\n  }\n  </script>\n</head>\n<body>\n  <a href="#main" class="skip-link">Skip to content</a>\n  <header role="banner">\n    <h1>My App</h1>\n  </header>\n  <main id="main" role="main" tabindex="-1">\n  </main>\n</body>\n</html>` },
        ],
      },
    },
    {
      name: "Forms",
      snippets: {
        easy: [
          { id: "html-form-e1", title: "Simple Form", content: `<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name">\n  <button type="submit">Submit</button>\n</form>` },
        ],
        medium: [
          { id: "html-form-m1", title: "Contact Form", content: `<form action="/contact" method="POST" class="contact-form">\n  <div class="field">\n    <label for="name">Full Name</label>\n    <input type="text" id="name" name="name" required\n      placeholder="John Doe">\n  </div>\n  <div class="field">\n    <label for="email">Email</label>\n    <input type="email" id="email" name="email" required\n      placeholder="john@example.com">\n  </div>\n  <div class="field">\n    <label for="msg">Message</label>\n    <textarea id="msg" name="message" rows="5"\n      placeholder="Your message..."></textarea>\n  </div>\n  <button type="submit">Send Message</button>\n</form>` },
        ],
        hard: [
          { id: "html-form-h1", title: "Registration Form", content: `<form action="/register" method="POST" novalidate>\n  <fieldset>\n    <legend>Account Information</legend>\n    <div class="field">\n      <label for="username">Username *</label>\n      <input type="text" id="username" name="username"\n        required minlength="3" maxlength="20"\n        pattern="[a-zA-Z0-9]+" aria-describedby="username-hint">\n      <small id="username-hint">Letters and numbers only</small>\n    </div>\n    <div class="field">\n      <label for="email">Email *</label>\n      <input type="email" id="email" name="email" required\n        aria-describedby="email-error">\n    </div>\n    <div class="field">\n      <label for="password">Password *</label>\n      <input type="password" id="password" name="password"\n        required minlength="8"\n        pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">\n    </div>\n  </fieldset>\n  <div class="consent">\n    <input type="checkbox" id="terms" name="terms" required>\n    <label for="terms">I agree to the terms</label>\n  </div>\n  <button type="submit">Create Account</button>\n</form>` },
        ],
      },
    },
    {
      name: "Semantic Tags",
      snippets: {
        easy: [
          { id: "html-sem-e1", title: "Article", content: `<article>\n  <header>\n    <h2>Blog Post Title</h2>\n    <time datetime="2026-01-15">Jan 15, 2026</time>\n  </header>\n  <p>Article content goes here.</p>\n  <footer>\n    <p>Written by Author Name</p>\n  </footer>\n</article>` },
        ],
        medium: [
          { id: "html-sem-m1", title: "Page Layout", content: `<header>\n  <nav aria-label="Main navigation">\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/about">About</a></li>\n      <li><a href="/contact">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <section aria-labelledby="intro">\n    <h1 id="intro">Introduction</h1>\n    <p>Welcome to our platform.</p>\n  </section>\n  <aside aria-label="Sidebar">\n    <h2>Related Links</h2>\n    <ul>\n      <li><a href="/docs">Documentation</a></li>\n    </ul>\n  </aside>\n</main>\n<footer>\n  <address>Contact: info@example.com</address>\n</footer>` },
        ],
        hard: [
          { id: "html-sem-h1", title: "Media Object", content: `<article class="media" itemscope itemtype="https://schema.org/BlogPosting">\n  <figure class="media-figure">\n    <img src="photo.webp" alt="Description"\n      loading="lazy" width="400" height="300"\n      itemprop="image">\n    <figcaption>Caption text</figcaption>\n  </figure>\n  <div class="media-body">\n    <header>\n      <h2 itemprop="headline">Article Title</h2>\n      <div class="meta">\n        <time itemprop="datePublished" datetime="2026-01-15">\n          January 15, 2026\n        </time>\n        <span itemprop="author" itemscope itemtype="https://schema.org/Person">\n          <span itemprop="name">Author</span>\n        </span>\n      </div>\n    </header>\n    <div itemprop="articleBody">\n      <p>Full article content here.</p>\n    </div>\n  </div>\n</article>` },
        ],
      },
    },
    {
      name: "Tables",
      snippets: {
        easy: [
          { id: "html-table-e1", title: "Simple Table", content: `<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n</table>` },
        ],
        medium: [
          { id: "html-table-m1", title: "Data Table", content: `<table>\n  <caption>Monthly Sales</caption>\n  <thead>\n    <tr>\n      <th scope="col">Month</th>\n      <th scope="col">Revenue</th>\n      <th scope="col">Growth</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">January</th>\n      <td>$50,000</td>\n      <td>+12%</td>\n    </tr>\n    <tr>\n      <th scope="row">February</th>\n      <td>$55,000</td>\n      <td>+10%</td>\n    </tr>\n  </tbody>\n</table>` },
        ],
        hard: [
          { id: "html-table-h1", title: "Complex Table", content: `<table class="data-table" aria-describedby="table-desc">\n  <caption id="table-desc">Quarterly Financial Report</caption>\n  <colgroup>\n    <col span="1" style="width: 25%">\n    <col span="3" style="width: 25%">\n  </colgroup>\n  <thead>\n    <tr>\n      <th scope="col" rowspan="2">Department</th>\n      <th scope="col" colspan="3">Quarterly Revenue</th>\n    </tr>\n    <tr>\n      <th scope="col">Q1</th>\n      <th scope="col">Q2</th>\n      <th scope="col">Q3</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="rowgroup" colspan="4">Engineering</th>\n    </tr>\n    <tr>\n      <td>Frontend</td>\n      <td>$120K</td>\n      <td>$135K</td>\n      <td>$150K</td>\n    </tr>\n  </tbody>\n</table>` },
        ],
      },
    },
  ],
};

const cssSnippets: LanguageDefinition = {
  id: "css",
  name: "CSS",
  color: "#1572B6",
  icon: "{}",
  categories: [
    {
      name: "Flexbox",
      snippets: {
        easy: [
          { id: "css-flex-e1", title: "Flex Container", content: `.container {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}` },
        ],
        medium: [
          { id: "css-flex-m1", title: "Flex Layout", content: `.layout {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar {\n  flex: 0 0 250px;\n  background: #1a1a2e;\n  padding: 1.5rem;\n}\n\n.main {\n  flex: 1;\n  padding: 2rem;\n  overflow-y: auto;\n}` },
        ],
        hard: [
          { id: "css-flex-h1", title: "Holy Grail", content: `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  font-family: system-ui, sans-serif;\n}\n\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background: #0f0f23;\n  color: white;\n}\n\n.content {\n  display: flex;\n  flex: 1;\n}\n\n.sidebar {\n  flex: 0 0 280px;\n  background: #fafafa;\n  border-right: 1px solid #e5e5e5;\n  padding: 1.5rem;\n  overflow-y: auto;\n}\n\n.main {\n  flex: 1;\n  padding: 2rem;\n}\n\n.footer {\n  padding: 1rem 2rem;\n  text-align: center;\n  border-top: 1px solid #e5e5e5;\n}` },
        ],
      },
    },
    {
      name: "Grid",
      snippets: {
        easy: [
          { id: "css-grid-e1", title: "Basic Grid", content: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}` },
        ],
        medium: [
          { id: "css-grid-m1", title: "Dashboard Grid", content: `.dashboard {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n  padding: 2rem;\n}\n\n.card {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.card-wide {\n  grid-column: span 2;\n}` },
        ],
        hard: [
          { id: "css-grid-h1", title: "Complex Layout", content: `.app-layout {\n  display: grid;\n  grid-template:\n    "header header header" auto\n    "nav main aside" 1fr\n    "footer footer footer" auto\n    / 250px 1fr 300px;\n  min-height: 100vh;\n  gap: 0;\n}\n\n.header { grid-area: header; }\n.nav { grid-area: nav; }\n.main { grid-area: main; }\n.aside { grid-area: aside; }\n.footer { grid-area: footer; }\n\n@media (max-width: 768px) {\n  .app-layout {\n    grid-template:\n      "header" auto\n      "nav" auto\n      "main" 1fr\n      "aside" auto\n      "footer" auto\n      / 1fr;\n  }\n}` },
        ],
      },
    },
    {
      name: "Animations",
      snippets: {
        easy: [
          { id: "css-anim-e1", title: "Fade In", content: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.fade-in {\n  animation: fadeIn 0.3s ease-in-out;\n}` },
        ],
        medium: [
          { id: "css-anim-m1", title: "Hover Effects", content: `.btn {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 8px;\n  background: #6366f1;\n  color: white;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);\n}\n\n.btn:active {\n  transform: translateY(0);\n}` },
        ],
        hard: [
          { id: "css-anim-h1", title: "Complex Animations", content: `@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.animate-slide-up {\n  animation: slideUp 0.5s ease-out forwards;\n  opacity: 0;\n}\n\n.animate-pulse {\n  animation: pulse 2s infinite;\n}\n\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n\n.stagger > * {\n  animation: slideUp 0.5s ease-out forwards;\n  opacity: 0;\n}\n\n.stagger > *:nth-child(1) { animation-delay: 0.1s; }\n.stagger > *:nth-child(2) { animation-delay: 0.2s; }\n.stagger > *:nth-child(3) { animation-delay: 0.3s; }` },
        ],
      },
    },
    {
      name: "Media Queries",
      snippets: {
        easy: [
          { id: "css-mq-e1", title: "Basic Responsive", content: `.container {\n  width: 100%;\n  padding: 1rem;\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 720px;\n    margin: 0 auto;\n  }\n}` },
        ],
        medium: [
          { id: "css-mq-m1", title: "Responsive Grid", content: `.grid {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 640px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 1.5rem;\n  }\n}` },
        ],
        hard: [
          { id: "css-mq-h1", title: "Responsive Typography", content: `:root {\n  --font-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);\n  --font-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);\n  --font-xl: clamp(1.75rem, 1.4rem + 1.75vw, 2.75rem);\n}\n\nbody {\n  font-size: var(--font-base);\n  line-height: 1.6;\n}\n\nh1 {\n  font-size: var(--font-xl);\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n}\n\nh2 {\n  font-size: var(--font-lg);\n  line-height: 1.3;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}` },
        ],
      },
    },
  ],
};

const javascriptSnippets: LanguageDefinition = {
  id: "javascript",
  name: "JavaScript",
  color: "#F7DF1E",
  icon: "JS",
  categories: [
    {
      name: "Functions",
      snippets: {
        easy: [
          { id: "js-fn-e1", title: "Arrow Function", content: `const greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet("World"));` },
          { id: "js-fn-e2", title: "Default Params", content: `const multiply = (a, b = 1) => {\n  return a * b;\n};\n\nconsole.log(multiply(5, 3));` },
        ],
        medium: [
          { id: "js-fn-m1", title: "Higher Order", content: `const withLogging = (fn) => {\n  return (...args) => {\n    console.log(\`Calling \${fn.name}\`);\n    const result = fn(...args);\n    console.log(\`Result: \${result}\`);\n    return result;\n  };\n};\n\nconst add = (a, b) => a + b;\nconst loggedAdd = withLogging(add);\nloggedAdd(2, 3);` },
        ],
        hard: [
          { id: "js-fn-h1", title: "Curry Implementation", content: `const curry = (fn) => {\n  const arity = fn.length;\n  return function curried(...args) {\n    if (args.length >= arity) {\n      return fn.apply(this, args);\n    }\n    return (...moreArgs) => {\n      return curried.apply(this, args.concat(moreArgs));\n    };\n  };\n};\n\nconst add = curry((a, b, c) => a + b + c);\nconsole.log(add(1)(2)(3));\nconsole.log(add(1, 2)(3));\nconsole.log(add(1, 2, 3));` },
        ],
      },
    },
    {
      name: "Arrays",
      snippets: {
        easy: [
          { id: "js-arr-e1", title: "Map Filter", content: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\n\nconsole.log(doubled);\nconsole.log(evens);` },
        ],
        medium: [
          { id: "js-arr-m1", title: "Chaining", content: `const users = [\n  { name: "Alice", age: 25, active: true },\n  { name: "Bob", age: 30, active: false },\n  { name: "Charlie", age: 35, active: true },\n];\n\nconst activeAdults = users\n  .filter(u => u.active)\n  .filter(u => u.age >= 30)\n  .map(u => u.name);\n\nconsole.log(activeAdults);` },
        ],
        hard: [
          { id: "js-arr-h1", title: "Reduce Group", content: `const transactions = [\n  { type: "income", amount: 5000 },\n  { type: "expense", amount: 1200 },\n  { type: "income", amount: 3000 },\n  { type: "expense", amount: 800 },\n];\n\nconst summary = transactions.reduce(\n  (acc, tx) => {\n    acc[tx.type] = (acc[tx.type] || 0) + tx.amount;\n    acc.total += tx.type === "income" ? tx.amount : -tx.amount;\n    return acc;\n  },\n  { income: 0, expense: 0, total: 0 }\n);\n\nconsole.log(summary);` },
        ],
      },
    },
    {
      name: "Async/Await",
      snippets: {
        easy: [
          { id: "js-async-e1", title: "Fetch Data", content: `const fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Failed:", error.message);\n    return null;\n  }\n};` },
        ],
        medium: [
          { id: "js-async-m1", title: "Parallel Fetch", content: `const fetchAll = async (urls) => {\n  const promises = urls.map(url =>\n    fetch(url)\n      .then(res => res.json())\n      .catch(() => null)\n  );\n  const results = await Promise.all(promises);\n  return results.filter(Boolean);\n};\n\nconst urls = ["/api/users", "/api/posts", "/api/comments"];\nconst data = await fetchAll(urls);` },
        ],
        hard: [
          { id: "js-async-h1", title: "Retry Logic", content: `const fetchWithRetry = async (url, options = {}) => {\n  const { retries = 3, delay = 1000 } = options;\n  for (let attempt = 1; attempt <= retries; attempt++) {\n    try {\n      const response = await fetch(url);\n      if (!response.ok) {\n        throw new Error(\`HTTP \${response.status}\`);\n      }\n      return await response.json();\n    } catch (error) {\n      const isLast = attempt === retries;\n      if (isLast) throw error;\n      await new Promise(r => setTimeout(r, delay * attempt));\n      console.log(\`Retry \${attempt}/\${retries}\`);\n    }\n  }\n};` },
        ],
      },
    },
    {
      name: "Objects",
      snippets: {
        easy: [
          { id: "js-obj-e1", title: "Spread Object", content: `const defaults = { theme: "light", lang: "en" };\nconst userPrefs = { theme: "dark" };\nconst config = { ...defaults, ...userPrefs };\n\nconsole.log(config);` },
        ],
        medium: [
          { id: "js-obj-m1", title: "Deep Clone", content: `const deepClone = (obj) => {\n  if (obj === null || typeof obj !== "object") {\n    return obj;\n  }\n  const clone = Array.isArray(obj) ? [] : {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n};` },
        ],
        hard: [
          { id: "js-obj-h1", title: "Immutable Update", content: `const setNestedValue = (obj, path, value) => {\n  const keys = path.split(".");\n  const result = { ...obj };\n  let current = result;\n\n  for (let i = 0; i < keys.length - 1; i++) {\n    current[keys[i]] = { ...current[keys[i]] };\n    current = current[keys[i]];\n  }\n\n  current[keys[keys.length - 1]] = value;\n  return result;\n};\n\nconst state = { user: { profile: { name: "Alice" } } };\nconst next = setNestedValue(state, "user.profile.name", "Bob");` },
        ],
      },
    },
  ],
};

const reactSnippets: LanguageDefinition = {
  id: "react",
  name: "React",
  color: "#61DAFB",
  icon: "Re",
  categories: [
    {
      name: "Components",
      snippets: {
        easy: [
          { id: "react-comp-e1", title: "Function Component", content: `export function Greeting({ name }) {\n  return (\n    <div className="greeting">\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to our app.</p>\n    </div>\n  );\n}` },
        ],
        medium: [
          { id: "react-comp-m1", title: "Card Component", content: `export function Card({ title, description, children }) {\n  return (\n    <div className="rounded-xl border p-6 shadow-sm">\n      <h3 className="text-lg font-semibold">{title}</h3>\n      {description && (\n        <p className="mt-2 text-gray-600">{description}</p>\n      )}\n      {children && <div className="mt-4">{children}</div>}\n    </div>\n  );\n}` },
        ],
        hard: [
          { id: "react-comp-h1", title: "Compound Component", content: `import { createContext, useContext, useState } from "react";\n\nconst TabsContext = createContext(null);\n\nexport function Tabs({ defaultTab, children }) {\n  const [activeTab, setActiveTab] = useState(defaultTab);\n  return (\n    <TabsContext.Provider value={{ activeTab, setActiveTab }}>\n      <div className="tabs">{children}</div>\n    </TabsContext.Provider>\n  );\n}\n\nexport function TabList({ children }) {\n  return <div className="tab-list" role="tablist">{children}</div>;\n}\n\nexport function Tab({ value, children }) {\n  const { activeTab, setActiveTab } = useContext(TabsContext);\n  return (\n    <button\n      role="tab"\n      aria-selected={activeTab === value}\n      onClick={() => setActiveTab(value)}\n      className={activeTab === value ? "active" : ""}\n    >\n      {children}\n    </button>\n  );\n}` },
        ],
      },
    },
    {
      name: "useState",
      snippets: {
        easy: [
          { id: "react-state-e1", title: "Counter", content: `import { useState } from "react";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}` },
        ],
        medium: [
          { id: "react-state-m1", title: "Form State", content: `import { useState } from "react";\n\nexport function LoginForm() {\n  const [form, setForm] = useState({\n    email: "",\n    password: "",\n  });\n\n  const handleChange = (e) => {\n    setForm(prev => ({\n      ...prev,\n      [e.target.name]: e.target.value,\n    }));\n  };\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(form);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="email" onChange={handleChange} />\n      <input name="password" type="password" onChange={handleChange} />\n      <button type="submit">Login</button>\n    </form>\n  );\n}` },
        ],
        hard: [
          { id: "react-state-h1", title: "useReducer Pattern", content: `import { useReducer } from "react";\n\nconst initialState = { items: [], loading: false, error: null };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "FETCH_START":\n      return { ...state, loading: true, error: null };\n    case "FETCH_SUCCESS":\n      return { ...state, loading: false, items: action.payload };\n    case "FETCH_ERROR":\n      return { ...state, loading: false, error: action.payload };\n    case "ADD_ITEM":\n      return { ...state, items: [...state.items, action.payload] };\n    case "REMOVE_ITEM":\n      return {\n        ...state,\n        items: state.items.filter(i => i.id !== action.payload),\n      };\n    default:\n      return state;\n  }\n}\n\nexport function ItemList() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n}` },
        ],
      },
    },
    {
      name: "useEffect",
      snippets: {
        easy: [
          { id: "react-effect-e1", title: "Document Title", content: `import { useState, useEffect } from "react";\n\nexport function Title({ title }) {\n  useEffect(() => {\n    document.title = title;\n    return () => { document.title = "App"; };\n  }, [title]);\n\n  return <h1>{title}</h1>;\n}` },
        ],
        medium: [
          { id: "react-effect-m1", title: "Data Fetching", content: `import { useState, useEffect } from "react";\n\nexport function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n\n    fetch(\`/api/users/\${userId}\`)\n      .then(res => res.json())\n      .then(data => {\n        if (!cancelled) {\n          setUser(data);\n          setLoading(false);\n        }\n      });\n\n    return () => { cancelled = true; };\n  }, [userId]);\n\n  if (loading) return <p>Loading...</p>;\n  return <h2>{user?.name}</h2>;\n}` },
        ],
        hard: [
          { id: "react-effect-h1", title: "WebSocket Hook", content: `import { useEffect, useRef, useCallback } from "react";\n\nexport function useWebSocket(url, onMessage) {\n  const wsRef = useRef(null);\n  const reconnectTimeout = useRef(null);\n\n  const connect = useCallback(() => {\n    const ws = new WebSocket(url);\n    wsRef.current = ws;\n\n    ws.onopen = () => console.log("Connected");\n    ws.onmessage = (event) => {\n      const data = JSON.parse(event.data);\n      onMessage(data);\n    };\n    ws.onclose = () => {\n      reconnectTimeout.current = setTimeout(connect, 3000);\n    };\n    ws.onerror = (err) => {\n      console.error("WS error:", err);\n      ws.close();\n    };\n  }, [url, onMessage]);\n\n  useEffect(() => {\n    connect();\n    return () => {\n      clearTimeout(reconnectTimeout.current);\n      wsRef.current?.close();\n    };\n  }, [connect]);\n}` },
        ],
      },
    },
    {
      name: "Context API",
      snippets: {
        easy: [
          { id: "react-ctx-e1", title: "Theme Context", content: `import { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext("light");\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("light");\n  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggle }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport const useTheme = () => useContext(ThemeContext);` },
        ],
        medium: [
          { id: "react-ctx-m1", title: "Auth Context", content: `import { createContext, useContext, useState, useCallback } from "react";\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(false);\n\n  const login = useCallback(async (email, password) => {\n    setLoading(true);\n    try {\n      const res = await fetch("/api/auth/login", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ email, password }),\n      });\n      const data = await res.json();\n      setUser(data.user);\n      return data;\n    } finally {\n      setLoading(false);\n    }\n  }, []);\n\n  const logout = useCallback(() => {\n    setUser(null);\n  }, []);\n\n  return (\n    <AuthContext.Provider value={{ user, loading, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport const useAuth = () => useContext(AuthContext);` },
        ],
        hard: [
          { id: "react-ctx-h1", title: "Multi-Provider", content: `import { createContext, useContext, useReducer, useMemo } from "react";\n\nconst StateContext = createContext();\nconst DispatchContext = createContext();\n\nfunction appReducer(state, action) {\n  switch (action.type) {\n    case "SET_USER":\n      return { ...state, user: action.payload };\n    case "SET_THEME":\n      return { ...state, theme: action.payload };\n    case "ADD_NOTIFICATION":\n      return {\n        ...state,\n        notifications: [...state.notifications, action.payload],\n      };\n    case "REMOVE_NOTIFICATION":\n      return {\n        ...state,\n        notifications: state.notifications.filter(\n          n => n.id !== action.payload\n        ),\n      };\n    default:\n      return state;\n  }\n}\n\nexport function AppProvider({ children }) {\n  const [state, dispatch] = useReducer(appReducer, {\n    user: null,\n    theme: "light",\n    notifications: [],\n  });\n  const stateValue = useMemo(() => state, [state]);\n\n  return (\n    <DispatchContext.Provider value={dispatch}>\n      <StateContext.Provider value={stateValue}>\n        {children}\n      </StateContext.Provider>\n    </DispatchContext.Provider>\n  );\n}\n\nexport const useAppState = () => useContext(StateContext);\nexport const useDispatch = () => useContext(DispatchContext);` },
        ],
      },
    },
  ],
};

const nextjsSnippets: LanguageDefinition = {
  id: "nextjs",
  name: "Next.js",
  color: "#000000",
  icon: "N",
  categories: [
    {
      name: "App Router",
      snippets: {
        easy: [
          { id: "next-router-e1", title: "Page Component", content: `export default function AboutPage() {\n  return (\n    <div>\n      <h1>About Us</h1>\n      <p>We build amazing things.</p>\n    </div>\n  );\n}` },
        ],
        medium: [
          { id: "next-router-m1", title: "Dynamic Route", content: `export default async function PostPage({ params }) {\n  const { slug } = await params;\n  const post = await getPost(slug);\n\n  if (!post) {\n    notFound();\n  }\n\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <time>{post.date}</time>\n      <div dangerouslySetInnerHTML={{ __html: post.content }} />\n    </article>\n  );\n}` },
        ],
        hard: [
          { id: "next-router-h1", title: "Route Handlers", content: `import { NextResponse } from "next/server";\n\nexport async function GET(request) {\n  const { searchParams } = new URL(request.url);\n  const page = parseInt(searchParams.get("page") || "1");\n  const limit = parseInt(searchParams.get("limit") || "10");\n\n  const data = await fetchPosts({ page, limit });\n\n  return NextResponse.json({\n    posts: data.posts,\n    pagination: {\n      page,\n      limit,\n      total: data.total,\n      pages: Math.ceil(data.total / limit),\n    },\n  });\n}` },
        ],
      },
    },
    {
      name: "Server Components",
      snippets: {
        easy: [
          { id: "next-sc-e1", title: "Server Fetch", content: `export default async function UsersPage() {\n  const users = await fetch("https://api.example.com/users", {\n    cache: "no-store",\n  }).then(res => res.json());\n\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}` },
        ],
        medium: [
          { id: "next-sc-m1", title: "Layout with Suspense", content: `import { Suspense } from "react";\n\nexport default function DashboardLayout({ children }) {\n  return (\n    <div className="flex min-h-screen">\n      <aside className="w-64 border-r p-4">\n        <Suspense fallback={<SidebarSkeleton />}>\n          <Sidebar />\n        </Suspense>\n      </aside>\n      <main className="flex-1 p-8">{children}</main>\n    </div>\n  );\n}\n\nasync function Sidebar() {\n  const links = await getNavLinks();\n  return (\n    <nav>\n      {links.map(link => (\n        <a key={link.href} href={link.href}>\n          {link.label}\n        </a>\n      ))}\n    </nav>\n  );\n}` },
        ],
        hard: [
          { id: "next-sc-h1", title: "Streaming Data", content: `import { Suspense } from "react";\nimport { headers } from "next/headers";\n\nexport default async function DashboardPage() {\n  const headerList = await headers();\n  const pathname = headerList.get("x-pathname");\n\n  return (\n    <div className="grid grid-cols-3 gap-6">\n      <Suspense fallback={<CardSkeleton />}>\n        <StatsCard title="Users" query={getUsers} />\n      </Suspense>\n      <Suspense fallback={<CardSkeleton />}>\n        <StatsCard title="Revenue" query={getRevenue} />\n      </Suspense>\n      <Suspense fallback={<CardSkeleton />}>\n        <StatsCard title="Orders" query={getOrders} />\n      </Suspense>\n    </div>\n  );\n}` },
        ],
      },
    },
    {
      name: "Metadata",
      snippets: {
        easy: [
          { id: "next-meta-e1", title: "Basic Metadata", content: `export const metadata = {\n  title: "My Page",\n  description: "Page description here.",\n};\n\nexport default function Page() {\n  return <h1>Content</h1>;\n}` },
        ],
        medium: [
          { id: "next-meta-m1", title: "Dynamic Metadata", content: `export async function generateMetadata({ params }) {\n  const { id } = await params;\n  const product = await getProduct(id);\n\n  return {\n    title: product.name,\n    description: product.description,\n    openGraph: {\n      title: product.name,\n      description: product.description,\n      images: [product.image],\n    },\n  };\n}\n\nexport default async function ProductPage({ params }) {\n  const { id } = await params;\n  const product = await getProduct(id);\n  return <h1>{product.name}</h1>;\n}` },
        ],
        hard: [
          { id: "next-meta-h1", title: "Sitemap Generation", content: `export default function sitemap() {\n  return [\n    {\n      url: "https://example.com",\n      lastModified: new Date(),\n      changeFrequency: "daily",\n      priority: 1,\n    },\n    {\n      url: "https://example.com/about",\n      lastModified: new Date(),\n      changeFrequency: "monthly",\n      priority: 0.8,\n    },\n    {\n      url: "https://example.com/blog",\n      lastModified: new Date(),\n      changeFrequency: "weekly",\n      priority: 0.9,\n    },\n  ];\n}` },
        ],
      },
    },
  ],
};

const typescriptSnippets: LanguageDefinition = {
  id: "typescript",
  name: "TypeScript",
  color: "#3178C6",
  icon: "TS",
  categories: [
    {
      name: "Interfaces",
      snippets: {
        easy: [
          { id: "ts-iface-e1", title: "Basic Interface", content: `interface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nconst user: User = {\n  id: "1",\n  name: "Alice",\n  email: "alice@example.com",\n};` },
        ],
        medium: [
          { id: "ts-iface-m1", title: "Extended Interface", content: `interface BaseEntity {\n  id: string;\n  createdAt: Date;\n  updatedAt: Date;\n}\n\ninterface User extends BaseEntity {\n  name: string;\n  email: string;\n  role: "admin" | "user" | "guest";\n  profile?: {\n    avatar?: string;\n    bio?: string;\n  };\n}\n\nfunction formatDate(user: User): string {\n  return \`\${user.name} joined on \${user.createdAt.toLocaleDateString()}\`;\n}` },
        ],
        hard: [
          { id: "ts-iface-h1", title: "Advanced Types", content: `interface Response<T> {\n  data: T;\n  status: number;\n  message: string;\n  timestamp: string;\n}\n\ninterface PaginatedResponse<T> extends Response<T[]> {\n  pagination: {\n    page: number;\n    limit: number;\n    total: number;\n    pages: number;\n  };\n}\n\nasync function fetchData<T>(url: string): Promise<PaginatedResponse<T>> {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n  return res.json();\n}` },
        ],
      },
    },
    {
      name: "Generics",
      snippets: {
        easy: [
          { id: "ts-gen-e1", title: "Generic Function", content: `function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42);\nconst str = identity("hello");` },
        ],
        medium: [
          { id: "ts-gen-m1", title: "Generic Interface", content: `interface Result<T, E = Error> {\n  success: boolean;\n  data?: T;\n  error?: E;\n}\n\nfunction ok<T>(data: T): Result<T> {\n  return { success: true, data };\n}\n\nfunction fail<E>(error: E): Result<never, E> {\n  return { success: false, error };\n}` },
        ],
        hard: [
          { id: "ts-gen-h1", title: "Type-Safe Events", content: `type EventMap = {\n  "user:login": { userId: string; timestamp: number };\n  "user:logout": { userId: string };\n  "data:sync": { items: number; duration: number };\n};\n\nclass TypedEmitter<Events extends Record<string, unknown>> {\n  private handlers = new Map<string, Set<Function>>();\n\n  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void) {\n    if (!this.handlers.has(event as string)) {\n      this.handlers.set(event as string, new Set());\n    }\n    this.handlers.get(event as string)!.add(handler);\n    return () => this.handlers.get(event as string)?.delete(handler);\n  }\n\n  emit<K extends keyof Events>(event: K, data: Events[K]) {\n    this.handlers.get(event as string)?.forEach(fn => fn(data));\n  }\n}\n\nconst emitter = new TypedEmitter<EventMap>();` },
        ],
      },
    },
    {
      name: "Utility Types",
      snippets: {
        easy: [
          { id: "ts-util-e1", title: "Partial Required", content: `interface Config {\n  host: string;\n  port: number;\n  debug: boolean;\n}\n\nfunction updateConfig(\n  current: Config,\n  partial: Partial<Config>\n): Config {\n  return { ...current, ...partial };\n}` },
        ],
        medium: [
          { id: "ts-util-m1", title: "Pick Omit Record", content: `interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  avatar: string;\n}\n\npublic type PublicUser = Omit<User, "password">;\npublic type UserPreview = Pick<User, "id" | "name" | "avatar">;\npublic type UserMap = Record<string, PublicUser>;\n\nconst users: UserMap = {\n  "1": { id: "1", name: "Alice", email: "a@b.com", avatar: "" },\n};` },
        ],
        hard: [
          { id: "ts-util-h1", title: "Deep Partial & Strict", content: `type DeepPartial<T> = T extends object\n  ? { [P in keyof T]?: DeepPartial<T[P]> }\n  : T;\n\ntype StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;\n\ntype Immutable<T> = {\n  readonly [P in keyof T]: T[P] extends object\n    ? Immutable<T[P]>\n    : T[P];\n};\n\ninterface AppState {\n  user: {\n    name: string;\n    preferences: {\n      theme: string;\n      language: string;\n    };\n  };\n  notifications: Array<{ id: string; message: string }>;\n}\n\ntype ReadonlyState = Immutable<AppState>;\ntype PartialState = DeepPartial<AppState>;` },
        ],
      },
    },
  ],
};

const dartSnippets: LanguageDefinition = {
  id: "dart",
  name: "Dart",
  color: "#0175C2",
  icon: "Dt",
  categories: [
    {
      name: "Classes",
      snippets: {
        easy: [
          { id: "dart-class-e1", title: "Basic Class", content: `class Person {\n  String name;\n  int age;\n\n  Person(this.name, this.age);\n\n  void introduce() {\n    print("Hi, I am \$name, \$age years old.");\n  }\n}` },
        ],
        medium: [
          { id: "dart-class-m1", title: "Inheritance", content: `abstract class Shape {\n  double get area;\n  String describe() => "Area: \${area.toStringAsFixed(2)}";\n}\n\nclass Circle extends Shape {\n  final double radius;\n  Circle(this.radius);\n\n  @override\n  double get area => 3.14159 * radius * radius;\n}\n\nclass Rectangle extends Shape {\n  final double width, height;\n  Rectangle(this.width, this.height);\n\n  @override\n  double get area => width * height;\n}` },
        ],
        hard: [
          { id: "dart-class-h1", title: "Mixin Pattern", content: `mixin Logger {\n  void log(String message) {\n    print("[\${runtimeType}] \$message");\n  }\n}\n\nmixin Validator {\n  bool validate(String value) {\n    return value.isNotEmpty;\n  }\n}\n\nclass UserService with Logger, Validator {\n  Future<void> createUser(String name, String email) async {\n    if (!validate(name)) {\n      log("Invalid name");\n      throw ArgumentError("Name is required");\n    }\n    log("Creating user: \$name");\n    await _saveToDatabase(name, email);\n    log("User created successfully");\n  }\n\n  Future<void> _saveToDatabase(String name, String email) async {\n    // Database logic here\n  }\n}` },
        ],
      },
    },
    {
      name: "Collections",
      snippets: {
        easy: [
          { id: "dart-coll-e1", title: "Lists and Maps", content: `final numbers = [1, 2, 3, 4, 5];\nfinal doubled = numbers.map((n) => n * 2).toList();\n\nfinal scores = {\n  "Alice": 95,\n  "Bob": 87,\n  "Charlie": 92,\n};\n\nprint(doubled);\nprint(scores["Alice"]);` },
        ],
        medium: [
          { id: "dart-coll-m1", title: "Stream Operations", content: `Stream<int> numberStream() async* {\n  for (int i = 1; i <= 10; i++) {\n    await Future.delayed(Duration(seconds: 1));\n    yield i;\n  }\n}\n\nFuture<void> main() async {\n  await for (final number in numberStream()) {\n    print("Number: \$number");\n    if (number == 5) break;\n  }\n}` },
        ],
        hard: [
          { id: "dart-coll-h1", title: "Complex Data", content: `class Repository<T> {\n  final Map<String, T> _store = {};\n\n  void add(String id, T item) => _store[id] = item;\n  T? get(String id) => _store[id];\n  void remove(String id) => _store.remove(id);\n\n  List<T> find(bool Function(T) predicate) {\n    return _store.values.where(predicate).toList();\n  }\n\n  Map<String, T> filter(bool Function(String, T) predicate) {\n    return Map.fromEntries(\n      _store.entries.where((e) => predicate(e.key, e.value)),\n    );\n  }\n}` },
        ],
      },
    },
    {
      name: "Null Safety",
      snippets: {
        easy: [
          { id: "dart-null-e1", title: "Nullable Types", content: `String? nullableName = null;\nString nonNullName = "default";\n\nnullableName ??= "fallback";\nprint(nullableName.length);` },
        ],
        medium: [
          { id: "dart-null-m1", title: "Safe Navigation", content: `class Address {\n  String? city;\n  String? zipCode;\n}\n\nclass User {\n  String name;\n  Address? address;\n\n  User(this.name, {this.address});\n\n  String get city {\n    return address?.city ?? "Unknown";\n  }\n}` },
        ],
        hard: [
          { id: "dart-null-h1", title: "Pattern Matching", content: `sealed class Result<T> {\n  const Result();\n}\n\nclass Success<T> extends Result<T> {\n  final T data;\n  const Success(this.data);\n}\n\nclass Failure<T> extends Result<T> {\n  final String message;\n  const Failure(this.message);\n}\n\nString describe<T>(Result<T> result) {\n  return switch (result) {\n    Success(data: final d) => "Success: \$d",\n    Failure(message: final m) => "Error: \$m",\n  };\n}` },
        ],
      },
    },
  ],
};

const angularSnippets: LanguageDefinition = {
  id: "angular",
  name: "Angular",
  color: "#DD0031",
  icon: "Ag",
  categories: [
    {
      name: "Components",
      snippets: {
        easy: [
          { id: "ng-comp-e1", title: "Basic Component", content: `@Component({\n  selector: "app-hello",\n  template: \`\n    <h1>Hello, {{ name }}!</h1>\n    <p>Welcome to Angular.</p>\n  \`,\n})\nexport class HelloComponent {\n  name = "World";\n}` },
        ],
        medium: [
          { id: "ng-comp-m1", title: "With Input", content: `@Component({\n  selector: "app-user-card",\n  template: \`\n    <div class="card">\n      <h3>{{ user.name }}</h3>\n      <p>{{ user.email }}</p>\n      <span class="badge">{{ user.role }}</span>\n    </div>\n  \`,\n  styles: [\n    \`\n      .card { border: 1px solid #eee; padding: 1rem; border-radius: 8px; }\n      .badge { background: #007bff; color: white; padding: 2px 8px; border-radius: 4px; }\n    \`\n  ]\n})\nexport class UserCardComponent {\n  @Input() user!: { name: string; email: string; role: string };\n}` },
        ],
        hard: [
          { id: "ng-comp-h1", title: "Dynamic Component", content: `@Component({\n  selector: "app-dynamic",\n  template: \`\n    <ng-container *ngComponentOutlet="currentComponent;\n      inputs: currentInputs;\n      outputs: currentOutputs">\n    </ng-container>\n  \`\n})\nexport class DynamicComponent implements OnInit {\n  currentComponent = CardComponent;\n  currentInputs = { title: "Dynamic Card" };\n  currentOutputs = {\n    onAction: (value: string) => console.log(value)\n  };\n\n  ngOnInit() {\n    this.loadComponent();\n  }\n\n  private loadComponent() {\n    // Dynamic component loading logic\n  }\n}` },
        ],
      },
    },
    {
      name: "Services",
      snippets: {
        easy: [
          { id: "ng-svc-e1", title: "Basic Service", content: `@Injectable({ providedIn: "root" })\nexport class MathService {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n}` },
        ],
        medium: [
          { id: "ng-svc-m1", title: "HTTP Service", content: `@Injectable({ providedIn: "root" })\nexport class ApiService {\n  private baseUrl = "/api";\n\n  constructor(private http: HttpClient) {}\n\n  getUsers(): Observable<User[]> {\n    return this.http.get<User[]>(\`\${this.baseUrl}/users\`);\n  }\n\n  createUser(user: Partial<User>): Observable<User> {\n    return this.http.post<User>(\`\${this.baseUrl}/users\`, user);\n  }\n\n  updateUser(id: string, data: Partial<User>): Observable<User> {\n    return this.http.put<User>(\`\${this.baseUrl}/users/\${id}\`, data);\n  }\n\n  deleteUser(id: string): Observable<void> {\n    return this.http.delete<void>(\`\${this.baseUrl}/users/\${id}\`);\n  }\n}` },
        ],
        hard: [
          { id: "ng-svc-h1", title: "State Service", content: `@Injectable({ providedIn: "root" })\nexport class StateService {\n  private state = new BehaviorSubject<AppState>(initialState);\n  state$ = this.state.asObservable();\n\n  select<K>(key: K): Observable<AppState[K]> {\n    return this.state$.pipe(\n      map(state => state[key]),\n      distinctUntilChanged()\n    );\n  }\n\n  dispatch(action: AppAction): void {\n    const current = this.state.value;\n    const next = appReducer(current, action);\n    this.state.next(next);\n  }\n}` },
        ],
      },
    },
    {
      name: "Directives",
      snippets: {
        easy: [
          { id: "ng-dir-e1", title: "Highlight Directive", content: `@Directive({\n  selector: "[appHighlight]",\n  standalone: true,\n})\nexport class HighlightDirective {\n  @Input() appHighlight = "yellow";\n\n  constructor(private el: ElementRef) {}\n\n  @HostListener("mouseenter") onMouseEnter() {\n    this.highlight(this.appHighlight);\n  }\n\n  @HostListener("mouseleave") onMouseLeave() {\n    this.highlight("");\n  }\n\n  private highlight(color: string) {\n    this.el.nativeElement.style.backgroundColor = color;\n  }\n}` },
        ],
        medium: [
          { id: "ng-dir-m1", title: "Click Outside", content: `@Directive({\n  selector: "[clickOutside]",\n  standalone: true,\n})\nexport class ClickOutsideDirective {\n  @Output() clickOutside = new EventEmitter<void>();\n\n  constructor(private elementRef: ElementRef) {}\n\n  @HostListener("document:click", ["$event.target"])\n  onClick(target: HTMLElement) {\n    const isInside = this.elementRef.nativeElement.contains(target);\n    if (!isInside) {\n      this.clickOutside.emit();\n    }\n  }\n}` },
        ],
        hard: [
          { id: "ng-dir-h1", title: "Debounce Input", content: `@Directive({\n  selector: "[appDebounceInput]",\n  standalone: true,\n})\nexport class DebounceInputDirective implements OnInit, OnDestroy {\n  @Output() debouncedInput = new EventEmitter<string>();\n  @Input() debounceTime = 300;\n\n  private destroy$ = new Subject<void>();\n\n  constructor(private host: ElementRef) {}\n\n  ngOnInit() {\n    fromEvent(this.host.nativeElement, "input")\n      .pipe(\n        map((e) => (e.target as HTMLInputElement).value),\n        debounceTime(this.debounceTime),\n        distinctUntilChanged(),\n        takeUntil(this.destroy$)\n      )\n      .subscribe((value) => this.debouncedInput.emit(value));\n  }\n\n  ngOnDestroy() {\n    this.destroy$.next();\n    this.destroy$.complete();\n  }\n}` },
        ],
      },
    },
  ],
};

const vueSnippets: LanguageDefinition = {
  id: "vue",
  name: "Vue",
  color: "#4FC08D",
  icon: "Vu",
  categories: [
    {
      name: "Script Setup",
      snippets: {
        easy: [
          { id: "vue-setup-e1", title: "Basic Setup", content: `<script setup>\nimport { ref } from "vue";\n\nconst count = ref(0);\nconst increment = () => count.value++;\n</script>\n\n<template>\n  <button @click="increment">Count: {{ count }}</button>\n</template>` },
        ],
        medium: [
          { id: "vue-setup-m1", title: "With Props", content: `<script setup>\nimport { computed } from "vue";\n\nconst props = defineProps({\n  items: { type: Array, required: true },\n  sortBy: { type: String, default: "name" },\n});\n\nconst emit = defineEmits(["select", "remove"]);\n\nconst sorted = computed(() => {\n  return [...props.items].sort((a, b) =>\n    a[props.sortBy]?.localeCompare(b[props.sortBy])\n  );\n});\n</script>\n\n<template>\n  <ul>\n    <li v-for="item in sorted" :key="item.id" @click="emit('select', item)">\n      {{ item.name }}\n      <button @click.stop="emit('remove', item.id)">X</button>\n    </li>\n  </ul>\n</template>` },
        ],
        hard: [
          { id: "vue-setup-h1", title: "Composable", content: `<script setup>\nimport { useFetch } from "@/composables/useFetch";\nimport { usePagination } from "@/composables/usePagination";\n\nconst { page, perPage, total } = usePagination();\n\nconst { data, loading, error } = useFetch(\n  computed(() => \`/api/posts?page=\${page.value}&limit=\${perPage.value}\`)\n);\n</script>\n\n<template>\n  <div>\n    <div v-if="loading">Loading...</div>\n    <div v-else-if="error">{{ error.message }}</div>\n    <ul v-else>\n      <li v-for="post in data" :key="post.id">{{ post.title }}</li>\n    </ul>\n    <nav>\n      <button :disabled="page <= 1" @click="page--">Prev</button>\n      <span>Page {{ page }}</span>\n      <button @click="page++">Next</button>\n    </nav>\n  </div>\n</template>` },
        ],
      },
    },
    {
      name: "Reactive State",
      snippets: {
        easy: [
          { id: "vue-reactive-e1", title: "Ref and Reactive", content: `<script setup>\nimport { ref, reactive } from "vue";\n\nconst count = ref(0);\nconst state = reactive({\n  name: "Alice",\n  items: [],\n});\n\nconst addItem = (item) => {\n  state.items.push(item);\n};\n</script>` },
        ],
        medium: [
          { id: "vue-reactive-m1", title: "Store Pattern", content: `<script setup>\nimport { reactive, computed } from "vue";\n\nconst store = reactive({\n  todos: [],\n  filter: "all",\n});\n\nconst filtered = computed(() => {\n  switch (store.filter) {\n    case "active":\n      return store.todos.filter(t => !t.done);\n    case "completed":\n      return store.todos.filter(t => t.done);\n    default:\n      return store.todos;\n  }\n});\n\nconst remaining = computed(() =>\n  store.todos.filter(t => !t.done).length\n);\n\nfunction addTodo(text) {\n  store.todos.push({ id: Date.now(), text, done: false });\n}\n\nfunction toggleTodo(id) {\n  const todo = store.todos.find(t => t.id === id);\n  if (todo) todo.done = !todo.done;\n}\n</script>` },
        ],
        hard: [
          { id: "vue-reactive-h1", title: "Composable Store", content: `import { reactive, computed, inject, provide } from "vue";\n\nconst STORE_KEY = Symbol("store");\n\nexport function createStore(initialState) {\n  const state = reactive(initialState);\n\n  const actions = {\n    increment() { state.count++; },\n    decrement() { state.count--; },\n    reset() { Object.assign(state, initialState); },\n  };\n\n  const getters = {\n    doubleCount: computed(() => state.count * 2),\n    isPositive: computed(() => state.count > 0),\n  };\n\n  return { state, ...actions, ...getters };\n}\n\nexport function useStore() {\n  const store = inject(STORE_KEY);\n  if (!store) throw new Error("Store not provided");\n  return store;\n}\n\nexport function provideStore(store) {\n  provide(STORE_KEY, store);\n}` },
        ],
      },
    },
  ],
};

export const allLanguages: LanguageDefinition[] = [
  htmlSnippets,
  cssSnippets,
  javascriptSnippets,
  reactSnippets,
  nextjsSnippets,
  typescriptSnippets,
  dartSnippets,
  angularSnippets,
  vueSnippets,
];

export function getLanguage(id: string): LanguageDefinition | undefined {
  return allLanguages.find((l) => l.id === id);
}

export function getCategories(languageId: string): string[] {
  const lang = getLanguage(languageId);
  return lang ? lang.categories.map((c) => c.name) : [];
}

export function getSnippets(
  languageId: string,
  category: string,
  difficulty: "easy" | "medium" | "hard",
) {
  const lang = getLanguage(languageId);
  if (!lang) return [];
  const cat = lang.categories.find((c) => c.name === category);
  if (!cat) return [];
  return cat.snippets[difficulty] || [];
}

export function getRandomSnippet(
  languageId: string,
  category: string,
  difficulty: "easy" | "medium" | "hard",
) {
  const snippets = getSnippets(languageId, category, difficulty);
  if (snippets.length === 0) return null;
  return snippets[Math.floor(Math.random() * snippets.length)];
}
