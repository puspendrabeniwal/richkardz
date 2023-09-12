"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.number()
    .typeError("Phone Number must be a number")
    .required("Phone Number is required"),
  email: Yup.string().required("Email is required"),
  //   image: Yup.array()
  //     .min(1, "At least one image is required")
  //     .of(
  //       Yup.mixed().test("fileSize", "File is too large", (value) => {
  //         if (!value) return false;
  //         const maxSize = 5 * 1024 * 1024; // 5 MB
  //         return value.size <= maxSize;
  //       })
  //     ),
});

const UserForm = ({ userValue, handleSubmitUser, userId }) => {
  const defaultValues = {
    name: userValue ? userValue.full_name : "",
    phone: userValue ? userValue.phone : "",
    email: userValue ? userValue.email : "",
    image: userValue ? userValue.image : "",
  };
  const onSubmit = async (values) => {
    console.log("image value", values);
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("image", values.image);
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
            <div className="card p-4">
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
                    <div className="row mb-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingname"
                        >
                          Full Name
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
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingTitle"
                        >
                          Number
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="number"
                            name="phone"
                            className="form-control"
                            id="floatingTitle"
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
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingname"
                        >
                          Email
                        </label>

                        <Field
                          type="text"
                          name="email"
                          className="form-control"
                          id="floatingname"
                        />

                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        Image
                      </label>
                      <FileUpload
                        name="image"
                        accept="image/*"
                        auto
                        customUpload
                        maxFileSize={1000000}
                        onSelect={(event) => {
                          const files = event.files[0];
                          console.log("files", files);
                          setFieldValue("image", files);
                        }}
                        emptyTemplate={
                          <Image
                            src={userValue?.full_image_path}
                            height="70px"
                            width="100px"
                            alt="Image"
                          />
                        }
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="btn btn btn-success me-3"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        disabled={isSubmitting}
                      >
                        {userId ? "Update" : "Add"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
