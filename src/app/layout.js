"use client";

import "./globals.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { usePathname } from "next/navigation";

import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";

export default function RootLayout({ children }) {
  const useParamsss = usePathname().split("/");
  return (
    (useParamsss.includes("admin") || 
    useParamsss.includes("user") || 
    useParamsss.includes("brands") || 
    useParamsss.includes("gifting-visiting-card") || 
    useParamsss.includes("digital-visiting-cards") || 
    useParamsss.includes("digital-visiting-card")
    ) ? <PrimeReactProvider>{children}</PrimeReactProvider> : 
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Boost networking with NFC digital smart business cards. Verily exchange info with tap cards, personalised and embedded with NFC technology. Order the best NFC card! "/>
        <meta name="facebook-domain-verification" content="3el9jw76p53cmhce2pe8f97uho2bg4" />
        <title>Custom NFC Business Cards | NFC Embedded Business Cards – Richkardz&#039;s</title>

        <link
          rel="shortcut icon"
          href="/admin/assets/media/logos/favicon.png"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="/front/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/common.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/animate.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/swiper-bundle.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      
        <body className="bodyMain">
          <Header />
          <PrimeReactProvider>{children}</PrimeReactProvider>
          <Footer />
        </body>
      </html>
 
  );
}
