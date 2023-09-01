"use client";
import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import instance from "../axiosInterceptor";

const Blocks = () => {
  const [blockData, setBlockData] = useState({});
  useEffect(() => {
    addBlockAPI();
  }, []);

  const addBlockAPI = async (data) => {
    const postData = {
      limit: 10,
    };
    try {
      const response = await instance.post(`blocks`, postData);
      const newData = response.result;
      setBlockData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  // ============Edit button for update form===========//
  const getActionButton = (rowdata) => {
    return (
      <Link href={`/admin/blocks/edit/${rowdata._id}`} type="button">
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
                <Link href="/admin/blocks/add" type="button">
                  <Button
                    label="Add Block"
                    className="btn btn-primary"
                    icon="pi pi-plus"
                  />
                </Link>
              </div>
            </div>
            <DataTable
              value={blockData}
              responsiveLayout="scroll"
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
                header="Title"
                style={{ cursor: "pointer" }}
                sortable
              ></Column>
              <Column
                field="body"
                header="Description"
                style={{ cursor: "pointer" }}
                sortable
              ></Column>
              <Column field="" header="Actions" body={getActionButton}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
