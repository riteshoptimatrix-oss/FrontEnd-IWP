"use client";

import { m } from "framer-motion";
import {
  BarChart3, FileText, Globe, TrendingUp, Zap,
  ArrowRight, Clock, Activity,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import Link from "next/link";

const quickActions = [
  { label: "New Analysis", description: "Run an OptiMatrix scan", href: "/dashboard/optimatrix-score", icon: Zap },
  { label: "View Reports", description: "Browse your reports", href: "/dashboard", icon: FileText },
  { label: "Update Profile", description: "Manage your account", href: "/dashboard/profile", icon: Clock },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Welcome card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-gold/5 via-white to-gold/3 dark:from-gold/5 dark:via-ink dark:to-gold/3">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {user?.full_name?.split(" ")[0] || "there"} 👋
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Here&apos;s what&apos;s happening with your projects today.
                </p>
              </div>
              <Link href="/dashboard/optimatrix-score">
                <Button variant="gold" size="md">
                  <Zap className="size-4" />
                  Run New Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Empty state */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gold/10">
                <Activity className="size-8 text-gold" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No activity yet</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Start by running your first OptiMatrix analysis to see your project metrics and activity here.
              </p>
              <Link href="/dashboard/optimatrix-score" className="mt-4">
                <Button variant="gold" size="sm">
                  <Zap className="size-4" /> Run First Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </m.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <m.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex items-center justify-between rounded-xl border border-border/50 p-4 transition-all hover:border-gold/30 hover:bg-gold/3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <action.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{action.label}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Empty recent activity */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-8 text-center">
                <Activity className="size-10 text-muted-foreground/30" />
                <p className="mt-3 text-sm text-muted-foreground">No activity yet</p>
                <p className="text-xs text-muted-foreground/60">Activity will appear here as you use the platform</p>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </div>

      {/* Empty Recent projects */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <Globe className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No projects yet</p>
              <p className="text-xs text-muted-foreground/60">Your projects will appear here once you start using the platform</p>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
