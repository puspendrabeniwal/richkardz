"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter, usePathname } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { OverlayPanel } from "primereact/overlaypanel";
import { SplitButton } from "primereact/splitbutton";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import dateFormat, { masks } from "dateformat";
import instance from "../../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
import { Paginator } from "primereact/paginator";
import { DEFAULT_PAGE_ITEM, PAGE_ITEM_LIST } from "../../constant";
import { Button } from "primereact/button";

const Leads = ({ params }) => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [dates, setDates] = useState(null);
  const filterOption = useRef(null);
  let formData = {}; //formdata object
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_PAGE_ITEM);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));

    formData["user_id"] = loginUser?._id;
    formData["skip"] = first;
    formData["limit"] = rows;

    instance
      .post("leads/" + params.type, formData)
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
        icon: "pi pi-times",
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
    formData["user_id"] = loginUser._id;
    formData["name"] = values?.name;
    formData["email"] = values?.email;
    formData["phone_number"] = values?.phone_number;
    formData["start_date"] = dates && dates.length > 0 ? dates[0] : "";
    formData["end_date"] = dates && dates.length > 0 ? dates[1] : "";
    formData["utm"] = values?.utm;
    formData["business_type"] = values?.business_type;
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
    let headers = ["Id,Name,Email"];

    // Convert users data to a csv
    let usersCsv = list.reduce((acc, user) => {
      const { id, name, email } = user;
      acc.push([id, name, email].join(","));
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: "users.csv",
      fileType: "text/csv",
    });
  };

  const accept = (id) => {
    let newFormData = {};
    newFormData["id"] = id;
    instance
      .post("leads/delete/" + params.type + "/" + id, newFormData)
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

  let breadcrumbName = {
    "pre-checkout-users": "Pre Checkout Users",
    "digital-visiting-card": "Digital Enquiries",
    "B2B%20LP": "B2B LP",
    "gifting-leads-enquiry": "Gifting Leads",
    "contact-enquiries": "Contact Enquiries",
    "design-queries": "Design Queries",
    "brand-leads": "Brand Leads",
    "email-leads": "Email Leads",
    "get-in-touch": "Get In Touch",
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
                {breadcrumbName[params.type]}
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
                <li className="breadcrumb-item text-mute">Leads</li>
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
                            <label className="form-label fw-bold">
                              Created
                            </label>
                            <Calendar
                              value={dates}
                              onChange={(e) => setDates(e.value)}
                              selectionMode="range"
                              readOnlyInput
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">Utm</label>
                            <Field
                              type="text"
                              name="utm"
                              className="form-control"
                            ></Field>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">
                              Business Type
                            </label>
                            <Field
                              type="text"
                              name="business_type"
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
                                filterOption.current.toggle(e);
                              }}
                            />
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
                  showGridlines
                  rows={10}
                  totalRecords={50}
                  tableStyle={{ minWidth: "75rem" }}
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column
                    field="name"
                    sortable
                    header="Name"
                    body={(data, props) =>
                      params.type === "design-queries" ||
                      params.type === "get-in-touch"
                        ? data.first_name + " " + data.first_name
                        : params.type === "brand-leads" ||
                          params.type === "email-leads"
                        ? data.full_name
                        : params.type === "cancel-request" ||
                          params.type === "refund-request"
                        ? data.customer_name
                        : data.name
                    }
                  ></Column>
                  <Column field="email" sortable header="Email"></Column>
                  <Column
                    field={
                      params.type === "contact-enquiries" ||
                      params.type === "design-queries" ||
                      params.type === "brand-leads" ||
                      params.type === "cancel-request" ||
                      params.type === "refund-request" ||
                      params.type === "email-leads"
                        ? "phone_number"
                        : params.type === "get-in-touch"
                        ? "mobile"
                        : "phone_no"
                    }
                    sortable
                    header="Phone Number"
                  ></Column>
                  <Column
                    field="created"
                    sortable
                    header="Created"
                    body={(data, props) =>
                      dateFormat(data.created, "dddd, mmmm d, yyyy")
                    }
                  ></Column>
                  {params.type === "contact-enquiries" ? (
                    <Column field="city" sortable header="City"></Column>
                  ) : (
                    <Column field="utm" sortable header="Utm"></Column>
                  )}
                  {params.type != "contact-enquiries" ? (
                    <Column
                      field="business_type"
                      sortable
                      header="Business Type"
                    ></Column>
                  ) : (
                    <Column
                      field="pin_code"
                      sortable
                      header="Pin Code"
                    ></Column>
                  )}
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

export default withAuth(Leads);
