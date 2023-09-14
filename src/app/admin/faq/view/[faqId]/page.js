"use client";
import instance from "@/app/admin/axiosInterceptor";
import FAQDetailsPage from "@/app/admin/components/FAQDetailPage";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

const ViewFAQ = ({ params }) => {
  const toast = useRef(null);
  const [faqData, setFaqData] = useState(null);

  useEffect(() => {
    getFAQAPI();
  }, []);
  const getFAQAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.faqId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `faqs/view/${params.faqId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setFaqData(getData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                View FAQ
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
                    href="/admin/faq"
                    className="text-muted text-hover-primary"
                  >
                    FAQ
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
              <Link href="/admin/faq" className="btn btn-sm btn btn-success">
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
                {faqData ? (
                  <table className="table-border-padding w-100">
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Question</th>
                      <td className="table-border-padding">
                        {faqData.question}
                      </td>
                    </tr>

                    <tr className="table-border-padding">
                      <th className="table-border-padding">Answer</th>
                      <td className="table-border-padding">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: faqData.answer,
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
    </>
  );
};

export default withAuth(ViewFAQ);
