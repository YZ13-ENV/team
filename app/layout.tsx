import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import { WebVitals } from "ui";
import "ui/dist/style.css";
import "./globals.css";


const first_font = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "500", "400", "300", "200"],
  variable: "--root-font",
});

export const metadata: Metadata = {
  title: "Team",
  description: "Created by DM Team",
};
export const viewport: Viewport = {
  themeColor: "#000",
  colorScheme: "dark"
}

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
        <WebVitals appId="darkmaterial-team" />
        {children}
      </body>
    </html>
  );
}
