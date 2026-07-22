"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { MonitorPlay, Code2, Brush, FileJson, SplitSquareHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "html" | "css" | "javascript";

export function HtmlCompiler() {
  const [html, setHtml] = useState("<h1>Hello World</h1>\n<p>Welcome to the HTML Compiler.</p>");
  const [css, setCss] = useState("body {\n  font-family: sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  margin: 0;\n  background-color: #f8fafc;\n  color: #0f172a;\n}\n\nh1 {\n  color: #2563eb;\n}");
  const [js, setJs] = useState("console.log('Compiler is ready!');");
  const [activeTab, setActiveTab] = useState<Tab>("html");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="flex flex-col lg:flex-row h-[75svh] w-full min-h-[600px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
      
      {/* Editor Section */}
      <div className="flex flex-col flex-1 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
        
        {/* Editor Tabs */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-200 bg-slate-100/50">
          <div className="flex items-center gap-2 bg-slate-200/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("html")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === "html" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Code2 className="w-4 h-4" />
              HTML
            </button>
            <button
              onClick={() => setActiveTab("css")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === "css" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Brush className="w-4 h-4" />
              CSS
            </button>
            <button
              onClick={() => setActiveTab("javascript")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === "javascript" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <FileJson className="w-4 h-4" />
              JS
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 min-h-[300px]">
          <Editor
            height="100%"
            language={activeTab}
            theme="vs-dark"
            value={activeTab === "html" ? html : activeTab === "css" ? css : js}
            onChange={(val) => {
              const value = val || "";
              if (activeTab === "html") setHtml(value);
              if (activeTab === "css") setCss(value);
              if (activeTab === "javascript") setJs(value);
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              padding: { top: 16 },
              formatOnPaste: true,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex flex-col flex-1 bg-white">
        <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <MonitorPlay className="w-4 h-4 text-emerald-600" />
            Live Preview
          </div>
          <SplitSquareHorizontal className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex-1 min-h-[300px] p-2 bg-slate-100/50">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            className="w-full h-full bg-white border border-slate-200 rounded-lg shadow-inner"
          />
        </div>
      </div>

    </div>
  );
}
