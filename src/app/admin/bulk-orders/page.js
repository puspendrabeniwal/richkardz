"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { SplitButton } from "primereact/splitbutton";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
import { Paginator } from "primereact/paginator";
import { DEFAULT_PAGE_ITEM, PAGE_ITEM_LIST } from "../constant";
import { Button } from "primereact/button";

const BulkOrders = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const filterOption = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_PAGE_ITEM);
  const [totalRecords, setTotalRecords] = useState(0);
  const op = useRef(null);
  let formData = {};
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData["user_id"] = loginUser?._id;
    formData["skip"] = first;
    formData["limit"] = rows;
    instance
      .post("bulk_orders", formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        let recordsFiltered = response.recordsFiltered
          ? response.recordsFiltered
          : 0;
        setTotalRecords(recordsFiltered);
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** Managing pagination */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    formData["skip"] = event.first;
    formData["limit"] = event.rows;
    getList();
  };
  const UpdateButtonLink = (rowData) => {
    const items = [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          router.push(`/admin/bulk-orders/view/${rowData._id}`);
        },
      },
    ];
    return (
      <>
        <SplitButton
          label="Action"
          icon="pi pi-plus"
          small
          raised
          text
          severity="secondary"
          model={items}
        />
      </>
    );
  };

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData["user_id"] = loginUser._id;
    formData["name"] = values?.name;
    formData["email"] = values?.email;
    formData["phone_number"] = values?.phone_number;
    formData["no_of_card_you_want"] = values?.no_of_card_you_want;
    formData["company_name"] = values?.company_name;
    getList();
  };

  return (
    <main>
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
                Bulk Orders
              </h1>
              <span className="h-20px border-gray-300 border-start mx-4"></span>
              <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                <li className="breadcrumb-item text-muted">
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
                <li className="breadcrumb-item text-mute">Bulk Orders</li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0">
                <button
                  onClick={(e) => op.current.toggle(e)}
                  aria-haspopup
                  aria-controls="overlay_panel"
                  className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder"
                >
                  <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Filter
                </button>
                <OverlayPanel
                  ref={op}
                  showCloseIcon
                  id="overlay_panel"
                  style={{ width: "450px" }}
                  className="overlaypanel-demo"
                >
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder">
                      Filter Options
                    </div>
                  </div>
                  <div className="separator border-gray-200 mb-10"></div>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      phone_number: "",
                      no_of_card_you_want: "",
                      company_name: "",
                    }}
                    onSubmit={async (values) => await onSubmit(values)}
                  >
                    {({ setFieldValue, resetForm }) => (
                      <Form className="form-design">
                        <div className="row ">
                          <div className="col-lg-6 col-md-6">
                            <div className="mb-10">
                              <label className="form-label fw-bold">Name</label>
                              <div>
                                <Field
                                  type="text"
                                  name="name"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 mb-10">
                            <div className="">
                              <label className="form-label fw-bold">
                                Email
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-lg-6 col-md-6">
                            <div className="">
                              <label className="form-label fw-bold">
                                Phone Number
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="phone_number"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">
                              No of card
                            </label>
                            <Field
                              type="text"
                              name="no_of_card_you_want"
                              className="form-control"
                            ></Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">
                              Company Name
                            </label>
                            <Field
                              type="text"
                              name="company_name"
                              className="form-control"
                            ></Field>
                          </div>
                        </div>
                        <div className="separator border-gray-200 mb-10"></div>
                        <div className="px-7 py-5">
                          <div className="d-flex justify-content-end">
                            <Button
                              className="btn btn-sm btn-success me-2"
                              icon="pi pi-save"
                              type="submit"
                              data-kt-menu-dismiss="true"
                              label="Submit"
                            />

                            <Button
                              className="btn btn-sm btn-danger me-2"
                              icon="pi pi-times"
                              type="reset"
                              data-kt-menu-dismiss="true"
                              label="Reset"
                              onClick={async (e) => {
                                resetForm();
                                await getList();
                                op.current.toggle(e);
                              }}
                            />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </OverlayPanel>
              </div>
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
              <div className="card-body py-9">
                <DataTable
                  value={list}
                  showGridlines
                  tableStyle={{ minWidth: "75rem" }}
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column field="name" sortable header="Name"></Column>
                  <Column field="email" sortable header="Email"></Column>
                  <Column
                    field="phone_number"
                    sortable
                    header="Phone Number"
                  ></Column>
                  <Column
                    field="no_of_card_you_want"
                    sortable
                    header="No of card"
                  ></Column>
                  <Column
                    field="company_name"
                    sortable
                    header="Company Name"
                  ></Column>
                  <Column
                    field=""
                    header="Action"
                    style={{ width: "130px" }}
                    body={UpdateButtonLink}
                  ></Column>
                </DataTable>
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={PAGE_ITEM_LIST}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(BulkOrders);
