"use client";

import { format, subDays } from "date-fns";
import { HabitTracker } from "../schemas";

export const TrackerProgress = ({ tracker, range, today }: { tracker: HabitTracker; range: number; today: Date }) => {

  const days = Array.from({ length: range }).map((_, i) => {
    const date = subDays(today, range - i - 1);
    const dateStr = format(date, "yyyy-MM-dd");
    const weekDay = (date.getDay() + 6) % 7;

    const status = tracker.weekday.includes(weekDay)
      ? tracker.completedDays[dateStr]?.count === tracker.repeat
        ? "done"
        : tracker.completedDays[dateStr]?.skipped
        ? "skipped"
        : tracker.completedDays[dateStr]?.forcedStatus === "not_done"
        ? "not_done"
        : "pending"
      : "off";

    return { dateStr, status };
  });

  const getColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-[#FFD427]";
      case "skipped":
        return "bg-gray-400";
      case "not_done":
        return "bg-[#D9D9D9]";
      case "pending":
        return "bg-white";
      case "off":
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold">{tracker.description}</p>
        <p className="font-semibold">
          {days.filter((day) => day.status === "done").length}/{tracker.target}
        </p>
      </div>

      <div className="flex w-full h-5 rounded-xl overflow-hidden">
        {days.map((day, i) => (
          <div
            key={i}
            title={day.dateStr}
            className={`h-full ${getColor(day.status)}`}
            style={{ width: `${100 / range}%` }}
          />
        ))}
      </div>
    </div>
  );
};
