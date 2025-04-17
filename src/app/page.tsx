"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const trackers = localStorage.getItem("trackers");

  useEffect(() => {
    if (trackers) {
      router.push("/trackers-calendar");
    } else {
      router.push("/quiz");
    }
  }, [router, trackers]);
}
