"use client";

import "./globals.css";
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({ children }) {
  return (
      <PrimeReactProvider>{children}</PrimeReactProvider>
  );
}
