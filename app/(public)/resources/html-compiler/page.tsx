"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Code2, Play, RefreshCw, LayoutTemplate, Save } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function HtmlCompilerPage() {
  const [htmlCode, setHtmlCode] = React.useState(
    `<div class="container">\n  <h1>Hello, World!</h1>\n  <p>Start writing your HTML here.</p>\n</div>\n\n<style>\n  .container {\n    font-family: sans-serif;\n    text-align: center;\n    padding: 2rem;\n    background: #f0fdf4;\n    border-radius: 1rem;\n    color: #166534;\n  }\n</style>`
  );
  const [previewUrl, setPreviewUrl] = React.useState("");

  React.useEffect(() => {
    let processedHtml = htmlCode;
    // Fix navigation to about.html -> #about
    processedHtml = processedHtml.replace(/href=["'](\/resources\/)?about\.html["']/gi, 'href="#about"');
    // Remove style.css links to prevent 404s in single-file mode
    processedHtml = processedHtml.replace(/<link[^>]*href=["'](\/resources\/)?style\.css["'][^>]*>/gi, '<!-- style.css not supported in single-file mode -->');

    const blob = new Blob([processedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRun = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    let processedHtml = htmlCode;
    processedHtml = processedHtml.replace(/href=["'](\/resources\/)?about\.html["']/gi, 'href="#about"');
    processedHtml = processedHtml.replace(/<link[^>]*href=["'](\/resources\/)?style\.css["'][^>]*>/gi, '<!-- style.css not supported in single-file mode -->');

    const blob = new Blob([processedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 text-violet-600">
              <Code2 className="size-6" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">HTML Compiler</h1>
          </div>
          <p className="text-lg text-slate-500 max-w-2xl">
            Write, test, and compile HTML, CSS, and JavaScript directly in your browser.
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          {/* Editor Column */}
          <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Code2 className="size-4" /> index.html
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border border-slate-200 shadow-sm"
                >
                  <Save className="size-4" /> Save Code
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  <Play className="size-4" /> Run
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <Editor
                height="100%"
                defaultLanguage="html"
                theme="light"
                value={htmlCode}
                onChange={(val) => setHtmlCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  formatOnPaste: true,
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                  suggestOnTriggerCharacters: true,
                  padding: { top: 16 },
                }}
              />
            </div>
          </div>

          {/* Preview Column */}
          <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-600">Preview</span>
              <button
                onClick={handleRun}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Refresh Preview"
              >
                <RefreshCw className="size-4" />
              </button>
            </div>
            <iframe
              title="HTML Preview"
              className="flex-1 w-full bg-white"
              src={previewUrl || undefined}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
