"use client";

import { hapticFeedback } from "@telegram-apps/sdk-react";

import { useTrackerStore } from "@/store/useTrackerStore";
import { cn } from "@/lib/utils";
import { getDateKey } from "../lib/date";
import { getCompletedDayCount } from "@/features/tracker/lib/get-completed-day-count";

import { HabitTracker } from "../schemas";
import Close from "@/components/icon/close";

interface TrackerCardProps extends HabitTracker {
  className?: string;
  currentDate: Date;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onTouchMove?: () => void;
  onTouchCancel?: () => void;
}

export const TrackerCard = ({
  id,
  description,
  repeat,
  target,
  completedDays,
  className,
  currentDate,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  onTouchCancel,
}: TrackerCardProps) => {
  const { logRepeat } = useTrackerStore();
  const dateKey = getDateKey(currentDate);
  const todayStatus = completedDays[dateKey];

  const daysLeft = target - getCompletedDayCount(completedDays, repeat);

  const isCompletedRepeat = todayStatus?.count >= repeat;
  const isManuallyDone = daysLeft <= 0;
  const isManuallyNotDone = todayStatus?.forcedStatus === "not_done";
  const isSkipped = todayStatus?.skipped;

  const addOneRepeat = () => {
    logRepeat(id, currentDate);
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("medium");
    }
  };

  // 🔵 Принудительно выполнен
  if (isManuallyDone) {
    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        className={cn(
          "relative flex flex-col gap-2 px-4 py-3 rounded-xl shadow bg-white cursor-pointer overflow-hidden",
          className
        )}
      >
        <div className="z-10 flex items-center justify-between gap-1">
          <div>
            <h3 className="text-lg capitalize">{description}</h3>
          </div>
          <div className="text-[1.75rem] leading-[1.75rem] font-semibold text-end text-nowrap max-[320px]:text-wrap">{`100% done`}</div>
        </div>

        <div className="absolute top-0 left-0 h-full w-[100%] bg-[#FFD427] z-0 transition-all" />
      </div>
    );
  }

  // 🔴 Принудительно НЕ выполнен
  if (isManuallyNotDone) {
    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        className={cn(
          "flex items-center justify-between gap-1 px-4 py-3 rounded-xl shadow bg-[#DADADA] dark:bg-[#3B3B3B] cursor-pointer",
          className
        )}
      >
        <div>
          <h3 className="text-lg">{description}</h3>
          <p className="text-foreground/40">Not completed</p>
        </div>
        <Close className="shrink-0" />
      </div>
    );
  }

  if (isSkipped) {
    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        className={cn(
          "flex items-center justify-between gap-1 px-4 py-3 rounded-xl shadow bg-[#DADADA] opacity-50 cursor-pointer",
          className
        )}
      >
        <div>
          <h3 className="text-lg">{description}</h3>
          <p className="text-foreground/40">Today&apos;s left</p>
        </div>
        <div className="text-[1.75rem] leading-[1.75rem] font-semibold">
          {repeat - (todayStatus?.count ?? 0)}
        </div>
      </div>
    );
  }

  // 🟢 Выполнено за день
  if (isCompletedRepeat) {
    const progress = ((target - daysLeft) / target) * 100;

    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        className={cn(
          "relative flex flex-col gap-2 px-4 py-3 rounded-xl shadow bg-white cursor-pointer overflow-hidden",
          className
        )}
      >
        <div className="z-10 flex items-center justify-between gap-1">
          <div>
            <h3 className="text-lg break-all">{description}</h3>
            <p className="text-foreground/40">{`${daysLeft} days left`}</p>
          </div>
          <div className="text-[1.75rem] leading-[1.75rem] font-semibold text-end text-nowrap max-[320px]:text-wrap">{`${progress.toFixed(
            0
          )}% done`}</div>
        </div>

        <div
          className="absolute top-0 left-0 h-full w-[0%] bg-[#FFD427] z-0 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  // 🔄 Обычный трекер — ещё выполняется
  return (
    <div
      onClick={addOneRepeat}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchCancel={onTouchCancel}
      className={cn(
        "flex items-center justify-between gap-1 px-4 py-3 rounded-xl shadow bg-white cursor-pointer",
        className
      )}
    >
      <div>
        <h3 className="text-lg">{description}</h3>
        <p className="text-foreground/40">Today&apos;s left</p>
      </div>
      <div className="text-[1.75rem] leading-[1.75rem] font-semibold">
        {repeat - (todayStatus?.count ?? 0)}
      </div>
    </div>
  );
};
