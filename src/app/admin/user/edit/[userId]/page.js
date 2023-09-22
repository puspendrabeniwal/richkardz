"use client";
import React, { useEffect, useRef, useState } from "react";
import instance from "@/app/admin/axiosInterceptor";
import Link from "next/link";
import { Toast } from "primereact/toast";
import withAuth from "@/hoc/withAuth";
import UserForm from "@/app/admin/components/UserForm";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const UpdateUser = ({ params }) => {
  const toast = useRef(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserAPI();
  }, []);
  const getUserAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.userId); //append the values with key, value pair
    try {
      const response = await instance.post(
        `users/view/${params.userId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setUserData(getData);
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

  const editUserAPI = async (values) => {
    instance
      .post("users/edit/" + params.userId, values)
      .then((response) => {
        if (response) {
          showMessage(response);
          router.push("/admin/user");
          setUserData(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                Edit User
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
                <li className="breadcrumb-item text-mute">Edit</li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0"></div>
              <Link href="/admin/user">
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
      {userData ? (
        <UserForm
          userValue={userData}
          handleSubmitUser={editUserAPI}
          userId={params.userId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default withAuth(UpdateUser);
