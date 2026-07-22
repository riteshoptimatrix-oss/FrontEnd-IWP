"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Video, Calendar, Clock } from "lucide-react";

const webinars = [
  {
    title: "Building AI-Powered Web Apps with Next.js",
    speaker: "Ritesh Kumar, Lead Engineer",
    date: "Sep 20, 2026",
    time: "10:00 AM PST",
    status: "Upcoming",
  },
  {
    title: "The ROI of Premium UX Design",
    speaker: "Design Team",
    date: "Aug 05, 2026",
    time: "On-Demand",
    status: "Recorded",
  }
];

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-fuchsia-100 text-fuchsia-600">
              <Video className="size-6" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Webinars & Events</h1>
          </div>
          <p className="text-lg text-slate-500 max-w-2xl">
            Join our live technical sessions or watch past webinars on-demand.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar, i) => (
            <m.div
              key={webinar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-lg hover:border-fuchsia-200"
            >
              <div className="aspect-video bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10" />
                <Video className="size-12 text-fuchsia-200" />
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                    webinar.status === "Upcoming" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                  }`}>
                    {webinar.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{webinar.title}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="size-4" /> {webinar.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="size-4" /> {webinar.time}
                  </div>
                </div>
                <button className="w-full rounded-lg bg-fuchsia-50 px-4 py-2.5 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100">
                  {webinar.status === "Upcoming" ? "Register Now" : "Watch Recording"}
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}
