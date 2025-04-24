'use client';

import { Page } from "@/components/page";
import { ProgressList } from "@/features/tracker/components/progress-list";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProgressPage() {
  const router = useRouter();
    const trackers = localStorage.getItem("quiz-answers");
  
    useEffect(() => {
      if (!trackers) {
        router.push("/quiz");
      }
    }, [router, trackers]);

  return (
    <Page back className="pt-16!">
      <ProgressList />
    </Page>
  );
}
