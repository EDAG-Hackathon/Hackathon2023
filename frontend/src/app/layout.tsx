"use client";
import { Inter } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <html lang="de">
        <body className={inter.className} style={{ margin: 0 }}>
          {children}
        </body>
      </html>
    </LocalizationProvider>
  );
}
