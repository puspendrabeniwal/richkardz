"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import instance from "../axiosInterceptor";
import withAuth from "@/hoc/withAuth";
import { Paginator } from "primereact/paginator";
import { DEFAULT_PAGE_ITEM, PAGE_ITEM_LIST } from "../constant";

export const Products = () => {
  let formData = new FormData(); //formdata object
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const filterOption = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(DEFAULT_PAGE_ITEM);
  const [totalRecords, setTotalRecords] = useState(0);

  const getProducts = () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));

    formData.append("user_id", loginUser?._id);
    formData.append("skip", first); //append the values with key, value pair
    formData.append("limit", rows); //append the values with key, value pair

    instance
      .post("products", formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        let recordsFiltered = response.recordsFiltered
          ? response.recordsFiltered
          : 0;
        setTotalRecords(recordsFiltered);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  /** Managing pagination */
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    formData.append("skip", event.first);
    formData.append("limit", event.rows);
    getProducts();
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

  const featureBodyTemplate = (rowData) => {
    return (
      <Tag
        style={{ cursor: "pointer" }}
        value={changeLevel(rowData.is_feature)}
        severity={getSeverity(rowData.is_feature)}
        onClick={() => confirm(rowData._id, rowData.is_feature, "feature")}
      ></Tag>
    );
  };

  const releaseBodyTemplate = (rowData) => {
    return (
      <Tag
        value={changeLevel(rowData.is_new_release)}
        severity={getSeverity(rowData.is_new_release)}
      ></Tag>
    );
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

  const changeLevel = (value) => {
    switch (value) {
      case 1:
        return "Yes";

      case 0:
        return "No";

      default:
        return null;
    }
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

  const UpdateButtonLink = (rowData) => {
    const items = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          router.push(`/admin/products/update/${rowData._id}`);
        },
      },
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          router.push(`/admin/products/view/${rowData._id}`);
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
    formData.append("user_id", loginUser._id);
    formData.append("product_name", values?.product_name);
    formData.append("price", values?.price);
    formData.append("discount", values?.discount);
    formData.append("card_type", values?.card_type);
    formData.append("profession", values?.profession);
    getProducts();
  };

  const accept = (id, status, type) => {
    let newFormData = new FormData();
    newFormData.append("product_id", id);
    newFormData.append("status", status);
    newFormData.append("type", type);
    instance
      .post("product_status", newFormData)
      .then((response) => {
        getProducts();
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

  const confirm = (id, status, type) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(id, status, type),
      reject,
    });
  };

  const toast = useRef(null);
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
                Product List
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
                  Product Management
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
                      price: "",
                      discount: "",
                      profession: "",
                      card_type: "",
                      product_name: "",
                    }}
                    onSubmit={async (values) => await onSubmit(values)}
                  >
                    {({ setFieldValue, resetForm }) => (
                      <Form className="form-design">
                        <div className="row ">
                          <div className="col-lg-6 col-md-6">
                            <div className="mb-10">
                              <label className="form-label fw-bold">
                                Product Name
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="product_name"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 mb-10">
                            <div className="">
                              <label className="form-label fw-bold">
                                Discount
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="discount"
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
                                Product Price
                              </label>
                              <div>
                                <Field
                                  type="text"
                                  name="price"
                                  className="form-control"
                                ></Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">
                              Profession
                            </label>
                            <Field
                              as="select"
                              name="profession"
                              className="form-control"
                              id="floatingprofession"
                            >
                              <option value="">Select</option>
                              <option value="CA">CA</option>
                              <option value="Doctor">Doctor</option>
                              <option value="Lawyers">Lawyers</option>
                              <option value="Entrepreneur">Entrepreneur</option>
                              <option value="Sales Person">Sales Person</option>
                              <option value="Agents">Agents</option>
                              <option value="Freelancers">Freelancers</option>
                              <option value="Students">Students</option>
                            </Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <label className="form-label fw-bold">
                              Card Type
                            </label>
                            <Field
                              as="select"
                              name="card_type"
                              className="form-control"
                            >
                              <option value="">Select</option>
                              <option value="PVC Glossy">PVC Glossy</option>
                              <option value="Metal Cards">Metal Cards</option>
                              <option value="NFC RFID">NFC RFID</option>
                              <option value="ID Cards">ID Cards</option>
                              <option value="Wooden">Wooden</option>
                              <option value="Black Metal">Black Metal</option>
                              <option value="Golden Metal">Golden Metal</option>
                              <option value="Silver Metal">Silver Metal</option>
                              <option value="Sticker">Sticker</option>
                            </Field>
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
                                formData = new FormData();
                                await getProducts();
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
              <Link href="/admin/products/add" className="btn btn-sm btn-info">
                <i className="pi pi-plus"></i> Product
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
                  value={products}
                  showGridlines
                  rows={10}
                  totalRecords={50}
                  tableStyle={{ minWidth: "75rem" }}
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column field="product_name" sortable header="Name"></Column>
                  <Column field="discount" sortable header="Discount"></Column>
                  <Column field="price" sortable header="Price"></Column>
                  <Column
                    field="profession"
                    sortable
                    header="Profession"
                  ></Column>
                  <Column
                    field="card_type"
                    sortable
                    header="Card Type"
                  ></Column>
                  <Column
                    field="is_feature"
                    header="Is Feature"
                    body={featureBodyTemplate}
                  ></Column>
                  <Column
                    field="is_new_release"
                    header="New Release"
                    body={releaseBodyTemplate}
                  ></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  ></Column>
                  <Column
                    field=""
                    header="Action"
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

export default withAuth(Products);
