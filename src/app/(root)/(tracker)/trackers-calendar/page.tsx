"use client";

import { TrackersCalendar } from "@/features/tracker/components/trackers-calendar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrackersCalendarPage() {
  const router = useRouter();
  const trackers = localStorage.getItem("quiz-answers");

  useEffect(() => {
    if (trackers) {
      router.push("/trackers-calendar");
    } else {
      router.push("/quiz");
    }
  }, [router, trackers]);

  return (
    <div>
      <TrackersCalendar />
    </div>
  );
}
