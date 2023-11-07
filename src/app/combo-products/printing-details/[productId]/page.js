"use client";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "@/app/axiosInterceptor";
import { COMBO_PRODUCTS_FIELDS_NAME } from "@/app/global_constant";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";


export default function DeliveryAddress({ params }) {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [cardDetail, setCardDetail] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useRef(null);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    instance
      .get(`products/combo-detail-view?product_id=${params.productId}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        setProductDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let formData = new FormData();
  const onSubmit = (values, {resetForm}) => {
    instance
      .post(`products/combo-printing-details?product_id=${params.productId}`, values)
      .then((response) => {
        console.log(response)
        if (response.success === true) {
          resetForm();
          // window.location.replace(response.result.pay_link);
        }
        showMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const showMessage = (data) => {
    toast.current.show({
      severity: data.success ? "success" : "error",
      summary: data.success ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };
  
  return (
    <main>
      <Toast ref={toast} />
      <section className="container modenComboMain">
        <div className="col-lg-12">
            <div className="filter-product-heading">
              <h2><span className="text-light-300">{productDetail?.product_name} </span></h2>
            </div>
        </div>
        <div className="accordion collap_seCard" id="accordionExample">
          {
            Array.isArray(productDetail?.combo_products) && productDetail?.combo_products.map((row, index)=>{
              return <div className="accordion-item" key={index}>
                <div className="accordion-header" id={`heading${index}`}>
                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                      <div className="row w-100 align-items-center">
                          <div className="col-lg-6 d-flex align-items-center">
                              <img 
                                className="accourdingHideimg me-3" 
                                id="xzoom-default"
                                src={`https://richkardz.com${row?.product_image}`}
                                xoriginal={`https://richkardz.com${row?.product_image}`}
                                alt="Product Image" 
                              />
                              <h3 className="mb-0"> {row?.product_name} </h3>
                          </div>
                          <div className="col-lg-6">
                              <h4>Please enter the details to be printed
                                  on the card.</h4>
                          </div>
                      </div>
                  </button>
                </div>
                <div 
                  id={`collapse${index}`} 
                  className={`accordion-collapse collapse ${(index === 0) ? "show" : ""}`} 
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                      <div className="row">
                          <div className="col-lg-6 text-center">
                              <img 
                                className="accordionBigImg" 
                                id="xzoom-default" 
                                src={`https://richkardz.com${row?.product_image}`}
                                xoriginal={`https://richkardz.com${row?.product_image}`}
                                alt="Product Image"
                              />
                          </div>
                          <div className="col-lg-6">
                            <Formik
                              enableReinitialize={true}
                              initialValues={{"ComboCardPrintingData":{
                               [COMBO_PRODUCTS_FIELDS_NAME[index]+"_full_name"]:  "",
                               [COMBO_PRODUCTS_FIELDS_NAME[index]+"_email"]: "",
                               [COMBO_PRODUCTS_FIELDS_NAME[index]+"_phone_number"]: "",
                               [COMBO_PRODUCTS_FIELDS_NAME[index]+"_designation"]: "",
                               [COMBO_PRODUCTS_FIELDS_NAME[index]+"_company_name"]: "",
                              }}}
                              validationSchema={Yup.object().shape({
                                "ComboCardPrintingData":Yup.object().shape({
                                  [COMBO_PRODUCTS_FIELDS_NAME[index]+"_full_name"]: Yup.string().required("This field is required"),
                                  [COMBO_PRODUCTS_FIELDS_NAME[index]+"_email"]: Yup.string().required("This field is required"),
                                  [COMBO_PRODUCTS_FIELDS_NAME[index]+"_phone_number"]: Yup.string().required("This field is required"),
                                  [COMBO_PRODUCTS_FIELDS_NAME[index]+"_designation"]: Yup.string().required("This field is required"),
                                })
                              })}
                              onSubmit={async (values, { resetForm, errors }) =>{
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_id]", row?.product_id);
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_full_name]", values.ComboCardPrintingData[COMBO_PRODUCTS_FIELDS_NAME[index]+"_full_name"]);
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_email]", values.ComboCardPrintingData[COMBO_PRODUCTS_FIELDS_NAME[index]+"_email"]);
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_phone_number]", values.ComboCardPrintingData[COMBO_PRODUCTS_FIELDS_NAME[index]+"_phone_number"]);
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_designation]", values.ComboCardPrintingData[COMBO_PRODUCTS_FIELDS_NAME[index]+"_designation"]);
                                formData.append("ComboCardPrintingData["+COMBO_PRODUCTS_FIELDS_NAME[index]+"_company_name]", values.ComboCardPrintingData[COMBO_PRODUCTS_FIELDS_NAME[index]+"_company_name"]);
                                (index === productDetail?.combo_products.length-1) ? 
                                  await onSubmit(formData, { resetForm, errors })
                                  
                                :""
   
                              }}
                            >
                              {({ setFieldValue, values }) => (
                                <Form className="form-design">
                                  
                                  <div className="row">
                                    
                                    <div className="col-md-6 customFrom mb-3">
                                      <label
                                        className="col-form-label required fw-semibold fs-6"
                                        htmlFor="floatingName"
                                      >
                                        Full Name<span className="text-danger">*</span>
                                      </label>
      
                                      <Field
                                        type="text"
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_full_name`}
                                        className="form-control"
                                        id="floatingName"
                                      />
                                      <ErrorMessage
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_full_name`}
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                      <label
                                        className="col-form-label required fw-semibold fs-6"
                                        htmlFor="floatingNumber"
                                      >
                                        Phone Number<span className="text-danger">*</span>
                                      </label>
                                      <div className=" billingForm">
                                        <Field
                                          type="number"
                                          name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_phone_number`}
                                          className="form-control"
                                          id="floatingNumber"
                                        />
                                        <ErrorMessage
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_phone_number`}
                                        component="div"
                                        className="text-danger"
                                      />
                                      </div>
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                      <label
                                        className="col-form-label required fw-semibold fs-6"
                                        htmlFor="floatingEmail"
                                      >
                                        Email <span className="text-danger">*</span>
                                      </label>
      
                                      <Field
                                        type="text"
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_email`}
                                        className="form-control"
                                        id="floatingEmail"
                                      />
                                      <ErrorMessage
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_email`}
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                      <label htmlFor="designation" className="col-form-label required fw-semibold fs-6">
                                        Designation<span className="text-danger">*</span>
                                      </label>
                                        <Field
                                          type="text"
                                          name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_designation`}
                                          className="form-control"
                                          id="designation"
                                        />
      
                                      <ErrorMessage
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_designation`}
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                      <label
                                        className="col-form-label required fw-semibold fs-6"
                                        htmlFor="floatingCompany"
                                      >
                                        Company Name
                                      </label>
      
                                      <Field
                                        type="text"
                                        name={`ComboCardPrintingData.${COMBO_PRODUCTS_FIELDS_NAME[index]}_company_name`}
                                        className="form-control"
                                        id="floatingCompany"
                                      />
                                    </div>
                                  </div>
                                  <div className="d-md-flex align-items-center justify-content-end">
                                    <Button
                                      className="btn btn btn-success btn-sm btnNavyBlue px-5 mt-4"
                                      data-kt-menu-trigger="click"
                                      data-kt-menu-placement="bottom-end"
                                      icon="pi pi-save"
                                      type="submit"
                                      disabled={isButtonDisabled}
                                      label={isButtonDisabled ? "Submiting.." : (index === productDetail?.combo_products?.length-1) ? "Checkout" : "Next"}
                                    />
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
              
            })
            
          }
          <br />
        </div>
      </section>
    </main>
  );
}
