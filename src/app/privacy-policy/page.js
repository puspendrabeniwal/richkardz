"use client";
import React, { useEffect, useState } from "react";
import instance from "../axiosInterceptor";

export default function PrivacyPolicy({ params }) {
  const [cmsData, setCmsData] = useState({});

  useEffect(() => {
    getCMS();
  }, []);

  const getCMS = () => {
    let formData = new FormData();
    formData.append("type", "p_p");
    instance
      .post("cms/index", formData)
      .then((response) => {
        setCmsData(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <section className="privacyPolicySection py-md-5 pt-3 pb-3">
        <div className="container pt-5">
          <h1 className="text-center">{cmsData?.title}</h1>
        </div>
      </section>
      <section className="privacyPolicy pb-5">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: cmsData?.content }} />
        </div>
      </section>
    </main>
  );
}
