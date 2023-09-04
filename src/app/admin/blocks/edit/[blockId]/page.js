"use client";
import React, { useEffect, useRef, useState } from "react";
import BlockForm from "@/app/admin/components/BlockForm";
import instance from "@/app/admin/axiosInterceptor";
import Link from "next/link";
import { Toast } from "primereact/toast";

const UpdateBlock = ({ params }) => {
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
  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };

  const editBlockAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.description,
    };
    try {
      const response = await instance.post(
        `blocks/edit/${params.blockId}`,
        postData
      );
      setBlockData(response);
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
                  Edit Block
                </span>
              </h1>

              {/* <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="font-weight-bold">Edit Block</h3>
                </div>
                <Link
                  href="/admin/blocks"
                  type="button"
                  className="btn btn-primary"
                >
                  Back
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {blockData ? (
        <BlockForm
          blockValue={blockData}
          handleSubmitBlock={editBlockAPI}
          blockId={params.blockId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateBlock;
