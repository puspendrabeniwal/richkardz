"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import withAuth from "@/hoc/withAuth";

const ViewUser = ({ params }) => {
  const toast = useRef(null);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
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
        let data = response.result ? response.result : {};
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("userData", userData);
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
        style={{ height: "750px" }}
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card mb-6 mb-xl-9">
                {userData ? (
                  <table className="table-border-padding w-100">
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Name</th>
                      <td className="table-border-padding">
                        {userData.full_name}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Phone</th>
                      <td className="table-border-padding">{userData.phone}</td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Email</th>
                      <td className="table-border-padding">{userData.email}</td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Image</th>
                      <td className="table-border-padding">
                        <img
                          src={`${userData.full_image_path}`}
                          alt={userData.image}
                          className="w-6rem shadow-2 border-round"
                          height={45}
                        ></img>
                      </td>
                    </tr>
                  </table>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(ViewUser);
