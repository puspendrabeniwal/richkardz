"use client";

import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Replace with your PrimeReact theme
import "primereact/resources/primereact.min.css"; // Replace with your PrimeReact CSS
import "primeicons/primeicons.css"; // Import PrimeIcons CSS
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/admin/assets/media/logos/favicon.png"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
          rel="stylesheet"
        />
        <link
          href="/admin/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/admin/assets/plugins/custom/datatables/datatables.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/admin/assets/plugins/global/plugins.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/admin/assets/css/style.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        id="kt_body"
        className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed"
        style={{
          "--kt-toolbar-height": "55px",
          "--kt-toolbar-height-tablet-and-mobile": "55px",
        }}
      >
        <PrimeReactProvider>{children}</PrimeReactProvider>
        {/* <script src="/admin/assets/plugins/global/plugins.bundle.js"></script>
        <script src="/admin/assets/js/scripts.bundle.js"></script>
        <script src="/admin/assets/js/widgets.bundle.js"></script>
        <script src="/admin/assets/js/custom/widgets.js"></script> */}
      </body>
    </html>
  );
}
