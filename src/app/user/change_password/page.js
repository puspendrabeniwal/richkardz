"use client";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import withAuth from "@/hocFront/withAuth";
import instance from "../axiosInterceptor";
const ChangePassword = () => {
  const toast = useRef(null);

  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,20}$/,
        "Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    new_password: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,20}$/,
        "Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("new_password"), null],
        "Confirm Password does not match with password"
      ),

    // Define more validation rules for other fields
  });

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    let formData = new FormData();
    let loginUser = JSON.parse(localStorage.getItem("loginDetail"));
    formData.append("user_id", loginUser._id);
    formData.append("old_password", values.old_password);
    formData.append("new_password", values.new_password);
    formData.append("confirm_password", values.confirm_password);

    instance
      .post("change_password", formData)
      .then((response) => {
        showMessage(response);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                Change Password
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="content d-flex flex-column-fluid">
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="card-body border-top p-9">
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                          Old Pasword
                        </label>
                        <div className="col-lg-8 fv-row">
                          <Field
                            type="password"
                            name="old_password"
                            className="form-control form-control-lg form-control-solid"
                            placeholder="Old Password"
                          />
                          <ErrorMessage
                            name="old_password"
                            className="errorMessage"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                          New Password
                        </label>
                        <div className="col-lg-8 fv-row">
                          <Field
                            type="password"
                            name="new_password"
                            className="form-control form-control-lg form-control-solid"
                            placeholder="New Password"
                          />
                          <ErrorMessage
                            name="new_password"
                            className="errorMessage"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                          Confirm Password
                        </label>
                        <div className="col-lg-8 fv-row">
                          <Field
                            type="password"
                            name="confirm_password"
                            className="form-control form-control-lg form-control-solid"
                            placeholder="Confirm Pasword"
                          />
                          <ErrorMessage
                            name="confirm_password"
                            className="errorMessage"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                      <button type="reset" className="btn btn-warning me-2">
                        Discard
                      </button>
                      <button type="submit" className="btn btn-info">
                        Save Changes
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ChangePassword);
