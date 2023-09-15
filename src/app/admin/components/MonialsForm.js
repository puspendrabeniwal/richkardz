"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  rating: Yup.string().required("Reting is required"),
  descripiton: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
  // image: Yup.min(1, "At least one image is required").of(
  //   Yup.mixed().test("fileSize", "File is too large", (value) => {
  //     if (!value) return false;
  //     const maxSize = 5 * 1024 * 1024; // 5 MB
  //     return value.size <= maxSize;
  //   })
  // ),
});

const MonialsForm = ({ monialValue, handleSubmitMonial, MonialId }) => {
  const defaultValues = {
    name: monialValue ? monialValue.name : "",
    descripiton: monialValue ? monialValue.descripiton : "",
    rating: monialValue ? monialValue.rating : "",
    image: monialValue ? monialValue.image : "",
    // full_image_path: monialValue ? monialValue.image : "",
  };
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    formData.append("name", values.name);
    formData.append("rating", values.rating);
    formData.append("descripiton", values.descripiton);
    formData.append("image", values.image);
    formData.append("old_image", values.full_image_path);

    await handleSubmitMonial(formData);
  };
  return (
    <main>
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
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Name
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
                            htmlFor="floatingrating"
                          >
                            Rating
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="rating"
                              className="form-control"
                              id="floatingrating"
                            />
                          </div>
                          <ErrorMessage
                            name="rating"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatinDescription"
                          >
                            Description
                          </label>

                          <div className=" billingForm">
                            <Editor
                              style={{ height: "320px" }}
                              id="descripiton"
                              name="descripiton"
                              filter={false}
                              value={values.descripiton}
                              onTextChange={(e) => {
                                setFieldValue("descripiton", e.htmlValue);
                              }}
                            />
                          </div>
                          <ErrorMessage
                            name="descripiton"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingUpload"
                          >
                            Image Upload
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="file"
                              name="image"
                              // multiple
                              accept="image/*"
                              className="form-control"
                              id="floatingUpload"
                              value={undefined}
                              onChange={(event) => {
                                const files = event.currentTarget.files[0];
                                setFieldValue("image", files);
                              }}
                            />
                          </div>
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-check"
                          label={MonialId ? "Update" : "Submit"}
                        />
                        <Link href="/admin/testimonials ">
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
    </main>
  );
};

export default MonialsForm;
