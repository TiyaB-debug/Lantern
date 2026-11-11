import type { Metadata } from "next";
import SplashScreen from "@/components/SplashScreen";
import "./design.css";
import "./ui-tokens.css";

export const metadata: Metadata = {
  title: "Lantern: your future, a little clearer",
  description:
    "Turn your interests into a practical plan for life after college, with one doable step at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions like Grammarly add attributes to <body> */}
      <body suppressHydrationWarning>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}