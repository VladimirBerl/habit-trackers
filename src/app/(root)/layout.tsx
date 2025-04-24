"use client";

import { useCallback, useEffect, useState } from "react";
import { initData, useSignal, viewport, miniApp } from "@telegram-apps/sdk-react";
import { setLocale } from "@/core/i18n/locale";
import { localesMap } from "@/core/i18n/config";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const user = useSignal(initData.user);

  const fullscreen = async () => {
    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen();
      viewport.isFullscreen();
    }
  };

  const setLocaleTelegram = useCallback(async () => {
    alert(user?.language_code)
    if (user?.language_code) {
      await setLocale(user.language_code);
    } else {
      await setLocale(localesMap[0].key);
    }
  }, [user]);

  useEffect(() => {
    if (miniApp) {
      miniApp.ready();
      fullscreen();
      setIsDark(miniApp.isDark());
    }
  }, []);

  useEffect(() => {
    setLocaleTelegram();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return children;
}
