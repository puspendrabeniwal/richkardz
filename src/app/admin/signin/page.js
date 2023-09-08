"use client";
import React, { useRef, useEffect } from "react";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import instance from "../axiosInterceptor";
const Signin = () => {
  let user;
  const navigate = useRouter();
  const toast = useRef(null);


  useEffect(() => {
    user = localStorage.getItem("loginInfo");
    if(user)  window.location.replace("/admin/dashboard");
  },[])
  

  async function handleSubmit(values) {
    // setSubmitting(true);
    try {
      const response = await instance.post(`auth`, values);
      let user = (response.result) ? response.result :{} ;
      let token = (response.token) ? response.token :"" ;
      if (token && Object.keys(user).length>0) {
        localStorage.setItem("loginInfo", JSON.stringify(user));
        window.location.replace("/admin/dashboard");
      }
      showMessage(response);
    } catch (error) {
      // setSubmitting(false);
      console.log(error);
    }
  }


  const showMessage = (data) => {
    toast.current.show({
      severity: (data.status) ? "success" : "error",
      summary: (data.status) ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };

  
  return (
    <>
    {(!user) ? <div className="d-flex flex-column flex-root" id="kt_app_root">
    
    <div className="d-flex flex-column flex-lg-row flex-column-fluid">
  
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="w-lg-500px p-10">
            <Formik
              initialValues={{
                password: "",
                username: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password = "Password cannot be blank";
                }
                if (!values.username) {
                  errors.username = "Username cannot be blank";
                } 
         
                return errors;
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                /* and other goodies */
              }) => (
                <form
                  className="form w-100"
                  // novalidate="novalidate"
                  // id="kt_sign_in_form"
                  // data-kt-redirect-url="/metronic8/demo1/../demo1/index.html"
                  // action="#"
                  onSubmit={handleSubmit}
                >
                  <div className="text-center mb-11">
                  <Toast ref={toast} />
                    <h1 className="text-dark fw-bolder mb-3">Sign In</h1>

                    <div className="text-gray-500 fw-semibold fs-6">
                      Your Social Campaigns
                    </div>
                  </div>

                  <div className="fv-row mb-8">
                    <span>
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className="form-control bg-transparent"
                        placeholder="Usename"
                        id="floatingemail"
                      />
                      {/* <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        autocomplete="off"
                        className="form-control bg-transparent"
                      /> */}
                    </span>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.username && touched.username && errors.username}
                    </span>
                  </div>
                  <div className="fv-row mb-3">
                    <span>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="form-control bg-transparent"
                        placeholder="Password"
                        id="floatingpassword"
                      />
                    </span>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.password &&
                        touched.password &&
                        errors.password}
                    </span>
                  </div>

                  <div className="d-grid mb-10">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btn-primary"
                    >
                      <span className="indicator-label">Sign In</span>
                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-lg-500px d-flex flex-stack px-10 mx-auto">
          {/* <div className="me-10">             

                      <button className="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" data-kt-menu-offset="0px, 0px">
                          <img  data-kt-element="current-lang-flag" className="w-20px h-20px rounded me-3" src="/metronic8/demo1/assets/media/flags/united-states.svg" alt=""/>
                          
                          <span data-kt-element="current-lang-name" className="me-1">English</span>

                          <span className="d-flex flex-center rotate-180">
                              <i className="ki-duotone ki-down fs-5 text-muted m-0"></i>                    </span>
                      </button>
          
                      <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7" data-kt-menu="true" id="kt_auth_lang_menu">

                              <div className="menu-item px-3">
                                  <a href="#" className="menu-link d-flex px-5" data-kt-lang="English">
                                      <span className="symbol symbol-20px me-4">
                                          <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/united-states.svg" alt=""/>
                                      </span>
                                      <span data-kt-element="lang-name">English</span>
                                  </a>
                              </div>

                              <div className="menu-item px-3">
                                  <a href="#" className="menu-link d-flex px-5" data-kt-lang="Spanish">
                                      <span className="symbol symbol-20px me-4">
                                          <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/spain.svg" alt=""/>
                                      </span>
                                      <span data-kt-element="lang-name">Spanish</span>
                                  </a>
                              </div>

                              <div className="menu-item px-3">
                                  <a href="#" className="menu-link d-flex px-5" data-kt-lang="German">
                                      <span className="symbol symbol-20px me-4">
                                          <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/germany.svg" alt=""/>
                                      </span>
                                      <span data-kt-element="lang-name">German</span>
                                  </a>
                              </div>

                              <div className="menu-item px-3">
                                  <a href="#" className="menu-link d-flex px-5" data-kt-lang="Japanese">
                                      <span className="symbol symbol-20px me-4">
                                          <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/japan.svg" alt=""/>
                                      </span>
                                      <span data-kt-element="lang-name">Japanese</span>
                                  </a>
                              </div>

                              <div className="menu-item px-3">
                                  <a href="#" className="menu-link d-flex px-5" data-kt-lang="French">
                                      <span className="symbol symbol-20px me-4">
                                          <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/france.svg" alt=""/>
                                      </span>
                                      <span data-kt-element="lang-name">French</span>
                                  </a>
                              </div>

                          </div>
              
                  </div> */}

          {/* <div className="d-flex fw-semibold text-primary fs-base gap-5">
                      <a href="#" target="_blank">Terms</a>

                      <a href="#" target="_blank">Plans</a>
                      
                      <a href="#" target="_blank">Contact Us</a>
                  </div> */}
        </div>
      </div>
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
        style={{
          backgroundImage: "url(/admin/assets/media/misc/search-bg.png)",
        }}
      >
        <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
          <a href="#" className="mb-0 mb-lg-12">
            <img
              alt="Logo"
              src="/admin/assets/media/logos/logo-1-dark.png"
              className="h-60px h-lg-75px"
            />
          </a>

          <img
            className="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
            src="/admin/assets/media/misc/auth-screens.png"
            alt=""
          />

          <h1 className="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">
            Fast, Efficient and Productive
          </h1>

          <div className="d-none d-lg-block text-white fs-base text-center">
            In this kind of post,{" "}
            <a
              href="#"
              className="opacity-75-hover text-warning fw-bold me-1"
            >
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides
            some background information about
            <a
              href="#"
              className="opacity-75-hover text-warning fw-bold me-1"
            >
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the
            interview.
          </div>
        </div>
      </div>
    </div>
  </div>:''}

    </>

  
)
 
}

export default withAuth(Signin);