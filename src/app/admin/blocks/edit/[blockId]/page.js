"use client";
import React, { useEffect, useState } from "react";
import BlockForm from "@/app/admin/components/BlockForm";
import axios from "axios";

const UpdateBlock = ({ params }) => {
  const [blockData, setBlockData] = useState(null);
  console.log("blockData", blockData);
  useEffect(() => {
    getBlockAPI();
  }, []);

  const getBlockAPI = async () => {
    const response = await axios.get(`http://localhost:8005/api/blocks`);
    console.log("responseeeee block api", response);
    setBlockData(response);
  };

  const editBlockAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.description,
    };
    console.log("dataa", data);
    try {
      const response = await axios.post(
        `http://localhost:8005/api/blocks/edit/${params.blockId}`,
        postData
      );
      console.log("add Product data", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {blockData ? (
        <BlockForm
          productValue={blockData}
          handleSubmitProduct={editBlockAPI}
          blockId={params.blockId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateBlock;
