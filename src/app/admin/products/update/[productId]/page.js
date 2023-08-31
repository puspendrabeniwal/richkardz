"use client";
import React, { useEffect, useState, useRef} from "react";
import { Toast } from "primereact/toast";
import instance from "../../../axiosInterceptor";
import ProductForm from "../../../components/ProductForm";
const UpdateProduct = ({ params }) => {
  const toast = useRef(null);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    getProductDetails()
  },[])

  const getProductDetails = async () => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();    //formdata object
    formData.append("user_id", loginUser._id);   //append the values with key, value pair
    formData.append("id", params.productId);   //append the values with key, value pair

    instance.post("product/view/"+params.productId, formData)
        .then(response => {
            let data = (response.result) ? response.result : {};
            setProductData(data);
        })
        .catch(error => {
            console.log(error);
        });
  };

  useEffect(() => {
    getProductDetails();
  }, []);




  const handleUpdateProduct = async (values) => {
    instance.post("product/edit/"+params.productId, values)
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
      {productData ? (
        <ProductForm
          productValue={productData}
          handleSubmitProduct={handleUpdateProduct}
          productId={params.productId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateProduct;
