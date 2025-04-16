import { backButton, initData, init as initSDK, isTMA } from "@telegram-apps/sdk-react";

export async function initTelegramSdk(): Promise<void> {
  if (await isTMA("complete")) {
    initSDK();
    initData.restore();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    backButton.isSupported() && backButton.mount();
  }
  return;
}
