"use client";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css"; //icons
import { PrimeReactProvider } from "primereact/api";

export const metadata = {
  title: "RICH KARDZ",
  description: "Revolutionise your Networking game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
