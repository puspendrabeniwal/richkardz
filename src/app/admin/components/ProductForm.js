"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";
import Link from "next/link";
import { createFileObjects } from "../../../../utils/fileObject";

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
    images: [],
  };
  console.log("product values", productValue);
  const formRef = useRef(null);

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });

    for (const image of values.images) {
      formData.append("images", image);
    }
    console.log("form values", values);
    console.log("form data", formData);
    await handleSubmitProduct(formData);
  };

  const getFileObjectOnEditValues = async () => {
    if (
      productValue &&
      productValue.image_url &&
      productValue.images?.length > 0
    ) {
      const productImages = productValue.images.map(
        (image) => `${productValue.image_url}${image.name}`
      );
      formRef.current.setFieldValue("images", productImages);
      console.log("productImages", productImages);
      await createFileObjects(productImages).then((files) =>
        console.log("filesssss", files)
      );

      // formRef.current.setFieldValue("images", imageFileObect);
    }
  };

  useEffect(() => {
    if (productValue && formRef) {
      getFileObjectOnEditValues();
    }
  }, [productValue, formRef]);

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
                  innerRef={formRef}
                  initialValues={defaultValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => await onSubmit(values)}
                >
                  {({ setFieldValue, values }) => (
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
                            <option value="1">Youngsters</option>
                            <option value="2">CA</option>
                            <option value="3">Doctor</option>
                            <option value="4">Lawyers</option>
                            <option value="5">Entrepreneur</option>
                            <option value="6">Sales Person</option>
                            <option value="7">Agents</option>
                            <option value="8">Freelancers</option>
                            <option value="9">Students</option>
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
                            <option value="PVC Glossy">PVC Glossy</option>
                            <option value="Metal Cards">Metal Cards</option>
                            <option value="NFC RFID">NFC RFID</option>
                            <option value="ID Cards">ID Cards</option>
                            <option value="Wooden">Wooden</option>
                            <option value="Black Metal">Black Metal</option>
                            <option value="Golden Metal">Golden Metal</option>
                            <option value="Silver Metal">Silver Metal</option>
                            <option value="Sticker">Sticker</option>
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
                              name="images"
                              accept="image/*"
                              auto
                              multiple
                              customUpload
                              maxFileSize={1000000}
                              onSelect={(event) => {
                                const files = event.files;
                                setFieldValue("images", files, true);
                              }}
                              emptyTemplate={
                                <div className="p">
                                  {values?.images?.map((image, index) => (
                                    <div
                                      key={index}
                                      className="p-5 position-relative"
                                    >
                                      <Image
                                        src={image}
                                        height="70px"
                                        width="100px"
                                        alt="Image"
                                      />
                                      <button
                                        // className="btn-close"
                                        // style={{
                                        //   position: "absolute",
                                        //   top: "-9px",
                                        //   right: "-9px",
                                        //   zIndex: "1",
                                        //   fontSize: "10px",
                                        // }}
                                        onClick={() => handleRemoveImage(index)} // Implement a function to remove the image
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  ))}
                                </div>
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
                            ></Field>
                          </div>
                          <ErrorMessage
                            name="product_desc"
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
                          icon="pi pi-save"
                          label="Submit"
                        />
                        <Link href="/admin/products ">
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

export default ProductForm;
