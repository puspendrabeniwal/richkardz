"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "primereact/multiselect";
import instance from "../axiosInterceptor";
import Link from "next/link";
import { Button } from "primereact/button";

const validationSchema = Yup.object().shape({
  product_name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.string().required("Discount price is required"),
  product_text: Yup.string().required("Product Text is required"),
  is_feature: Yup.string().required("Is Feature is required"),
  is_new_release: Yup.string().required("Is new Release is required"),
  combo_type: Yup.string().required("Combo Type is required"),
  product_ids: Yup.array()
    .min(1, "Choose atleast 1 product")
    .max(3, "maximum 3 products required"),
  //   product_ids: Yup.array().required("Choose min 3 products is required"),
  status: Yup.string().required("Status is required"),
});

const ComboProductForm = ({ productValue, handleSubmitProduct, productId }) => {
  const [productValueEnd, setProductValueEnd] = useState("");
  const [cardList, setCardsList] = useState([]);
  const initialValues = {
    product_name: productValue ? productValue.product_name : "",
    price: productValue ? productValue.price : "",
    discount: productValue ? productValue.discount : "",
    product_text: productValue ? productValue.product_text : "",
    is_feature: productValue ? productValue.is_feature : "",
    is_new_release: productValue ? productValue.is_new_release : "",
    combo_type: productValue ? productValue.combo_type : "",
    product_ids: [],
    status: productValue ? productValue.status : "",
  };
  const [defaultValues, setDefaultValues] = useState(initialValues);

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });

    await handleSubmitProduct(formData);
  };
  const formRef = useRef(null);
  const getMultiCards = (prodVal) => {
    instance
      .get(`combo-products/get-product/${prodVal}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        const ndt = data.map((item) => {
          return { name: item.product_name, prodId: item._id };
        });
        setCardsList(ndt);
        if (productValue && productValue.product_ids.length && formRef) {
          setDefaultValues({
            ...defaultValues,
            product_ids: [
              ...defaultValues.product_ids,
              ...productValue.product_ids.split(","),
            ],
          });
          formRef.current.setFieldValue(
            "product_ids",
            productValue.product_ids.split(",")
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (defaultValues.combo_type) {
      getMultiCards(defaultValues.combo_type);
    }
  }, [defaultValues.combo_type]);

  return (
    <>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-4">
                <Formik
                  innerRef={formRef}
                  initialValues={defaultValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => await onSubmit(values)}
                >
                  {({ setFieldValue, values, handleBlur }) => (
                    <Form className="form-design">
                      {console.log("formref", formRef.current)}
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
                            htmlFor="floatingproduct_text"
                          >
                            Product Text
                          </label>
                          <Field
                            type="text"
                            name="product_text"
                            className="form-control"
                            id="floatingproduct_text"
                          />

                          <ErrorMessage
                            name="product_text"
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
                            Combo Type
                          </label>
                          <div className=" billingForm">
                            <Field
                              as="select"
                              name="combo_type"
                              className="form-control"
                              id="floatingcombo_type"
                              onChange={(e) => {
                                const val = e.target.value;
                                setFieldValue("combo_type", val);
                                setProductValueEnd(val);
                                getMultiCards(val);
                              }}
                            >
                              <option value="">Select</option>
                              <option value="1">PVC Glossy</option>
                              <option value="2">Metel Cards</option>
                              <option value="3">Combo</option>
                            </Field>
                          </div>
                          <ErrorMessage
                            name="combo_type"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingproduct_ids"
                          >
                            Choose Products
                          </label>
                          <div>
                            <MultiSelect
                              value={values.product_ids}
                              onChange={(e) => {
                                setFieldValue("product_ids", e.value);
                              }}
                              multiple={true}
                              options={cardList}
                              optionLabel="name"
                              optionValue="prodId"
                              placeholder="Select Cards"
                              maxSelectedLabels={3}
                              className="w-full md:w-20rem"
                              name="product_ids"
                              onBlur={handleBlur}
                              display="chip"
                            />
                          </div>
                          <ErrorMessage
                            name="product_ids"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
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
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-6">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingproduct_text"
                          >
                            Status
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="form-control"
                            id="floatingNewFeature"
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

                      <div>
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-check"
                          label={productId ? "Update" : "Submit"}
                        />
                        <Link href="/admin/comboProducts ">
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
    </>
  );
};

export default ComboProductForm;
