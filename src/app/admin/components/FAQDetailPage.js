"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FAQDetailsPage = ({ faqValue, handleSubmitProduct, productId }) => {
  return (
    <main>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-4">
            <table
                  className="table-border-padding w-100"
                  //   style={{ border: " 1px solid gray" }}
                >
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Question</th>
                    <td className="table-border-padding">
                      {faqValue.question}
                    </td>
                  </tr>

                  <tr className="table-border-padding">
                    <th className="table-border-padding">Answer</th>
                    <td className="table-border-padding">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: faqValue.answer,
                        }}
                      ></span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQDetailsPage;
