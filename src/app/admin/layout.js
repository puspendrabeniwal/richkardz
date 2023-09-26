"use client"
import {useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { AuthContext } from './AuthContext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
export default function AdminLayout({ children }) {
  const [user, setUser] = useState({});
  const pathname  = usePathname();



  return (
    <html lang="en">
        <head>
          <link rel="shortcut icon" href="/admin/assets/media/logos/favicon.png" />

          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet"/>
          <link href="/admin/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
          <link href="/admin/assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
          <link href="/admin/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
          <link href="/admin/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
        </head>
        <body id="kt_body" className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style={{"--kt-toolbar-height":"55px","--kt-toolbar-height-tablet-and-mobile":"55px"}}>
          {(pathname !== "/admin/signin" && pathname !== "/admin") ? 
            <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
              <AuthContext.Provider value={{user, setUser}}>
                <Sidebar />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                  <Header />
                  {children}
                  <Footer />  
                </div>
                </AuthContext.Provider>
            </div>
          </div>
          :children}
 
          <script  src="/admin/assets/plugins/global/plugins.bundle.js" async></script>
          <script  src="/admin/assets/js/scripts.bundle.js" async></script>
        </body>
      </html>
  )
}
