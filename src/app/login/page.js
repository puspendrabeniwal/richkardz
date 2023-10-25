"use client";

import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import instance from "../user/axiosInterceptor";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    // .email("Invalid email address")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const queryValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email cannot be blank."),
});
const LoginUser = () => {
  const toast = useRef(null);
  let user;
  const loginValues = {
    username: "",
    password: "",
    role_id: 2,
  };

  useEffect(() => {
    user = localStorage.getItem("loginDetail");
    if (user) window.location.replace("/user/dashboard");
  }, []);

  async function onSubmit(values) {
    values["role_id"] = 2;
    try {
      const response = await instance.post(`auth`, values);
      let user = response.result ? response.result : {};
      let token = response.token ? response.token : "";
      if (token && Object.keys(user).length > 0) {
        localStorage.setItem("loginDetail", JSON.stringify(user));
        window.location.replace("/user/dashboard");
      }
      showMessage(response);
    } catch (error) {
      console.log(error);
    }
  }

  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };

  const designContactDefaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    query_msg: "",
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" />

        <title>Login</title>

        <link
          rel="shortcut icon"
          href="/admin/assets/media/logos/favicon.png"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="/front/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/common.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/animate.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/swiper-bundle.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="bodyMain">
        <Header />
        <Toast ref={toast} />
        <div
          className="modal fade upload_CampnayLogo"
          id="uploadCampnayLogoModal"
          tabIndex="-1"
          aria-labelledby="uploadCampnayLogoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadCampnayLogoModalLabel">
                  Forgot Password
                </h5>
                <button
                  type="button"
                  className="btn-close Modal_btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={designContactDefaultValues}
                  validationSchema={queryValidationSchema}
                  onSubmit={async (values) =>
                    await onSubmitDesignContact(values)
                  }
                >
                  {({ setFieldValue, values }) => (
                    <Form className="form-design">
                      <div
                        className="align-items-center justify-content-center col-md-12 customFrom mb-3"
                        style={{ padding: "40px 70px 20px 70px" }}
                      >
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="email"
                            placeholder="Enter your Registered Email"
                            className="form-control"
                            id="floatingemail"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="d-md-flex align-items-center justify-content-center mb-4">
                        <Button
                          className="btn btn btn-success btn-sm btnNavyBlue "
                          type="submit"
                          label="Continue"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade upload_CampnayLogo"
          id="uploadCampnayLogoModal1"
          tabIndex="-1"
          aria-labelledby="uploadCampnayLogoModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-items-center justify-content-center">
                <h5
                  className="align-items-center justify-content-center"
                  id="uploadCampnayLogoModalLabel1"
                >
                  How to Create Account?
                </h5>
                <button
                  type="button"
                  className="btn-close Modal_btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="modal-body">
                <p
                  className="d-md-flex pb-0 pt-0 align-items-center justify-content-center"
                  style={{ padding: "96px" }}
                >
                  You need to buy one RichKardz, then only you can create an
                  account with us.
                </p>
              </div>
              <Link href="/products">
                <div className="d-md-flex align-items-center justify-content-center">
                  <Button
                    className="btn btn btn-success btn-sm btnNavyBlue mb-5 mt-3"
                    type="submit"
                    label="Shop Now"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div class="row loginPage mx-0 align-items-center">
          <div class="col-lg-6">
            <img src="/front/img/contactBanner.png" alt="" />
          </div>

          <div className="col-lg-5 col-sm-10 mx-auto col-xxl-4 me-xxl-auto ms-xxl-0 px-lg-5  py-4 py-lg-0">
            <h1 class="mb-4">Login Into Your Account</h1>

            <Formik
              enableReinitialize={true}
              initialValues={loginValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => await onSubmit(values)}
            >
              {({ setFieldValue, values }) => (
                <Form className="form-design">
                  <div className="row">
                    <div class="mb-3">
                      <label
                        className="col-form-label required fw-semibold fs-6"
                        htmlFor="floatingemail"
                      >
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <div className=" billingForm">
                        <Field
                          type="text"
                          name="username"
                          className="form-control"
                          id="floatingemail"
                        />
                      </div>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        className="col-form-label required fw-semibold fs-6"
                        htmlFor="floatingPassword"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className=" billingForm">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          id="floatingPassword"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <Button
                    className="btn btnNavyBlue w-100 mt-3"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-center"
                    type="submit"
                    label="Login"
                  />
                </Form>
              )}
            </Formik>

            <div class="d-flex mt-2 justify-content-between align-items-center">
              <div>
                <p>
                  Don&apos;t have login details?{" "}
                  <a
                    href=""
                    className="Gilroy-Bold"
                    data-bs-toggle="modal"
                    data-bs-target="#uploadCampnayLogoModal1"
                  >
                    Click Here
                  </a>
                </p>
              </div>
              <p>
                <a
                  href=""
                  className="Gilroy-Bold"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadCampnayLogoModal"
                >
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
};

export default LoginUser;
