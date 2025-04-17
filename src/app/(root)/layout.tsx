"use client";
import { useEffect, useState } from "react";
import * as TelegramSDK from "@telegram-apps/sdk-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (TelegramSDK) {
      TelegramSDK.miniApp.ready();
      setIsDark(TelegramSDK.miniApp.isDark());
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return children;
}
