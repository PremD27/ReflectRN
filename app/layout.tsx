import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Sidebar from "./ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ReflectRN",
  description: "A reflective practice log for nurses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${lora.variable} ${inter.variable} font-sans`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}