"use client";

import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const Page = ({
  className,
  children,
  back = true,
}: PropsWithChildren<{
  back?: boolean;
  className?: string;
}>) => {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      if (backButton.show.isAvailable()) {
        backButton.show();
      }
    } else {
      if (backButton.hide.isAvailable()) {
        backButton.hide();
      }
    }
  }, [back]);

  useEffect(() => {
    if (backButton.onClick.isAvailable()) {
      return backButton.onClick(() => {
        router.back();
      });
    }
  }, [router]);

  return <section className={cn("h-full", className)}>{children}</section>;
};
