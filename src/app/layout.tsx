import type { Metadata } from "next";
import { Nunito, Lora } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hong Yi Zhang — Software Developer",
  description:
    "Personal portfolio of Hong Yi Zhang — ECE student at Olin College, software engineer, and builder of AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${lora.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-bordeaux font-sans">
        {children}
      </body>
    </html>
  );
}
