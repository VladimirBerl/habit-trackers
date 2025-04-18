"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTrackerStore } from "@/store/useTrackerStore";

import { TrackerCard } from "@/features/tracker/components/tracker-card";
import { ContextOrHoldTrigger } from "@/features/tracker/components/context-or-hold-trigger";
import Row from "@/components/icon/row";
import Add from "@/components/icon/add";
import Progress from "@/components/icon/progress";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { formatDayMonth } from "../lib/date";
import { HabitTracker } from "../schemas";
import { Page } from "@/components/page";

export const TrackersCalendar = () => {
  const router = useRouter();
  const tracker = useTrackerStore((state) => state.trackers);

  const [dataTracker, setDataTracker] = useState<HabitTracker[] | null>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPreviousDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);

      if (isToday) return prev;
      return newDate;
    });
  };

  useEffect(() => {
    setDataTracker(tracker);
  }, [tracker]);

  const isToday = (() => {
    const today = new Date();
    const selected = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected.getTime() === today.getTime();
  })();

  return (
    <Page back={false} className="flex flex-col justify-between gap-4 h-full">
      <ul className="space-y-4 pb-32">
        {dataTracker && dataTracker.length ? (
          dataTracker
            .filter((el) => el.weekday.includes((selectedDate.getDay() + 6) % 7))
            .map((el) => (
              <li key={el.id}>
                <ContextOrHoldTrigger id={el.id} currentDate={selectedDate}>
                  <TrackerCard currentDate={selectedDate} {...el} />
                </ContextOrHoldTrigger>
              </li>
            ))
        ) : (
          <div className="text-center text-lg font-bold">Not active trackers</div>
        )}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 p-5 pt-1 bg-background flex gap-1 justify-between">
        <div className="flex justify-between items-center">
          <Button className="p-0!" variant="clear" onClick={goToPreviousDay}>
            <Row className="size-8!"/>
          </Button>
          <p className="text-[1.75rem] font-semibold leading-[1.75rem] text-center min-w-[110px] max-[399px]:min-w-max max-[399px]:break-all">{formatDayMonth(selectedDate)}</p>
          <Button variant="clear" disabled={isToday} className={cn("p-0!", isToday && "text-foreground/50")} onClick={goToNextDay}>
            <Row className="rotate-180 size-8!" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="clear"
            onClick={() => router.push("/new-tracker")}
            className="flex flex-col gap-1 items-center justify-between bg-[#4378ff19] hover:bg-[#4378ff3a] rounded-xl h-max w-max"
          >
            <Add className="shrink-0 size-6" />
            <p className="text-[#007AFF] font-semibold text-sm">Add new</p>
          </Button>
          <Button
            variant="clear"
            onClick={() => router.push("/progress")}
            className="flex flex-col gap-1 items-center justify-between bg-[#4378ff19] hover:bg-[#4378ff3a] rounded-xl h-max w-max"
          >
            <Progress className="shrink-0 size-6" />
            <p className="text-[#007AFF] font-semibold text-sm">Add new</p>
          </Button>
        </div>
      </div>
    </Page>
  );
};
