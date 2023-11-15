"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import instance from "@/app/axiosInterceptor";
import Link from "next/link";
import { Toast } from "primereact/toast";
import withAuth from "@/hocFront/withAuth";
import UserForm from "@/app/user/components/UserForm";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../AuthContext";

const UpdateUser = ({ params }) => {
  const toast = useRef(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getUserAPI();
  }, []);
  const getUserAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginDetail"));
    let formData = {}; //formdata object
    formData["user_id"] =
      Object.keys(loginUser).length > 0 ? loginUser?._id : "";
    formData["id"] = params.userId;
    try {
      const response = await instance.post(
        `users/view/${params.userId}`,
        formData
      );
      const getData = response.result ? response.result : {};
      setUser(getData)
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
          getUserAPI()
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
                Update Profile
              </h1>
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
        ""
      )}
    </>
  );
};

export default withAuth(UpdateUser);
