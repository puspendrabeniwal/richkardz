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

import instance from "@/app/axiosInterceptor";
import { GOOGLE_CAPTCHA_SITE_KEY, phoneSchema } from "@/app/global_constant";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name can't be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email can't be blank."),
  phone_number: phoneSchema,
  city: Yup.string().required("City can't be blank."),
  body: Yup.string().required("Message can't be blank."),
  recaptchaField: Yup.string().required("reCAPTCHA validation is required."),
});

const ContactUs = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const toast = useRef(null);
  const router = useRouter();
  const recaptcha = useRef();

  const contactValues = {
    name: "",
    email: "",
    phone_number: "",
    city: "",
    body: "",
    recaptchaField: "",
  };

  const addContactAPI = async (data) => {
    instance
      .post("site/contact-us", data)
      .then((response) => {
        showMessage(response);
        setButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonDisabled(false);
      });
  };

  const showMessage = (data) => {
    toast.current.show({
      severity: data.success ? "success" : "error",
      summary: data.success ? "Success" : "Error",
      detail: data.message,
      life: 5000,
    });
  };

  const onSubmit = async (values) => {
    setButtonDisabled(true);
    let formData = new FormData();
    Object.keys(values).forEach(function (key, index) {
      formData.append(`ContactForm[${key}]`, values[key]);
    });
    await addContactAPI(formData);
    recaptcha.current.reset();
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
                              name="body"
                              className="form-control"
                              id="floatingCompany"
                              rows="4"
                              cols="40"
                            />
                          </div>
                          <ErrorMessage
                            name="body"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <>
                        <ReCAPTCHA
                          ref={recaptcha}
                          sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                          onChange={(reCaptchaValue) => {
                            if (reCaptchaValue) {
                              setFieldValue("recaptchaField", reCaptchaValue);
                            }
                          }}
                        />
                        <ErrorMessage
                          name="recaptchaField"
                          component="div"
                          className="text-danger"
                        />
                      </>
                      <Button
                        className="btn btnNavyBlue px-5 mt-4 py-2"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        icon="pi pi-save"
                        type="submit"
                        disabled={isButtonDisabled}
                        label={isButtonDisabled ? "Sending.." : "Send"}
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
