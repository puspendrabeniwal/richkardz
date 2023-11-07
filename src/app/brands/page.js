"use client";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import instance from "@/app/axiosInterceptor";
import { GOOGLE_CAPTCHA_SITE_KEY, phoneSchema } from "@/app/global_constant";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name can't be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email can't be blank."),
  phone_number: phoneSchema,
  recaptchaField: Yup.string().required("reCAPTCHA validation is required."),
});

export default function Brands() {
  const toast = useRef(null);
  const recaptcha = useRef();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    var loadScript = function (src) {
      var tag = document.createElement("script");
      tag.async = false;
      tag.defer = false;
      tag.src = src;
      document.head.appendChild(tag);
    };
    loadScript("/themes/brand/js/jquery.min.js");
    loadScript("/themes/brand/js/bootstrap.min.js");
    loadScript("/themes/brand/js/particles.min.js");
    loadScript("/themes/brand/js/swiper-bundle.min.js");
    loadScript("/themes/brand/js/custom.js");
  }, []);

  const initialValues = {
    full_name: "",
    email: "",
    phone_number: "",
    recaptchaField: "",
  };

  const submitBrandLead = async (data) => {
    instance
      .post("landing-pages/brands-lead", data)
      .then((response) => {
        showMessage(response);
        setButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        showMessage(error);
        setButtonDisabled(false);
      });
  };

  const onSubmit = async (values) => {
    setButtonDisabled(true)
    let formdata = new FormData();
    formdata.append("BrandLeads[full_name]", values.full_name);
    formdata.append("BrandLeads[email]", values.email);
    formdata.append("BrandLeads[phone_number]", values.phone_number);
    await submitBrandLead(formdata);
    recaptcha.current.reset();
  };

  const showMessage = (data) => {
    toast.current.show({
      severity: data.success ? "success" : "error",
      summary: data.success ? "Success" : "Error",
      detail: data.message,
      life: 5000,
    });
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-type" content="text/html;charSet=UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta name="csrf-param" content="_csrf" />
        <meta
          name="csrf-token"
          content="RS1SNnQ3WFYCYztPRRodLzZlFkxFXylhcls2egdBbGQsajBhLUJgNA=="
        />
        <meta
          name="description"
          content="RICH KARDZ is an NFC-based digital card. With just a tap. you can share your contact information using this."
        />
        <title>::RichKardZ::</title>

        <link
          rel="stylesheet"
          href="/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/themes/brand/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/themes/brand/css/style83a8.css?a=2"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/themes/brand/css/common.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/themes/brand/css/responsive.css"
        />
        <link rel="stylesheet" href="/themes/brand/css/animate.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="/themes/brand/css/swiper-bundle.min.css"
        />

        <link href="/media/Richkardz-favicon.png" rel="icon" />
        <link rel="canonical" href="https://www.richkardz.com/" />
      </head>
      <Toast ref={toast} />
      <body className="bodyMain">
        <header className="container headerTop">
          <img
            className="logoTop"
            src="themes/brand/img/richkardsLogo.png"
            alt="logo"
          />
        </header>
        <section className="container mainSection mt-0">
          <div className="REIDmainSection">
            <div className="row">
              <div className="col-lg-8 col-md-7 topREID">
                <h1>
                  For the first time: <br /> RFID + NFC in one card
                </h1>
                <p className="customSmallHeading">
                  Rich Kardz now offers RFID and NFC in one card. Which means
                  you can now use just one card for office access and for
                  networking needs. Our cards can be used to share your contact
                  details, social handles, websites and other details while also
                  doubling up as an RFID card. This is our revolutionary product
                  to simplify your life.
                </p>
              </div>
              <div
                className="col-lg-4 col-md-5  mt-4 mt-md-0 ps-lg-5 "
                id="contactdiv"
              >
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      <Field
                        type="hidden"
                        name="_csrf"
                        className="form-control"
                        id="floatingname"
                        value="RS1SNnQ3WFYCYztPRRodLzZlFkxFXylhcls2egdBbGQsajBhLUJgNA   "
                      />
                      <ErrorMessage
                        name="_csrf"
                        component="div"
                        className="text-danger"
                      />
                      <div className="position-relative inputREID">
                        <div className="form-group field-brandleads-full_name required">
                          <Field
                            type="text"
                            name="full_name"
                            className="form-control"
                            placeholder="Full Name"
                          />
                          <ErrorMessage
                            name="full_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <img
                          className="inputREIDicon"
                          src="/themes/brand/img/qrCodeWhite.png"
                          alt="qrwhite"
                        />
                      </div>
                      <div className="position-relative inputREID">
                        <div className="form-group field-brandleads-phone_number required">
                          <Field
                            type="text"
                            name="phone_number"
                            className="form-control"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <img
                          className="inputREIDicon"
                          src="/themes/brand/img/qrCodeWhite.png"
                          alt="qrwhite"
                        />
                      </div>
                      <div className="position-relative inputREID">
                        <div className="form-group field-brandleads-email required">
                          <Field
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Business email id"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <img
                          className="inputREIDicon"
                          src="/themes/brand/img/rkInputIcon.png"
                          alt="email"
                        />
                      </div>
                      <div className="position-relative inputREID">
                        <br />
                        <div className="form-group field-brandleads-recaptcha">
                          <ReCAPTCHA
                            sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                            ref={recaptcha}
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
                        </div>
                      </div>

                      <br />
                      <div>
                        <button 
                          type="submit" 
                          className="contactBtn btn"
                          disabled={isButtonDisabled}
                        >
                          {isButtonDisabled ? "Submiting.." : "Submit"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
        <section className="container mainSection">
          <div className="row">
            <div className="col-lg-5">
              <div className="appAdd position-relative">
                <img src="themes/brand/img/appAddImg.png" alt="add" />
              </div>
            </div>
            <div className="col-lg-7 ps-lg-5 mt-5 mt-lg-0">
              <h1 className="customHeading">
                Stand out & simplify your office & networking needs with Rich
                Kardz
              </h1>
              <div className="row">
                <div className="col-lg-6 mt-4 col-md-6">
                  <div className="row align-items-center">
                    <div className="standCard">
                      <img src="themes/brand/img/rfid_nfc.png" alt="stand card" />
                    </div>
                    <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                      <h6 className="standMidumTtle">RFID + NFC</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 col-md-6">
                  <div className="row align-items-center">
                    <div className="standCard">
                      <img src="themes/brand/img/OneTap_Network.png" alt="stand card" />
                    </div>
                    <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                      <h6 className="standMidumTtle">One Tap Network </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 col-md-6">
                  <div className="row align-items-center">
                    <div className="standCard">
                      <img src="themes/brand/img/QR_Code.png" alt="qr card" />
                    </div>
                    <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                      <h6 className="standMidumTtle">QR Code</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 col-md-6">
                  <div className="row align-items-center">
                    <div className="standCard">
                      <img
                        src="themes/brand/img/DetailedBusinessCard.png"
                        alt="business card"
                      />
                    </div>
                    <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                      <h6 className="standMidumTtle">Detailed Business Card</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 col-md-6">
                  <div className="row align-items-center">
                    <div className="standCard">
                      <img src="themes/brand/img/PocketFriendly.png" alt="stand card" />
                    </div>
                    <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                      <h6 className="standMidumTtle">Pocket Friendly</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mainSection">
          <div className="swiper allourProduct">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="row">
                  <div className="col-lg-5">
                    <h1 className="customHeading">
                      All our Products are Customizable
                    </h1>
                    <p className="ourProductTitle customSmallHeading">
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default.
                    </p>
                  </div>
                  <div className="col-lg-7">
                    <img src="themes/brand/img/OurProductSlider.png" alt="product slider" />
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="row">
                  <div className="col-lg-5">
                    <h1 className="customHeading">
                      All our Products are Customizable
                    </h1>
                    <p className="ourProductTitle customSmallHeading">
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default.
                    </p>
                  </div>
                  <div className="col-lg-7">
                    <img src="themes/brand/img/OurProductSlider.png" alt="slider" />
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="row">
                  <div className="col-lg-5">
                    <h1 className="customHeading">
                      All our Products are Customizable
                    </h1>
                    <p className="ourProductTitle customSmallHeading">
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default.
                    </p>
                  </div>
                  <div className="col-lg-7">
                    <img src="themes/brand/img/OurProductSlider.png" alt="product slider" />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex ourProductNavigation">
              <div className="swiper-button-prev">
                <img src="themes/brand/img/arrowRight.png" alt="prev" />
              </div>
              <div className="swiper-button-next">
                <img src="themes/brand/img/arrowLeft.png" alt="next" />
              </div>
            </div>
          </div>
        </section>
        <section className="container mainSection">
          <div className="text-center mb-3">
            <h1 className="customHeading">Features & Benefits</h1>
            <p className="customSmallHeading">
              Lorem Ipsum passage, and going through the cites of the word in
              classical <br />
              literature, discovered the undoubtable source.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/RFID_Cards.png" alt="future card icon" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">RFID Cards</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      Cards that can be used for any Office Access
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/NFC-Cards.png" alt="NFC card" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">NFC Cards</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      Tap your card on any phone and immediately share details
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/QR-Code.png" alt="qr code" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">QR Code</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      Scan the QR Code to share details
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/Eco-Friendly.png" alt="Feature card" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">Eco-Friendly</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      Reduce the need for paper and repeated printing with Rich
                      Kardz
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/Leave.png" alt="Feature card" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">Leave an Impression</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      Impress clients with cutting edge technology of Networking
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
              <div className="FeaturesCard">
                <div className="row align-items-center">
                  <div className="FeaturesCardIcon">
                    <img src="themes/brand/img/TwoinOne.png" alt="image" />
                  </div>
                  <div className="col-8 col-lg-7 ps-0 col-xxl-8">
                    <h5 className="FeaturesCardTitle">Two in One</h5>
                    <h6 className="FeaturesCardSmalTitle">
                      One card solution to both Access and Networking needs
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mainSection">
          <div className="row">
            <div className="col-lg-6 ps-lg-5 order-lg-last">
              <img src="themes/brand/img/NetworkingTree.png" alt="image" />
            </div>
            <div className="col-lg-6  mt-4 mt-lg-0 ">
              <h1 className="customHeading">
                Make Networking Eco Friendly, Let&apos;s Grow a Forest Together
              </h1>
              <p className="customSmallHeading">
                Every year more than 7.2 Million Trees get cut for visiting
                cards. By using Rich Kardz you can be part of the change and
                network the sustainable way. And what’s more is that we plant a
                tree for every order we receive..
              </p>
              <a
                href="#contactdiv"
                className="btn btnOrange mt-3"
                style={{ textAlign: "center", padding: ".675rem .75rem" }}
              >
                Contact Us →
              </a>
            </div>
          </div>
        </section>
        <section className="container mainSection">
          <div className="row">
            <div className="col-lg-6">
              <img src="themes/brand/img/whyRich.png" alt="image" />
            </div>
            <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0">
              <h1 className="customHeading">
                Why Rich Kardz <br />
                NFC + RFID cards are the best solution
              </h1>
              <ul className="whyRichList">
                <li className="customSmallHeading">
                  Office Access Cards doubling up as business cards
                </li>
                <li className="customSmallHeading">
                  Details of cards can be updated anytimeDetails of cards can be
                  updated anytime
                </li>
                <li className="customSmallHeading">Zero trees cut</li>
                <li className="customSmallHeading">
                  Available always on connected devices
                </li>
                <li className="customSmallHeading">
                  Contact information, Social handles, websites and more
                </li>
                <li className="customSmallHeading">New-Gen and Premium</li>
                <li className="customSmallHeading">
                  One of a kind conversation starter
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="container mainSection ourCardMain">
          <div className="ourCard">
            <div className="col-xl-11 col-lg-11 col-md-12 m-auto">
              <img
                src="themes/brand/img/OurCard.png"
                alt="image"
                className="ourCardImg"
              />
              <h1 className="ourCardTitile">
                Our Cards are the Solution to your Office and Networking needs!
                Get your Rich Kardz now!
              </h1>
              <div className="row text-center">
                <div className="col-lg-12 col-md-3">
                  <a
                    href="#contactdiv"
                    style={{ padding: ".675rem .75rem" }}
                    className="btn btnOrange mt-3"
                  >
                    Contact Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="container footer">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-6 text-center text-md-start">
              <img
                className="logoTop"
                src="themes/brand/img/richkardsLogo.png"
                alt="image"
              />
            </div>
            <div className="col-lg-4 col-md-6 text-center text-md-end text-lg-center  mt-4 mt-lg-0">
              <h6 className="text-white">
                Copyright © 2023 MHS.com. All rights reserved.
              </h6>
            </div>
            <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
              <ul className="socialIcon text-center  text-lg-end">
                <li>
                  <a href="https://instagram.com/richkardz_">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/rich-kardz/">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
