"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MonialDetailsPage = ({ monialValue, handleSubmitProduct, productId }) => {
  function convertRatingToStars(rating) {
    if (typeof rating === "number" && rating >= 1 && rating <= 5) {
      return "*".repeat(rating);
    } else {
      return "";
    }
  }

  const starString = convertRatingToStars(monialValue.rating);
  console.log(starString); // Output: "*****"
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
                <div className=" d-flex align-items-center">
                  <table
                    className="table-border-padding w-100"
                    //   style={{ border: " 1px solid gray" }}
                  >
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Name</th>
                      <td className="table-border-padding">
                        {monialValue.name}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding ">Rating</th>
                      <td className="table-border-padding text-success">
                        {starString}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Image</th>
                      <td className="table-border-padding">
                        <img
                          src={`${monialValue.full_image_path}`}
                          alt={monialValue.image}
                          className="w-6rem shadow-2 border-round"
                          height={45}
                        ></img>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Description</th>
                      <td className="table-border-padding">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: monialValue.descripiton,
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
      </div>
    </>
  );
};

export default MonialDetailsPage;
