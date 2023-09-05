"use client";
import React, { useRef } from "react";
import CmsForm from "../../components/CmsForm";
import { Toast } from "primereact/toast";
import instance from "../../axiosInterceptor";
import Link from "next/link";

const AddCms = () => {
  const toast = useRef(null);
  const addCmsAPI = async (data) => {
    const postData = {
      type: data.name,
      title: data.title,
      content: data.description,
    };
    try {
      const response = await instance.post(`cms/add`, postData);
      showMessage(response);
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
                <span className="text-muted fs-7 fw-bold mt-2">add cms</span>
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
      <CmsForm cmsValue={null} handleSubmitCMS={addCmsAPI} cmsId={null} />
    </>
  );
};

export default AddCms;
