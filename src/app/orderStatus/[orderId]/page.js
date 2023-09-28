"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";
import instance from "@/app/admin/axiosInterceptor";
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
    
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" />

        <title>Thank you</title>

        <link
          rel="shortcut icon"
          href="/admin/assets/media/logos/favicon.png"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="/front/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/common.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/front/css/animate.css" rel="stylesheet" type="text/css" />
        <link
          href="/front/css/swiper-bundle.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="bodyMain">
        {(paymentStatus === "Credit") ? <>
        <Toast ref={toast} />
        <Header />
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
        <Footer />
        </>:""}
      </body>
    </html>
  );
}
