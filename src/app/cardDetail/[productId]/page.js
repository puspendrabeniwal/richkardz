"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Header from "@/app/components0/Header0/page";
import Footer from "@/app/components0/Footer0/page";
import instance from "@/app/admin/axiosInterceptor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  phone_number: Yup.string().required("Phone number price is required"),
  designation: Yup.string().required("Designation is required"),
});
const queryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  phone_number: Yup.string().required("Phone number price is required"),
  designation: Yup.string().required("Designation is required"),
  query: Yup.string().required("Query is required"),
});
const cardtDetail = ({ params }) => {
  // const [productDetail, setProductDetail] = useState([]);

  // useEffect(() => {
  //   getProductDetail();
  // }, []);

  const getProductDetail = () => {
    instance
      .post(`product/view/${params.productId}`, {})
      .then((response) => {
        let data = response.result ? response.result : {};
        setProductDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = async (values) => {
    console.log("form values", values);
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
  };
  const onHandleSubmit = async (values) => {
    console.log("form handle values", values);
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
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

        <title>Products</title>

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
      <body classNameName="bodyMain">
        <Header />
        <section className="py-4 py-md-5 container">
          <div className="row">
            <div className="col-lg-9">
              <div className="cardDetailsCollaps" id="accordion">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="btn collapsebtn"
                      data-bs-toggle="collapse"
                      href="#collapseOne"
                    >
                      1. Please Enter RichKardz Details
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body px-md-5 py-md-4">
                      <Formik
                        // initialValues={defaultValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => await onSubmit(values)}
                      >
                        {({ setFieldValue, values }) => (
                          <Form className="form-design">
                            <div className="row">
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingname"
                                >
                                  Full Name
                                </label>

                                <Field
                                  type="text"
                                  name="full_name"
                                  className="form-control"
                                  id="floatingname"
                                />
                                <ErrorMessage
                                  name="full_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingemail"
                                >
                                  Email Address
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="email"
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
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingNumber"
                                >
                                  Phone Number
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="number"
                                    name="phone_number"
                                    className="form-control"
                                    id="floatingNumber"
                                  />
                                </div>
                                <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingDesignation"
                                >
                                  Designation
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="designation"
                                    className="form-control"
                                    id="floatingDesignation"
                                  />
                                </div>
                                <ErrorMessage
                                  name="designation"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="form-check customCheckbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                data-bs-toggle="collapse"
                                href="#collapseExample"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefault"
                              >
                                Upload Your Company Logo
                              </label>
                            </div>
                            <div
                              className="collapse mt-3 mb-3"
                              id="collapseExample"
                            >
                              <div className=" billingForm">
                                <Field
                                  type="file"
                                  name="images"
                                  accept="image/*"
                                  className="form-control"
                                  id="floatingUpload"
                                  value={undefined}
                                  onChange={(event) => {
                                    const files = event.currentTarget.files[0];
                                    setFieldValue("images", files);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-md-flex align-items-center justify-content-between">
                              <p className="mt-3">
                                Looking for Design Assistance?{" "}
                                <a
                                  href=""
                                  className="Gilroy-Bold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#uploadCampnayLogoModal"
                                >
                                  Click here
                                </a>
                              </p>
                              <Button
                                className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-3 mt-md-0"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                                icon="pi pi-save"
                                type="submit"
                                label="Next"
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="collapsed btn collapsebtn"
                      data-bs-toggle="collapse"
                      href="#collapseTwo"
                    >
                      2. Delivery Address
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body">Lorem ipsum..</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="orderSummary">
                <h3 className="mb-2">Order Summary</h3>
                <ul className="list-unstyled">
                  <li>
                    Base Total <span> ₹ 499</span>
                  </li>
                  <li>
                    Delivery Charges <span> Free</span>
                  </li>
                  <li>
                    GST @ 18% <span> ₹ 89</span>
                  </li>
                </ul>
                <div className="mt-4 d-flex justify-content-between align-items-center pt-3 border-top">
                  <h3>Grand Total</h3>
                  <h2>₹ 588</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade upload_CampnayLogo"
          id="uploadCampnayLogoModal"
          tabindex="-1"
          aria-labelledby="uploadCampnayLogoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadCampnayLogoModalLabel">
                  Modal title
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
                  // initialValues={defaultValues}
                  validationSchema={queryValidationSchema}
                  onHandleSubmit={async (values) =>
                    await onHandleSubmit(values)
                  }
                >
                  {({ setFieldValue, values }) => (
                    <Form className="form-design">
                      <div className="row">
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Full Name
                          </label>

                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                            id="floatingname"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingemail"
                          >
                            Email Address
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="email"
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
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingNumber"
                          >
                            Phone Number
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="number"
                              name="phone_number"
                              className="form-control"
                              id="floatingNumber"
                            />
                          </div>
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingDesignation"
                          >
                            Designation
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="designation"
                              className="form-control"
                              id="floatingDesignation"
                            />
                          </div>
                          <ErrorMessage
                            name="designation"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-md-12 customFrom mb-3">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatinDescription"
                        >
                          Your Query
                        </label>
                        <div className=" billingForm">
                          <Field
                            as="textarea"
                            name="query"
                            className="form-control"
                            rows="4"
                            cols="40"
                          ></Field>
                        </div>
                        <ErrorMessage
                          name="query"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="d-md-flex align-items-center justify-content-end">
                        <Button
                          className="btn btn btn-success btn-sm btnNavyBlue  px-4 mt-4 py-2"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-save"
                          type="submit"
                          label=" Send US Message"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <Script type="text/javascript" src="/front/js/jquery.min.js"></Script>
        <Script
          type="text/javascript"
          src="/front/js/bootstrap.min.js"
        ></Script>
        <Script
          type="text/javascript"
          src="/front/js/particles.min.js"
        ></Script>
        <Script
          type="text/javascript"
          src="/front/js/swiper-bundle.min.js"
        ></Script>
        <Script type="text/javascript" src="/front/js/custom.js"></Script>
        <Script type="text/javascript" src="/front/js/mobile-nav.js"></Script>
        <Script type="text/javascript" src="/front/js/wow.js"></Script>
      </body>
    </html>
  );
};
export default cardtDetail;
