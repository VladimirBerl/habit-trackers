import { z } from "zod";

export type HabitTracker = {
  id: string;
  description: string;
  repeat: number;
  weekday: number[];
  target: number;
  createdAt: string;
  completedDays: {
    [date: string]: {
      count: number;
      skipped?: boolean;
      forcedStatus?: "done" | "not_done";
    };
  };
};

export const createTrackerSchema = z.object({
  id: z.string(),
  description: z.string().min(2, "Required"),
  repeat: z.number().min(1, "Required"),
  weekday: z.number().array().min(1, "Required"),
  target: z.number().min(1, "Required"),
  createdAt: z.string(),
  completedDays: z.object({}),
});

export const weekDays = [
  { label: "Mo", value: 0 },
  { label: "Tu", value: 1 },
  { label: "We", value: 2 },
  { label: "Th", value: 3 },
  { label: "Fr", value: 4 },
  { label: "Sa", value: 5 },
  { label: "Su", value: 6 },
];

export const targetsCompliance = [
  { label: "1 week", value: 7 },
  { label: "2 weeks", value: 14 },
  { label: "1 month", value: 29 },
  { label: "3 months", value: 87 },
  { label: "6 months", value: 183 },
  { label: "1 year", value: 365 },
];
