"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
});

const CmsForm = ({ cmsValue, handleSubmitCMS, cmsId }) => {
  const defaultValues = {
    name: cmsValue ? cmsValue.type : "",
    title: cmsValue ? cmsValue.title : "",
    description: cmsValue ? cmsValue.content : "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitCMS(values);
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
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form className="form-design">
                    {/* <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="font-weight-bold">Add Product</h3>
                      </div>
                      <div>
                        <Link
                          href="/admin/cms"
                          type="button"
                          className="btn btn-primary"
                        >
                          Back
                        </Link>
                      </div>
                    </div> */}
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

                    <div>
                      <button
                        type="submit"
                        className="btn btn btn-success me-3"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        disabled={isSubmitting}
                      >
                        {cmsId ? "Update" : "Add"}
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

export default CmsForm;
