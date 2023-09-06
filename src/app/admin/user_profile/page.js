'use client'
import React, { useEffect, useState ,useContext, useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import { Toast } from "primereact/toast";
import { Image } from 'primereact/image';
import { FileUpload } from 'primereact/fileupload';

import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
import { AuthContext } from "../AuthContext";

const  UserProfile = ()=> {
    const { setUser } = useContext(AuthContext);
    const [userDetail, setUserDetail] = useState({});

    const toast = useRef(null);
    useEffect(() => {
        getUserDetail()
    },[])


    const getUserDetail = ()=>{
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
        let formData = new FormData();
        formData.append("user_id", loginUser._id);

        instance.post("getUserDetail", formData)
            .then(response => {
                let userProfile = (response.result) ? response.result : {};
                setUser(userProfile)
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
    });


    const initialValues = {
        full_name: (userDetail.full_name) ? userDetail.full_name : '',
        email: (userDetail.email) ? userDetail.email : ''
    };

   
    const onSubmit = async(values, { setSubmitting, resetForm }) => {
        setSubmitting(false)
        let formData = new FormData();
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
        formData.append("user_id", loginUser._id);
        formData.append("full_name", values.full_name);
        formData.append("email", values.email);
        formData.append("image", values.image);
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
                            Account Settings
                        </h1>
                        <span className="h-20px border-gray-300 border-start mx-4"></span>
                        <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                            <li className="breadcrumb-item text-muted">
                                <Link href="/admin/dashboard" className="text-muted text-hover-primary">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-300 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-mute">Edit Profile</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="content d-flex  flex-column-fluid">
            <div className="d-flex flex-column-fluid" id="kt_post">
                <div className="container-xxl">
                    <div className="card" >
                       
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >                               
                            {({ setFieldValue }) => (
                                <Form >
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-6">
                                            <label className="col-lg-4 col-form-label fw-semibold fs-6">Image</label>   
                                            <FileUpload 
                                                name="image" 
                                                accept="image/*" 
                                                auto
                                                customUpload
                                                maxFileSize={1000000}
                                                onSelect={(event) => {
                                                    const files = event.files[0];
                                                    setFieldValue("image", files);
                                                    }}
                                                emptyTemplate={
                                                <Image src={userDetail?.full_image_path} height="70px" width="100px" alt="Image" />
                                            } 
                                            />
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
                            )}
                        </Formik>
                   
                    </div>
                </div>
            </div>
        </div>                                           
    </>
  )
}

export default withAuth(UserProfile);