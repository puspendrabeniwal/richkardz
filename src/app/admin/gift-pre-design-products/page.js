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

const GiftPreDesignProducts = () => {
  let formData = new FormData(); //formdata object
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const filterOption = useRef(null);

  const getProducts = () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));

    formData.append("user_id", loginUser?._id);
    formData.append("skip", 10); //append the values with key, value pair
    formData.append("limit", 10); //append the values with key, value pair

    instance
      .post("gift_pre_design_product", formData)
      .then((response) => {
        let data = response.result ? response.result : {};
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

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
          router.push(`/admin/gift-pre-design-products/update/${rowData._id}`);
        },
      },
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          router.push(`/admin/gift-pre-design-products/view/${rowData._id}`);
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

  const removeFilter = () => {
    formData = new FormData();
    getProducts();
  };

  const accept = (id, status, type) => {
    let newFormData = new FormData();
    newFormData.append("product_id", id);
    newFormData.append("status", status);
    newFormData.append("type", type);
    instance
      .post("gift_pre_design_product_status", newFormData)
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
                Gift Pre Design Product
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
                  Gift Pre Design Product
                </li>
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
                              Card Type
                            </label>
                            <Field
                              as="select"
                              name="card_type"
                              className="form-control"
                            >
                              <option value="">Select</option>
                              <option value="Gold Metallic">
                                Gold Metallic
                              </option>
                              <option value="PVC Glossy">PVC Glossy</option>
                            </Field>
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
                                await getProducts();
                                //op.current.toggle(e);
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
                href="/admin/gift-pre-design-products/add"
                className="btn btn-sm btn-info"
              >
                Add Product
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
                  <Column field="product_name" sortable header="Name"></Column>
                  <Column field="discount" sortable header="Discount"></Column>
                  <Column field="price" sortable header="Price"></Column>
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
                    style={{ width: "130px" }}
                    body={UpdateButtonLink}
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

export default withAuth(GiftPreDesignProducts);
