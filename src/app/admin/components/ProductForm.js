"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discountPrice: Yup.string().required("Discount price is required"),
  profession: Yup.string().required("Profession is required"),
  cardType: Yup.string().required("Card Type is required"),
  isFeature: Yup.string().required("Is Feature is required"),
  isNewFeature: Yup.string().required("Is new feature is required"),
  productDescription: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
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
const ProductForm = ({ productValue, handleSubmitProduct, productId }) => {
  const defaultValues = {
    name: productValue ? productValue.productName : "",
    price: productValue ? productValue.productPrice : "",
    discountPrice: productValue ? productValue.discountPrice : "",
    profession: productValue ? productValue.profession : "",
    cardType: productValue ? productValue.cardType : "",
    isFeature: productValue ? productValue.featured : "",
    isNewFeature: productValue ? productValue.newFeatured : "",
    productDescription: productValue ? productValue.productDescription : "",
    status: productValue ? productValue.status : "",
    fileUpload: [],
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
                        <button
                          type="button"
                          className="btn btn-light-primary me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingname"
                        >
                          Product Name
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
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingDescription"
                        >
                          Discount Price
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="discountPrice"
                            className="form-control"
                            id="floatingDescription"
                          />
                        </div>
                        <ErrorMessage
                          name="discountPrice"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4 col-md-4">
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
                          <option value="2">Doctor</option>
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
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingtype"
                        >
                          Card Type
                        </label>
                        <Field
                          as="select"
                          name="cardType"
                          className="form-control"
                          id="floatingtype"
                        >
                          <option value="">Select</option>
                          <option value="1">CA</option>
                          <option value="2">Doctor</option>
                          <option value="3">Lowyers</option>
                          <option value="4">agent</option>
                          <option value="5">Student</option>
                        </Field>

                        <ErrorMessage
                          name="cardType"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingFeature"
                        >
                          Is Feature
                        </label>
                        <Field
                          as="select"
                          name="isFeature"
                          className="form-control"
                          id="floatingFeature"
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="2">No</option>
                        </Field>

                        <ErrorMessage
                          name="isFeature"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingNewFeature"
                        >
                          Is New Feature
                        </label>
                        <Field
                          as="select"
                          name="isNewFeature"
                          className="form-control"
                          id="floatingNewFeature"
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="2">No</option>
                        </Field>
                        <ErrorMessage
                          name="isNewFeature"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatinDescription"
                        >
                          Product Description
                        </label>
                        <div className=" billingForm">
                          <Field
                            type="text"
                            name="productDescription"
                            className="form-control"
                            id="floatinDescription"
                          />
                        </div>
                        <ErrorMessage
                          name="productDescription"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-lg-4 col-md-4">
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
                          <option value="2">Active</option>
                          <option value="3">Inactive</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4 col-md-4">
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
                              console.log("filessss", images);
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
                      >
                        {productId ? "Update" : "Add Product"}
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

export default ProductForm;
