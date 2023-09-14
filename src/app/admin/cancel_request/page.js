"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, usePathname } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { OverlayPanel } from "primereact/overlaypanel";
import { SplitButton } from "primereact/splitbutton";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import dateFormat, { masks } from "dateformat";

import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";

const ReturnReplacement = ({ params }) => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const filterOption = useRef(null);
  let formData = new FormData(); //formdata object

  const getList = () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));

    formData.append("user_id", loginUser?._id);
    formData.append("skip", 10);
    formData.append("limit", 10);

    instance
      .post("cancel_request", formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const UpdateButtonLink = (rowData) => {
    const items = [
      {
        label: "Delete",
        icon: "pi pi-times",
        command: () => {
          confirm(rowData._id, rowData?.type);
        },
      },
    ];

    if (
      params.type === "contact-enquiries" ||
      params.type === "design-queries"
    ) {
      items.push({
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          router.push(`/admin/leads/view/${params.type}/${rowData._id}`);
        },
      });
    }

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
    formData.append("user_id", loginUser._id);
    formData.append("name", values?.name);
    formData.append("email", values?.email);
    formData.append("phone_number", values?.phone_number);
    formData.append("transaction_id", values?.transaction_id);
    getList();
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const leadDownload = () => {
    // Headers for each column
    let headers = ["Name, Email, Phone, Transaction Id, Reason"];

    // Convert users data to a csv
    let usersCsv = list.reduce((acc, user) => {
      const {
        customer_name,
        email,
        phone_number,
        transaction_id,
        cancellation_reason,
      } = user;
      acc.push(
        [
          customer_name,
          email,
          phone_number,
          transaction_id,
          cancellation_reason,
        ].join(",")
      );
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: "cancel.csv",
      fileType: "text/csv",
    });
  };

  const accept = (id) => {
    let newFormData = new FormData();
    newFormData.append("request_id", id);
    instance
      .post("cancel_request_status", newFormData)
      .then((response) => {
        getList();
        let data = response ? response : {};
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: data.message,
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toast = useRef(null);
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(id),
      reject,
    });
  };

  const getSeverity = (value) => {
    switch (value) {
      case 1:
        return "success";

      case 0:
        return "warning";

      default:
        return null;
    }
  };

  const getValue = (value) => {
    switch (value) {
      case 1:
        return "Resolved";

      case 0:
        return "Mark Resolved";

      default:
        return null;
    }
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        style={{ cursor: "pointer" }}
        value={getValue(rowData.status)}
        severity={getSeverity(rowData.status)}
        onClick={() => confirm(rowData._id, rowData.status, "status")}
      ></Tag>
    );
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
                Cancel Request
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
                <li className="breadcrumb-item text-mute">Cancel Request</li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0">
                <button
                  onClick={(e) => filterOption.current.toggle(e)}
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
                  ref={filterOption}
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
                      created: "",
                      utm: "",
                      business_type: "",
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
                            <div className="">
                              <label className="form-label fw-bold">
                                Transaction Id
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="transaction_id"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="separator border-gray-200 mb-10"></div>
                        <div className="px-7 py-5">
                          <div className="d-flex justify-content-end">
                            <button
                              type="reset"
                              className="btn btn-sm btn-warning me-2"
                              data-kt-menu-dismiss="true"
                            >
                              Reset
                            </button>
                            <button
                              type="submit"
                              className="btn btn-sm btn-success me-2"
                              data-kt-menu-dismiss="true"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={async (e) => {
                                resetForm();
                                await getList();
                                //op.current.toggle(e);
                              }}
                              className="btn btn-sm btn-danger"
                              data-kt-menu-dismiss="true"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </OverlayPanel>
              </div>
              <Link
                href="#"
                onClick={leadDownload}
                className="btn btn-sm btn-info"
              >
                Download
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
              <div className="card-body py-9">
                <Toast ref={toast} />
                <ConfirmDialog />
                <DataTable
                  value={list}
                  paginator
                  showGridlines
                  rows={10}
                  totalRecords={50}
                  tableStyle={{ minWidth: "75rem" }}
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column field="customer_name" sortable header="Name"></Column>
                  <Column field="email" sortable header="Email"></Column>
                  <Column field="phone_number" header="Phone Number"></Column>

                  <Column
                    field="transaction_id"
                    sortable
                    header="Transaction Id"
                  ></Column>
                  <Column
                    field="cancellation_reason"
                    sortable
                    header="Cancellation Reason"
                  ></Column>
                  <Column
                    field="created"
                    sortable
                    header="Created"
                    body={(data, props) =>
                      dateFormat(data.created, "dddd, mmmm d, yyyy")
                    }
                  ></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ReturnReplacement);
