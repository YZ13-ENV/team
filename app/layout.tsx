import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "ui/dist/style.css";

const first_font = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "500", "400", "300", "200"],
  variable: "--root-font",
});

export const metadata: Metadata = {
  title: "Team",
  description: "Created by DM Team",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  return (
    <html
      lang="en"
      className={`${first_font.className} ${first_font.variable}`}
    >
      <body id='root' className="min-h-screen dark">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
