"use client";
import React from "react";
import CmsForm from "../../components/CmsForm";

const AddCms = () => {
  const handleAddProduct = async (data) => {
    console.log("submit,data", data);
  };
  return (
    <>
      <CmsForm
        blockValue={null}
        handleSubmitProduct={handleAddProduct}
        cmsId={null}
      />
    </>
  );
};

export default AddCms;
