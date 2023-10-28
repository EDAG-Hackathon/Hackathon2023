"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
