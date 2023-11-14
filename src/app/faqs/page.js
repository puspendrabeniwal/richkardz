"use client";
import React, { useEffect, useState } from "react";
import instance from "../axiosInterceptor";

export default function FAQs() {
  const [cmsData, setCmsData] = useState({});

  useEffect(() => {
    getCMS();
  }, []);

  const getCMS = () => {
    let formData = new FormData();
    formData.append("type", "faqs");
    instance
      .post("cms/index", formData)
      .then((response) => {
        console.log("response", response);
        setCmsData(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <section className="faqMainSection py-md-5 pt-5 pb-3">
        <div className="container">
          <h1 className="text-center">{cmsData?.title}</h1>
        </div>
      </section>
      <section className="faqTabSection pb-5">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: cmsData?.content }} />
        </div>
      </section>
      <section className="makeAStrong">
        <div className="container">
          <div className="col-lg-10 text-center mx-auto">
            <h1>make a strong impression that people won’t forget.</h1>
            <button className="makeAStrongBtn btn">Buy Now</button>
          </div>
        </div>
      </section>
    </main>
  );
}
