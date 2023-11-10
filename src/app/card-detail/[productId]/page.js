"use client";
import * as Yup from "yup";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import instance from "@/app/axiosInterceptor";
import { GST_PERCENTAGE, phoneSchema } from "@/app/global_constant.js";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useSearchParams } from "next/navigation";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name can't be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email can't be blank."),
  phone_number: phoneSchema,
  designation: Yup.string().required("Designation can't be blank."),
});

const queryValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name can't be blank."),
  last_name: Yup.string().required("Last Name can't be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email can't be blank."),
  phone_number: phoneSchema,
  query_msg: Yup.string().required("Query can't be blank."),
});

export default function CardtDetail({ params }){
  const [productDetail, setProductDetail] = useState({});
  const [cardDetailsData, setCardDetailsData] = useState({ full_name: "" });
  const router = useRouter();
  const toast = useRef(null);
  const searchParams = useSearchParams();

  const cardDetailDefaultValues = {
    type: "card_detail",
    product_id: params.productId,
    full_name: (cardDetailsData.full_name) ? cardDetailsData.full_name : "",
    email: (cardDetailsData.email) ? cardDetailsData.email : "",
    phone_number: (cardDetailsData.phone_number) ? cardDetailsData.phone_number : "",
    designation: (cardDetailsData.designation) ? cardDetailsData.designation : "",
    company_name: (cardDetailsData.website_link) ? cardDetailsData.website_link : "",
    company_logo: {},
    amount: productDetail?.grand_total,
  };

  useEffect(() => {
    getProductDetail();
    if(searchParams.get("print_id")) getCardDetails();
  }, []);


  const getProductDetail = () => {
    instance
      .get(
        `products/view?product_id=${params.productId}`
      )
      .then((response) => {
        let data = response.result ? response.result : {};
        let basePrice = data?.discount ? parseInt(data?.discount) : 0;
        let gstPercentage = data?.discount
          ? parseInt((basePrice * GST_PERCENTAGE) / 100)
          : 0;
        data["gst_value"] = gstPercentage;
        data["grand_total"] = gstPercentage + basePrice;
        setProductDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCardDetails = () => {
    instance
      .get(`products/checkout-view?product_id=${params.productId}&&print_id=${searchParams.get("print_id")}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        setCardDetailsData(data?.printing_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitCardDetail = async (values) => {
    let formdata = new FormData();
    formdata.append("CardPrintingData[full_name]", values.full_name)
    formdata.append("CardPrintingData[email]", values.email)
    formdata.append("CardPrintingData[phone_number]", values.phone_number)
    formdata.append("CardPrintingData[designation]", values.designation)
    formdata.append("CardPrintingData[website_link]", values.company_name)
    await addCardDetail(formdata);
  };

  const addCardDetail = async (data) => {
    instance
      .post(`products/card-detail?product_id=${params.productId}`, data)
      .then((response) => {
        let orderId =
          response.data && response.data.print_id
            ? response.data.print_id
            : "";
        if (response.success === true) {
          router.push(
            `/checkout/${params.productId}?print_id=${orderId}`
          );
        }
        showMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const designContactDefaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    query_msg: "",
  };
  
  const onSubmitDesignContact = async (values) => {
    await addQueryCard(values);
  };

  const addQueryCard = async (data) => {
    instance
      .post("design_contact", data)
      .then((response) => {
        if (response) {
          showMessage(response);
          router.push(`${params.productId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showMessage = (data) => {
    toast.current.show({
      severity: data.success ? "success" : "error",
      summary: data.success ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };
  return (
      <main>
        <Toast ref={toast} />
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
                        enableReinitialize={true}
                        initialValues={cardDetailDefaultValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) =>
                          await onSubmitCardDetail(values)
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
                                  Full Name{" "}
                                  <span className="text-danger">*</span>
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
                                  Email Address{" "}
                                  <span className="text-danger">*</span>
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
                                  Phone Number{" "}
                                  <span className="text-danger">*</span>
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
                                  Designation{" "}
                                  <span className="text-danger">*</span>
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
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingCompany"
                                >
                                  Company Name
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="company_name"
                                    className="form-control"
                                    id="floatingCompany"
                                  />
                                </div>
                                <ErrorMessage
                                  name="company_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            {/* <div className="form-check customCheckbox">
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
                                htmlFor="flexCheckDefault"
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
                                  name="company_logo"
                                  accept="image/*"
                                  className="form-control"
                                  id="floatingUpload"
                                  value={undefined}
                                  onChange={(event) => {
                                    const files = event.currentTarget.files[0];
                                    setFieldValue("company_logo", files);
                                  }}
                                />
                              </div>
                            </div> */}
                            <div className="d-md-flex align-items-center justify-content-between">
                              <p className="mt-3">
                              
                                <a
                                  href=""
                                  className="Gilroy-Bold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#CampnayLogoModal"
                                >
                                  &nbsp;
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
              </div>
            </div>
            <div className="col-lg-3">
              <div className="orderSummary">
                <h3 className="mb-2">Order Summary</h3>
                <ul className="list-unstyled">
                  <li>
                    Base Total <span> ₹ {productDetail?.discount}</span>
                  </li>
                  <li>
                    Delivery Charges <span> Free</span>
                  </li>
                  <li>
                    GST @ {GST_PERCENTAGE}%{" "}
                    <span> ₹ {productDetail?.gst_value}</span>
                  </li>
                </ul>
                <div className="mt-4 d-flex justify-content-between align-items-center pt-3 border-top">
                  <h3>Grand Total</h3>
                  <h2>₹ {productDetail?.grand_total}</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade upload_CampnayLogo"
          id="uploadCampnayLogoModal"
          tabIndex="-1"
          aria-labelledby="uploadCampnayLogoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadCampnayLogoModalLabel">
                  Design Query
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
                      <div className="row">
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            First Name
                          </label>

                          <Field
                            type="text"
                            name="first_name"
                            className="form-control"
                            id="floatingname"
                          />
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatinglname"
                          >
                            Last Name
                          </label>

                          <Field
                            type="text"
                            name="last_name"
                            className="form-control"
                            id="floatinglname"
                          />
                          <ErrorMessage
                            name="last_name"
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
                            name="query_msg"
                            className="form-control"
                            rows="4"
                            cols="40"
                          ></Field>
                        </div>
                        <ErrorMessage
                          name="query_msg"
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
      </main>
  );
};
