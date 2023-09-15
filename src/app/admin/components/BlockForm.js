"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
const validationSchema = Yup.object().shape({
  blockName: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
});

const BlockForm = ({ blockValue, handleSubmitBlock, blockId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    blockName: blockValue ? blockValue.name : "",
    title: blockValue ? blockValue.title : "",
    description: blockValue ? blockValue.body : "",
  };
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitBlock(values);
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
                    setIsLoading(true); // Show the loading spinner while submitting
                    await onSubmit(values);
                    setIsLoading(false); // Hide the loading spinner after submission
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
                            Block Name
                          </label>

                          <Field
                            type="text"
                            name="blockName"
                            className="form-control"
                            id="floatingname"
                          />

                          <ErrorMessage
                            name="blockName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingTitle"
                          >
                            Title
                          </label>
                          <div className=" billingForm">
                            <Field
                              type="text"
                              name="title"
                              className="form-control"
                              id="floatingTitle"
                            />
                          </div>
                          <ErrorMessage
                            name="title"
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
                              value={values.description}
                              onTextChange={(e) => {
                                setFieldValue("description", e.htmlValue);
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

                      <div className="mt-7">
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          disabled={isLoading}
                          icon="pi pi-save"
                          label="Submit"
                        />
                        <Link href="/admin/blocks ">
                          <Button
                            className="btn btn btn-danger btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-times"
                            label="Cancel"
                          />
                        </Link>
                        {isLoading && (
                          <ProgressSpinner
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
                        {/* Show the PrimeReact spinner when submitting */}
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

export default BlockForm;
