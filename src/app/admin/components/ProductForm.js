"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { Galleria } from 'primereact/galleria';


const validationSchema = Yup.object().shape({
  product_name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.string().required("Discount price is required"),
  profession: Yup.string().required("Profession is required"),
  card_type: Yup.string().required("Card Type is required"),
  is_feature: Yup.string().required("Is Feature is required"),
  is_new_release: Yup.string().required("Is new Release is required"),
  product_desc: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .of(
      Yup.mixed().test("fileSize", "File is too large", (value) => {
        if (!value) return false;
        const maxSize = 5 * 1024 * 1024; // 5 MB
        return value.size <= maxSize;
      })
    ),
});


const validationSchemaEdit = Yup.object().shape({
  product_name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.string().required("Discount price is required"),
  profession: Yup.string().required("Profession is required"),
  card_type: Yup.string().required("Card Type is required"),
  is_feature: Yup.string().required("Is Feature is required"),
  is_new_release: Yup.string().required("Is new Release is required"),
  product_desc: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
});



const ProductForm = ({ productValue, handleSubmitProduct, productId }) => {
  const defaultValues = {
    product_name: productValue ? productValue.product_name : "",
    price: productValue ? productValue.price : "",
    discount: productValue ? productValue.discount : "",
    profession: productValue ? productValue.profession : "",
    card_type: productValue ? productValue.card_type : "",
    is_feature: productValue ? productValue.is_feature : "",
    is_new_release: productValue ? productValue.is_new_release : "",
    product_desc: productValue ? productValue.product_desc : "",
    status: productValue ? productValue.status : "",
    images : [],
  };

  const onSubmit = async (values) => {

    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function(key, index) {
      formData.append(key, values[key]);
    });

    for (const image of values.images) {
      formData.append("images", image);
    }

    await handleSubmitProduct(formData);
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
                validationSchema={(productId ?  validationSchemaEdit : validationSchema)}
                onSubmit={async (values) => await onSubmit(values)}
              >
                {({ setFieldValue }) => (
                  <Form className="form-design">
                    <div className="row mb-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingname"
                        >
                          Product Name
                        </label>

                        <Field
                          type="text"
                          name="product_name"
                          className="form-control"
                          id="floatingname"
                        />
                        <ErrorMessage
                          name="product_name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingPrice"
                        >
                          Price
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="price"
                            className="form-control"
                            id="floatingPrice"
                          />
                        </div>
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingDescription"
                        >
                          Discount Price
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="discount"
                            className="form-control"
                            id="floatingDescription"
                          />
                        </div>
                        <ErrorMessage
                          name="discount"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingprofession"
                        >
                          Profession
                        </label>
                        <Field
                          as="select"
                          name="profession"
                          className="form-control"
                          id="floatingprofession"
                        >
                          <option value="">Select</option>
                          <option value="1">CA</option>
                          <option value="Entrepreneur">Doctor</option>
                          <option value="3">Lowyers</option>
                          <option value="4">agent</option>
                          <option value="5">Student</option>
                        </Field>

                        <ErrorMessage
                          name="profession"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingtype"
                        >
                          Card Type
                        </label>
                        <Field
                          as="select"
                          name="card_type"
                          className="form-control"
                          id="floatingtype"
                        >
                          <option value="">Select</option>
                          <option value="1">CA</option>
                          <option value="2">Doctor</option>
                          <option value="PVC Glossy">Lowyers</option>
                          <option value="4">agent</option>
                          <option value="5">Student</option>
                        </Field>

                        <ErrorMessage
                          name="card_type"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingFeature"
                        >
                          Is Feature
                        </label>
                        <Field
                          as="select"
                          name="is_feature"
                          className="form-control"
                          id="floatingFeature"
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="2">No</option>
                        </Field>

                        <ErrorMessage
                          name="is_feature"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingNewFeature"
                        >
                          Is New Release
                        </label>
                        <Field
                          as="select"
                          name="is_new_release"
                          className="form-control"
                          id="floatingNewFeature"
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Field>
                        <ErrorMessage
                          name="is_new_release"
                          component="div"
                          className="text-danger"
                        />
                      </div>
  
                      <div className="col-lg-6 col-md-6">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingstatus"
                        >
                          Status
                        </label>
                        <Field
                          as="select"
                          name="status"
                          className="form-control"
                          id="floatingstatus"
                        >
                          <option value="">Select</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="fv-row mb-3">
                      <div className="col-lg-12 col-md-12">
                        <label
                          className="col-form-label fw-semibold fs-6"
                          htmlFor="floatinDescription"
                        >
                          Product Images
                        </label>
                        <div className=" billingForm">
                        <FileUpload 
                          name="image" 
                          accept="image/*" 
                          auto
                          multiple
                          customUpload
                          maxFileSize={1000000}
                          onSelect={(event) => {
                              const files = event.files;
                              setFieldValue("images", files);
                              }}
                          emptyTemplate={
                             <></>
                          } 
                        />
                        </div>
                      </div>
                      <ErrorMessage
                          name="images"
                          component="div"
                          className="text-danger"
                        />
                    </div>
                    <div className="fv-row mb-3">
                      <div className="col-lg-12 col-md-12">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatinDescription"
                        >
                          Product Description
                        </label>
                        <div className=" billingForm">
                        <Field 
                          as="textarea" 
                          name="product_desc" 
                          className="form-control" 
                          rows="4" 
                          cols="40"
                        >
                        </Field>
                        </div>
                        <ErrorMessage
                          name="product_desc"
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
                      Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn btn-warning me-3"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                      Cancel
                      </button>
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

export default ProductForm;
