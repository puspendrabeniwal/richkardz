"use client";
import React,{useRef} from "react";
import { Toast } from "primereact/toast";
import instance from "../../axiosInterceptor";
import ProductForm from "../../components/ProductForm";
const AddProduct = () => {
  const toast = useRef(null);
  const handleAddProduct = async (data) => {
    instance.post("product/add", data)
    .then(response => {
        showMessage(response)
    })
    .catch(error => {
        console.log(error);
    });
  };

  const showMessage = (data) => {
    toast.current.show({
      severity: (data.status) ? "success" : "error",
      summary: (data.status) ? "Success" : "Error",
      detail: data.message,
      life: 3000,
    });
  };
  return (
    <>
      <Toast ref={toast} />
      <ProductForm
        productValue={null}
        handleSubmitProduct={handleAddProduct}
        productId={null}

      />
    </>
  );
};

export default AddProduct;
