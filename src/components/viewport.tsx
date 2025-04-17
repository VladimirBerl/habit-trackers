import * as TelegramSDK from "@telegram-apps/sdk-react";

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  console.log(TelegramSDK);

  return <div>{children}</div>;
};
