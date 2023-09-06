"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ProductDetailsPage = ({
  productValue,
  handleSubmitProduct,
  productId,
}) => {
  console.log("productValue", productValue);

  return (
    <>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card p-4">
              <div className="card-body py-4">
                {/* <div className=" d-flex justify-content-between"> */}
                <div className="mb-3">
                  <strong>Product Name : </strong>
                  <span>{productValue.product_name}</span>
                </div>
                <div className="mb-3">
                  <strong>Product Price : </strong>
                  <span>{productValue.price}</span>
                </div>
                <div className="mb-3">
                  <strong>Discount : </strong>
                  <span>{productValue.discount}</span>
                </div>
                <div className="mb-3">
                  <strong>Profession : </strong>
                  <span>{productValue.profession}</span>
                </div>
                <div className="mb-3">
                  <strong>Card Type : </strong>
                  <span>{productValue.card_type}</span>
                </div>
                <div className="mb-3">
                  <strong>Is Feature : </strong>
                  <span>{productValue.is_feature}</span>
                </div>{" "}
                <div className="mb-3">
                  <strong>Is New Release : </strong>
                  <span>{productValue.is_new_release}</span>
                </div>
                <div className="mb-3">
                  <strong>Status : </strong>
                  <span>{productValue.status}</span>
                </div>
                {/* <div className="mb-3">
                  <strong>Image : </strong>
                  <span>{productValue.image_url}</span>
                </div> */}
                <div className="mb-3">
                  <strong>Product Description : </strong>
                  <span>{productValue.product_desc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
