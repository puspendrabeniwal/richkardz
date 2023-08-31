"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const CmsForm = ({ productValue, handleSubmitProduct, productId }) => {
  const defaultValues = {
    name: productValue ? productValue.productName : "",
    description: productValue ? productValue.description : "",
  };
  const onSubmit = async (values) => {
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
                {({ setFieldValue }) => (
                  <Form className="form-design">
                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4 col-md-4">
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
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingDesc"
                        >
                          Description
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="description"
                            className="form-control"
                            id="floatingDesc"
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
                      >
                        {productId ? "Update" : "Add"}
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
