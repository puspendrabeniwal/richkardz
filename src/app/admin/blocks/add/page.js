"use client";
import React from "react";
import BlockForm from "../../components/BlockForm";
import instance from "../../axiosInterceptor";

const AddBlocks = () => {
  const addBlockAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.description,
    };
    try {
      const response = await instance.post(`blocks/add`, postData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BlockForm
      productValue={null}
      handleSubmitProduct={addBlockAPI}
      blockId={null}
    />
  );
};

export default AddBlocks;
