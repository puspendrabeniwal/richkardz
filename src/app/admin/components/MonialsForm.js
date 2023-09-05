"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  rating: Yup.string().required("Reting is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
  fileUpload: Yup.array()
    .min(1, "At least one image is required")
    .of(
      Yup.mixed().test("fileSize", "File is too large", (value) => {
        if (!value) return false;
        const maxSize = 5 * 1024 * 1024; // 5 MB
        return value.size <= maxSize;
      })
    ),
});

const MonialsForm = ({ monialValue, handleSubmitMonial, MonialId }) => {
  const defaultValues = {
    name: monialValue ? monialValue.productName : "",
    description: monialValue ? monialValue.description : "",
    rating: monialValue ? monialValue.rating : "",
    fileUpload: [],
  };
  const onSubmit = async (values, { setSubmitting }) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitMonial(values);
    setSubmitting(false);
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
                // onSubmit={async (values) => await onSubmit(values)}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
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
                            id="description"
                            name="description"
                            filter={false}
                            onTextChange={(e) => {
                              setFieldValue("description", e.textValue);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="description"
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
                            name="fileUpload"
                            multiple
                            accept="image/*"
                            className="form-control"
                            id="floatingUpload"
                            value={undefined}
                            onChange={(event) => {
                              const files = event.currentTarget.files;
                              const images = Array.from(files);
                              // Manually set the field value to trigger Formik's handling
                              // of array values.
                              setFieldValue("fileUpload", images);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="fileUpload"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="btn btn btn-success me-3"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        disabled={isSubmitting}
                      >
                        {MonialId ? "Update" : "Add"}
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

export default MonialsForm;
