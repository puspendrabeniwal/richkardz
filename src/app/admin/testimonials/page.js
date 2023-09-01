"use client";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { FaEdit } from "react-icons/fa";
export const Testimonials = ({ params }) => {
  const values = [
    {
      name: "Sony",
      title: "Software",
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Sony",
      title: "Software",
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
    {
      name: "Sony",
      title: "Software",
      description: "Lorem Ipsum is simply dummy text of the printing and",
    },
  ];
  // ============Edit button for update form===========//
  const getActionuttons = (rowdata) => {
    return (
      <Link
        href={`/admin/testimonials/edit/${params.MonialId}`}
        type="button"
        className=""
      >
        <Tooltip
          target=".icon"
          content="Edit"
          placement="right"
          // tooltipClassName="custom-tooltip"
        />
        <FaEdit id="icon" className="act-btn " style={{ color: "#6777ef" }} />
      </Link>
    );
  };
  return (
    <div
      className="content d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <div className=" d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card card-header border-0 pt-4 ">
            <div className=" d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3>Blocks</h3>
              </div>
              <div>
                <Link href="/admin/testimonials/add" type="button">
                  <Button
                    label="Add Monial"
                    className="btn btn-primary"
                    icon="pi pi-plus"
                  />
                </Link>
              </div>
            </div>
            <DataTable
              value={values}
              className="p-datatable-customers "
              showGridlines={false}
              rows={10}
              stripedRows
              dataKey="id"
              filterDisplay="menu"
              emptyMessage="No customers found."
            >
              <Column
                header="Name"
                field="name"
                sortable
                style={{ cursor: "pointer" }}
              ></Column>
              <Column
                field="title"
                header="Rating"
                style={{ cursor: "pointer" }}
                sortable
              ></Column>
              <Column
                field="description"
                header="Description"
                style={{ cursor: "pointer" }}
                sortable
              ></Column>
              <Column field="" header="Actions" body={getActionuttons}></Column>
            </DataTable>
            {/* <div className="card-body py-4">
            <table
              className="table align-middle table-row-dashed fs-6 gy-5"
              id="kt_table_users"
            >
              <thead>
                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                  <th className="min-w-125px">Name</th>
                  <th className="min-w-125px">Title</th>
                  <th className="min-w-125px">Description</th>
                  <th className="text-end min-w-100px">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 fw-bold">
                <tr>
                  <td className="d-flex align-items-center">
                   
                    <div className="d-flex flex-column">
                      <a
                        href="../../demo1/dist/apps/user-management/users/view.html"
                        className="text-gray-800 text-hover-primary mb-1"
                      >
                        Block Name
                      </a>
                      <span>block@kpmg.com</span>
                    </div>
                  </td>
                  <td>Administrator</td>
                  <td>
                    <div className="badge badge-light fw-bolder">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </div>
                  </td>
                  <td></td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-light btn-active-light-primary btn-sm"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                    >
                      Actions
                      <span className="svg-icon svg-icon-5 m-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </a>
                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                      data-kt-menu="true"
                    >
                      <div className="menu-item px-3">
                        <a
                          href="../../demo1/dist/apps/user-management/users/view.html"
                          className="menu-link px-3"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="menu-item px-3">
                        <a
                          href="#"
                          className="menu-link px-3"
                          data-kt-users-table-filter="delete_row"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
