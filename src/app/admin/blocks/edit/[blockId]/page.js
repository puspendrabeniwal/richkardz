"use client";
import React, { useEffect, useState } from "react";
import BlockForm from "@/app/admin/components/BlockForm";
import instance from "@/app/admin/axiosInterceptor";

const UpdateBlock = ({ params }) => {
  const [blockData, setBlockData] = useState(null);
  const getBlockData = async () => {
    const postData = {
      userId: "dghgdhg",
    };
    try {
      const response = await instance.post(
        `blocks/view/${params.blockId}`,
        postData
      );
      const getData = response.result;
      console.log("Edit Data of Block", getData);
      setBlockData(getData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlockData();
  }, []);

  const editBlockAPI = async (data) => {
    const postData = {
      name: data.blockName,
      title: data.title,
      body: data.description,
    };
    try {
      const response = await instance.post(
        `blocks/edit/${params.blockId}`,
        postData
      );
      // console.log("Edit Data of Block", response);
      setBlockData(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {blockData ? (
        <BlockForm
          blockValue={blockData}
          handleSubmitBlock={editBlockAPI}
          blockId={params.blockId}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateBlock;
