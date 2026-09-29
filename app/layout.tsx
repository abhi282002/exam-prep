import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCProvider } from "@/src/trpc/provider";
import "./globals.css";

const geistSansFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMonoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExamPrep - Personal Mock Exam Preparation Platform",
  description: "Turn practice into progress with timed mock tests and detailed analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSansFont.variable} ${geistMonoFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-100 text-neutral-900 selection:bg-blue-100 selection:text-blue-900">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
