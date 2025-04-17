"use client";

import { Page } from "@/components/page";
import { NewTracker } from "@/features/tracker/components/new-tracker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewTrackerPage() {
  const router = useRouter();
  const trackers = localStorage.getItem("quiz-answers");

  useEffect(() => {
    if (!trackers) {
      router.push("/quiz");
    }
  }, [router, trackers]);

  return (
    <Page back className="h-full">
      <NewTracker />
    </Page>
  );
}
