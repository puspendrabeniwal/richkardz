"use client";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


import instance from "@/app/axiosInterceptor";
import { 
    phoneSchema,
    API_IMG_URL 
} from "@/app/global_constant";

const validationSchema = Yup.object().shape({
    shipping_first_name: Yup.string().required("Name can't be blank."),
    shipping_last_name: Yup.string().required("Name can't be blank."),
    shipping_email: Yup.string()
      .email("Email is not a valid email address.")
      .required("Email can't be blank."),
    shipping_phone_number: phoneSchema,
    address_1: Yup.string().required("Address can't be blank."),
    state: Yup.string().required("State can't be blank."),
    city: Yup.string().required("City can't be blank."),
    zipcode: Yup.string()
        .matches(/^\d{6}$/, "PIN code must be a 6 digit number")
        .required("PIN code can't be blank."),
  });

  const initialValues = {
    shipping_first_name : "",
    shipping_last_name : "",
    shipping_email : "",
    shipping_phone_number : "",
    address_1 : "",
    state : "",
    city : "",
    zipcode : ""
  }

  export default function Checkout(){
    const toast = useRef(null);
    const searchParams = useSearchParams()
    const [productDetail, setProductDetail] = useState({});
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        getProductDetail();
    }, []);

    const printId = searchParams.get("print_id");
    const productId = searchParams.get("product_id");
    const getProductDetail = () => {
        instance
            .get(`products/checkout-view-combo?print_id=${printId}&&product_id=${productId}`)
            .then((response) => {
            let data = response.result ? response.result : {};
            setProductDetail(data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const onSubmit =(values)=>{
        let formdata = new FormData();
        formdata.append("ComboCardPrintingData[shipping_first_name]",values.shipping_first_name)
        formdata.append("ComboCardPrintingData[shipping_last_name]",values.shipping_last_name)
        formdata.append("ComboCardPrintingData[shipping_email]",values.shipping_email)
        formdata.append("ComboCardPrintingData[shipping_phone_number]",values.shipping_phone_number)
        formdata.append("ComboCardPrintingData[address_1]",values.address_1)
        formdata.append("ComboCardPrintingData[address_2]",values.address_2)
        formdata.append("ComboCardPrintingData[state]",values.state)
        formdata.append("ComboCardPrintingData[city]",values.city)
        formdata.append("ComboCardPrintingData[zipcode]",values.zipcode)
        instance
        .post(`products/check-out-combo?print_id=${printId}&&product_id=${productId}`, formdata)
        .then((response) => {
          let data = response && response.result ? response.result : {};
          if (response.success === true) {
            window.location.replace(data.pay_link);
          }
          showMessage(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const showMessage = (data) => {
        toast.current.show({
          severity: data.success ? "success" : "error",
          summary: data.success ? "Success" : "Error",
          detail: data.message,
          life: 5000,
        });
      };

    return (
        <section className="checkout-bg">
            <Toast ref={toast} />
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                }}
                >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-lg-6 c-product-information">
                                    <div className="contact-information">
                                        <h2>Please Enter Your Shipping Information</h2>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="shipping_first_name">First Name<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="shipping_first_name"
                                                            className="form-control"
                                                            placeholder="First Name"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="shipping_first_name"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="shipping_last_name">Last Name<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="shipping_last_name"
                                                            className="form-control"
                                                            placeholder="Last Name"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="shipping_last_name"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="shipping_email">Email<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="shipping_email"
                                                            className="form-control"
                                                            placeholder="Email"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="shipping_email"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="shipping_phone_number">Phone Number<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="shipping_phone_number"
                                                            className="form-control"
                                                            placeholder="Phone Number"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="shipping_phone_number"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="address_1">Address 1<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="address_1"
                                                            className="form-control"
                                                            placeholder="Address"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="address_1"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="address_2">Address 2</label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="address_2"
                                                            className="form-control"
                                                            placeholder="Address 2"
                                                        >    
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="state">State<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            as="select"
                                                            name="state"
                                                            className="form-control"
                                                        >
                                                            <option value="">Select state</option>
                                                            <option value="ANDHRA PRADESH">Andhra pradesh</option>
                                                            <option value="ASSAM">Assam</option>
                                                            <option value="ARUNACHAL PRADESH">Arunachal pradesh</option>
                                                            <option value="GUJRAT">Gujrat</option>
                                                            <option value="BIHAR">Bihar</option>
                                                            <option value="HARYANA">Haryana</option>
                                                            <option value="HIMACHAL PRADESH">Himachal pradesh</option>
                                                            <option value="JAMMU &amp; KASHMIR">Jammu &amp; kashmir</option>
                                                            <option value="KARNATAKA">Karnataka</option>
                                                            <option value="KERALA">Kerala</option>
                                                            <option value="MADHYA PRADESH">Madhya pradesh</option>
                                                            <option value="MAHARASHTRA">Maharashtra</option>
                                                            <option value="MANIPUR">Manipur</option>
                                                            <option value="MEGHALAYA">Meghalaya</option>
                                                            <option value="MIZORAM">Mizoram</option>
                                                            <option value="NAGALAND">Nagaland</option>
                                                            <option value="ORISSA">Orissa</option>
                                                            <option value="PUNJAB">Punjab</option>
                                                            <option value="RAJASTHAN">Rajasthan</option>
                                                            <option value="SIKKIM">Sikkim</option>
                                                            <option value="TAMIL NADU">Tamil nadu</option>
                                                            <option value="TELANGANA">Telangana</option>
                                                            <option value="TRIPURA">Tripura</option>
                                                            <option value="UTTAR PRADESH">Uttar pradesh</option>
                                                            <option value="WEST BENGAL">West bengal</option>
                                                            <option value="DELHI">Delhi</option>
                                                            <option value="GOA">Goa</option>
                                                            <option value="PONDICHERY">Pondichery</option>
                                                            <option value="LAKSHDWEEP">Lakshdweep</option>
                                                            <option value="DAMAN &amp; DIU">Daman &amp; diu</option>
                                                            <option value="DADRA &amp; NAGAR">Dadra &amp; nagar</option>
                                                            <option value="CHANDIGARH">Chandigarh</option>
                                                            <option value="ANDAMAN &amp; NICOBAR">Andaman &amp; nicobar</option>
                                                            <option value="UTTARANCHAL">Uttaranchal</option>
                                                            <option value="JHARKHAND">Jharkhand</option>
                                                            <option value="CHATTISGARH">Chattisgarh</option>    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="state"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="city">City<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="city"
                                                            className="form-control"
                                                            placeholder="City"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="city"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-group-contact">
                                                    <label htmlFor="zipcode">Pincode<span>*</span></label>
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="zipcode"
                                                            className="form-control"
                                                            placeholder="Enter your pincode"
                                                        >    
                                                        </Field>
                                                        <ErrorMessage
                                                            name="zipcode"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>       
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inside-the-shopping-bag">
                                        <h2>Inside the shopping bag</h2>

                                        <div className="product-name-price-main-container">
                                            <div className="c-product-name">
                                                <h4>{productDetail?.product_name}</h4>
                                            </div>
                                            <div className="c-product-price">
                                                <h4>₹ {productDetail?.grand_total}</h4>
                                            </div>
                                        </div>
                                        <div className="row py-4">
                                            {Array.isArray(productDetail?.combo_products) &&
                                                productDetail?.combo_products.map((row, index) => {
                                                    return (
                                                        <> 
                                                            <div className="col-lg-5">
                                                                <div className="c-product-image">
                                                                    <img src={`${API_IMG_URL+row?.product_image}`} className="img-fluid" alt="Image"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7 user-product-information">
                                                                <div className="c-product-infrmation-main-container">
                                                                    <div className="c-product-user-name">
                                                                        <h5>Full Name</h5>
                                                                        <p>{row?.full_name}</p>
                                                                    </div>
                                                                    <div className="c-product-use-email">
                                                                        <h5>Email</h5>
                                                                        <a href=""><span className="__cf_email__" data-cfemail="">{row?.email}</span></a>
                                                                    </div>
                                                                </div>
                                                                <div className="c-product-infrmation-main-container">
                                                                    <div className="c-product-user-name phone-number">
                                                                        <h5>Phone Number</h5>
                                                                        <a href="tel:+91 9460963430">+91 {row?.phone_number}</a>
                                                                    </div>
                                                                    <div className="c-product-use-email designation">
                                                                        <h5>Designation</h5>
                                                                        <p>{row?.designation}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }

                                        </div> 

                                        <div className="col-lg-12">
                                            <div className="Coupon-Code">
                                                <h2>Coupon Code</h2>
                                                <div className="coupon-code-group">
                                                    <input type="text" id="couponcodeapply" placeholder="Enter coupon code"/>
                                                    <button className="couponForCard">Apply</button>
                                                </div>
                                                {/* <p className="success_message" style={{display:none, color: green !important font-size: 12px !important}}></p>
                                                <p className="error_message" style={{display:none;color: #ffa5a5 !important font-size: 12px !important}}></p> */}
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="line-c"></div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="total-price-main-container">
                                                <div className="c-t-price-name">
                                                    <h4>{productDetail?.base_total}</h4>
                                                </div>
                                                <div className="c-t-price">
                                                    <h4 className="text-size-big-ct">₹ {productDetail?.discount_price}</h4>
                                                </div>
                                            </div>
                                            <div className="total-price-main-container coupondiscountData">
                                                <div className="c-t-price-name">
                                                    <h4>Coupon Discount</h4>
                                                </div>
                                                <div className="c-t-price">
                                                    <h4> <span id="coupondiscountData">₹{productDetail?.coupon_amount}</span></h4>
                                                </div>
                                            </div>
                                            <div className="total-price-main-container">
                                                <div className="c-t-price-name">
                                                    <h4>Delivery Charges</h4>
                                                </div>
                                                <div className="c-t-price">
                                                    <h4>Free </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="line-c"></div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="grand-total-main-container">
                                                <div className="grand-name">
                                                    <h4>Grand Total</h4>
                                                </div>
                                                <div className="grand-price">
                                                    <h4 className="grandTotalUpdate">₹ <span id="updateGrandTotal">{productDetail?.grand_total}</span></h4>
                                                </div>
                                            </div>

                                            <div id="layerloader">
                                                <button type="submit" className="defult-btn-all mb-4 proceed-to-pay"> 
                                                    <i className="bi bi-arrow-right"></i> Proceed To Pay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik> 
        </section>
    )
  }