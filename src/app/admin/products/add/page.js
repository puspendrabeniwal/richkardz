import React from "react";
import ProductForm from "../../components/ProductForm";
const AddProduct = () => {
  const handleAddProduct = async (data) => {
    console.log("submit,data", data);
  };
  return (
    <>
      <ProductForm
        productValue={"hjshdjhjhj"}
        // handleSubmitProduct={handleAddProduct}
        productId={"sdbjbdjdsbjsbjsbjsf"}
      />
    </>
  );
};

export default AddProduct;
