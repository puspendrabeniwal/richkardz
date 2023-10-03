"use client";

import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

export default function RootLayout({ children }) {
  return (
      <PrimeReactProvider>{children}</PrimeReactProvider>
  );
}
