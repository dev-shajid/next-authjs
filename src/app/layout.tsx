import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex items-center justify-center",
          // fontSans.variable
        )}

      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
        />

        {children}
      </body>
    </html>
  );
}
