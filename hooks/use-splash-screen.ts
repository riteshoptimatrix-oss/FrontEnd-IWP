"use client";

import { useEffect, useState } from "react";

const SPLASH_DURATION = 2200;
const STORAGE_KEY = "iwp_splash_seen";

export function useSplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") return;
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, SPLASH_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  return visible;
}
