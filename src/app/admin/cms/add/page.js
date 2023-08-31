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
        productValue={null}
        handleSubmitProduct={handleAddProduct}
        productId={null}
      />
    </>
  );
};

export default AddCms;
