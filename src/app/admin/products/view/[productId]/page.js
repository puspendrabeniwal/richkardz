"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import ProductForm from "../../../components/ProductForm";
const ViewProduct = ({ params }) => {
  const toast = useRef(null);
  const [productData, setProductData] = useState(null);
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
      .post("product/view/" + params.productId, formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        setProductData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateProduct = async (values) => {
    instance
      .post("product/edit/" + params.productId, values)
      .then((response) => {
        showMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showMessage = (data) => {
    toast.current.show({
      severity: data.status ? "success" : "error",
      summary: data.status ? "Success" : "Error",
      detail: data.message,
      life: 3000,
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
                View Product
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
                    href="/admin/products"
                    className="text-muted text-hover-primary"
                  >
                    Product Management
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li class="breadcrumb-item text-mute">View</li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <Link href="/admin/products" className="btn btn-sm btn-info">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      {productData ? (
        <ProductForm
          productValue={productData}
          handleSubmitProduct={handleUpdateProduct}
          productId={params.productId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ViewProduct;
