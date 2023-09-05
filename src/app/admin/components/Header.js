"use client";
import Link from "next/link";
import React, { useEffect, useContext, useState, use} from "react";
import { AuthContext } from "../AuthContext";
const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        if(user && Object.keys(user).length===0){
            setUser(JSON.parse(localStorage.getItem("loginInfo")))
        }  
    },[])
    
    const logout =()=>{
        localStorage.removeItem("loginInfo")
        window.location.replace('/admin/signin')
    }
    console.log(user, "dsfsdfsdf");
    return (
        <div id="kt_header"  className="header align-items-stretch">
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
            <div className="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show aside menu">
                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_aside_mobile_toggle">
                    <span className="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                <a href="../../demo1/dist/index.html" className="d-lg-none">
                    <img alt="Logo" src="../admin/assets/media/logos/logo-2.svg" className="h-30px" />
                </a>
            </div>
            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                <div className="d-flex align-items-stretch" id="kt_header_nav">
          </div>
          <div className="d-flex align-items-stretch flex-shrink-0">
            <div
              className="d-flex align-items-center ms-1 ms-lg-3"
              id="kt_header_user_menu_toggle"
            >
              <div
                className="cursor-pointer symbol symbol-30px symbol-md-40px"
                data-kt-menu-trigger="click"
                data-kt-menu-attach="parent"
                data-kt-menu-placement="bottom-end"
              >
                <img src={user?.full_image_path} alt="user" />
              </div>
              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
                data-kt-menu="true"
              >
                <div className="menu-item px-3">
                  <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                      <img
                        alt="Logo"
                        src={user?.full_image_path}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="fw-bolder d-flex align-items-center fs-5">
                        {user?.full_name}
                        {/* <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span> */}
                      </div>
                      <a
                        href="#"
                        className="fw-bold text-muted text-hover-primary fs-7"
                      >
                        {user?.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="separator my-2"></div>
                <div className="menu-item px-5 my-1">
                  <Link href="/admin/user_profile" className="menu-link px-5">
                    Account Settings
                  </Link>
                </div>

                <div className="menu-item px-5 my-1">
                  <Link
                    href="/admin/change_password"
                    className="menu-link px-5"
                  >
                    Change Password
                  </Link>
                </div>
                <div className="separator my-2"></div>
                <div className="menu-item px-5">
                  <Link href="#" onClick={logout} className="menu-link px-5">
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="d-flex align-items-center d-lg-none ms-2 me-n3"
              title="Show header menu"
            >
              <div
                className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                id="kt_header_menu_mobile_toggle"
              >
                <span className="svg-icon svg-icon-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.3"
                      d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
