"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "@/app/admin/axiosInterceptor";
import withAuth from "@/hoc/withAuth";
import { Paginator } from "primereact/paginator";
import { DEFAULT_PAGE_ITEM, PAGE_ITEM_LIST } from "../../constant";

const QrCode = () => {
  const params = useParams();
  const toastMessage = useRef(null);
  const filterOption = useRef(null);

  let formData = {};
  let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
  formData["user_id"] = loginUser?._id;

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_PAGE_ITEM);
  const [totalRecords, setTotalRecords] = useState(0);
  const [list, setList] = useState([]);

  /** Managing pagination */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    formData["skip"] = event.first; //append the values with key, value pair
    formData["limit"] = event.rows; //append the values with key, value pair
    getList();
  };

  const getList = () => {
    instance
      .post("qr_code/" + params.type, formData)
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

  useEffect(() => {
    getList();
  }, []);

  const onSubmit = async (values) => {
    formData["company_name"] = values?.company_name;
    formData["unique_code"] = values?.unique_code;
    getList();
  };

  const codeTypes = ["B2C Codes", "B2B Codes"];
  const codeUrlBodyTemplate = (rowData) => {
    return (
      <Link
        target="_blank"
        style={{ textDecoration: "underline", color: "blue" }}
        href={rowData.code_url}
      >
        QR Code Url
      </Link>
    );
  };

  const actionButtonBodyTemplate = (rowData) => {
    const items = [
      {
        label: "With Logo",
        icon: "pi pi-plus",
        command: () => {
          confirm(rowData.unique_code, "with_logo");
        },
      },
      {
        label: "Without Logo",
        icon: "pi pi-times  ",
        command: () => {
          confirm(rowData.unique_code, "without_logo");
        },
      },
    ];

    const accept = (code, action) => {
      instance
        .post("qr_code/edit/" + code + "/" + action, {})
        .then((response) => {
          getList();
          let data = response ? response : {};
          toastMessage.current.show({
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

    const reject = () => {
      toastMessage.current.show({
        severity: "warn",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    };

    const confirm = (code, action) => {
      confirmDialog({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => accept(code, action),
        reject,
      });
    };

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
                {codeTypes[params.type]}
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
                <li className="breadcrumb-item text-mute">
                  {codeTypes[params.type]}
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0">
                <button
                  onClick={(e) => filterOption.current.toggle(e)}
                  aria-haspopup
                  aria-controls="overlay_panel"
                  className="btn btn-sm btn-flex btn-primary btn-active-primary fw-bolder"
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
                      company_name: "",
                      unique_code: "",
                    }}
                    onSubmit={async (values) => await onSubmit(values)}
                  >
                    {({ setFieldValue, resetForm }) => (
                      <Form className="form-design">
                        <div className="row ">
                          <div className="col-lg-6 col-md-6">
                            <div className="mb-10">
                              <label className="form-label fw-bold">
                                Company Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="company_name"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 mb-10">
                            <div className="">
                              <label className="form-label fw-bold">
                                Unique Code
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="unique_code"
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
                              type="submit"
                              className="btn btn-sm btn-success me-2  btn-flex fw-bolder"
                              data-kt-menu-dismiss="true"
                            >
                              <i className="pi pi-save"></i>
                              Submit
                            </button>
                            <button
                              type="button"
                              onClick={async (e) => {
                                resetForm();
                                await getList();
                                filterOption.current.toggle(e);
                              }}
                              className="btn btn-sm btn-danger btn-flex fw-bolder"
                              data-kt-menu-dismiss="true"
                            >
                              <i className="pi pi-times"></i>Reset
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </OverlayPanel>
              </div>
              <Link
                href={`/admin/qr_code/add/${params.type}`}
                className="btn btn-sm btn-info"
              >
                <i className="pi pi-plus"></i> {codeTypes[params.type]}
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
                <Toast ref={toastMessage} />
                <ConfirmDialog />
                <DataTable
                  value={list}
                  showGridlines
                  tableStyle={{ minWidth: "75rem" }}
                  emptyMessage="No Codes found."
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column field="company_name" sortable header="Name"></Column>
                  <Column
                    field="unique_code"
                    sortable
                    header="Unique Code"
                  ></Column>
                  <Column
                    field="business_card_url"
                    sortable
                    header="Business Card Url"
                  ></Column>
                  <Column
                    field=""
                    header="Code Url"
                    body={codeUrlBodyTemplate}
                  ></Column>
                  <Column
                    field=""
                    header="Action"
                    body={actionButtonBodyTemplate}
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

export default withAuth(QrCode);
