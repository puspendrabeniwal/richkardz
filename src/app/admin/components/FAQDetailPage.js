"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FAQDetailsPage = ({ faqValue, handleSubmitProduct, productId }) => {
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
                <div>
                  <div className="mb-3">
                    <h2>{faqValue.question}</h2>
                  </div>

                  <span
                    className="text-gray"
                    dangerouslySetInnerHTML={{
                      __html: faqValue.answer,
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQDetailsPage;
