"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import Link from "next/link";
const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  phone: Yup.number()
    .typeError("Phone Number must be a number")
    .required("Phone Number is required"),
  company_name: Yup.string().required("Company name is required"),
  designation: Yup.string().required("Designation is required"),
  email: Yup.string().required("Email is required"),
  address: Yup.string().required("Address is required"),
  pincode: Yup.string().required("Pincode is required"),
  whatsapp: Yup.string().required("Whatsapp is required"),
});

const UserForm = ({ userValue, handleSubmitUser, userId }) => {
  const defaultValues = {
    full_name: userValue ? userValue.full_name : "",
    phone: userValue ? userValue.phone : "",
    mobile: userValue ? userValue.mobile : "",
    company_name: userValue ? userValue.company_name : "",
    designation: userValue ? userValue.designation : "",
    email: userValue ? userValue.email : "",
    website_link: userValue ? userValue.website_link : "",
    profile_private: userValue ? userValue.profile_private : "",
    about: userValue ? userValue.about : "",
    address: userValue ? userValue.address : "",
    nature_of_business: userValue ? userValue.nature_of_business : "",
    pincode: userValue ? userValue.pincode : "",
    google_link: userValue ? userValue.google_link : "",
    profile_image: userValue ? userValue.profile_image : "",
    banner_image: userValue ? userValue.banner_image : "",
    upi_scannaer: userValue ? userValue.upi_scannaer : "",
    facebook: userValue ? userValue.facebook : "",
    instagram: userValue ? userValue.instagram : "",
    linkedin: userValue ? userValue.linkedin : "",
    twitter: userValue ? userValue.twitter : "",
    whatsapp: userValue ? userValue.whatsapp : "",
    youtube: userValue ? userValue.youtube : "",
    pinterest: userValue ? userValue.pinterest : "",
    catalogue: userValue ? userValue.catalogue : "",
    gallery: [],
  };
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    formData.append("full_name", values.full_name);
    formData.append("phone", values.phone);
    formData.append("mobile", values.mobile);
    formData.append("company_name", values.company_name);
    formData.append("designation", values.designation);
    formData.append("email", values.email);
    formData.append("website_link", values.website_link);
    formData.append("profile_private", values.profile_private);
    formData.append("about", values.about);
    formData.append("address", values.address);
    formData.append("nature_of_business", values.nature_of_business);
    formData.append("pincode", values.pincode);
    formData.append("google_link", values.google_link);
    formData.append("profile_image", values.profile_image);
    formData.append("banner_image", values.banner_image);
    formData.append("upi_scannaer", values.upi_scannaer);
    formData.append("facebook", values.facebook);
    formData.append("instagram", values.instagram);
    formData.append("linkedin", values.linkedin);
    formData.append("twitter", values.twitter);
    formData.append("whatsapp", values.whatsapp);
    formData.append("youtube", values.youtube);
    formData.append("pinterest", values.pinterest);
    formData.append("catalogue", values.catalogue);
    for (const gallery of values.gallery) {
      formData.append("gallery", gallery);
    }
    await handleSubmitUser(formData);
  };
  return (
    <>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                <Formik
                  initialValues={defaultValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="form-design">
                      <h3>PERSONAL DETAILS</h3>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="full_name"
                          >
                            Full Name
                          </label>

                          <Field
                            type="text"
                            name="full_name"
                            className="form-control"
                            id="full_name"
                          />

                          <ErrorMessage
                            name="full_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="phone"
                          >
                            Contact Number
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="number"
                              name="phone"
                              className="form-control"
                              id="phone"
                            />
                          </div>
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="mobile"
                          >
                            Alternate Contact Number
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="number"
                              name="mobile"
                              className="form-control"
                              id="mobile"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="company_name"
                          >
                            Company Name
                          </label>
                          <Field
                            type="text"
                            name="company_name"
                            className="form-control"
                            id="company_name"
                          />
                          <ErrorMessage
                            name="company_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="designation"
                          >
                            Designation
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="designation"
                              className="form-control"
                              id="designation"
                            />
                          </div>
                          <ErrorMessage
                            name="designation"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="email"
                          >
                            Email
                          </label>

                          <Field
                            type="text"
                            name="email"
                            className="form-control"
                            id="email"
                          />

                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="website_link"
                          >
                            Website Link
                          </label>

                          <Field
                            type="text"
                            name="website_link"
                            className="form-control"
                            id="website_link"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="profile_private"
                          >
                            Are you want to make profile private?
                          </label>

                          <Field
                            as="select"
                            name="profile_private"
                            className="form-control"
                            id="profile_private"
                          >
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </Field>
                        </div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="about"
                          >
                            About
                          </label>

                          <Field
                            type="text"
                            name="about"
                            className="form-control"
                            id="about"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="address"
                          >
                            Address
                          </label>

                          <Field
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                          />

                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="nature_of_business"
                          >
                            Nature of Business
                          </label>

                          <Field
                            type="text"
                            name="nature_of_business"
                            className="form-control"
                            id="nature_of_business"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="pincode"
                          >
                            Pin Code
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="number"
                              name="pincode"
                              className="form-control"
                              id="pincode"
                            />
                          </div>
                          <ErrorMessage
                            name="pincode"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="google_link"
                          >
                            Google map link
                          </label>
                          <Field
                            type="text"
                            name="google_link"
                            className="form-control"
                            id="google_link"
                          />
                        </div>
                      </div>

                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                          Profile Image
                        </label>
                        <FileUpload
                          name="profile_image"
                          accept="image/*"
                          auto
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                            const files = event.files[0];
                            setFieldValue("profile_image", files);
                          }}
                          emptyTemplate={
                            <div>
                              {userValue?.profile_image ? (
                                <Image
                                  src={`${
                                    userValue?.image_url +
                                    userValue?.profile_image
                                  }`}
                                  height="70px"
                                  width="100px"
                                  alt="Image"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          }
                        />
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                          Banner Image
                        </label>
                        <FileUpload
                          name="banner_image"
                          accept="image/*"
                          auto
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                            const files = event.files[0];
                            setFieldValue("banner_image", files);
                          }}
                          emptyTemplate={
                            <div>
                              {userValue?.banner_image ? (
                                <Image
                                  src={`${
                                    userValue?.image_url +
                                    userValue?.banner_image
                                  }`}
                                  height="70px"
                                  width="100px"
                                  alt="Image"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          }
                        />
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                          UPI payment scanner
                        </label>
                        <FileUpload
                          name="upi_scannaer"
                          accept=".image"
                          auto
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                            const files = event.files[0];
                            setFieldValue("upi_scannaer", files);
                          }}
                          emptyTemplate={
                            <div>
                              {userValue?.upi_scannaer ? (
                                <Image
                                  src={`${
                                    userValue?.image_url +
                                    userValue?.upi_scannaer
                                  }`}
                                  height="70px"
                                  width="100px"
                                  alt="Image"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          }
                        />
                      </div>
                      <Divider />
                      <h3>SOCIAL MEDIA DETAILS</h3>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="facebook"
                          >
                            Facebook
                          </label>

                          <Field
                            type="text"
                            name="facebook"
                            className="form-control"
                            id="facebook"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="instagram"
                          >
                            Instagram
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="instagram"
                              className="form-control"
                              id="instagram"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="linkedin"
                          >
                            Linkedin
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="linkedin"
                              className="form-control"
                              id="linkedin"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="twitter"
                          >
                            Twitter
                          </label>
                          <Field
                            type="text"
                            name="twitter"
                            className="form-control"
                            id="twitter"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="whatsapp"
                          >
                            Whatsapp
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="whatsapp"
                              className="form-control"
                              id="whatsapp"
                            />
                          </div>
                          <ErrorMessage
                            name="whatsapp"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="youtube"
                          >
                            Youtube
                          </label>

                          <Field
                            type="text"
                            name="youtube"
                            className="form-control"
                            id="youtube"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label fw-semibold fs-6"
                            htmlFor="pinterest"
                          >
                            Pinterest
                          </label>

                          <Field
                            type="text"
                            name="pinterest"
                            className="form-control"
                            id="pinterest"
                          />
                        </div>
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                          Catalogue
                        </label>
                        <FileUpload
                          name="catalogue"
                          accept=".pdf" // Accept only PDF files
                          auto
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                            const files = event.files[0];
                            setFieldValue("catalogue", files);
                          }}
                          emptyTemplate={
                            <div>
                              {userValue?.catalogue ? (
                                <a
                                  href={`${
                                    userValue?.image_url + userValue?.catalogue
                                  }`}
                                  target="_blank" // Opens the link in a new tab/window
                                  rel="noopener noreferrer" // Recommended for security reasons
                                >
                                  View Catalogue (PDF)
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          }
                        />
                      </div>
                      <div className="row mb-6">
                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                          Gallery
                        </label>
                        <FileUpload
                          name="gallery"
                          accept="image/*"
                          auto
                          multiple
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                            const files = event.files;
                            setFieldValue("gallery", files);
                          }}
                          emptyTemplate={
                            <div className="d-flex flex-wrap">
                              {userValue?.gallery?.map((image, index) => (
                                <div key={index} className="m-2">
                                  <Image
                                    src={`${userValue?.image_url + image.name}`}
                                    height="70px"
                                    width="100px"
                                    alt="Image"
                                  />
                                </div>
                              ))}
                            </div>
                          }
                        />
                      </div>
                      <div className="mt-7">
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-save"
                          label="Submit"
                        />
                        <Link href="/admin/user ">
                          <Button
                            className="btn btn btn-danger btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-times"
                            label="Cancel"
                          />
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
