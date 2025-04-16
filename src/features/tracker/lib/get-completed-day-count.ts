import { HabitTracker } from "../schemas";

export const getCompletedDayCount = (completedDays: HabitTracker["completedDays"], repeat: number): number => {
  return Object.values(completedDays).filter((day) => day.count >= repeat || day.forcedStatus === "done").length;
};
