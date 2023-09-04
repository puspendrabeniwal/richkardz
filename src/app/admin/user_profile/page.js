'use client'
import React, { useEffect, useState , useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from "primereact/toast";
import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
const  UserProfile = ()=> {
    const [userDetail, setUserDetail] = useState({});
    const toast = useRef(null);
    useEffect(() => {
        getUserDetail()
    },[])


    const getUserDetail = ()=>{
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
        let formData = new FormData();    //formdata object
        formData.append("user_id", loginUser._id);   //append the values with key, value pair

        instance.post("getUserDetail", formData)
            .then(response => {
                let userProfile = (response.result) ? response.result : {};
                setUserDetail(userProfile);
            })
            .catch(error => {
                showMessage();
                console.log(error);
            });
    }
    const showMessage = (data) => {
        toast.current.show({
          severity: (data.status) ? "success" : "error",
          summary: (data.status) ? "Success" : "Error",
          detail: data.message,
          life: 3000,
        });
    };


    const validationSchema = Yup.object({
        full_name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        // Define more validation rules for other fields
    });


    const initialValues = {
        full_name: (userDetail.full_name) ? userDetail.full_name : '',
        email: (userDetail.email) ? userDetail.email : '',
        // Add more fields with their initial values
    };

   
    const onSubmit = async(values, { setSubmitting, resetForm }) => {
        setSubmitting(false)
        let formData = new FormData();    //formdata object
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
        formData.append("user_id", loginUser._id);   //append the values with key, value pair
        formData.append("full_name", values.full_name);   //append the values with key, value pair
        formData.append("email", values.email);   //append the values with key, value pair

        instance.post("updateUserProfile", formData)
        .then(response => {
            showMessage(response);
            getUserDetail();
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
                        <span className="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1">Edit Profile</span>
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
                                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Avatar</label>   
                                    <div className="col-lg-8">
                                        <div className="image-input image-input-outline" data-kt-image-input="true" style={{"backgroundImage": "url(/metronic8/demo1/assets/media/svg/avatars/blank.svg)"}}>
                                            <div className="image-input-wrapper w-125px h-125px" style={{"backgroundImage": "url(/admin/assets/media/avatars/300-1.jpg)"}}></div>
                                            <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                                                <i className="ki-duotone ki-pencil fs-7"><span className="path1"></span><span className="path2"></span></i>
                                                <input type="file" name="avatar" accept=".png, .jpg, .jpeg"/>
                                                <input type="hidden" name="avatar_remove"/>
                                            </label>
                                            <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span className="path2"></span></i>                            </span>
                                            <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span className="path2"></span></i>                            </span>
                                        </div>
                                        <div className="form-text">Allowed file types:  png, jpg, jpeg.</div>
                                    </div>
                                </div>

                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field  
                                            type="text" 
                                            name="full_name" 
                                            className="form-control form-control-lg form-control-solid" 
                                            placeholder="Full Name" 
                                        />
                                        <ErrorMessage name="full_name" className="errorMessage" component="div" />
                                    </div>
                                </div>
                                <div className="row mb-6">
                                    <label className="col-lg-4 col-form-label required fw-semibold fs-6">Email</label>
                                    <div className="col-lg-8 fv-row">
                                        <Field  
                                            type="text" 
                                            name="email" 
                                            className="form-control form-control-lg form-control-solid" 
                                            placeholder="Email Address" 
                                        />
                                        <ErrorMessage name="email" className="errorMessage" component="div" />
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

export default withAuth(UserProfile);