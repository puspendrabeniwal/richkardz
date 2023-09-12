"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";

const UpdateProduct = ({ params }) => {
  const toast = useRef(null);

  const [productData, setProductData] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductIdsName = (comboType, prodIds) => {
    instance
      .get(`combo-products/get-product/${comboType}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        if (prodIds && prodIds.length > 0) {
          const prodIdsJoin = prodIds.split(",");
          const ndt = data.filter((val) => {
            const prodObj = prodIdsJoin.find((item) => val._id === item);
            if (prodObj) {
              return true;
            }
          });
          const productArray = ndt.map((product) => product.product_name);
          setCardsList(productArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductDetails = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData(); //formdata object
    formData.append(
      "user_id",
      Object.keys(loginUser).length > 0 ? loginUser?._id : ""
    ); //append the values with key, value pair
    formData.append("id", params.productId); //append the values with key, value pair

    instance
      .get("combo-products/view/" + params.productId, formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        setProductData(data);
        if (data?.combo_type && data?.product_ids) {
          getProductIdsName(data?.combo_type, data?.product_ids);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex flex-column flex-column-fluid" id="kt_content">
        <div className="toolbar" id="kt_toolbar">
          <div
            id="kt_toolbar_container"
            className="container-fluid d-flex flex-stack"
          >
            <div
              data-kt-swapper="true"
              data-kt-swapper-mode="prepend"
              data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
              className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
            >
              <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                View Combo Product
              </h1>
              <span className="h-20px border-gray-300 border-start mx-4"></span>
              <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                <li className="breadcrumb-item text-dark">
                  <Link
                    href="/admin/dashboard"
                    className="text-muted text-hover-primary"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-dark">
                  <Link
                    href="/admin/comboProducts"
                    className="text-muted text-hover-primary"
                  >
                    Combo Product
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li class="breadcrumb-item text-mute">View</li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <Link href="/admin/comboProducts" className="btn btn-sm btn-info">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
        style={{ height: "750px" }}
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card mb-6 mb-xl-9">
                <div className="card-body pt-9 pb-0">
                  <table className="table-border-padding w-100">
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Product Name</th>
                      <td className="table-border-padding">
                        {productData.product_name}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Price</th>
                      <td className="table-border-padding">
                        {productData.price}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Discount Price</th>
                      <td className="table-border-padding">
                        {productData.discount}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Product Text</th>
                      <td className="table-border-padding">
                        {productData.product_text}
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Combo Type</th>
                      <td className="table-border-padding">
                        <span
                          className={`badge badge-light-${
                            productData?.combo_type === 1
                              ? "success"
                              : productData?.combo_type === 2
                              ? "info"
                              : "warning"
                          } me-auto`}
                        >
                          {productData?.combo_type == 1
                            ? "PVC Glossy"
                            : productData?.combo_type == 2
                            ? "Metel Cards"
                            : productData?.combo_type == 3
                            ? "Combo"
                            : ""}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Choose Product</th>
                      <td className="table-border-padding">
                        <span className={`badge badge-light me-auto`}>
                          {cardsList.length > 0 && cardsList.join(", ")}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Is Feature</th>
                      <td className="table-border-padding">
                        <span
                          className={`badge badge-light-${
                            productData?.is_feature === 1
                              ? "success"
                              : "warning"
                          } me-auto`}
                        >
                          {productData?.is_feature === 1 ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Is New Release</th>
                      <td className="table-border-padding">
                        <span
                          className={`badge badge-light-${
                            productData?.is_new_release === 1
                              ? "success"
                              : "warning"
                          } me-auto`}
                        >
                          {productData?.is_new_release === 1 ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-border-padding">
                      <th className="table-border-padding">Status</th>
                      <td className="table-border-padding">
                        <span
                          className={`badge badge-light-${
                            productData?.status === 1 ? "success" : "warning"
                          } me-auto`}
                        >
                          {productData?.is_new_release === 1
                            ? "Active"
                            : "Deactive"}
                        </span>
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

export default UpdateProduct;
