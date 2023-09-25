"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import { Button } from "primereact/button";
import dateFormat, { masks } from "dateformat";
import Image from "next/image";

const UpdateProduct = ({ params }) => {
  const toast = useRef(null);

  const [productData, setProductData] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  useEffect(() => {
    getProductDetails();
  }, []);

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
        let data = response.result;

        setProductData(data);
        // if (data?.combo_type && data?.product_ids) {
        //   getProductIdsName(data?.combo_type, data?.product_ids);
        // }
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
              <Link href="/admin/comboProducts">
                <Button
                  className="btn btn btn-warning btn-sm me-3e"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                  label="Back"
                  type="submit"
                  icon="pi pi-arrow-left"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card mb-6 mb-xl-9">
                <div className="card-body pt-9 pb-0">
                  <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
                    <div className="flex-grow-1">
                      <div className=" align-items-start align-items-center mb-3">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-2 fw-bold me-3"
                        >
                          <span>{productData?.product_name}</span>
                          <span className="mx-3">
                            <span
                              className={`badge me-auto ${
                                productData?.combo_type == 1
                                  ? "badge-success"
                                  : productData?.combo_type == 2
                                  ? "badge-info"
                                  : productData?.combo_type == 3
                                  ? "badge-warning"
                                  : ""
                              }`}
                            >
                              {productData?.combo_type == 1
                                ? "PVC Glossy"
                                : productData?.combo_type == 2
                                ? "Metal Cards"
                                : productData?.combo_type == 3
                                ? "Combo"
                                : ""}
                            </span>
                          </span>
                        </a>
                      </div>
                      <div className="d-flex flex-wrap justify-content-start">
                        <div className="d-flex flex-wrap">
                          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="ki-duotone ki-arrow-down fs-3 text-danger me-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                              <div className="fs-4 fw-bold counted">
                                {productData?.price}
                              </div>
                            </div>
                            <div className="fw-semibold fs-6 text-gray-400">
                              Price
                            </div>
                          </div>
                          <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="ki-duotone ki-arrow-up fs-3 text-success me-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                              <div
                                className="fs-4 fw-bold counted"
                                data-kt-countup="true"
                              >
                                {productData?.discount}
                              </div>
                            </div>
                            <div className="fw-semibold fs-6 text-gray-400">
                              Discount
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        Featrued : &nbsp;
                        <span
                          className={`badge badge-${
                            productData?.is_feature === 1
                              ? "success"
                              : "warning"
                          } me-auto`}
                        >
                          {" "}
                          &nbsp;{productData?.is_feature === 1 ? "Yes" : "No"}
                        </span>
                        New Released : &nbsp;
                        <span
                          className={`badge badge-${
                            productData?.is_new_release === 1
                              ? "success"
                              : "warning"
                          } me-auto`}
                        >
                          {" "}
                          {productData?.is_new_release === 1 ? "Yes" : "No"}
                        </span>
                        Status : &nbsp;
                        <span
                          className={`badge badge-${
                            productData?.status === 1 ? "success" : "warning"
                          } me-auto`}
                        >
                          {" "}
                          {productData?.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="separator"></div>
                  <h2 className="mt-4">Combo Product List</h2>
                  {productData &&
                    productData?.combo_products?.map((item, index) => (
                      <div className="card-body pt-9 pb-0" key={index}>
                        <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
                          <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                            {item.image_url && item.image ? (
                              <img
                                className="mw-100px mw-lg-100px"
                                src={item.image_url + item.image}
                                alt="image"
                              />
                            ) : (
                              <img
                                className="mw-100px mw-lg-100px"
                                src={
                                  "/admin/assets/media/logos/logo-1-dark.png"
                                }
                                alt="image"
                              />
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                              <div className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-1">
                                  <a
                                    href="#"
                                    className="text-gray-800 text-hover-primary fs-2 fw-bold me-3"
                                  >
                                    {item?.product_name}
                                    <span className="mx-3">
                                      <span
                                        className={`badge me-auto ${
                                          item?.card_type_name
                                            ? "badge-success"
                                            : ""
                                        }`}
                                      >
                                        {item?.card_type_name}
                                      </span>
                                    </span>
                                  </a>
                                  <span className="badge badge-info me-auto">
                                    {productData?.card_type}
                                  </span>
                                </div>
                                <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                                  {item?.profession}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start">
                              <div className="d-flex flex-wrap">
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                  <div className="d-flex align-items-center">
                                    <i className="ki-duotone ki-arrow-down fs-3 text-danger me-2">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                    </i>
                                    <div className="fs-4 fw-bold counted">
                                      {item?.price}
                                    </div>
                                  </div>
                                  <div className="fw-semibold fs-6 text-gray-400">
                                    Price
                                  </div>
                                </div>
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                  <div className="d-flex align-items-center">
                                    <i className="ki-duotone ki-arrow-up fs-3 text-success me-2">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                    </i>
                                    <div
                                      className="fs-4 fw-bold counted"
                                      data-kt-countup="true"
                                    >
                                      {item?.discount}
                                    </div>
                                  </div>
                                  <div className="fw-semibold fs-6 text-gray-400">
                                    Discount
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="separator"></div>
                      </div>
                    ))}
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
