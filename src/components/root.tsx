"use client";

import { type PropsWithChildren } from "react";
import { initTelegramSdk } from "@/core/init-telegram-sdk";

import { useClientOnce } from "@/hooks/useClientOnce";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";

import { IS_DEV } from "@/config";
import { LoadingPage } from "@/components/loading-page";

export const Root = ({ children }: PropsWithChildren) => {
  if (IS_DEV) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  useClientOnce(() => {
    initTelegramSdk();
  });

  const didMount = useDidMount();

  return didMount ? <>{children}</> : <LoadingPage />;
};
