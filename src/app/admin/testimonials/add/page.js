"use client";
import React from "react";
import MonialsForm from "../../components/MonialsForm";
import axios from "axios";

const AddMonials = () => {
  const addMonialAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.blockDescription,
    };
    console.log("dataa", data);
    try {
      const response = await axios.post(
        `http://localhost:8005/api/testimonials/add`,
        postData
      );
      console.log("add Monial data", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MonialsForm
        monialValue={null}
        handleSubmitProduct={addMonialAPI}
        MonialId={null}
      />
    </>
  );
};

export default AddMonials;
