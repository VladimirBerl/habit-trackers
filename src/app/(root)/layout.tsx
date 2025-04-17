"use client";

import { useEffect, useState } from "react";
import * as TelegramSDK from "@telegram-apps/sdk-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const fullscreen = async () => {
    if (TelegramSDK.viewport.requestFullscreen.isAvailable()) {
      await TelegramSDK.viewport.requestFullscreen();
      TelegramSDK.viewport.isFullscreen();
    }
  };

  useEffect(() => {
    if (TelegramSDK) {
      TelegramSDK.miniApp.ready();
      fullscreen();
      setIsDark(TelegramSDK.miniApp.isDark());
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return children;
}
