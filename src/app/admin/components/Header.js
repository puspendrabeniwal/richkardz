"use client"
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
                    {/* <div className="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
                        <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item here show menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <span className="menu-title">Dashboards</span>
                                    <span className="menu-arrow d-lg-none"></span>
                                </span>
                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                                    <div className="menu-item">
                                        <a className="menu-link active py-3" href="../../demo1/dist/index.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Multipurpose</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link py-3" href="../../demo1/dist/dashboards/ecommerce.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">eCommerce</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link py-3" href="../../demo1/dist/dashboards/projects.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Projects</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link py-3" href="../../demo1/dist/dashboards/online-courses.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Online Courses</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link py-3" href="../../demo1/dist/dashboards/marketing.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Marketing</span>
                                        </a>
                                    </div>
                                    <div className="menu-item">
                                        <a className="menu-link py-3" href="../../demo1/dist/dashboards/bidding.html">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">Bidding</span>
                                        </a>
                                    </div>
                                    <div className="menu-inner flex-column collapse" id="kt_aside_menu_collapse_2">
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/logistics.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Logistics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/delivery.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Delivery</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/website-analytics.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Website Analytics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/finance-performance.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Finance Performance</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/store-analytics.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Store Analytics</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/social.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Social</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/crypto.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Crypto</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/school.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">School</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/dashboards/podcast.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Podcast</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link py-3" href="../../demo1/dist/landing.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Landing</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <a className="btn btn-flex btn-color-success fs-base p-0 ms-2 mb-2 collapsible collapsed rotate" data-bs-toggle="collapse" href="#kt_aside_menu_collapse_2" data-kt-toggle-text="Show Less">
                                                <span data-kt-toggle-text-target="true">Show 10 More</span>
                                            
                                                <span className="svg-icon ms-2 svg-icon-3 rotate-180">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.5" d="M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z" fill="currentColor" />
                                                        <path d="M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="d-flex align-items-stretch flex-shrink-0">
                    <div className="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                        <div className="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                            <img src="https://mern.richkardz.com/uploads/user/1693837872188widget9.jpg" alt="user" />
                        </div>
                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
                            <div className="menu-item px-3">
                                <div className="menu-content d-flex align-items-center px-3">
                                    <div className="symbol symbol-50px me-5">
                                        <img alt="Logo" src={user?.full_image_path} />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="fw-bolder d-flex align-items-center fs-5">{user?.full_name}
                                        {/* <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span> */}
                                        </div>
                                        <a href="#" className="fw-bold text-muted text-hover-primary fs-7">{user?.email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="separator my-2"></div>
                            {/* <div className="menu-item px-5">
                                <a href="../../demo1/dist/account/overview.html" className="menu-link px-5">My Profile</a>
                            </div>
                            <div className="menu-item px-5">
                                <a href="../../demo1/dist/apps/projects/list.html" className="menu-link px-5">
                                    <span className="menu-text">My Projects</span>
                                    <span className="menu-badge">
                                        <span className="badge badge-light-danger badge-circle fw-bolder fs-7">3</span>
                                    </span>
                                </a>
                            </div>
                            <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                <a href="#" className="menu-link px-5">
                                    <span className="menu-title">My Subscription</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/referrals.html" className="menu-link px-5">Referrals</a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/billing.html" className="menu-link px-5">Billing</a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/statements.html" className="menu-link px-5">Payments</a>
                                    </div>
                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/statements.html" className="menu-link d-flex flex-stack px-5">Statements
                                        <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="View your statements"></i></a>
                                    </div>
                                    <div className="separator my-2"></div>
                                    <div className="menu-item px-3">
                                        <div className="menu-content px-3">
                                            <label className="form-check form-switch form-check-custom form-check-solid">
                                                <input className="form-check-input w-30px h-20px" type="checkbox" value="1" checked="checked" name="notifications" />
                                                <span className="form-check-label text-muted fs-7">Notifications</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="menu-item px-5">
                                <a href="../../demo1/dist/account/statements.html" className="menu-link px-5">My Statements</a>
                            </div> */}

                            

                            {/* <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                <a href="#" className="menu-link px-5">
                                    <span className="menu-title position-relative">Language
                                    <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
                                    <img className="w-15px h-15px rounded-1 ms-2" src="assets/media/flags/united-states.svg" alt="" /></span></span>
                                </a>
                                <div className="menu-sub menu-sub-dropdown w-175px py-4">

                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/settings.html" className="menu-link d-flex px-5 active">
                                        <span className="symbol symbol-20px me-4">
                                            <img className="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                        </span>English</a>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/settings.html" className="menu-link d-flex px-5">
                                        <span className="symbol symbol-20px me-4">
                                            <img className="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                        </span>Spanish</a>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/settings.html" className="menu-link d-flex px-5">
                                        <span className="symbol symbol-20px me-4">
                                            <img className="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                        </span>German</a>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/settings.html" className="menu-link d-flex px-5">
                                        <span className="symbol symbol-20px me-4">
                                            <img className="rounded-1" src="assets/media/flags/japan.svg" alt="" />
                                        </span>Japanese</a>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="../../demo1/dist/account/settings.html" className="menu-link d-flex px-5">
                                        <span className="symbol symbol-20px me-4">
                                            <img className="rounded-1" src="assets/media/flags/france.svg" alt="" />
                                        </span>French</a>
                                    </div>

                                </div>

                            </div> */}

                            <div className="menu-item px-5 my-1">
                                <Link href="/admin/user_profile" className="menu-link px-5">Account Settings</Link>
                            </div>

                            <div className="menu-item px-5 my-1">
                                <Link href="/admin/change_password" className="menu-link px-5">Change Password</Link>
                            </div>
                            <div className="separator my-2"></div>
                            <div className="menu-item px-5">
                                <Link href="#" onClick={logout} className="menu-link px-5">Sign Out</Link>
                            </div>

                            {/* <div className="separator my-2"></div> */}

                            {/* <div className="menu-item px-5">
                                <div className="menu-content px-5">
                                    <label className="form-check form-switch form-check-custom form-check-solid pulse pulse-success" for="kt_user_menu_dark_mode_toggle">
                                        <input className="form-check-input w-30px h-20px" type="checkbox" value="1" name="mode" id="kt_user_menu_dark_mode_toggle" data-kt-url="../../demo1/dist/index.html" />
                                        <span className="pulse-ring ms-n1"></span>
                                        <span className="form-check-label text-gray-600 fs-7">Dark Mode</span>
                                    </label>
                                </div>
                            </div> */}

                        </div>

                    </div>
                    <div className="d-flex align-items-center d-lg-none ms-2 me-n3" title="Show header menu">
                        <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle">
                            <span className="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z" fill="currentColor" />
                                    <path opacity="0.3" d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z" fill="currentColor" />
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