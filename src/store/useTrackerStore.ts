import { create } from "zustand";
import { HabitTracker } from "@/features/tracker/schemas";
import { getDateKey } from "@/features/tracker/lib/date";

type TrackerStore = {
  trackers: HabitTracker[];
  getTracker: (id: string) => HabitTracker | undefined;
  addTracker: (tracker: HabitTracker) => void;
  removeTracker: (id: string) => void;
  updateTracker: (id: string, update: (tracker: HabitTracker) => HabitTracker) => void;
  logRepeat: (id: string, date: Date) => void;
  undoRepeat: (id: string, date: Date) => void;
  undoChanges: (id: string, date: Date) => void;
  skipDay: (id: string, date: Date) => void;
  completedDay: (id: string, date: Date) => void;
  markStatus: (id: string, date: Date, status: "done" | "not_done") => void;
};

export const useTrackerStore = create<TrackerStore>()(
  (set, get) => {
    const initialState: HabitTracker[] = localStorage.getItem("trackers")
      ? JSON.parse(localStorage.getItem("trackers")!)
      : [];

    const persistTrackers = (trackers: HabitTracker[]) => {
      localStorage.setItem("trackers", JSON.stringify(trackers));
    };

    const updateTrackersState = (updater: (state: TrackerStore) => { trackers: HabitTracker[] }) => {
      set((state) => {
        const newState = updater(state);
        persistTrackers(newState.trackers);
        return newState;
      });
    };

    return {
      trackers: initialState,

      getTracker: (id) => get().trackers.find((t) => t.id === id),

      addTracker: (tracker) =>
        updateTrackersState((state) => ({
          trackers: [...state.trackers, tracker],
        })),

      removeTracker: (id) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.filter((t) => t.id !== id),
        })),

      updateTracker: (id, updater) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((t) => (t.id === id ? updater(t) : t)),
        })),

      logRepeat: (id, date) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            const entry = tracker.completedDays[key] || { count: 0 };
            if (entry.count >= tracker.repeat) return tracker;
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: { ...entry, count: entry.count + 1 },
              },
            };
          }),
        })),

      undoRepeat: (id, date) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            const entry = tracker.completedDays[key];
            if (!entry || entry.count <= 0) return tracker;
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: { ...entry, count: 0 },
              },
            };
          }),
        })),

      undoChanges: (id, date) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: { count: 0 },
              },
            };
          }),
        })),

      skipDay: (id, date) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: {
                  ...(tracker.completedDays[key] || {}),
                  skipped: true,
                },
              },
            };
          }),
        })),

      completedDay: (id, date) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: { count: tracker.repeat },
              },
            };
          }),
        })),

      markStatus: (id, date, status) =>
        updateTrackersState((state) => ({
          trackers: state.trackers.map((tracker) => {
            if (tracker.id !== id) return tracker;
            const key = getDateKey(date);
            return {
              ...tracker,
              completedDays: {
                ...tracker.completedDays,
                [key]: {
                  ...(tracker.completedDays[key] || {}),
                  forcedStatus: status,
                },
              },
            };
          }),
        })),
    };
  }
);
