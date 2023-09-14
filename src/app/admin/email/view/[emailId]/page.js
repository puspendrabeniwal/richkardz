"use client";
import instance from "@/app/admin/axiosInterceptor";
import EmailDetailsPage from "@/app/admin/components/EmailDetailPage";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

const ViewEmail = ({ params }) => {
  const toast = useRef(null);
  const [emailData, setEmailData] = useState(null);

  useEffect(() => {
    getEmailAPI();
  }, []);
  const getEmailAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.emailId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `email_template/view/${params.emailId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setEmailData(getData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("email dAta", emailData);
  return (
    <main>
      <Toast ref={toast} />
      <div className="" id="kt_content">
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
                View Email
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
                    href="/admin/email"
                    className="text-muted text-hover-primary"
                  >
                    Email
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li class="breadcrumb-item text-mute">View</li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0"></div>
              <Link href="/admin/email" className="btn btn-sm btn btn-success">
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
                {emailData ? (
                  <table className="table-border-padding w-100">
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Title</th>
                      <td className="table-border-padding">
                        {emailData.title}
                      </td>
                    </tr>

                    <tr className="table-border-padding">
                      <th className="table-border-padding">Description</th>
                      <td className="table-border-padding">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: emailData.content,
                          }}
                        ></span>
                      </td>
                    </tr>
                  </table>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ViewEmail);
