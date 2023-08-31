"use client";
import React, { useEffect, useState } from "react";
import MonialsForm from "@/app/admin/components/MonialsForm";

const UpdateMonials = ({ params }) => {
  const [productData, setProductData] = useState(null);

  const geetProductDetails = async () => {
    // const response = await axios.get(
    //   `https://getProductDetails/${params.productId}`
    // );

    setProductData({
      productName: "xyz",
      productPrice: "34",
      discountPrice: "1",
      profession: "1",
      cardType: "2",
      featured: "1",
      newFeatured: "1",
      productDescription: "asldfjalskdfjlaksdj",
      status: "2",
      fileUpload: [],
    });
  };
  useEffect(() => {
    geetProductDetails();
  }, []);

  const handleUpdateProduct = async (values) => {
    //API call to submit data for update
    console.log("Updated submit,data", values);
  };
  return (
    <>
      {productData ? (
        <MonialsForm
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

export default UpdateMonials;
