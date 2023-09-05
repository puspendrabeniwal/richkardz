"use client";
import React, { useEffect, useRef, useState } from "react";
import MonialsForm from "@/app/admin/components/MonialsForm";
import { Toast } from "primereact/toast";
import instance from "@/app/admin/axiosInterceptor";
import Link from "next/link";

const UpdateMonials = ({ params }) => {
  const toast = useRef(null);
  const [monialData, setMonialData] = useState(null);
  useEffect(() => {
    getMonialData();
  }, []);
  const getMonialData = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.MonialId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `testimonials/view/${params.MonialId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setMonialData(getData);
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

  const editMonialAPI = async (data) => {
    const postData = {
      name: data.name,
      title: data.rating,
      body: data.description,
      imageUpload: data.fileUpload,
    };
    try {
      const response = await instance.post(
        `testimonials/edit/${params.MonialId}`,
        postData
      );
      setMonialData(response);
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
                  Test Monial
                </span>
                <span className="text-muted fs-7 fw-bold mt-2">
                  edit monial
                </span>
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0"></div>
              <Link href="/admin/blocks" className="btn btn-sm btn btn-success">
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
      {monialData ? (
        <MonialsForm
          monialValue={monialData}
          handleSubmitMonial={editMonialAPI}
          MonialId={params.MonialId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateMonials;
