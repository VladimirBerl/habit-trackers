import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Root } from "@/components/root";
import { QueryProviders } from "@/components/query-provider";
import { cn } from "@/lib/utils";
import { miniApp } from "@telegram-apps/sdk-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Add trackers and track their progress.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(miniApp.isDark() && "dark")}>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <div className="overflow-y-auto h-full p-5! pt-14! touch-manipulation">
          <QueryProviders>
            <Root>{children}</Root>
          </QueryProviders>
        </div>
      </body>
    </html>
  );
}
