"use client";
import React from "react";
import BlockForm from "../../components/BlockForm";
import axios from "axios";

const AddBlocks = () => {
  const addBlockAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.description,
    };
    console.log("dataa", data);
    try {
      const response = await axios.post(
        `http://localhost:8005/api/blocks/add`,
        postData
      );
      console.log("add Product data", response);
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
