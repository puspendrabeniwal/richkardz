"use client";
import React, { useEffect, useState, useRef} from "react";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";

import instance from "../../../axiosInterceptor";
import withAuth from "@/hoc/withAuth";

const ViewLead = ({ params }) => {

  const [detail, setDetail] = useState(null);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", Object.keys(loginUser).length > 0 ? loginUser?._id : ""); 

    instance
      .post("leads/view/" + params.type[0]+"/"+ params.type[1], formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <div className="d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                    <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                            View Lead Detail
                        </h1>
                        <span className="h-20px border-gray-300 border-start mx-4"></span>
                        <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                            <li className="breadcrumb-item text-dark">
                                <Link href="/admin/dashboard" className="text-muted text-hover-primary">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-300 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-dark">
                                <Link href={`/admin/leads/${params.type[0]}`} className="text-muted text-hover-primary">Lead</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-300 w-5px h-2px"></span>
                            </li>
                            <li class="breadcrumb-item text-mute">View</li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                        <Link href="/admin/bulk-orders" className="btn btn-sm btn-info">Back</Link>
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
                    <table
                    className="table-border-padding w-100"
                    //   style={{ border: " 1px solid gray" }}
                    >
                        {
                        (params.type[0] != "design-queries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Name</th>
                                <td className="table-border-padding">{detail?.name}</td>
                            </tr>
                            :<tr className="table-border-padding">
                            <th className="table-border-padding">Name</th>
                            <td className="table-border-padding">{detail?.first_name +" "+detail?.last_name}</td>
                        </tr>
                        }
                    <tr className="table-border-padding">
                        <th className="table-border-padding">Email</th>
                        <td className="table-border-padding">{detail?.email}</td>
                    </tr>
                    <tr className="table-border-padding">
                        <th className="table-border-padding">Phone Number</th>
                        <td className="table-border-padding">{detail?.phone_number}</td>
                    </tr>
                    {
                        (params.type[0] === "contact-enquiries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">City</th>
                                <td className="table-border-padding">{detail?.city}</td>
                            </tr>
                        :""
                    }
                    {
                        (params.type[0] === "contact-enquiries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Pin code</th>
                                <td className="table-border-padding">{detail?.pin_code}</td>
                            </tr>
                        :""
                    }
                    {
                        (params.type[0] === "contact-enquiries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Message</th>
                                <td className="table-border-padding">{detail?.body}</td>
                            </tr>

                        :''
                    }

                    {
                        (params.type[0] === "contact-enquiries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Created</th>
                                <td className="table-border-padding">{dateFormat(detail?.created_at, "dddd, mmmm d, yyyy")}</td>
                            </tr>
                        :''
                    }


                    {
                        (params.type[0] === "design-queries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Message</th>
                                <td className="table-border-padding">
                                <span
                                    dangerouslySetInnerHTML={{
                                    __html: detail?.query_msg,
                                    }}
                                ></span>
                                </td>
                            </tr>
                        :''
                    }

                    {
                        (params.type[0] === "design-queries") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Created</th>
                                <td className="table-border-padding">{dateFormat(detail?.created_at, "dddd, mmmm d, yyyy")}</td>
                            </tr>
                        :''
                    }

                    {
                        (params.type[0] === "digital-visiting-card" || params.type[0] === "B2B LP") ?
                            <tr className="table-border-padding">
                                <th className="table-border-padding">Created</th>
                                <td className="table-border-padding">{dateFormat(detail?.created, "dddd, mmmm d, yyyy")}</td>
                            </tr>
                        :''
                    }
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
    </main>
  );
};

export default withAuth(ViewLead);
