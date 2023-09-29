"use client";
import React from "react";
import Header from "../elements/Header/page";
import Footer from "../elements/Footer/page";

export default function ReturnAndRefundPolicy() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" />

        <title></title>

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
        <Header />
        <section className="privacyPolicySection py-md-5 pt-3 pb-3">
          <div className="container pt-5">
            <h1 className="text-center">Return And Refund Policy</h1>
          </div>
        </section>
        <section className="privacyPolicy pb-5">
          <div className="container">
            <p>
              If your item arrives damaged, defective, or different from what
              you ordered, you can request a free replacement within 3 days of
              delivery. Please keep the item in its original condition with the
              manufacturer&apos;s packaging. We may contact you to understand
              the issue before issuing a replacement.
            </p>
            <p>
              <strong>Important Note:</strong>
            </p>
            <p>
              Customized orders: We print cards according to the information
              provided during the order. Therefore, we cannot accept
              replacement, refund, or cancellation requests for spelling
              mistakes or if you simply change your mind.
            </p>
            <p>
              To raise a replacement request
              <a href="../../site/return-replacement-request">CLICK HERE</a>.
            </p>
            <h2>Refund/Cancellation Policy</h2>
            <p>
              No refund will be issued if the refund and/or cancellation request
              is raised after 3 Hours of order placement. To raise your
              cancellation/refund request
              <a href="../../site/refund-request">CLICK HERE</a>.
              <br />
              Please be aware that refunds will not be provided if your phone
              lacks NFC capability.
              <br />
            </p>
            <h2>Warranty Policy</h2>
            <p>
              Your card is covered by a two-year warranty starting from the date
              of order delivery. This warranty applies only under the following
              condition:
            </p>
            <p style={{ marginLeft: "20px" }}>
              (a) Tapping Issue : If the card does not tap on your NFC-enabled
              smartphone.
            </p>
            <p>
              Important Note : To use the tap feature, your smartphone must have
              NFC capability.
            </p>
            <p>
              To raise a replacement request
              <a href="../../site/warranty-claim">CLICK HERE</a>.
            </p>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
