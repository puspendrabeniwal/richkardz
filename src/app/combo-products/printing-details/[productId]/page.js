"use client";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "@/app/axiosInterceptor";
import { GST_PERCENTAGE } from "@/app/global_constant";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  phone_number: Yup.string().required("This field is required"),
  designation: Yup.string().required("This field is required"),
});

export default function DeliveryAddress({ params }) {
  const [productDetail, setProductDetail] = useState([]);
  const [cardDetail, setCardDetail] = useState([]);
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
        setCardDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialValues = {
    full_name: cardDetail.full_name ? cardDetail.full_name : "",
    email: cardDetail.email ? cardDetail.email : "",
    phone_number: cardDetail.phone_number ? cardDetail.phone_number : "",
    designation: "",
    company_name: "",
  };
  
  const onSubmit = async (values) => {
    await addCardDetail(values);
  };
  const addCardDetail = async (data) => {
    instance
      .post("save_order", data)
      .then((response) => {
        if (response.status === true) {
          window.location.replace(response.result.longurl);
        }
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
      <main>
        <Toast ref={toast} />
        <section className="py-4 py-md-5 container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cardDetailsCollaps" id="accordion">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="btn collapsebtn"
                      data-bs-toggle="collapse"
                      href="#collapseOne"
                    >
                     Please enter the details to be printed on the card.
                     
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
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => await onSubmit(values)}
                      >
                        {({ setFieldValue, values }) => (
                          <Form className="form-design">
                            <div className="row">
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingName"
                                >
                                  Full Name<span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="full_name"
                                  className="form-control"
                                  id="floatingName"
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
                                  htmlFor="floatingNumber"
                                >
                                  Phone Number<span className="text-danger">*</span>
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="number"
                                    name="phone_number"
                                    className="form-control"
                                    id="floatingNumber"
                                  />
                                  <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-danger"
                                />
                                </div>
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingEmail"
                                >
                                  Email <span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                  id="floatingEmail"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>


                              <div className="col-md-6 customFrom mb-3">
                                <label htmlFor="designation" className="col-form-label required fw-semibold fs-6">
                                  Designation<span className="text-danger">*</span>
                                </label>
                                  <Field
                                    type="text"
                                    name="designation"
                                    className="form-control"
                                    id="designation"
                                  />

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

                                <Field
                                  type="text"
                                  name="company"
                                  className="form-control"
                                  id="floatingCompany"
                                />
                              </div>
                            </div>
                            {/* <div className="customFrom">
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
                            </div> */}
                            <div className="d-md-flex align-items-center justify-content-end">
                              <Button
                                className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-4"
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
                      className="btn collapsebtn"
                      data-bs-toggle="collapse"
                      href="#collapseTwo"
                    >
                     Please enter the details to be printed on the card.
                     
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body px-md-5 py-md-4">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => await onSubmit(values)}
                      >
                        {({ setFieldValue, values }) => (
                          <Form className="form-design">
                            <div className="row">
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingName"
                                >
                                  Full Name<span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="full_name"
                                  className="form-control"
                                  id="floatingName"
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
                                  htmlFor="floatingNumber"
                                >
                                  Phone Number<span className="text-danger">*</span>
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="number"
                                    name="phone_number"
                                    className="form-control"
                                    id="floatingNumber"
                                  />
                                  <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-danger"
                                />
                                </div>
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingEmail"
                                >
                                  Email <span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                  id="floatingEmail"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>


                              <div className="col-md-6 customFrom mb-3">
                                <label htmlFor="designation" className="col-form-label required fw-semibold fs-6">
                                  Designation<span className="text-danger">*</span>
                                </label>
                                  <Field
                                    type="text"
                                    name="designation"
                                    className="form-control"
                                    id="designation"
                                  />

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

                                <Field
                                  type="text"
                                  name="company"
                                  className="form-control"
                                  id="floatingCompany"
                                />
                              </div>
                            </div>
                            {/* <div className="customFrom">
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
                            </div> */}
                            <div className="d-md-flex align-items-center justify-content-end">
                              <Button
                                className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-4"
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
                      className="btn collapsebtn"
                      data-bs-toggle="collapse"
                      href="#collapseThree"
                    >
                     Please enter the details to be printed on the card.
                     
                    </a>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body px-md-5 py-md-4">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => await onSubmit(values)}
                      >
                        {({ setFieldValue, values }) => (
                          <Form className="form-design">
                            <div className="row">
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingName"
                                >
                                  Full Name<span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="full_name"
                                  className="form-control"
                                  id="floatingName"
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
                                  htmlFor="floatingNumber"
                                >
                                  Phone Number<span className="text-danger">*</span>
                                </label>
                                <div className=" billingForm">
                                  <Field
                                    type="number"
                                    name="phone_number"
                                    className="form-control"
                                    id="floatingNumber"
                                  />
                                  <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-danger"
                                />
                                </div>
                              </div>
                              <div className="col-md-6 customFrom mb-3">
                                <label
                                  className="col-form-label required fw-semibold fs-6"
                                  htmlFor="floatingEmail"
                                >
                                  Email <span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                  id="floatingEmail"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>


                              <div className="col-md-6 customFrom mb-3">
                                <label htmlFor="designation" className="col-form-label required fw-semibold fs-6">
                                  Designation<span className="text-danger">*</span>
                                </label>
                                  <Field
                                    type="text"
                                    name="designation"
                                    className="form-control"
                                    id="designation"
                                  />

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

                                <Field
                                  type="text"
                                  name="company"
                                  className="form-control"
                                  id="floatingCompany"
                                />
                              </div>
                            </div>
                            {/* <div className="customFrom">
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
                            </div> */}
                            <div className="d-md-flex align-items-center justify-content-end">
                              <Button
                                className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-4"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                                icon="pi pi-save"
                                type="submit"
                                label="Checkout"
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
          </div>
        </section>
      </main>
  );
}
