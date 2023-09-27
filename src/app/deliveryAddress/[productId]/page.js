"use client";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";
import instance from "@/app/admin/axiosInterceptor";
import { GST_PERCENTAGE } from "@/app/global_constant";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  address_1: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Pincode is required"),
});
export default function DeliveryAddress({ params }) {
  const [productDetail, setProductDetail] = useState([]);
  const [addressDetailData, setAddressDetailData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useRef(null);
  useEffect(() => {
    getProductDetail();
    getAddressDetails();
  }, []);

  const getProductDetail = () => {
    instance
      .post(`product/view/${params.productId}`, {})
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
  const getAddressDetails = () => {
    instance
      .post(`order/${searchParams.get("order_id")}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        setAddressDetailData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deliveryAddressValue = {
    type: "delivery_adderess",
    product_id: params.productId,
    full_name: "",
    email: "",
    phone_number: "",
    designation: "",
    company_name: "",
    company_logo: {},
    amount: productDetail?.grand_total,
    city: "",
    state: "",
    address_1: "",
    address_2: "",
    zipcode: "",
  };
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await addCardDetail(formData);
  };
  const addCardDetail = async (data) => {
    instance
      .post("save_order", data)
      .then((response) => {
        // if (response.status === true) {
        //   router.push(`/deliveryAddress/${params.productId}`);
        // }
        showMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" />

        <title>Delivery Address</title>

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
        <Toast ref={toast} />
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
                      <button
                        className="editBtn float-end"
                        onClick={() => {
                          // router.push(`/orders?orderId=${orderId}`);
                          router.push(
                            `/cardDetail/${
                              params.productId
                            }?order_id=${searchParams.get("order_id")}`
                          );
                        }}
                      >
                        <i className="fa fa-edit"></i> Edit
                      </button>
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="row mx-0">
                            <div className="col-6 col-lg-6 richKarzsDetails border-end">
                              <label for="">Full Name</label>
                              <h6>{addressDetailData?.full_name}</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails ps-md-5 ps-3">
                              <label for="">Email</label>
                              <h6>{addressDetailData?.email}</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails border-top border-end">
                              <label for="">Phone Number</label>
                              <h6>{addressDetailData?.phone_number}</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails border-top ps-md-5 ps-3">
                              <label for="">Designation</label>
                              <h6>{addressDetailData?.designation}</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 py-4 py-md-0 text-center">
                          <img
                            src={`${addressDetailData?.full_image_path}`}
                            alt={addressDetailData?.company_logo}
                            className="w-6rem shadow-2 border-round"
                            height={220}
                          ></img>
                        </div>
                      </div>
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
                    className="collapse show"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body px-md-5 py-md-4">
                      <Formik
                        initialValues={deliveryAddressValue}
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
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingaddress"
                                >
                                  Enter you address
                                  <span className="text-danger">*</span>
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="address_1"
                                    className="form-control"
                                    id="floatingaddress"
                                  />
                                </div>
                                <ErrorMessage
                                  name="address_1"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingaddress_2"
                                >
                                  Address line 2
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="address_2"
                                    className="form-control"
                                    id="floatingaddress_2"
                                  />
                                </div>
                                <ErrorMessage
                                  name="address_2"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingstate"
                                >
                                  Select State
                                </label>
                                <Field
                                  as="select"
                                  name="state"
                                  className="form-control"
                                  id="floatingstate"
                                >
                                  <option value="">Select</option>
                                  <option value="1">Select111</option>
                                  <option value="2">Select222</option>
                                </Field>
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label for="">
                                  City<span className="text-danger">*</span>
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    id="floatingcity"
                                  />
                                </div>
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label htmlFor="floatingzipcode">
                                  Pincode
                                  <span className="text-danger">*</span>
                                </label>

                                <div className=" billingForm">
                                  <Field
                                    type="text"
                                    name="zipcode"
                                    className="form-control"
                                    id="floatingzipcode"
                                  />
                                </div>
                                <ErrorMessage
                                  name="zipcode"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="customFrom">
                              <label for="">Address type</label>
                            </div>
                            <div className="d-lg-flex">
                              <div className="form-check customRadio me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="address_type"
                                  id="address_type"
                                />
                                <label
                                  className="form-check-label Gilroy-Regular"
                                  for="address_type"
                                >
                                  Upload Your Company Logo
                                </label>
                              </div>
                              <div className="form-check customRadio">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="address_type"
                                  id="address_type"
                                />
                                <label
                                  className="form-check-label Gilroy-Regular"
                                  for="address_type"
                                >
                                  Upload Your Company Logo
                                </label>
                              </div>
                            </div>
                            <div className="d-md-flex align-items-center justify-content-end">
                              <Button
                                className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-4"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                                icon="pi pi-save"
                                type="submit"
                                label="Save & deliver here"
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
        <Footer />
      </body>
    </html>
  );
}
