"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Editor } from "primereact/editor";
const validationSchema = Yup.object().shape({
  blockName: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
});

const BlockForm = ({ blockValue, handleSubmitBlock, blockId }) => {
  const defaultValues = {
    blockName: blockValue ? blockValue.name : "",
    title: blockValue ? blockValue.title : "",
    description: blockValue ? blockValue.body : "",
  };
  const onSubmit = async (values, { setSubmitting }) => {
    await handleSubmitBlock(values);
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
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="font-weight-bold">Add Product</h3>
                      </div>
                      <Link
                        href="/admin/blocks"
                        type="button"
                        className="btn btn-primary"
                      >
                        Back
                      </Link>
                    </div>
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

                    <div>
                      <button
                        type="submit"
                        className="btn btn btn-success me-3"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        disabled={isSubmitting}
                      >
                        {blockId ? "Update" : "Add"}
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

export default BlockForm;
