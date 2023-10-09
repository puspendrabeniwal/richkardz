"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
});

const CmsForm = ({ cmsValue, handleSubmitCMS, cmsId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: cmsValue ? cmsValue.type : "",
    title: cmsValue ? cmsValue.title : "",
    description: cmsValue ? cmsValue.content : "",
  };

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitCMS(values);
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
                    setIsLoading(true);
                    await onSubmit(values);
                    setIsLoading(false);
                    resetForm();
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="form-design">
                      <div className="row mb-3">
                        <div className="col-lg-16 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Type
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
                        <div className="col-lg-16 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Title
                          </label>

                          <Field
                            type="text"
                            name="title"
                            className="form-control"
                            id="floatingname"
                          />

                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingDesc"
                        >
                          Description
                        </label>
                        <div className=" billingForm">
                          <Editor
                            style={{ height: "320px" }}
                            id="description"
                            name="description"
                            value={values.description}
                            filter={false}
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

                      <div className="mt-7">
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-save"
                          disabled={isLoading}
                          label="Submit"
                        />
                        <Link href="/admin/cms ">
                          <Button
                            className="btn btn btn-danger btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-times"
                            label="Cancel"
                            disabled={isLoading}
                          />
                        </Link>
                        {isLoading && (
                          <ProgressSpinner
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
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

export default CmsForm;
