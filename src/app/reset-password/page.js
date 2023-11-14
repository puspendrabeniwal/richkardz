"use client";
import * as Yup from "yup";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/app/axiosInterceptor";

const validationSchema = Yup.object().shape({
  // newpassword: Yup.string().required("Password is required"),
  // confirmpassword: Yup.string().required("Password is required"),
  newpassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmpassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match"),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const toast = useRef(null);
  const router = useRouter();
  const initialValues = {
    newpassword: "",
    confirmpassword: "",
  };

  const onSubmit = async (values) => {
    let formdata = new FormData();
    formdata.append("Users[newpassword]", values.newpassword);
    formdata.append("Users[confirmpassword]", values.confirmpassword);
    await resetPassword(formdata);
  };
  const resetPassword = async () => {
    instance
      .post(`login/reset-password?auth_key=${searchParams.get("auth_key")}`)
      .then((response) => {
        showMessage(response);
        if (response.success === true) {
          router.push(`login`);
        }
      })
      .catch((error) => {
        console.log(error);
        showMessage(error);
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
                  <h3>Reset Password</h3>
                  <p>You can reset your Password here.</p>
                </div>
                {/* <div className="col-md-4 col-12 divgp">
                  <img
                    src="/media/image450c.png?width=265&amp;height=492&amp;zc=0&amp;image=/themes/landing/images/handimg.png"
                    className="img-fluid"
                    alt=""
                  />
                </div> */}
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
                    }}
                  >
                    {({ setFieldValue, values }) => (
                      <Form>
                        <div className="formDiv">
                          <div className="formgrop field-enquiries-newpassword required">
                            <Field
                              type="password"
                              name="newpassword"
                              className="form-control"
                              id="floatingname"
                              placeholder="New Password"
                            />
                            <ErrorMessage
                              name="newpassword"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="formgrop field-enquiries-email required">
                            <Field
                              type="password"
                              name="confirmpassword"
                              className="form-control"
                              id="floatingname"
                              placeholder="Confirm Password"
                            />
                            <ErrorMessage
                              name="confirmpassword"
                              component="div"
                              className="text-danger"
                            />
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
              <div className="col-md-4 col-12 pb-3"></div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
