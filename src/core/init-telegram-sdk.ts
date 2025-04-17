import { backButton, initData, init as initSDK, isTMA, viewport, miniApp, themeParams } from "@telegram-apps/sdk-react";

export async function initTelegramSdk(): Promise<void> {
  if (await isTMA("complete")) {
    initSDK();
    initData.restore();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    backButton.isSupported() && backButton.mount();

    themeParams.mountSync();
    miniApp.mountSync();
    initData.restore();
    void viewport
      .mount()
      .then(() => {
        viewport.bindCssVars();
      })
      .catch((e) => {
        console.error("Something went wrong mounting the viewport", e);
      });

    // Define components-related CSS variables.
    miniApp.bindCssVars();
    themeParams.bindCssVars();
  }
  return;
}
