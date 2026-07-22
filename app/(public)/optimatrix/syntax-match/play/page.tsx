import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import { GameBoard } from "@/components/syntax-match/game-board";

export const metadata: Metadata = buildMetadata({
  title: "Play Syntax Match | OptiMatrix",
  description:
    "Train your programming memory by matching syntax, components, APIs, hooks and coding concepts.",
  path: "/optimatrix/syntax-match/play",
});

export default function PlaySyntaxMatchPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gold/[0.02] via-background to-background">
      <GameBoard />
    </div>
  );
}
