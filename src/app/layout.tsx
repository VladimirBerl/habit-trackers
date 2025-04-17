import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Root } from "@/components/root";
import { QueryProviders } from "@/components/query-provider";
import { Viewport } from "@/components/viewport";

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
    <html lang="en">
      <body className={`${inter.variable} antialiased h-full p-5!`}>
        <QueryProviders>
          <Root>
            <Viewport>{children}</Viewport>
          </Root>
        </QueryProviders>
      </body>
    </html>
  );
}
