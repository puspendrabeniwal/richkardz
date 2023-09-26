"use client";
import React, { useEffect, useRef, useState } from "react";
import instance from "@/app/admin/axiosInterceptor";
import Link from "next/link";
import { Toast } from "primereact/toast";
import withAuth from "@/hoc/withAuth";
import { Button } from "primereact/button";

const ViewBlock = ({ params }) => {
  const toast = useRef(null);
  const [blockData, setBlockData] = useState(null);
  useEffect(() => {
    getBlockData();
  }, []);
  const getBlockData = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.blockId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `blocks/view/${params.blockId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setBlockData(getData);
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
                View Blocks
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
                    href="/admin/blocks"
                    className="text-muted text-hover-primary"
                  >
                    Blocks
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-mute">View</li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0"></div>
              <Link href="/admin/blocks">
                <Button
                  className="btn btn btn-warning btn-sm me-3e"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                  label="Back"
                  type="submit"
                  icon="pi pi-arrow-left"
                />
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
                {blockData ? (
                  <table
                    className="table-border-padding w-100"
                    //   style={{ border: " 1px solid gray" }}
                  >
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Name</th>
                      <td className="table-border-padding">{blockData.name}</td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Title</th>
                      <td className="table-border-padding">
                        {blockData.title}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Description</th>
                      <td className="table-border-padding">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: blockData.body,
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

export default withAuth(ViewBlock);
