"use client";
import React, { useEffect, useState, useRef} from "react";
import Link from "next/link";
import dateFormat, { masks } from "dateformat";
import { Image } from 'primereact/image';
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import withAuth from "@/hoc/withAuth";

const UpdateProduct = ({ params }) => {
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

  return (
    <main>
      <Toast ref={toast} />
      <div className="d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                    <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                            View Product
                        </h1>
                        <span className="h-20px border-gray-300 border-start mx-4"></span>
                        <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                            <li className="breadcrumb-item text-dark">
                                <Link href="/admin/dashboard" className="text-muted text-hover-primary">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-300 w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-dark">
                                <Link href="/admin/products" className="text-muted text-hover-primary">Product Management</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-gray-300 w-5px h-2px"></span>
                            </li>
                            <li class="breadcrumb-item text-mute">View</li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                        <Link href="/admin/products" className="btn btn-sm btn-warning"><i className="pi pi-arrow-left"></i>Back</Link>
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
                                    <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                                        <img className="mw-100px mw-lg-100px" src={(productData?.images) ? productData?.image_url+productData?.images[0]["name"] :"/admin/assets/media/logos/logo-1-dark.png"} alt="image" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                            <div className="d-flex flex-column">
                                                <div className="d-flex align-items-center mb-1">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">{productData?.product_name}</a>
                                                    <span className="badge badge-info me-auto">{productData?.card_type}</span>
                                                </div>
                                                <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                                                {productData?.profession}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-start">
                                            <div className="d-flex flex-wrap">
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="fs-4 fw-bold">{dateFormat(productData?.created_at, "dddd, mmmm d, yyyy")}</div>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">Created</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-arrow-down fs-3 text-danger me-2">
                                                            <span className="path1"></span><span className="path2"></span></i> 
                                                            <div className="fs-4 fw-bold counted">{productData?.price}</div>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">Price</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-arrow-up fs-3 text-success me-2">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span></i>                                
                                                            <div className="fs-4 fw-bold counted" data-kt-countup="true">{productData?.discount}</div>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">Discount</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="d-flex align-items-center mb-1">
                                            Featrued : &nbsp;<span className={`badge badge-${((productData?.is_feature === 1) ? "success" : "warning")} me-auto`}> &nbsp;{(productData?.is_feature === 1) ? "Yes" : "No"}</span>
                                            New Released : &nbsp;<span className={`badge badge-${((productData?.is_new_release === 1) ? "success" : "warning")} me-auto`}> {(productData?.is_new_release === 1) ? "Yes" : "No"}</span>
                                            Status : &nbsp;<span className={`badge badge-${((productData?.status === 1) ? "success" : "warning")} me-auto`}> {(productData?.status === 1) ? "Active" : "Inactive"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="symbol-group symbol-hover mb-3">
                                    {

                                        (productData?.images && productData.images.map((records, index)=>{
                                            return  <div key={index} class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="Product Image">
                                                        <img alt="Pic" src={(productData?.images) ? productData?.image_url+records?.name :""}/>
                                                    </div>
                                        }))
                                    }
                                </div>
                                <div className="separator"></div>
                                <div className="row">&nbsp;</div>
                                <div className="row d-flex flex-wrap flex-sm-nowrap mb-6">
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                            <div className="d-flex flex-column">
                                                <div className="d-flex align-items-center mb-1">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">Description</a>
                                                </div>
                                                <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                                                {productData?.product_desc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </main>
  );
};

export default withAuth(UpdateProduct);
