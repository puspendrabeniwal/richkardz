"use client";
import instance from "@/app/admin/axiosInterceptor";
import CmsForm from "@/app/admin/components/CmsForm";
import Link from "next/link";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

const UpdateCms = ({ params }) => {
  const toast = useRef(null);
  const [cmsData, setCmsData] = useState(null);

  useEffect(() => {
    getCmsAPI();
  }, []);
  const getCmsAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.cmsId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `cms/view/${params.cmsId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setCmsData(getData);
    } catch (error) {
      console.log(error);
    }
  };
  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };

  const editCmsAPI = async (data) => {
    const postData = {
      type: data.name,
      title: data.title,
      content: data.description,
    };
    try {
      const response = await instance.post(
        `cms/edit/${params.cmsId}`,
        postData
      );
      setCmsData(response);
      showMessage(response);
    } catch (error) {
      console.log(error);
    }
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
                <span className="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1">
                  CMS
                </span>
                <span className="text-muted fs-7 fw-bold mt-2">edit cms</span>
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0"></div>
              <Link href="/admin/cms" className="btn btn-sm btn btn-success">
                Back
                {/* <Button
                      label="Add Block"
                      className="btn btn-primary"
                      icon="pi pi-plus"
                    /> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {cmsData ? (
        <CmsForm
          cmsValue={cmsData}
          handleSubmitCMS={editCmsAPI}
          cmsId={params.cmsId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateCms;
