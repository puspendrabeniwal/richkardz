"use client";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Tooltip } from "primereact/tooltip";
import { OverlayPanel } from "primereact/overlaypanel";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog";
import instance from "../axiosInterceptor";
import { useRouter } from "next/navigation";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import withAuth from "@/hoc/withAuth";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { DEFAULT_PAGE_ITEM, PAGE_ITEM_LIST } from "../constant";

const CMS = () => {
  const [cmsData, setCmsData] = useState([]);
  const op = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_PAGE_ITEM);
  const [totalRecords, setTotalRecords] = useState(0);
  let formData = new FormData();
  const toast = useRef(null);
  useEffect(() => {
    getCmsAPI();
  }, []);

  //  ==============get Block API Data ====================//
  const getCmsAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData.append("user_id", loginUser?._id);
    formData.append("skip", first); //append the values with key, value pair
    formData.append("limit", rows); //append the values with key, value pair

    try {
      const response = await instance.post(`cms`, formData);
      const newData = response.result;
      let recordsFiltered = response.recordsFiltered
        ? response.recordsFiltered
        : 0;
      setTotalRecords(recordsFiltered);
      setCmsData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  /** Managing pagination */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    formData.append("skip", event.first);
    formData.append("limit", event.rows);
    getCmsAPI();
  };
  //  ==============on Submit for Search Fields====================//
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData.append("user_id", loginUser._id);
    formData.append("title", values?.title);
    getCmsAPI();
  };

  //  ============== Status Confirmation ====================//
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
  const getValue = (value) => {
    switch (value) {
      case 1:
        return "Active";

      case 0:
        return "Inacitve";

      default:
        return null;
    }
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
  const confirm = (id, status) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(id, status),
      reject,
    });
  };
  const accept = (id, status) => {
    let newFormData = new FormData();
    newFormData.append("id", id);
    newFormData.append("status", status);
    instance
      .post("cms/status", newFormData)
      .then((response) => {
        getCmsAPI();
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
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const router = useRouter();
  // ============Edit button for update form===========//
  const getActionButton = (rowData) => {
    const items = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          router.push(`/admin/cms/edit/${rowData._id}`);
        },
      },
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          router.push(`/admin/cms/view/${rowData._id}`);
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
  return (
    <>
      <Toast ref={toast} />
      {/* ==================================Search Fields=========================================== */}
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
                CMS List
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
                <li class="breadcrumb-item text-mute">CMS</li>
              </ul>
            </div>

            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <div className="m-0">
                <button
                  onClick={(e) => op.current.toggle(e)}
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
                    }}
                    onSubmit={async (values) => await onSubmit(values)}
                  >
                    {({ setFieldValue, resetForm }) => (
                      <Form className="form-design">
                        <div className="row ">
                          <div className="col-lg-12 col-md-12">
                            <div className="mb-10">
                              <label className="form-label fw-bold">Name</label>
                              <div>
                                <Field
                                  type="text"
                                  name="title"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="separator border-gray-200 mb-10"></div> */}
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
                                await getCmsAPI();
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
              <Link href="/admin/cms/add">
                <Button
                  className="btn btn btn-info btn-sm me-3"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                  label="CMS"
                  icon="pi pi-plus"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*  ============================================Table Work=================================== */}
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                <ConfirmDialog />
                <DataTable
                  value={cmsData}
                  stripedRows
                  showGridlines
                  tableStyle={{ minWidth: "75rem" }}
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column
                    header="Type"
                    field="type"
                    sortable
                    style={{ cursor: "pointer" }}
                  ></Column>
                  <Column
                    header="Title"
                    field="title"
                    sortable
                    style={{ cursor: "pointer" }}
                  ></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  ></Column>
                  <Column
                    field=""
                    header="Actions"
                    style={{ width: "130px" }}
                    body={getActionButton}
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
    </>
  );
};

export default withAuth(CMS);
