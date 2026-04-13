import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bardown - Sporting Events Calendar",
  description: "Keep your sporting events organized with Bardown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kodeMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">{children}</body>
    </html>
  );
}
