"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const EmailDetailsPage = ({ emailValue, handleSubmitProduct, productId }) => {
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
                <table
                  className="table-border-padding w-100"
                  //   style={{ border: " 1px solid gray" }}
                >
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Title</th>
                    <td className="table-border-padding">{emailValue.title}</td>
                  </tr>

                  <tr className="table-border-padding">
                    <th className="table-border-padding">Description</th>
                    <td className="table-border-padding">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: emailValue.content,
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

export default EmailDetailsPage;
