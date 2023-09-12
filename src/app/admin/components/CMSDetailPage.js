"use client";
import React, { useState } from "react";
const CMSDetailsPage = ({ cmsValue, handleSubmitProduct, productId }) => {
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
                    <td className="table-border-padding">{cmsValue.title}</td>
                  </tr>
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Type</th>
                    <td className="table-border-padding">{cmsValue.type}</td>
                  </tr>
                  <tr className="table-border-padding">
                    <th className="table-border-padding">Description</th>
                    <td className="table-border-padding">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: cmsValue.content,
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

export default CMSDetailsPage;
