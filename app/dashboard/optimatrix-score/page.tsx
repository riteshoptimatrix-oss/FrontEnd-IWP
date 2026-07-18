"use client";

import * as React from "react";
import { m } from "framer-motion";
import {
  Zap, TrendingUp, Globe, Eye, Shield, Search, BarChart3,
  LineChart, Clock, Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export default function OptiMatrixScorePage() {
  return (
    <div className="space-y-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">OptiMatrix Score</h1>
          <p className="text-muted-foreground">Your website performance and optimization metrics</p>
        </div>
        <Button variant="gold" size="sm">
          <Zap className="size-4" /> New Analysis
        </Button>
      </m.div>

      {/* Empty state */}
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gold/10">
                <TrendingUp className="size-8 text-gold" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No analyses yet</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Run your first OptiMatrix analysis to see your website performance score and detailed metrics.
              </p>
              <Button variant="gold" size="sm" className="mt-4">
                <Zap className="size-4" /> Run First Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </m.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Trend Graph Placeholder */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LineChart className="size-5" /> Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20">
                <div className="text-center">
                  <Activity className="mx-auto size-10 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">No trend data yet</p>
                  <p className="text-xs text-muted-foreground/60">Historical score tracking will appear after your first analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Category Breakdown Placeholder */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="size-5" /> Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto size-10 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">No breakdown data yet</p>
                  <p className="text-xs text-muted-foreground/60">Detailed category analysis will appear after your first analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </div>

      {/* Recent Analysis History */}
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="size-5" /> Recent Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <Globe className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No analyses yet</p>
              <p className="text-xs text-muted-foreground/60">Your analysis history will appear here</p>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
