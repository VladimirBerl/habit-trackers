import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Root } from "@/components/root";
import { QueryProviders } from "@/components/query-provider";
import { cn } from "@/lib/utils";
import { miniApp } from "@telegram-apps/sdk-react";
import { I18nProvider } from "@/core/i18n/provider";
import { getLocale } from 'next-intl/server';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={cn(!miniApp.isDark() && "dark")}>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <div className="overflow-y-auto h-full px-5! pt-12! pb-12! touch-manipulation">
        <I18nProvider>
          <QueryProviders>
            <Root>{children}</Root>
          </QueryProviders>
          </I18nProvider>
        </div>
      </body>
    </html>
  );
}
