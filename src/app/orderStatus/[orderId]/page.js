"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import instance from "@/app/axiosInterceptor";
import { Toast } from "primereact/toast";
import { useSearchParams } from "next/navigation";

export default function OrderStatus({ params }) {

  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment_status')
  const toast = useRef(null);

  const [orderDetail, setOrderDetail] = useState({});
  useEffect(() => {
    getOrderDetail();
    if(paymentStatus != "Credit") window.location.replace("/products");
  }, []);

    /** Get order detail */
    const getOrderDetail = async () => {
      await instance
        .get(`/order/${params.orderId}`)
        .then(
          (res) => {
            let orderDeta = (res.result) ? res.result : {};
            setOrderDetail(orderDeta);
          },
          (err) => {
            console.log(err);
          }
        );
    };
  
  
  return (
    
      <main>
        {(paymentStatus === "Credit") ? <>
        <Toast ref={toast} />
        <div className="row thankYouSection mx-0 align-items-center">
         <div className="col-lg-6 px-0">
            <img src="/front/img/thankYou.png" alt="" />
         </div>
         <div className="col-lg-5 col-sm-10 mx-auto col-xxl-4 me-xxl-auto ms-xxl-0 px-lg-5  text-center py-4 py-lg-0">
            <img className="thankyouRight" src="/front/img/thankyouRight.png" alt="" />
            <h1 className="my-3">THANK YOU</h1>
            <h3>for your order</h3>
            <h2><b>₹ {orderDetail?.amount}</b></h2>
            <p>RICH KARDZ is an NFC-based digital card. With just a tap, you can share your contact information using
               this.
            </p>
            <Link href="/products" className="btn btnNavyBlue mt-3 px-5">Coutinue</Link>
         </div>
      </div>
        </>:""}
        </main>
  );
}
