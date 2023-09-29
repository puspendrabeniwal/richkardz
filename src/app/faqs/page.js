"use client";
import React from "react";
import Header from "../elements/Header/page";
import Footer from "../elements/Footer/page";

export default function FAQs() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" />

        <title>FAQs</title>

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
        <section className="faqMainSection py-md-5 pt-5 pb-3">
          <div className="container">
            <h1 className="text-center">Frequeltly Asked Questions</h1>
            <p className="text-center">
              RICH KARDZ is an NFC-based digital card. With <br /> just a tap,
              you can share your contact <br />
              information using this.
            </p>
          </div>
        </section>
        <section className="faqTabSection pb-5">
          <div className="container">
            <div className="col-lg-10 mx-auto mt-md-4 faqSection">
              <div className="accordion shadow" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span className="frequltyNumber">1.</span>System
                      requirements
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <p className="mb-3">
                            Frustrated by missed opportunities and lost
                            connections? Your business deserves better.
                          </p>
                          <p className="mb-3">
                            With NFC Business Cards, effortlessly share your
                            digital information, portfolio, and more, all with a
                            simple tap.
                          </p>
                          <p className="mb-3">
                            Stand out from the competition, make a memorable
                            impact, and leave a lasting impression in the minds
                            of your contacts.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <div className="userAreProMain">
                            <img
                              className="w-100"
                              src="/front/img/askedQustion.png"
                              alt=""
                            />
                            <button
                              className="videoPlayIcon"
                              data-bs-toggle="modal"
                              data-bs-target="#videoPlayModal"
                            >
                              <img
                                className=""
                                src="/front/img/videoPlay.png"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="frequltyNumber">2.</span> Where can |
                      learn more about how to get started?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <p className="mb-3">
                            Frustrated by missed opportunities and lost
                            connections? Your business deserves better.
                          </p>
                          <p className="mb-3">
                            With NFC Business Cards, effortlessly share your
                            digital information, portfolio, and more, all with a
                            simple tap.
                          </p>
                          <p className="mb-3">
                            Stand out from the competition, make a memorable
                            impact, and leave a lasting impression in the minds
                            of your contacts.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <div className="userAreProMain">
                            <img
                              className="w-100"
                              src="/front/img/popupImgOpen.png"
                              alt=""
                            />
                            <button
                              className="videoPlayIcon"
                              data-bs-toggle="modal"
                              data-bs-target="#videoPlayModal"
                            >
                              <img
                                className=""
                                src="/front/img/videoPlay.png"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span className="frequltyNumber">3.</span> Is Acme
                        available for Linux?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <p className="mb-3">
                              Frustrated by missed opportunities and lost
                              connections? Your business deserves better.
                            </p>
                            <p className="mb-3">
                              With NFC Business Cards, effortlessly share your
                              digital information, portfolio, and more, all with
                              a simple tap.
                            </p>
                            <p className="mb-3">
                              Stand out from the competition, make a memorable
                              impact, and leave a lasting impression in the
                              minds of your contacts.
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <div className="userAreProMain">
                              <img
                                className="w-100"
                                src="/front/img/popupImgOpen.png"
                                alt=""
                              />
                              <button
                                className="videoPlayIcon"
                                data-bs-toggle="modal"
                                data-bs-target="#videoPlayModal"
                              >
                                <img
                                  className=""
                                  src="/front/img/videoPlay.png"
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <Footer />
      </body>
    </html>
  );
}
