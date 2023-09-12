"use client"
import {useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { AuthContext } from './AuthContext';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState({});
  const pathname  = usePathname();
  const router  = useRouter();
  if(pathname === "/admin") router.push('/admin/signin', { scroll: false })


  return (
    <main>
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
    </main>
  )
}
