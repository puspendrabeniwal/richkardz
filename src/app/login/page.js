"use client";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";
import * as Yup from "yup";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Toast } from "primereact/toast";
import instance from "../user/axiosInterceptor";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    // .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
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
    try {
      const response = await instance.post(`auth`, values);
      console.log("user login", response);
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
                    data-kt-menu-placement="bottom-end"
                    icon="pi pi-save"
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
                  <a href="" class="Gilroy-Bold">
                    Click Here
                  </a>
                </p>
              </div>
              <p>
                <a href="">Forgot Password?</a>
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
