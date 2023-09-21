"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  product_name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.string().required("Discount price is required"),
  card_type: Yup.string().required("Card Type is required"),
  product_desc: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(5, "You can upload a maximum of five images")
    .of(
      Yup.mixed().test("fileSize", "File is too large", (value) => {
        if (!value) return false;
        const maxSize = 2 * 1024 * 1024; // 2 MB
        return value.size <= maxSize;
      })
    ),
});

const validationSchemaEdit = Yup.object().shape({
  product_name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.number()
    .typeError("Price must be a number")
    .required("Discount price is required"),
  card_type: Yup.string().required("Card Type is required"),
  product_desc: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
  // images: Yup.array()
  //   .max(5, "You can upload a maximum of five images")
  //   .when([], {
  //     is: (array) => array && array.length > 0, // Check if the array has any elements
  //     then: Yup.array().min(1, "At least one image is required"),
  //     otherwise: Yup.array(), // No validation when the array is empty
  //   })
  //   .of(
  //     Yup.mixed().test("fileSize", "File is too large", (value) => {
  //       if (!value) return false;
  //       const maxSize = 2 * 1024 * 1024; // 2 MB
  //       return value.size <= maxSize;
  //     })
  //   ),
  // images: Yup.array()
  //   .min(1, "At least one image is required")
  //   .max(5, "You can upload a maximum of five images")
  //   .of(
  //     Yup.mixed().test("fileSize", "File is too large", (value) => {
  //       if (!value) return false;
  //       const maxSize = 2 * 1024 * 1024; // 2 MB
  //       return value.size <= maxSize;
  //     })
  //   ),
});

const ProductForm = ({ productValue, handleSubmitProduct, productId }) => {
  const formRef = useRef(null);
  const [delImage, setDelImage] = useState([]);
  const [newImages, setNewImages] = useState(productValue?.images);

  const defaultValues = {
    product_name: productValue ? productValue.product_name : "",
    price: productValue ? productValue.price : "",
    discount: productValue ? productValue.discount : "",
    card_type: productValue ? productValue.card_type : "",
    product_desc: productValue ? productValue.product_desc : "",
    status: productValue ? productValue.status : "",
    images: [],
    delete_images: delImage,
  };

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
    for (const image of delImage) {
      formData.append("delete_images", image);
    }
    await handleSubmitProduct(formData);
  };

  let newImageDel = [];
  const handleRemoveImage = (idToRemove) => {
    const filterImg = newImages.filter((item) => {
      return idToRemove !== item._id;
    });
    setNewImages(filterImg);
    setDelImage([...delImage, idToRemove]);
    newImageDel.push([idToRemove]);
    console.log("deleted image", delImage);
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
                  innerRef={formRef}
                  initialValues={defaultValues}
                  validationSchema={
                    productId ? validationSchemaEdit : validationSchema
                  }
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
                      </div>
                      <div className="row mb-3">
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
                                const files = [...event.files];
                                setFieldValue("images", files, true);
                                console.log("files", files);
                              }}
                              emptyTemplate={
                                <>
                                  {newImages?.map((image, index) => (
                                    <div
                                      key={image._id}
                                      className="p-5 position-relative image-container"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Image
                                        src={`${
                                          productValue?.image_url + image.name
                                        }`}
                                        height="70px"
                                        width="100px"
                                        alt="ans"
                                      />
                                      <Button
                                        icon="pi pi-times text-danger"
                                        style={{
                                          backgroundColor: "transparent",
                                          color: "inherit",
                                          border: "white",
                                          fontSize: "20px",
                                        }}
                                        type="button"
                                        title="Delete"
                                        onClick={() => {
                                          handleRemoveImage(image._id);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </>
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
                      <div className="col-lg-6 col-md-6">
                        <Field
                          type="hidden"
                          name="delete_images"
                          className="form-control"
                          id="floatingname"
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
                        <div className="mt-7">
                          <Button
                            className="btn btn btn-success btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-save"
                            type="submit"
                            label="Submit"
                          />
                          <Link href="/admin/gift-pre-design-products ">
                            <Button
                              className="btn btn btn-danger btn-sm me-3"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                              icon="pi pi-times"
                              label="Cancel"
                            />
                          </Link>
                        </div>
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
