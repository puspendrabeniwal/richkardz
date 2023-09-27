"use client";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";
import instance from "@/app/admin/axiosInterceptor";

export default function DeliveryAddress({ params }) {
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    instance
      .post(`product/view/${params.productId}`, {})
      .then((response) => {
        let data = response.result ? response.result : {};
        let basePrice = (data?.discount) ? parseInt(data?.discount) : 0;
        let gstPercentage = (data?.discount) ? parseInt((basePrice*GST_PERCENTAGE)/100) : 0;
        data["gst_value"] = gstPercentage;
        data["grand_total"] = gstPercentage+basePrice;
        setProductDetail(data);
      })
      .catch((error) => {
        console.log(error);
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
                      1. Please Enter RichKardz Details{" "}
                      <button className="editBtn float-end">
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
                              <h6>Piyush Kanwal</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails ps-md-5 ps-3">
                              <label for="">Email</label>
                              <h6>Piyush Kanwal</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails border-top border-end">
                              <label for="">Phone Number</label>
                              <h6>+91 0000000000</h6>
                            </div>
                            <div className="col-6 col-lg-6 richKarzsDetails border-top ps-md-5 ps-3">
                              <label for="">Designation</label>
                              <h6>Designer</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 py-4 py-md-0 text-center">
                          <img src="/front/img/logo-social-sq.png" alt="" />
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
                      <div className="row">
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">Full Name</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">Phone Number</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-12 customFrom mb-3">
                          <label for="">
                            Enter you address
                            <sapn className="text-danger">*</sapn>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">Address line 2</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">
                            Select State<span className="text-danger">*</span>
                          </label>
                          <select name="" className="form-control" id="">
                            <option value="">Select</option>
                            <option value="">Select111</option>
                            <option value="">Select222</option>
                          </select>
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">
                            City<span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 customFrom mb-3">
                          <label for="">
                            Pincode<span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
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
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label Gilroy-Regular"
                            for="flexRadioDefault1"
                          >
                            Upload Your Company Logo
                          </label>
                        </div>
                        <div className="form-check customRadio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label Gilroy-Regular"
                            for="flexRadioDefault1"
                          >
                            Upload Your Company Logo
                          </label>
                        </div>
                      </div>
                      <button className="btn btnNavyBlue px-5 mt-4">
                        Save & deliver here
                      </button>
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
