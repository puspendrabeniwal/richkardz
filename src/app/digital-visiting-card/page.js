"use client";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { GOOGLE_CAPTCHA_SITE_KEY } from "../global_constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name cannot be blank."),
  email: Yup.string()
    .email("Email is not a valid email address.")
    .required("Email cannot be blank."),
  phone_no: Yup.string()
    .matches(
      /^(\+\d{1,2}\s?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Phone Number should contain at least 10 characters."
    )
    .required("Phone Number cannot be blank."),
  city: Yup.string().required("City cannot be blank."),
  recaptchaField: Yup.string().required("reCAPTCHA validation is required."),
});

export default function DigitalVisitingCard() {
  const toast = useRef(null);
  const recaptcha = useRef();
  const initialValues = {
    name: "",
    email: "",
    phone_no: "",
    city: "",
    recaptchaField: "",
  };
  const addDigitalVisitingCard = async (data) => {
    axios
      .post(
        "https://richkardz.com/api/landing-pages/digital-visiting-card-enq/",
        data
      )
      .then((response) => {
        showMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
        showMessage(error);
      });
  };
  const onSubmit = async (values) => {
    let formdata = new FormData();
    formdata.append("Enquiries[name]", values.name);
    formdata.append("Enquiries[email]", values.email);
    formdata.append("Enquiries[phone_no]", values.phone_no);
    formdata.append("Enquiries[city]", values.city);
    await addDigitalVisitingCard(formdata);
    recaptcha?.current?.reset();
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
      <head runat="server">
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />

        <meta
          name="description"
          content="RICH KARDZ is an NFC-based digital card. With just a tap. you can share your contact information using this."
        />
        <meta
          name="keywords"
          Content="smart visiting card, nfc visiting card, nfc business card, smart business card"
        />
        <title>Home</title>

        <meta property="og:type" content="website" />
        <meta property="og:image" content />
        <meta
          property="og:url"
          content="https://www.richkardz.com/digital-visiting-card"
        />
        <meta
          property="og:title"
          content="RICH KARDZ is an NFC-based digital card"
        />
        <meta
          property="og:description"
          content="RICH KARDZ is an NFC-based digital card. With just a tap. you can share your contact information using this."
        />
        <meta property="og:site_name" content="Rich Kardz" />
        <meta property="og:email" content="support@richkardz.com" />
        <meta property="og:phone_no" content="+919739048320" />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Buy smart visiting card | NFC visiting card"
        />
        <meta
          name="twitter:description"
          content="Get the best NFC visiting card for your business meets. Buy smart visiting cards from RichKardz at an affordable price. Smart business NFC cards."
        />
        <meta
          name="twitter:url"
          content="https://www.richkardz.com/digital-visiting-card"
        />
        <meta name="twitter:image" content />
        <meta name="csrf-param" content="_csrf" />
        <meta
          name="csrf-token"
          content="ZU55a3MtNmlUGBwyBncOGgEnNhwLZUcHXQQAEUpdBBg0CCZfR3QEJA=="
        />

        <link href="/media/Richkardz-favicon.png" rel="icon" />
        <link
          href="https://www.richkardz.com/digital-visiting-card"
          rel="canonical"
        />
        <link href="/themes/landing/css/bootstrap.min.css" rel="stylesheet" />
        <link
          href="/themes/landing/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="/themes/landing/css/owl.carousel.min.css"
          rel="stylesheet"
        />
        <link
          href="/themes/landing/css/default-theme3872.css?a=1"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/themes/landing/css/mediaresponsive.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <Toast ref={toast} />
      <body className="digiload">
        <section className="headerOuter">
          <div className="container">
            <div className="logosec text-center">
              <img
                src="/themes/landing/images/logo.svg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="luxrysec">
          <div className="container">
            <div className="boxtopform">
              <div className="row">
                <div className="col-md-4 col-12">
                  <h3>Luxury at Pocket Friendly Prices</h3>
                  <p>
                    Rich Kardz is a NFC (Near Field Communication) business card
                    that helps you network with just a tap. Our cards can share
                    your contact details, social handles, website and other
                    details immediately. We do all that in a Stylish, Premium
                    and Sustainable way.
                  </p>
                </div>
                <div className="col-md-4 col-12 divgp">
                  <img
                    src="/media/image450c.png?width=265&amp;height=492&amp;zc=0&amp;image=/themes/landing/images/handimg.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-md-4 col-12 ">
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (
                      values,
                      { resetForm, resetCaptcha, errors }
                    ) => {
                      await onSubmit(values);
                      resetForm();

                      // resetCaptcha();
                    }}
                  >
                    {({ setFieldValue, values }) => (
                      <Form>
                        <Field
                          type="hidden"
                          name="_csrf"
                          className="form-control"
                          value="ZU55a3MtNmlUGBwyBncOGgEnNhwLZUcHXQQAEUpdBBg0CCZfR3QEJA"
                        />
                        <ErrorMessage
                          name="_csrf"
                          component="div"
                          className="text-danger"
                        />
                        <div className="formDiv">
                          <div className="form-group field-enquiries-utm">
                            <Field
                              type="hidden"
                              name="utm"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="utm"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="formgrop field-enquiries-name required">
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                              id="floatingname"
                              placeholder="Full Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                            <div className="fmcp">
                              <img src="/media/image0d86.png?width=31&amp;height=32&amp;zc=0&amp;image=/themes/landing/images/qrcode.png" />
                            </div>
                          </div>
                          <div className="formgrop field-enquiries-email required">
                            <Field
                              type="text"
                              name="email"
                              className="form-control"
                              id="floatingname"
                              placeholder="Official Email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="formgrop field-enquiries-phone_no required">
                            <Field
                              type="text"
                              name="phone_no"
                              className="form-control"
                              placeholder="Phone Number"
                            />
                            <div className="fmcp">
                              <img src="/media/imageb01d.png?width=31&amp;height=32&amp;zc=0&amp;image=/themes/landing/images/NFC-Logo-Icon.png" />
                            </div>
                            <ErrorMessage
                              name="phone_no"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="formgrop field-enquiries-city required">
                            <Field
                              type="text"
                              name="city"
                              className="form-control"
                              id="floatingname"
                              placeholder="Your City"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="formgrop field-enquiries-city required">
                            <div className="mx-1 form-group field-brandleads-recaptcha">
                              <ReCAPTCHA
                                sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                                ref={recaptcha}
                                onChange={(reCaptchaValue) => {
                                  if (reCaptchaValue) {
                                    setFieldValue(
                                      "recaptchaField",
                                      reCaptchaValue
                                    );
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="recaptchaField"
                                component="div"
                                className="text-danger"
                              />
                              <p className="help-block help-block-error"></p>
                            </div>
                          </div>
                          <div className="formgrop">
                            <button type="submit" className="form-control">
                              Submit
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="fiveservice">
          <div className="container">
            <div className="row m-auto">
              <div className="col-lg-2 col-md-4 col-6 m-auto p-0">
                <div className="iocnbox">
                  <img
                    src="/media/imageca67.png?width=70&amp;height=66&amp;zc=0&amp;image=/themes/landing/images/icon-top-01.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>
                    Customise
                    <br />
                    your Card
                  </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6 m-auto p-0">
                <div className="iocnbox">
                  <img
                    src="/media/image4b90.png?width=70&amp;height=72&amp;zc=0&amp;image=/themes/landing/images/icon-top-02.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>
                    Pocket
                    <br />
                    Friendly
                  </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6 m-auto p-0">
                <div className="iocnbox">
                  <img
                    src="/media/image7022.png?width=70&amp;height=75&amp;zc=0&amp;image=/themes/landing/images/icon-top-03.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>
                    One Tap
                    <br />
                    Network
                  </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6 m-auto p-0">
                <div className="iocnbox">
                  <img
                    src="/media/imageef16.png?width=70&amp;height=70&amp;zc=0&amp;image=/themes/landing/images/icon-top-04.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>
                    QR
                    <br />
                    Scan
                  </h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6 m-auto p-0">
                <div className="iocnbox">
                  <img
                    src="/media/image7c7c.png?width=70&amp;height=62&amp;zc=0&amp;image=/themes/landing/images/icon-top-05.png"
                    className="img-fluid"
                    alt=""
                  />
                  <h3>
                    Detailed
                    <br />
                    Business Card
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="impreesion">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12">
                <h2>Make a great first impression with Rich Kardz</h2>
              </div>
            </div>
            <img
              src="/media/imagecbb0.png?width=700&amp;height=644&amp;zc=0&amp;image=/themes/landing/images/Image-editions-new.png"
              className="img-fluid"
              alt=""
            />
            <div className="bottomline"></div>
          </div>
        </section>
        <section className="all-Producs">
          <h2 className="secHead">All our Products are Customizable</h2>
          <div className="carouselcard">
            <div className="container">
              <img
                src="/media/imageb804.png?width=260&amp;height=153&amp;zc=0&amp;image=/themes/landing/products/1.png"
                className="pro-img"
                alt=""
              />
              <img
                src="/media/image9f9d.png?width=260&amp;height=153&amp;zc=0&amp;image=/themes/landing/products/2.png"
                className="pro-img"
                alt=""
              />
              <img
                src="/media/image70be.png?width=260&amp;height=153&amp;zc=0&amp;image=/themes/landing/products/3.png"
                className="pro-img"
                alt=""
              />
              <img
                src="/media/image64f2.png?width=260&amp;height=153&amp;zc=0&amp;image=/themes/landing/products/4.png"
                className="pro-img"
                alt=""
              />
            </div>
          </div>
          <br />
          <br />
          <div className="container pt-4">
            <div className="bottomline"></div>
          </div>
        </section>
        <section className="featureDiv">
          <div className="container pt-5">
            <h2 className="secHead">Features & Benefits</h2>
            <div className="row pt-5">
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/imagea083.png?width=70&amp;height=57&amp;zc=0&amp;image=/themes/landing/images/Features-icon-01.png"
                    alt=""
                  />
                  <h3>NFC Cards</h3>
                  <p>Tap your card on a phone and immediately share details.</p>
                </div>
              </div>
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/image4cec.png?width=70&amp;height=88&amp;zc=0&amp;image=/themes/landing/images/Features-icon-02.png"
                    alt=""
                  />
                  <h3>QR Code</h3>
                  <p>Scan the QR Code to share details</p>
                </div>
              </div>
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/imageea0a.png?width=70&amp;height=70&amp;zc=0&amp;image=/themes/landing/images/Features-icon-03.png"
                    alt=""
                  />
                  <h3>Eco Friendly</h3>
                  <p>
                    Reduce the need for paper and repeated printing with Rich
                    Kardz
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/image917f.png?width=70&amp;height=70&amp;zc=0&amp;image=/themes/landing/images/Features-icon-04.png"
                    alt=""
                  />
                  <h3>One Card for Life</h3>
                  <p>Our cards last a lifetime & can be updated on the go</p>
                </div>
              </div>
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/image984d.png?width=70&amp;height=71&amp;zc=0&amp;image=/themes/landing/images/Features-icon-05.png"
                    alt=""
                  />
                  <h3>Leave an Impression</h3>
                  <p>
                    Impress clients with cutting edge technology of Networking
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-ms-6 col-12">
                <div className="featureBox">
                  <img
                    src="/media/imaged786.png?width=70&amp;height=70&amp;zc=0&amp;image=/themes/landing/images/Features-icon-06.png"
                    alt=""
                  />
                  <h3>Lightning Transaction</h3>
                  <p>Allow faster payment transactions through our Cards</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="impreesion1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12"></div>
              <div className="col-md-6 col-12">
                <h2>
                  Make Networking Eco Friendly, Lets Grow a Forest Together
                </h2>
                <p>
                  Every year more than 7.2 Million Trees get cut for visiting
                  cards. By using Rich Kardz you can be part of the change and
                  network the sustainable way. And what’s more is that we plant
                  a tree for every order we receive.
                </p>
              </div>
              <div className="col-12">
                <div className="btnsub">
                  <a href="#">Contact Us</a>
                </div>
              </div>
            </div>
            <img
              src="/media/image6b2b.png?width=590&amp;height=354&amp;zc=0&amp;image=/themes/landing/images/grassy-landscape-with-tree-raincloud.png"
              className="img-fluid"
              alt=""
            />
          </div>
        </section>
        <section className="servicelist">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="listboxs">
                  <h3>Visiting Cards</h3>
                  <ul>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />{" "}
                      Have to reprint to update details
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Trees need to be cut
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Gets thrown away
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Only contact information
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.html?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Outdated
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="listboxs">
                  <h3>Richkardz</h3>
                  <ul>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Details can be updated anytime
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Zero trees cut
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Available always on connected devices
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Contact information, Social Handles,{" "}
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      Websites & more
                    </li>
                    <li>
                      {" "}
                      <img
                        src="/media/imagea0c9.png?width=18&amp;height=20&amp;zc=0&amp;image=/themes/landing/images/Union-arrow.png"
                        alt=""
                      />
                      New-Gen & Premium
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="needcardform">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12">
                <img
                  src="/themes/landing/images/Landing-page-image.png"
                  class="img-fluid"
                />
              </div>
              <div className="col-md-5 col-12">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm, errors }) => {
                    if (recaptcha && recaptcha?.current?.getValue()) {
                      await onSubmit(values);
                      resetForm();
                    }
                  }}
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      <Field
                        type="hidden"
                        name="_csrf"
                        className="form-control"
                        value="ZU55a3MtNmlUGBwyBncOGgEnNhwLZUcHXQQAEUpdBBg0CCZfR3QEJA"
                      />
                      <ErrorMessage
                        name="_csrf"
                        component="div"
                        className="text-danger"
                      />
                      <div className="formDiv">
                        <h3>One Card is all you need</h3>
                        <div className="form-group field-enquiries-utm">
                          <Field
                            type="hidden"
                            name="utm"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="utm"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="formgrop field-enquiries-name required">
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                            id="floatingname"
                            placeholder="Full Name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="formgrop field-enquiries-email required">
                          <Field
                            type="text"
                            name="email"
                            className="form-control"
                            id="floatingname"
                            placeholder="Official Email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="formgrop field-enquiries-phone_no required">
                          <Field
                            type="text"
                            name="phone_no"
                            className="form-control"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name="phone_no"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="formgrop field-enquiries-city required">
                          <Field
                            type="text"
                            name="city"
                            className="form-control"
                            id="floatingname"
                            placeholder="Your City"
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="formgrop field-enquiries-city required">
                          <div className="mx-1 form-group field-brandleads-recaptcha">
                            <ReCAPTCHA
                              sitekey={GOOGLE_CAPTCHA_SITE_KEY}
                              ref={recaptcha}
                              onChange={(reCaptchaValue) => {
                                if (reCaptchaValue) {
                                  setFieldValue(
                                    "recaptchaField",
                                    reCaptchaValue
                                  );
                                }
                              }}
                            />
                            <ErrorMessage
                              name="recaptchaField"
                              component="div"
                              className="text-danger"
                            />
                            <p className="help-block help-block-error"></p>
                          </div>
                        </div>
                        <div className="formgrop">
                          <button type="submit" className="form-control">
                            Submit
                          </button>
                        </div>
                        <h4>
                          Get your
                          <br />
                          Rich Kardz Now!
                        </h4>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="bottomline"></div>
          </div>
        </section>
        <section className="footerSec">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-12 pb-3">
                <div className="footerBox1">
                  <img src="/themes/landing/images/logo.svg" alt />
                </div>
              </div>
              <div className="col-md-4 col-12 pb-3">
                <div className="footerBox2">
                  <p>Copyright © 2023 richkardz.com. All rights reserved.</p>
                </div>
              </div>
              <div className="col-md-4 col-12 pb-3">
                <div className="footerBox3">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/rich-kardz/"
                  >
                    <img
                      src="/themes/landing/images/linkedin-icon.svg"
                      alt=""
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/richkardz_/"
                  >
                    <img
                      src="/themes/landing/images/instagram-icon.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
