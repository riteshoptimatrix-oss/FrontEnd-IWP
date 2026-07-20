import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import { GameBoard } from "@/components/tech-logo-match/game-board";

export const metadata: Metadata = buildMetadata({
  title: "Play Tech Logo Match | OptiMatrix",
  description:
    "Test your frontend technology recognition skills. Identify 23+ technologies by their official logos in this interactive game.",
  path: "/optimatrix/tech-logo-match/play",
});

export default function PlayTechLogoMatchPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <GameBoard />
    </div>
  );
}
