import { initData, useSignal } from "@telegram-apps/sdk-react";

export const useTelegramUserData = () => {
  return useSignal(initData.user);
};
