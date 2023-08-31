"use client";
import React from "react";
import BlockForm from "../../components/BlockForm";

const AddBlocks = () => {
  const handleAddProduct = async (data) => {
    console.log("submit,data", data);
  };
  return (
    <BlockForm
      productValue={null}
      handleSubmitProduct={handleAddProduct}
      productId={null}
    />
  );
};

export default AddBlocks;
