'use client'
import React, { useEffect, useState , useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from "primereact/toast";
import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
const  ChangePassword = ()=> {
    const toast = useRef(null);

    const showMessage = (data) => {
        toast.current.show({
          severity: (data.status) ? "success" : "error",
          summary: (data.status) ? "Success" : "Error",
          detail: data.message,
          life: 3000,
        });
    };


    const validationSchema = Yup.object({
        old_password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,20}$/,
            'Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
          ),
        new_password: Yup.string()
            .required('New password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,20}$/,
            'Must contain at least 6 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number',
            ),
        confirm_password: Yup.string().required('Confirm password is required').oneOf([Yup.ref('new_password'), null], 'Confirm Password does not match with password'),

        // Define more validation rules for other fields
    });


    const initialValues = {
        old_password: '',
        new_password: '',
        confirm_password: '',
    };

   
    const onSubmit = async(values, { setSubmitting, resetForm }) => {
        setSubmitting(false)
        let formData = new FormData();
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
        formData.append("user_id", loginUser._id);
        formData.append("old_password", values.old_password);
        formData.append("new_password", values.new_password);
        formData.append("confirm_password", values.confirm_password);

        instance.post("change_password", formData)
        .then(response => {
            showMessage(response);
            resetForm()
        })
        .catch(error => {
            console.log(error);
        });
    };


  return (
    <>
        <Toast ref={toast} />
        <div className="d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                    <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                        <span className="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1">Change Password</span>
                        {/* <span className="text-muted fs-7 fw-bold mt-2">#XRS-45670</span> */}
                        </h1>

                    </div>


                    {/* <div className="d-flex align-items-center gap-2 gap-lg-3">
                        <div className="m-0">
                            <a href="#" className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                            
                            <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />
                                </svg>
                            </span>
                            Filter</a>

                            <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_6244763d93048">

                                <div className="px-7 py-5">
                                    <div className="fs-5 text-dark fw-bolder">Filter Options</div>
                                </div>
                                <div className="separator border-gray-200"></div>
                                <div className="px-7 py-5">
                                    <div className="mb-10">
                                        <label className="form-label fw-bold">Status:</label>
                                        <div>
                                            <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_6244763d93048" data-allow-clear="true">
                                                <option></option>
                                                <option value="1">Approved</option>
                                                <option value="2">Pending</option>
                                                <option value="2">In Process</option>
                                                <option value="2">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                        <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="../../demo1/dist/.html" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_app">Create</a>
                    </div> */}
                </div>
            </div>
        </div>

        <div className="content d-flex flex-column flex-column-fluid">
            <div className=" d-flex flex-column-fluid" id="kt_post">
                <div className="container-xxl">
                    <div className="card p-4" >
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >                               
                        <Form >
                            <div className="card-body border-top p-9">
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-semibold fs-6">Old Pasword</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field  
                                            type="password" 
                                            name="old_password" 
                                            className="form-control form-control-lg form-control-solid" 
                                            placeholder="Old Password" 
                                        />
                                        <ErrorMessage name="old_password" className="errorMessage" component="div" />
                                    </div>
                                </div>
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-semibold fs-6">New Password</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field  
                                            type="password" 
                                            name="new_password" 
                                            className="form-control form-control-lg form-control-solid" 
                                            placeholder="New Password" 
                                        />
                                        <ErrorMessage name="new_password" className="errorMessage" component="div" />
                                    </div>
                                </div>
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-semibold fs-6">Confirm Password</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field  
                                            type="password" 
                                            name="confirm_password" 
                                            className="form-control form-control-lg form-control-solid" 
                                            placeholder="Confirm Pasword" 
                                        />
                                        <ErrorMessage name="confirm_password" className="errorMessage" component="div" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="reset" className="btn btn-warning me-2">Discard</button>
                                <button type="submit" className="btn btn-info">Save Changes</button>
                            </div>
                        </Form>
                    </Formik>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default withAuth(ChangePassword);