"use client";

import * as React from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, Video, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

const TIMEZONES = [
  "IST (UTC+5:30)",
  "EST (UTC-5)",
  "PST (UTC-8)",
  "GMT (UTC+0)",
  "CET (UTC+1)",
  "AEST (UTC+10)",
];

function MiniCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  const today = 15;
  const [selected, setSelected] = React.useState<number | null>(null);

  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="rounded-xl border border-border/40 bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold">July 2026</h4>
        <div className="flex gap-1">
          <button type="button" className="rounded-lg p-1 text-muted-foreground hover:bg-secondary" aria-label="Previous month">
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" className="rounded-lg p-1 text-muted-foreground hover:bg-secondary" aria-label="Next month">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const valid = day >= 1 && day <= 31;
          const isToday = day === today;
          const isSelected = day === selected;
          const isPast = day < today && valid;
          return (
            <button
              key={day}
              type="button"
              disabled={!valid || isPast}
              onClick={() => valid && !isPast && setSelected(day)}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-all duration-150",
                !valid && "invisible",
                isPast && "text-muted-foreground/30 cursor-not-allowed",
                isToday && !isSelected && "bg-gold/10 text-gold ring-1 ring-gold/20",
                isSelected && "bg-gold text-white shadow-sm",
                valid && !isPast && !isToday && !isSelected && "hover:bg-secondary text-foreground/80",
              )}
            >
              {valid ? day : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MeetingScheduler({ className }: { className?: string }) {
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [timezone, setTimezone] = React.useState(TIMEZONES[0]);
  const [selectedDate, setSelectedDate] = React.useState<number | null>(null);

  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden", className)}>
      <div className="p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Calendar + Timezone */}
          <div className="space-y-4">
            <MiniCalendar />

            <div>
              <label htmlFor="tz-select" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock className="size-4 text-gold" />
                Timezone
              </label>
              <select
                id="tz-select"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50 appearance-none cursor-pointer"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Time slots */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Available times</h4>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200",
                    selectedSlot === slot
                      ? "border-gold/40 bg-gold/10 text-gold shadow-sm"
                      : "border-border/60 bg-background hover:border-gold/20 hover:bg-gold/5 text-foreground/80",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Video className="size-4 text-gold" />
                Google Meet — link sent after confirmation
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-gold" />
                Or in-person at our Ahmedabad office
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full mt-6"
              disabled={!selectedSlot}
            >
              <Calendar className="size-4" />
              {selectedSlot ? `Book ${selectedSlot}` : "Select a time slot"}
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground/60">
              This is a UI demo — no meeting is actually booked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
