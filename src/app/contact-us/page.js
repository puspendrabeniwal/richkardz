"use client";

import * as Yup from "yup";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";

import instance from "../admin/axiosInterceptor";
import { GOOGLE_CAPTCHA_SITE_KEY } from "../global_constant";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name cannot be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email cannot be blank."),
  phone_number: Yup.string()
    .matches(
      /^(\+\d{1,2}\s?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Phone Number should contain at most 10 characters."
    )
    .required("Phone Number cannot be blank."),
  city: Yup.string().required("City cannot be blank."),
  message: Yup.string().required("Message cannot be blank."),
});

const ContactUs = () => {
  const [buttonLoader, setbuttonLoader] = useState(false);
  const toast = useRef(null);
  const router = useRouter();
  const recaptcha = useRef();

  const contactValues = {
    full_name: "",
    email: "",
    phone_number: "",
    city: "",
    message: "",
  };

  const addContactAPI = async (data) => {
    setbuttonLoader(true);
    instance
      .post("contactUs", data)
      .then((response) => {
        showMessage(response);
        setbuttonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setbuttonLoader(false);
      });
  };

  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 5000,
    });
  };

  const onSubmit = async (values) => {
    let formData = new FormData();
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      await addContactAPI(formData);
    }
  };

  const cardLoader = () => {
    return (
      <span>
        <ThreeCircles
          height="20"
          width="25"
          color="snow"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </span>
    );
  };
  return (
    <main>
      <Toast ref={toast} />
      <section className="contactPage py-md-5 py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <h1 className="mb-md-3">Contact us</h1>
              <p>
                RICH KARDZ is an NFC-based digital card. With just a tap, you
                can share your contact information using this.
              </p>
              <div className="bg-white border shadow radius mt-3 p-3">
                <Formik
                  enableReinitialize={true}
                  initialValues={contactValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm, errors }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {({ setFieldValue, values }) => (
                    <Form className="form-design">
                      <div className="row">
                        <div className="col-md-6 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Full Name<span className="text-danger">*</span>
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
                            Phone Number<span className="text-danger">*</span>
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
                            City<span className="text-danger">*</span>
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="city"
                              className="form-control"
                              id="floatingDesignation"
                            />
                          </div>
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-12 customFrom mb-3">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingCompany"
                          >
                            Message<span className="text-danger">*</span>
                          </label>
                          <div className=" billingForm">
                            <Field
                              as="textarea"
                              name="message"
                              className="form-control"
                              id="floatingCompany"
                              rows="4"
                              cols="40"
                            />
                          </div>
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <>
                        <ReCAPTCHA
                          ref={recaptcha}
                          sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                        />
                      </>
                      <Button
                        className="btn btnNavyBlue px-5 mt-4 py-2"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        icon="pi pi-save"
                        type="submit"
                        // label="Send"
                        label={buttonLoader === true ? cardLoader() : "Send"}
                        disabled={buttonLoader === true ? true : false}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-6 my-4">
              <img
                className="contactBanners"
                src="/front/img/contactb.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="makeAStrong">
        <div className="container">
          <div className="col-lg-10 text-center mx-auto">
            <h1>make a strong impression that people won’t forget.</h1>
            <Link href="/products" className="makeAStrongBtn btn">
              Buy Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;