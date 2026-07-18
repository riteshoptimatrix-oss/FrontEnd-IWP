interface SectionDividerProps {
  variant?: "gradient" | "wave" | "line";
}

export function SectionDivider({ variant = "gradient" }: SectionDividerProps) {
  if (variant === "wave") {
    return (
      <div aria-hidden className="relative h-24 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="absolute bottom-0 h-24 w-full text-border/30"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V120H0V40Z"
            fill="currentColor"
            opacity={0.5}
          />
          <path
            d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z"
            fill="currentColor"
            opacity={0.3}
          />
        </svg>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div aria-hidden className="flex justify-center py-8">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    );
  }

  return (
    <div aria-hidden className="relative h-32 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gold/[0.02] to-background" />
      <div className="absolute left-1/2 top-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15" />
    </div>
  );
}
