"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Search, X, Copy, Check, AlertCircle, Info } from "lucide-react";

function HighlightedText({ text, regex, flags }: { text: string; regex: string; flags: string }) {
  try {
    const re = new RegExp(regex, flags.includes("g") ? flags : `g${flags}`);
    const matches: { index: number; length: number }[] = [];
    let match;
    while ((match = re.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length });
      if (!flags.includes("g")) break;
    }
    if (matches.length === 0) return <span className="text-slate-400">{text}</span>;
    const parts: React.ReactNode[] = [];
    let last = 0;
    for (const m of matches) {
      if (m.index > last) parts.push(<span key={`t-${last}`}>{text.slice(last, m.index)}</span>);
      parts.push(
        <mark key={`m-${m.index}`} className="rounded-sm bg-yellow-200/70 px-0.5 text-slate-900">
          {text.slice(m.index, m.index + m.length)}
        </mark>
      );
      last = m.index + m.length;
    }
    if (last < text.length) parts.push(<span key={`t-${last}`}>{text.slice(last)}</span>);
    return <>{parts}</>;
  } catch {
    return <span className="text-slate-400">{text}</span>;
  }
}

function getMatchDetails(text: string, regex: string, flags: string) {
  try {
    const re = new RegExp(regex, flags.includes("g") ? flags : `g${flags}`);
    const matches: { full: string; index: number; groups: Record<string, string> }[] = [];
    let match;
    while ((match = re.exec(text)) !== null) {
      const groups: Record<string, string> = {};
      if (match.groups) {
        for (const key of Object.keys(match.groups)) {
          groups[key] = match.groups[key];
        }
      }
      matches.push({ full: match[0], index: match.index, groups });
      if (!flags.includes("g")) break;
    }
    return { matches, error: null };
  } catch (e) {
    return { matches: [], error: (e as Error).message };
  }
}

export default function RegexPatternTesterPage() {
  const [pattern, setPattern] = React.useState("(\\w+)@(\\w+)\\.(\\w+)");
  const [testString, setTestString] = React.useState("hello@example.com\nuser@domain.org\ninvalid-email");
  const [flags, setFlags] = React.useState("gi");
  const [replacement, setReplacement] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [showReplace, setShowReplace] = React.useState(false);

  let regexError: string | null = null;
  let regexInstance: RegExp | null = null;
  try {
    regexInstance = new RegExp(pattern, flags);
  } catch (e) {
    regexError = (e as Error).message;
  }

  const details = getMatchDetails(testString, pattern, flags);

  let replaceResult = "";
  if (!regexError && replacement && testString) {
    try {
      const re = new RegExp(pattern, flags);
      replaceResult = testString.replace(re, replacement);
    } catch {
      replaceResult = "Invalid replacement pattern";
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/optimatrix"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="size-4" />
          Back to OptiMatrix
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-50 text-rose-600 ring-1 ring-rose-200/40">
            <Search className="size-6" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Regex Pattern Tester
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Test and debug regular expressions in real-time. Enter a pattern, choose flags, and see matches highlighted instantly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column - Inputs */}
          <div className="space-y-5">
            {/* Pattern input */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Regular Expression</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-rose-500">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-7 pr-3 font-mono text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono text-rose-500">/{flags}</span>
              </div>
              {regexError && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="size-3" />
                  {regexError}
                </p>
              )}
            </div>

            {/* Flags */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Flags</label>
              <div className="flex flex-wrap gap-2">
                {["g", "i", "m", "s", "u", "y"].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      if (flags.includes(f)) {
                        setFlags(flags.replace(f, ""));
                      } else {
                        setFlags(flags + f);
                      }
                    }}
                    className={`inline-flex h-8 w-10 items-center justify-center rounded-lg font-mono text-sm font-medium transition-all ${
                      flags.includes(f)
                        ? "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                <span><strong className="text-slate-500">g</strong> global</span>
                <span><strong className="text-slate-500">i</strong> case-insensitive</span>
                <span><strong className="text-slate-500">m</strong> multiline</span>
                <span><strong className="text-slate-500">s</strong> dotall</span>
                <span><strong className="text-slate-500">u</strong> unicode</span>
                <span><strong className="text-slate-500">y</strong> sticky</span>
              </div>
            </div>

            {/* Test string */}
            <div>
              <div className="flex items-center justify-between">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Test String</label>
                <button
                  onClick={() => setShowReplace(!showReplace)}
                  className="text-xs font-medium text-rose-600 hover:text-rose-700"
                >
                  {showReplace ? "Hide Replace" : "Replace"}
                </button>
              </div>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter test string..."
                rows={8}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 px-3 font-mono text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
              />
            </div>

            {/* Replacement (optional) */}
            {showReplace && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Replacement Pattern</label>
                <input
                  type="text"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="$1-$2-$3"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 px-3 font-mono text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
                />
              </div>
            )}
          </div>

          {/* Right column - Results */}
          <div className="space-y-5">
            {/* Match info */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Match Results</h3>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                {details.error ? (
                  <p className="flex items-center gap-1.5 text-sm text-red-500">
                    <AlertCircle className="size-4" />
                    {details.error}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-500">Matches:</span>
                      <span className="font-semibold text-slate-900">{details.matches.length}</span>
                      {details.matches.length > 0 && (
                        <button
                          onClick={() => copyToClipboard(details.matches.map((m) => m.full).join("\n"))}
                          className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600"
                        >
                          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      )}
                    </div>
                    {details.matches.length > 0 && (
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {details.matches.map((m, i) => (
                          <div key={i} className="rounded-md bg-slate-50 p-2 font-mono text-xs">
                            <div className="flex items-center justify-between text-slate-400">
                              <span>Match #{i + 1}</span>
                              <span>Index: {m.index}</span>
                            </div>
                            <div className="mt-0.5 text-slate-900 break-all">{m.full}</div>
                            {Object.keys(m.groups).length > 0 && (
                              <div className="mt-1 border-t border-slate-200 pt-1 text-slate-500">
                                {Object.entries(m.groups).map(([key, val]) => (
                                  <div key={key} className="flex gap-2">
                                    <span className="font-medium text-rose-600">{key}:</span>
                                    <span className="text-slate-700">{val}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Highlighted preview */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Preview
                <span className="ml-2 text-xs font-normal text-slate-400">(matched text highlighted)</span>
              </h3>
              <div className="min-h-[120px] rounded-lg border border-slate-200 bg-white p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {regexError ? (
                  <span className="text-red-400">Invalid regex pattern</span>
                ) : (
                  <HighlightedText text={testString} regex={pattern} flags={flags} />
                )}
              </div>
            </div>

            {/* Replace result */}
            {showReplace && replacement && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">Replace Result</h3>
                <div className="min-h-[60px] rounded-lg border border-slate-200 bg-white p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-900">
                  {replaceResult}
                </div>
              </div>
            )}

            {/* Quick reference */}
            <details className="rounded-lg border border-slate-200 bg-white">
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Info className="size-4 text-slate-400" />
                Quick Regex Reference
              </summary>
              <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                <table className="w-full">
                  <tbody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-slate-100">
                    {[
                      [".", "Any character"],
                      ["\\w", "Word character"],
                      ["\\d", "Digit"],
                      ["\\s", "Whitespace"],
                      ["^", "Start of string"],
                      ["$", "End of string"],
                      ["*", "Zero or more"],
                      ["+", "One or more"],
                      ["?", "Optional"],
                      ["{n}", "Exactly n times"],
                      ["(abc)", "Capture group"],
                      ["(?:abc)", "Non-capturing group"],
                      ["(?=abc)", "Lookahead"],
                      ["(?!abc)", "Negative lookahead"],
                      ["[abc]", "Character set"],
                      ["a|b", "Alternation"],
                    ].map(([pat, desc]) => (
                      <tr key={pat}>
                        <td className="py-1.5 pr-4 font-mono text-rose-600">{pat}</td>
                        <td className="py-1.5 text-slate-500">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
