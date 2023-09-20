"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Toast } from "primereact/toast";

import * as Yup from "yup";
import withAuth from "@/hoc/withAuth";
import instance from "@/app/admin/axiosInterceptor";
import { useRouter, useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "primereact/button";

const AddProduct = () => {
  const params = useParams();
  const toast = useRef(null);
  const router = useRouter();

  const handleAdd = async (data) => {
    console.log(data,"data")
    instance
      .post(`qr_code/add/${params.type}`, data)
      .then((response) => {
        if (response) {
          showMessage(response);
          router.push("/admin/qr_code/"+params.type);
        }
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

  const codeTypes = ["B2C Codes", "B2B Codes"];

  const validationSchema = (Number(params.type) === 1)?
    Yup.object().shape({
      no_of_codes: Yup.number("Invalid value").required("No of code is required"),
      company_name: Yup.string().required("Name is required")
  }) : 
  Yup.object().shape({
    company_name: Yup.string().required("Name is required"),
   
  })
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
                Add {codeTypes[params.type]}
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
                    {codeTypes[params.type]}
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-300 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-mute">Add </li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <Link href={`/admin/qr_code/${params.type}`}>
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
        style={{height :"500px"}}
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                <Formik
                  initialValues={{company_name : "", no_of_codes : null}}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => await handleAdd(values)}
                >
                  {({ setFieldValue }) => (
                    <Form className="form-design">
                      {(Number(params.type) === 1) ? 
                        <div className="fv-row mb-3">
                          <div className="col-lg-12 col-md-12">
                            <label
                              className="col-form-label required fw-semibold fs-6"
                              htmlFor="floatinDescription"
                            >
                              Name
                            </label>
                            <div className=" billingForm">
                              <Field
                                as="input"
                                name="company_name"
                                className="form-control"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="company_name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <label
                              className="col-form-label required fw-semibold fs-6"
                              htmlFor="floatinDescription"
                            >
                              No Of Codes
                            </label>
                            <div className=" billingForm">
                              <Field
                                as="input"
                                name="no_of_codes"
                                className="form-control"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="no_of_codes"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        :     <div className="fv-row mb-3">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatinDescription"
                          >
                            Name
                          </label>
                          <div className=" billingForm">
                            <Field
                              as="textarea"
                              name="company_name"
                              className="form-control"
                              rows="4"
                              cols="40"
                            ></Field>
                          </div>
                          <ErrorMessage
                            name="company_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      }
                      <div>
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-save"
                          label="Submit"
                        />
                        <Link href={`/admin/qr_code/${params.type}`}>
                          <Button
                            className="btn btn btn-danger btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-times"
                            label="Cancel"
                          />
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddProduct);
