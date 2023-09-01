"use client";
import CmsForm from "@/app/admin/components/CmsForm";
import React, { useEffect, useState } from "react";

const UpdateCms = () => {
  const [productData, setProductData] = useState(null);

  const geetProductDetails = async ({ params }) => {
    // const response = await axios.get(
    //   `https://getProductDetails/${params.cmsId}`
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
        <CmsForm
          productValue={productData}
          handleSubmitProduct={handleUpdateProduct}
          cmsId={params.cmsId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateCms;
