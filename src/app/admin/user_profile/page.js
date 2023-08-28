'use client'
import React, { useEffect, useState , useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from "primereact/toast";
import instance from "../axiosInterceptor";

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
    <div className="card mb-5 mb-xl-10">
        <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
            <div className="card-title m-0">
                <h3 className="fw-bold m-0">Profile Details</h3>
            </div>
        </div>
        <Toast ref={toast} />
        <div id="kt_account_settings_profile_details" className="collapse show">
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
                        <button type="reset" className="btn btn-light btn-active-light-primary me-2">Discard</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default UserProfile;