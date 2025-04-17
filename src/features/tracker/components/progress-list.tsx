"use client";

import { useEffect, useState } from "react";
import { useTrackerStore } from "@/store/useTrackerStore";
import { format, subDays } from "date-fns";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrackerProgress } from "./progress-trackers";

import { targetsCompliance, HabitTracker } from "../schemas";
import { ChevronDown } from "lucide-react";

export const ProgressList = () => {
  const today = new Date();
  const [range, setRange] = useState(30);

  const allTrackers = useTrackerStore((state) => state.trackers);
  const [trackers, setTrackers] = useState<HabitTracker[] | []>([]);

  const fromDate = subDays(today, range - 1);
  const toDate = today;

  const sameMonth = fromDate.getMonth() === toDate.getMonth() && fromDate.getFullYear() === toDate.getFullYear();

  const formattedRange = sameMonth
    ? `${format(fromDate, "dd")} - ${format(toDate, "dd MMM")}`
    : `${format(fromDate, "dd MMM")} - ${format(toDate, "dd MMM")}`;

  useEffect(() => {
    setTrackers(allTrackers);
  }, [allTrackers]);

  return (
    <div className="">
      <h3 className="uppercase font-bold text-[2.125rem] mb-5">Progress</h3>

      <div className="flex items-center justify-between gap-1 mb-8">
        <p className="font-medium">
          {formattedRange}
        </p>

        <Select value={range.toString()} onValueChange={(value) => setRange(Number(value))}>
          <SelectTrigger className="w-max border-none shadow-none ml-auto gap-1 p-0 font-medium text-base">
            <SelectValue className="font-medium" placeholder="Select a range" />
            <ChevronDown className="text-foreground" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {targetsCompliance.map((r) => (
                <SelectItem key={r.value} value={r.value.toString()}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ul className="space-y-4">
        {trackers.length > 0 ? (
          allTrackers.map((tracker) => (
            <li key={tracker.id}>
              <TrackerProgress tracker={tracker} range={range} today={today} />
            </li>
          ))
        ) : (
          <div className="text-center font-semibold text-lg">No trackers</div>
        )}
      </ul>
    </div>
  );
};
