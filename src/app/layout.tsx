// app/layout.tsx
import type { Metadata } from "next";
import { Outfit, Merriweather, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Merriweather is not a variable font, so specifying weights is required
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Repair Intake",
  description: "Repair shop intake and outlet management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${merriweather.variable} ${firaCode.variable}`}
    >
      {/* Sets Outfit as the default font across the app */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
