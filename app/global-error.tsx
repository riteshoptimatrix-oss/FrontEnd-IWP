"use client";

import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "#0b1220",
          color: "#fff",
          margin: 0,
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: "28rem", margin: 0 }}>
          A critical error occurred. Please try reloading the page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            borderRadius: "0.5rem",
            background: "#d4af37",
            color: "#0b1220",
            border: 0,
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
