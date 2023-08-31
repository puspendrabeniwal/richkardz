"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
const validationSchema = Yup.object().shape({
  blockName: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  blockDescription: Yup.string().required("Description is required"),
});

const BlockForm = ({ productValue, handleSubmitProduct, blockId }) => {
  const defaultValues = {
    blockName: productValue ? productValue.name : "",
    title: productValue ? productValue.title : "",
    blockDescription: productValue ? productValue.body : "",
  };
  const onSubmit = async (values) => {
    console.log("valuesssss", values);
    await handleSubmitProduct(values);
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
                onSubmit={async (values) => await onSubmit(values)}
              >
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
                        <Field
                          type="text"
                          name="blockDescription"
                          className="form-control"
                          id="floatinDescription"
                        />
                      </div>
                      <ErrorMessage
                        name="blockDescription"
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
                    >
                      {blockId ? "Update" : "Add"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockForm;
