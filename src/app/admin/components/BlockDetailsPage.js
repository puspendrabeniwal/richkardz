"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BlockDetailsPage = ({ blockValue, handleSubmitProduct, productId }) => {
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
                <table
                  className="table-border-padding w-100"
                  //   style={{ border: " 1px solid gray" }}
                >
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Name</th>
                    <td className="table-border-padding">{blockValue.name}</td>
                  </tr>
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Title</th>
                    <td className="table-border-padding">{blockValue.title}</td>
                  </tr>
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Description</th>
                    <td className="table-border-padding">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: blockValue.body,
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
    </>
  );
};

export default BlockDetailsPage;
