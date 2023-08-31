"use client";
import React from "react";
import MonialsForm from "../../components/MonialsForm";

const AddMonials = () => {
  const handleAddProduct = async (data) => {
    console.log("submit,data", data);
  };
  return (
    <>
      <MonialsForm
        productValue={null}
        handleSubmitProduct={handleAddProduct}
        productId={null}
      />
    </>
  );
};

export default AddMonials;
