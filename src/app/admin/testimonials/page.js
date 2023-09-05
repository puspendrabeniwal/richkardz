"use client";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { Tag } from "primereact/tag";
import { OverlayPanel } from "primereact/overlaypanel";
import { Field, Form, Formik } from "formik";
import instance from "../axiosInterceptor";
export const Testimonials = () => {
  const [monialData, setMonialData] = useState([]);
  const op = useRef(null);
  let formData = new FormData();
  useEffect(() => {
    getMonialAPI();
  }, []);
  const removeFilter = () => {
    formData = new FormData();
    getMonialAPI();
  };
  //  ==============get Monial API Data ====================//
  const getMonialAPI = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData.append("user_id", loginUser?._id);
    formData.append("skip", 10); //append the values with key, value pair
    formData.append("limit", 10); //append the values with key, value pair
    try {
      const response = await instance.post(`testimonials`, formData);
      const newData = response.result;
      setMonialData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  //  ==============on Submit for Search Fields====================//
  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    formData.append("user_id", loginUser._id);
    formData.append("name", values?.name);
    getMonialAPI();
  };
  // ============Edit button for update form===========//
  const getActionuttons = (rowdata) => {
    return (
      <Link href={`/admin/testimonials/edit/${rowdata._id}`}>
        <Tag value="Update" severity="warning"></Tag>
      </Link>
    );
  };
  const imageBodyTemplate = (data) => {
    console.log("image", data.full_image_path);
    return (
      <img
        src={`${data.full_image_path}`}
        alt={data.image}
        className="w-6rem shadow-2 border-round"
        height={25}
      ></img>
    );
  };
  return (
    <>
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
                Testimonial List
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
                <li class="breadcrumb-item text-mute">Testimonial</li>
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
                      title: "",
                    }}
                    onSubmit={async (values) => await onSubmit(values)}
                  >
                    {({ setFieldValue }) => (
                      <Form className="form-design">
                        <div className="row ">
                          <div className="col-lg-12 col-md-12">
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
                        </div>
                        {/* <div className="separator border-gray-200 mb-10"></div> */}
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
                              onClick={removeFilter}
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
                href="/admin/testimonials/add"
                className="btn btn-sm btn-success"
              >
                Add Testimonial
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
            <div className="card p-4">
              <div className="card-body py-4">
                <DataTable
                  value={monialData}
                  showGridlines
                  rows={10}
                  stripedRows
                  totalRecords={50}
                  tableStyle={{ minWidth: "75rem" }}
                  paginator
                >
                  <Column
                    header="#"
                    body={(data, props) => props.rowIndex + 1}
                  ></Column>
                  <Column
                    header="Name"
                    field="name"
                    sortable
                    style={{ cursor: "pointer" }}
                  ></Column>
                  <Column
                    header="Image"
                    className="w-6rem shadow-2 border-round"
                    body={imageBodyTemplate}
                  ></Column>
                  <Column
                    field="rating"
                    header="Rating"
                    style={{ cursor: "pointer" }}
                    sortable
                  ></Column>
                  <Column
                    field=""
                    header="Actions"
                    body={getActionuttons}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
