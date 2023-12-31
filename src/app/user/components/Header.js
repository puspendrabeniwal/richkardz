"use client";
import Link from "next/link";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import React, { useEffect, useContext, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const Header = () => {
  const menuLeft = useRef(null);
  const items = [
    {
      template: (item, options) => {
        return (
          <div
            className="menu menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <div className="menu-content d-flex align-items-center px-3">
                <div className="symbol symbol-50px me-5">
                  <Image
                    alt="Logo"
                    src={user?.full_image_path}
                    height={40}
                    width={40}
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
              <Link href="/user/dashboard" className="menu-link px-5">
                Home
              </Link>
            </div>
            <div className="menu-item px-5 my-1">
              <Link
                href={`/user/user_profile/${user?._id}`}
                className="menu-link px-5"
              >
                User Profile
              </Link>
            </div>

            <div className="menu-item px-5 my-1">
              <Link href="/user/change_password" className="menu-link px-5">
                Change Password
              </Link>
            </div>
            <div className="menu-item px-5 my-1">
              <Link href={`/user/public_view/${user?._id}`} className="menu-link px-5">
                Public View
              </Link>
            </div>
            <div className="separator my-2"></div>
            <div className="menu-item px-5">
              <Link href="#" onClick={() =>confirm()} className="menu-link px-5">
                Log Out
              </Link>
            </div>
          </div>
        );
      },
    },
  ];
  const toast = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      console.log(localStorage.getItem("loginDetail"))
      setUser(JSON.parse(localStorage.getItem("loginDetail")));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loginDetail");
    window.location.replace("/login");
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to logout?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => logout()
    });
  };

  return (
    <div id="kt_header" className="header align-items-stretch">
      <div className="container-fluid d-flex align-items-stretch justify-content-between">
        <div
          className="d-flex align-items-center d-lg-none ms-n2 me-2"
          title="Show aside menu"
        >
          <div
            className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
            id="kt_aside_mobile_toggle"
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
                  d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                  fill="currentColor"
                />
                <path
                  opacity="0.3"
                  d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <Link href="/admin/dashboard" className="d-lg-none">
            <img
              alt="Logo"
              src="../admin/assets/media/logos/logo-1-dark.png"
              className="h-30px"
            />
          </Link>
        </div>
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          <div className="d-flex align-items-stretch" id="kt_header_nav"></div>
          <div className="d-flex align-items-stretch flex-shrink-0">
            <div
              className="d-flex align-items-center ms-1 ms-lg-3"
              id="kt_header_user_menu_toggle"
            >
              <div
                className="cursor-pointer symbol symbol-30px symbol-md-40px"
                onClick={(event) => menuLeft.current.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup
              >
                <Image
                  src={user?.full_image_path}
                  height={40}
                  width={40}
                  alt="user"
                />
              </div>
              <Menu
                style={{ width: "277px" }}
                model={items}
                popup
                ref={menuLeft}
              />
            </div>
            <Toast ref={toast} />
            <ConfirmDialog />
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
