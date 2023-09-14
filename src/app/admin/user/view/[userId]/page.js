"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import withAuth from "@/hoc/withAuth";

const ViewUser = ({ params }) => {
  const toast = useRef(null);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
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
                View User
              </h1>
              <span className="h-20px border-gray-300 border-start mx-4"></span>
              <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                <li className="breadcrumb-item text-dark">
                  <Link
                    href="/admin/dashboard"
                    className="text-muted text-hover-primary"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-dark">
                  <Link
                    href="/admin/user"
                    className="text-muted text-hover-primary"
                  >
                    User
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li class="breadcrumb-item text-mute">View</li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <Link href="/admin/user" className="btn btn-sm btn-info">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                {!userData ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div> User Data is Not Found</div>
                  )
                ) : (
                  <table className="table-border-padding w-100">
                    <tr className="table-border-padding pl-3">
                      <h3
                        style={{
                          marginLeft: "10px",
                          padding: "11px 2px 3px",
                        }}
                      >
                        PERSONAL DETAILS
                      </h3>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Full Name</th>
                      <td className="table-border-padding">
                        {userData?.full_name ? userData?.full_name : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Contact Number</th>
                      <td className="table-border-padding">
                        {userData?.phone ? userData?.phone : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">
                        Alternate Contact Number
                      </th>
                      <td className="table-border-padding">
                        {userData?.mobile ? userData?.mobile : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Company Name</th>
                      <td className="table-border-padding">
                        {userData?.company_name ? userData?.company_name : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Designation</th>
                      <td className="table-border-padding">
                        {userData?.designation ? userData?.designation : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Email</th>
                      <td className="table-border-padding">
                        {userData?.email ? userData?.email : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Website Link</th>
                      <td className="table-border-padding">
                        {userData?.website_link ? userData?.website_link : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">
                        Are you want to make profile private?
                      </th>
                      <td className="table-border-padding">
                        <span
                          className={`badge badge-light-${
                            userData?.profile_private === 1
                              ? "success"
                              : "warning"
                          } me-auto`}
                        >
                          {userData?.profile_private === 1 ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">About</th>
                      <td className="table-border-padding">
                        {userData?.about ? userData?.about : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Address</th>
                      <td className="table-border-padding">
                        {userData?.address ? userData?.address : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">
                        Nature of Business
                      </th>
                      <td className="table-border-padding">
                        {userData?.nature_of_business
                          ? userData?.nature_of_business
                          : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Pin Code</th>
                      <td className="table-border-padding">
                        {userData?.pincode ? userData?.pincode : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Google map link</th>
                      <td className="table-border-padding">
                        {userData?.google_link ? userData?.google_link : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Profile Image</th>
                      <td className="table-border-padding">
                        <img
                          src={`https://mern.richkardz.com/uploads/user/${userData.profile_image}`}
                          alt={userData?.profile_image}
                          className="w-6rem shadow-2 border-round"
                          height={45}
                        ></img>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Banner Image</th>
                      <td className="table-border-padding">
                        <img
                          src={`https://mern.richkardz.com/uploads/user/${userData.banner_image}`}
                          // src={`${userData?.full_image_path}`}
                          alt={userData?.banner_image}
                          className="w-6rem shadow-2 border-round"
                          height={45}
                        ></img>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">
                        UPI payment scanner
                      </th>
                      <td className="table-border-padding">
                        <img
                          src={`https://mern.richkardz.com/uploads/user/${userData.upi_scannaer}`}
                          alt={userData?.upi_scannaer}
                          className="w-6rem shadow-2 border-round"
                          height={45}
                        ></img>
                      </td>
                    </tr>
                    <tr className="table-border-padding pl-3">
                      <h3
                        style={{
                          marginLeft: "10px",
                          padding: "11px 2px 3px",
                        }}
                      >
                        SOCIAL MEDIA DETAILS
                      </h3>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Facebook</th>
                      <td className="table-border-padding">
                        {userData?.facebook ? userData?.facebook : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Instagram</th>
                      <td className="table-border-padding">
                        {userData?.instagram ? userData?.instagram : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Linkedin</th>
                      <td className="table-border-padding">
                        {userData?.linkedin ? userData?.linkedin : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Twitter</th>
                      <td className="table-border-padding">
                        {userData?.twitter ? userData?.twitter : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Whatsapp</th>
                      <td className="table-border-padding">
                        {userData?.whatsapp ? userData?.whatsapp : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Youtube</th>
                      <td className="table-border-padding">
                        {userData?.youtube ? userData?.youtube : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Pinterest</th>
                      <td className="table-border-padding">
                        {userData?.pinterest ? userData?.pinterest : ""}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Catalogue</th>
                      <td className="table-border-padding">
                        {userData && userData.catalogue ? (
                          <a
                            href={`https://mern.richkardz.com/uploads/user/${userData.catalogue}`}
                            target="_blank" // Opens the link in a new tab/window
                            rel="noopener noreferrer" // Recommended for security reasons
                          >
                            View Catalogue (PDF)
                          </a>
                        ) : (
                          "No catalogue available"
                        )}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Gallery</th>
                      <td className="table-border-padding">
                        <div className="d-flex flex-row p-3">
                          {userData.gallery?.map((image, index) => (
                            <div key={index}>
                              <div key={index} className="p-2">
                                <img
                                  src={`https://mern.richkardz.com/uploads/user/${image.name}`}
                                  alt={userData?.image}
                                  className="w-6rem shadow-2 border-round"
                                  height={45}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(ViewUser);
