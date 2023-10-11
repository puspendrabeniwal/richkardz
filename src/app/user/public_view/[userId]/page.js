"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { Toast } from "primereact/toast";
import instance from "../../../admin/axiosInterceptor";
import withAuth from "@/hocFront/withAuth";
import { Button } from "primereact/button";

const ViewUser = ({ params }) => {
  const toast = useRef(null);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    let loginUser = JSON.parse(localStorage.getItem("loginDetail"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.userId); //append the values with key, value pair

    instance
      .post("users/view/" + params.userId, formData)
      .then((response) => {
        setUserData(response.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex flex-column flex-column-fluid" id="kt_content">
        <div className="toolbar" id="kt_toolbar">
          <div
            id="kt_toolbar_container"
            className="container-fluid d-flex flex-stack"
          >
            <div
              data-kt-swapper="true"
              data-kt-swapper-mode="prepend"
              data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
              className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
            >
              <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                Public View
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="post d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card mb-6">
              <div className="card-body py-9">


              <div className="d-flex flex-wrap flex-sm-nowrap">
											<div className="me-7 mb-4">
												<div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
													<img src={`${
                            userData?.image_url + userData?.profile_image
                          }`} alt="Profile image" />
													<div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
												</div>
											</div>
											<div className="flex-grow-1">
												<div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
													<div className="d-flex flex-column">
														<div className="d-flex align-items-center mb-2">
															<a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bolder me-1">{userData?.full_name ? userData?.full_name : ""}</a>
															<a href="#">
																
																<span className="svg-icon svg-icon-1 svg-icon-primary">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
																		<path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="#00A3FF" />
																		<path className="permanent" d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
																	</svg>
																</span>
															</a>
														</div>

														<div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
															<a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
															
															<span className="svg-icon svg-icon-4 me-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																	<path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor" />
																	<path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor" />
																</svg>
															</span>
															{userData?.designation ? userData?.designation : ""}</a>
															<a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
															
															<span className="svg-icon svg-icon-4 me-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																	<path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
																	<path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
																</svg>
															</span>
															{userData?.address ? userData?.address : ""}</a>
															{/* <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
															
															<span className="svg-icon svg-icon-4 me-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																	<path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
																	<path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
																</svg>
															</span>
															{userData?.email ? userData?.email : ""}</a> */}
														</div>
													</div>
													<div className="d-flex my-4">
														{/* <a href="#" className="btn btn-sm btn-light me-2" id="kt_user_follow_button">
															
															<span className="svg-icon svg-icon-3 d-none">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																	<path opacity="0.3" d="M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor" />
																	<path d="M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z" fill="currentColor" />
																</svg>
															</span>
															<span className="indicator-label">Follow</span>
															<span className="indicator-progress">Please wait...
															<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
														</a> */}
	
													</div>

												</div>
                        <div className="d-flex flex-wrap flex-stack">
                          <div className="d-flex flex-column flex-grow-1 pe-8">
                            <div className="d-flex flex-wrap">
                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="fs-2 fw-bolder counted">Email</div>
                                </div>
                                <div className="fw-bold fs-6 text-gray-400">{userData?.email}</div>
                              </div>
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="fs-2 fw-bolder counted">Phone</div>
                                </div>
                                <div className="fw-bold fs-6 text-gray-400">{userData?.phone}</div>
                              </div>
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="fs-2 fw-bolder counted" >Alternate Phone</div>
                                </div>
                                <div className="fw-bold fs-6 text-gray-400">{userData?.mobile}</div>
                              </div>
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="fs-2 fw-bolder counted" >Company Name</div>
                                </div>
                                <div className="fw-bold fs-6 text-gray-400">{userData?.company_name}</div>
                              </div>
   
                              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="fs-2 fw-bolder counted" data-kt-countup="true" data-kt-countup-value="4500" data-kt-countup-prefix="$">Created</div>
                                </div>
                                <div className="fw-bold fs-6 text-gray-400">{dateFormat(userData?.created, "dddd, mmmm d, yyyy")}</div>
                              </div>
                            </div>

                          </div>
                        </div>  
											</div>
										</div>
              </div>
            </div>
            <div className="card " >
									<div className="card-header card-header-stretch">
										<div className="card-title d-flex align-items-center">

											<h3 className="fw-bolder m-0 text-gray-800">Other Detail </h3>
										</div>
									</div>
									<div className="card-body">
										<div className="tab-content">
											<div id="kt_activity_month" className="card-body p-0 tab-pane fade show active" role="tabpanel" aria-labelledby="kt_activity_month_tab">
												<div className="timeline">
                        <div className="timeline-item">
														<div className="timeline-line w-40px"></div>
														<div className="timeline-icon symbol symbol-circle symbol-40px">
															<div className="symbol-label bg-light">
																<span className="svg-icon svg-icon-2 svg-icon-gray-500">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor" />
																		<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor" />
																	</svg>
																</span>
															</div>
														</div>
		
														<div className="timeline-content mb-10 mt-n1">
	
															<div className="mb-5 pe-3">
																<a href="#" className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">About</a>
																<div className="d-flex align-items-center mt-1 fs-6">
					
																</div>
															</div>
	
															<div className="overflow-auto pb-5">
																<div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">

																	<div className="d-flex flex-aligns-center pe-10 pe-lg-20">
																			{/* <div className="text-muted me-2 fs-7">About - </div> */}
																	<div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Marcus Dotson">
																		{userData?.about}
																	</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
                          <div className="timeline-item">
														<div className="timeline-line w-40px"></div>
														<div className="timeline-icon symbol symbol-circle symbol-40px">
															<div className="symbol-label bg-light">
																<span className="svg-icon svg-icon-2 svg-icon-gray-500">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor" />
																		<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor" />
																	</svg>
																</span>
															</div>
														</div>
		
														<div className="timeline-content mb-10 mt-n1">
	
															<div className="mb-5 pe-3">
																<a href="#" className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">Social Media Links</a>
																<div className="d-flex align-items-center mt-1 fs-6">
					
																</div>
															</div>
	
															<div className="overflow-auto pb-5">
																<div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">

																	<div className="d-flex flex-aligns-center pe-10 pe-lg-20">
																			{/* <div className="text-muted me-2 fs-7">About - </div> */}
																	<div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Marcus Dotson">
                                  <div className="symbol-group symbol-hover mb-3">
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Facebook">
                                <span className="symbol-label bg-primary text-inverse-warning fw-bolder">F</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Instagram">
                                <span className="symbol-label bg-warning text-inverse-warning fw-bolder">I</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Linkedin">
                                <span className="symbol-label bg-warning text-inverse-warning fw-bolder">L</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Pinterest">
                                <span className="symbol-label bg-warning text-inverse-warning fw-bolder">P</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Twitter">
                                <span className="symbol-label bg-primary text-inverse-primary fw-bolder">T</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Whatsapp" data-bs-original-title="Whatsapp">
                              <span className="symbol-label bg-success text-inverse-primary fw-bolder">W</span>
                              </div>
                              <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Youtube" data-bs-original-title="Youtube">
                                <span className="symbol-label bg-danger text-inverse-info fw-bolder">Y</span>
                              </div>
                            </div>
																	</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
                          <div className="timeline-item">
														<div className="timeline-line w-40px"></div>
														<div className="timeline-icon symbol symbol-circle symbol-40px">
															<div className="symbol-label bg-light">
																<span className="svg-icon svg-icon-2 svg-icon-gray-500">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor" />
																		<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor" />
																	</svg>
																</span>
															</div>
														</div>
		
														<div className="timeline-content mb-10 mt-n1">
	
															<div className="mb-5 pe-3">
																<a href="#" className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">Catalogue</a>
																<div className="d-flex align-items-center mt-1 fs-6">
					
																</div>
															</div>
	
															<div className="overflow-auto pb-5">
																<div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">

																	<div className="d-flex flex-aligns-center pe-10 pe-lg-20 cursor-pointer">
																		<img alt="" className="w-30px me-3" src="/admin/assets/media/svg/files/pdf.svg" />
																		<div className="ms-1 fw-bold">
								
																			<a href={`${userData?.image_url + userData?.catalogue}`} className="fs-6 text-hover-primary fw-bolder" target="_blank" download>Download</a>
																			<div className="text-gray-400">{userData?.catalogue}</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
                          <div className="timeline-item">
														<div className="timeline-line w-40px"></div>
														<div className="timeline-icon symbol symbol-circle symbol-40px">
															<div className="symbol-label bg-light">
																<span className="svg-icon svg-icon-2 svg-icon-gray-500">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor" />
																		<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor" />
																	</svg>
																</span>
															</div>
														</div>
														<div className="timeline-content mb-10 mt-n1">
															<div className="pe-3 mb-5">
																<div className="fs-5 fw-bold mb-2">Banner Image and UPI Scanner</div>
																<div className="d-flex align-items-center mt-1 fs-6">
																	{/* <div className="text-muted me-2 fs-7">Created at 4:23 PM by</div>
																	<div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Marcus Dotson">
																		<img src="/admin/assets/media/avatars/300-2.jpg" alt="img" />
																	</div> */}
																</div>
															</div>
															<div className="overflow-auto pb-5">
																<div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                                  
                                    <div className="overlay me-10">
                                      <div className="overlay-wrapper">
                                        <img alt="img" className="rounded w-150px" src={`${userData?.image_url + userData?.banner_image}`} />
                                      </div>
                                      <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">Banner Image</a>
                                      </div>
                                    </div>
                                    <div className="overlay me-10">
                                      <div className="overlay-wrapper">
                                        <img alt="img" className="rounded w-150px" src={`${userData?.image_url + userData?.upi_scanner}`} />
                                      </div>
                                      <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">UPI Scanner</a>
                                      </div>
                                    </div>
																	
																	
																</div>
															</div>
														</div>
													</div>
													<div className="timeline-item">
														<div className="timeline-line w-40px"></div>
														<div className="timeline-icon symbol symbol-circle symbol-40px">
															<div className="symbol-label bg-light">
																<span className="svg-icon svg-icon-2 svg-icon-gray-500">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor" />
																		<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor" />
																	</svg>
																</span>
															</div>
														</div>
														<div className="timeline-content mb-10 mt-n1">
															<div className="pe-3 mb-5">
																<div className="fs-5 fw-bold mb-2">Gallery</div>
																<div className="d-flex align-items-center mt-1 fs-6">
																	{/* <div className="text-muted me-2 fs-7">Created at 4:23 PM by</div>
																	<div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Marcus Dotson">
																		<img src="/admin/assets/media/avatars/300-2.jpg" alt="img" />
																	</div> */}
																</div>
															</div>
															<div className="overflow-auto pb-5">
																<div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                                  {userData?.gallery && userData?.gallery.map((image, index) => (
                                    <div className="overlay me-10" key={index}>
                                      <div className="overlay-wrapper">
                                        <img alt="img" className="rounded w-150px" src={`${userData?.image_url + image.name}`} />
                                      </div>
                                      <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">Explore</a>
                                      </div>
                                    </div>
                                  ))}
																	
																	
																</div>
															</div>
														</div>
													</div>


												</div>
											</div>

										</div>
									</div>
								</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(ViewUser);
