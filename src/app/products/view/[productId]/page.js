"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import instance from "@/app/axiosInterceptor";

export default function ProductDetail({ params }) {
  const [productDetail, setProductDetail] = useState([]);
  const [remainingTime, setRemainingTime] = useState(3 * 60 * 60); // 3 hours in seconds
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    instance
      .get(`products/view?product_id=${params.productId}`)
      .then((response) => {
        let data = response.result ? response.result : {};
        setProductDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  function convertRatingToStars(rating) {
    if (typeof rating === "number" && rating >= 1 && rating <= 5) {
      return "*".repeat(rating);
    } else {
      return "";
    }
  }
  const starString = convertRatingToStars(productDetail.rating);

  function updateTimerDisplay(remainingTime) {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    // const seconds = remainingTime % 60;
  }

  // Function to be executed when the timer expires
  function timerExpired() {
    setIsExpired(true);
  }

  useEffect(() => {
    if (remainingTime > 0) {
      const timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
        updateTimerDisplay(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(timerInterval); // Stop the timer
          timerExpired(); // Execute the action when the timer expires
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval); // Cleanup the interval when the component unmounts
      };
    }
  }, [remainingTime]);

  return (
    <main>
      <section className="py-4 py-md-5 container">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-6">
                <div
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  className="swiper productSliderTwo"
                >
                  <div className="swiper-wrapper">
                    {/* {productDetail?.images &&
                      productDetail?.images.map((row, index) => {
                        return ( */}
                    <div className="swiper-slide">
                      {productDetail.product_image ? (
                        <img
                          src={
                            "https://richkardz.com" +
                            productDetail.product_image
                          }
                          alt="image"
                        />
                      ) : (
                        <img
                          className="mw-100px mw-lg-100px"
                          src={"/admin/assets/media/logos/logo-1-dark.png"}
                          alt="image"
                        />
                      )}
                    </div>
                    {/* );
                      })} */}
                  </div>
                </div>
                <div
                  thumbsslider=""
                  className="swiper productSlider mt-3 mb-md-5 mb-4"
                >
                  <div className="swiper-wrapper">
                    {/* {productDetail?.images &&
                      productDetail?.images.map((row, index) => {
                        return ( */}
                    <div
                      class="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active"
                      role="group"
                      aria-label="1 / 3"
                      data-swiper-slide-index="0"
                      style={{ width: "93.75px", marginRight: "10px" }}
                    >
                      <div className="productSmalSlider">
                        <img
                          src={
                            "https://richkardz.com" +
                            productDetail.product_image
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    {/* );
                      })} */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="productDetails">
                  <h1>{productDetail?.product_name}</h1>
                  <p>{productDetail?.product_desc}</p>
                  <div className="mt-3">
                    <span className="ratingStar">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="ratingStar">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="ratingStar">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="ratingStar">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="ratingStar">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="text-gray">{`(${productDetail.rating})`}</span>
                    <span className="text-gray">
                      {productDetail.all_review_count} Reviews
                    </span>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <h1>₹{productDetail?.discount}</h1>
                    <h5 className="mx-3 text-dark">
                      MRP ₹ {productDetail?.price}
                    </h5>
                    <h5 className="text-orange Gilroy-Bold">( 20% OFF )</h5>
                  </div>
                  <div className="mt-3">
                    <h4 className="Gilroy-Bold">Card Designs</h4>
                    <div className="d-flex">
                      <div className="cardDesgin active">
                        <img
                          src={
                            "https://richkardz.com" +
                            productDetail.product_image
                          }
                          alt=""
                        />
                      </div>
                      {productDetail.related_products &&
                      Array.isArray(productDetail.related_products) ? (
                        productDetail.related_products.map((image, index) => (
                          <Link
                            href={`/products/${image.product_id}`}
                            key={index}
                          >
                            <div className="cardDesgin" key={index}>
                              <img
                                src={
                                  "https://richkardz.com" + image.product_image
                                }
                                alt=""
                              />
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <ul className="productpolicy list-unstyled my-4 py-2">
                    <li>
                      <img src="/front/img/Estimated.png" alt="" />{" "}
                      <b>Estimated Delivery :</b> within 5-7 days
                    </li>
                    <li>
                      <img src="/front/img/freeshipping.png" alt="" />{" "}
                      <b>Free shipping :</b> on all orders
                    </li>
                    <li>
                      <img src="/front/img/secureicon.png" alt="" />{" "}
                      <b>Secure Transaction</b>
                    </li>
                    <li>
                      <img src="/front/img/returnexchange.png" alt="" />{" "}
                      <b>Return & Exchange:</b> 10 days Return & Exchange
                    </li>
                  </ul>
                  <h4 className="Gilroy-Bold">About this item</h4>
                  <ul className="productAbout ps-3">
                    <li>
                      <b>Dimension :</b> 3.5 inches x 2 inches
                    </li>
                    <li>
                      Personalised with your{" "}
                      <b>Business name, logo or anything you want.</b>
                    </li>
                    <li>
                      Made up from <b>good quality material</b>
                    </li>
                    <li>
                      {" "}
                      <b>Durable and easy</b> to carry
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mt-4 mt-lg-0">
            <div className="orderSummary">
              {/* <div className="d-flex align-items-center mt-3">
                        <h2>₹499</h2>
                        <h6 className="mx-3">MRP ₹599</h6>
                        <h6 className="text-orange Gilroy-Bold">( 20% OFF )</h6>
                        </div> */}
              <ul className="list-unstyled">
                <li className="fontSize14">
                  FREE delivery <b className="Gilroy-Bold"> Tuesday, 30 May.</b>
                </li>
                <li className="fontSize14">
                  {isExpired ? (
                    <div>Timer has expired! 3 hours have passed.</div>
                  ) : (
                    <div>
                      <div>
                        Order within{" "}
                        <b className="Gilroy-Bold">
                          {Math.floor(remainingTime / 3600)} hours,{" "}
                          {Math.floor((remainingTime % 3600) / 60)} minutes
                          {/* {remainingTime % 60} seconds */}
                        </b>
                      </div>
                    </div>
                  )}

                  {/* Order within <b className="Gilroy-Bold"> 21 hrs 24 mins.</b> */}
                </li>
              </ul>
              <h5 className="text-orange Gilroy-Bold">In stock</h5>
              <h6>Hurry! only 4 left in stock</h6>
              <div className="mt-4 pt-3 border-top">
                <h3>Payment Options</h3>
                <div className="paymentLogo mt-3">
                  <a href="" className="me-2">
                    <img src="/front/img/googlepe.png" alt="" />
                  </a>
                  <a href="" className="me-2">
                    <img src="/front/img/paytm.png" alt="" />
                  </a>
                  <a href="" className="me-2">
                    <img src="/front/img/phonepe.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <Link
              href={`/card-detail/${params.productId}`}
              className="btn btnNavyBlue mt-4 w-100 cursor-pointer"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </section>
      <section className="container">
        <h4 className="Gilroy-Bold">Ratings & Reviews</h4>
        <hr />
        <div className="row mb-4">
          <div className="col-lg-6 order-lg-last">
            <div className="row">
              <div className=" col-4 col-md-3">
                <div className="shadow text-center p-2">
                  <h1 className="Gilroy-Bold">4.6</h1>
                  <div>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                  </div>
                  <h6 className="text-gray fontSize14 mt-2">(125 Review)</h6>
                </div>
              </div>
              <div className="col-lg-5 col-md-9 mt-3 mt-md-0">
                <div className="progressProduct col-lg-12">
                  <span className="me-2">5</span>
                  <a href="" className="ratingStar me-2">
                    <i className="fa fa-star"></i>
                  </a>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span className="ms-2">1</span>
                </div>
                <div className="progressProduct col-lg-12">
                  <span className="me-2">4</span>
                  <a href="" className="ratingStar me-2">
                    <i className="fa fa-star"></i>
                  </a>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">0</span>
                </div>
                <div className="progressProduct col-lg-12">
                  <span className="me-2">3</span>
                  <a href="" className="ratingStar me-2">
                    <i className="fa fa-star"></i>
                  </a>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">0</span>
                </div>
                <div className="progressProduct col-lg-12">
                  <span className="me-2">2</span>
                  <a href="" className="ratingStar me-2">
                    <i className="fa fa-star"></i>
                  </a>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">0</span>
                </div>
                <div className="progressProduct col-lg-12">
                  <span className="me-2">1</span>
                  <a href="" className="ratingStar me-2">
                    <i className="fa fa-star"></i>
                  </a>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-3">
            <h5 className="Gilroy-Bold">Review this product</h5>
            <h6 className="mt-2">Share your thoughts with other customers</h6>
            <button
              className="btn btnNavyBlue mt-3"
              data-bs-toggle="collapse"
              href="#writeYourReview"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Write your review
            </button>
          </div>
        </div>
        <div className="collapse" id="writeYourReview">
          <div className="card card-body">
            <h5>
              <b>Rate this product</b>
            </h5>
            <div>
              <a href="" className="ratingStar">
                <i className="fa fa-star"></i>
              </a>
              <a href="" className="ratingStar">
                <i className="fa fa-star"></i>
              </a>
              <a href="" className="ratingStar">
                <i className="fa fa-star"></i>
              </a>
              <a href="" className="ratingStar">
                <i className="fa fa-star"></i>
              </a>
              <a href="" className="ratingStar">
                <i className="fa fa-star"></i>
              </a>
            </div>
            <h5 className="mt-4">
              <b>Reviews this product</b>
            </h5>
            <div className="">
              <textarea
                className="form-control mt-2"
                placeholder="Leave a comment here"
                rows="3"
              ></textarea>
            </div>
            <div className="mt-3">
              <button className="btn btnOrange">SUBMIT</button>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h4 className="Gilroy-Bold">Review With Images</h4>
          <div className="col-lg-10 px-0">
            <div className="row mx-0">
              <div className="col-md-2 col-4 px-2 mt-2">
                <img
                  className="ReviewWithImage"
                  src="https://www.logodesign.net/images/business-card-mockup.png"
                  alt=""
                />
              </div>
              <div className="col-md-2 col-4 px-2 mt-2">
                <img
                  className="ReviewWithImage"
                  src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                  alt=""
                />
              </div>
              <div className="col-md-2 col-4 px-2 mt-2">
                <img
                  className="ReviewWithImage"
                  src="https://uploads-ssl.webflow.com/5e66ca0250be6103da645a88/62d99f67bc492818c05a77e5_A%20Guide%20to%20Digital%20Business%20Cards%20Main.webp"
                  alt=""
                />
              </div>
              <div className="col-md-2 col-4 px-2 mt-2">
                <img
                  className="ReviewWithImage"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV71gTDuakMCcBv26HF-xLLgn3nSOUNHlu-g&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="col-md-2 col-4 px-2 mt-2">
                <img
                  className="ReviewWithImage"
                  src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_70,w_auto:50:550/India%20LOB/Website%20Category%20Images/Visiting%20Cards/Rounded-Corner-visiting-cards_Category-image_1x1"
                  alt=""
                />
              </div>
              <div className="col-md-2 col-4 px-2 mt-2">
                <div className="position-relative">
                  <div className="ReviewImageView">+10</div>
                  <img
                    className="ReviewWithImage"
                    src="https://yesassistant.com/wp-content/uploads/2022/04/Business-Card-Designs.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h5 className="Gilroy-Bold mb-2">25 Review</h5>
            <div className="d-flex ReviewSection">
              <img
                className="reviewSProfile"
                src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
                alt=""
              />
              <div className="ms-3">
                <h3>Rhea Kapoor</h3>
                <div>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                </div>
                <p>
                  Such a cool and sexy card, looks premium and gives that
                  elegent touch and feel
                </p>
                <div className="row ">
                  <div className="col-4 col-lg-3 pe-2 mt-2">
                    <div className="ReviewCardIMG">
                      <img
                        className="cardReview"
                        src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                      />
                    </div>
                  </div>
                  <div className="col-4 col-lg-3 pe-2 mt-2">
                    <div className="ReviewCardIMG">
                      <img
                        className="cardReview"
                        src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                      />
                    </div>
                  </div>
                  <div className="col-4 col-lg-3 pe-2 mt-2">
                    <div className="ReviewCardIMG">
                      <img
                        className="cardReview"
                        src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                      />
                      <button
                        className="videoPlay_Icon"
                        data-bs-toggle="modal"
                        data-bs-target="#productGallary"
                      >
                        <img
                          className="video_Icon"
                          src="/front/img/videoPlay.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex ReviewSection">
              <img
                className="reviewSProfile"
                src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
                alt=""
              />
              <div className="ms-3">
                <h3>Rhea Kapoor</h3>
                <div>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                </div>
                <p>
                  If you&apos;re looking for a way to upgrade your networking
                  game, I highly recommend Rich Kardz. Their NFC cards are{" "}
                  <br />
                  the perfect combination of style and functionality l
                </p>
              </div>
            </div>
            <div className="d-flex ReviewSection">
              <img
                className="reviewSProfile"
                src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
                alt=""
              />
              <div className="ms-3">
                <h3>Rhea Kapoor</h3>
                <div>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                </div>
                <p>
                  Such a cool and sexy card, looks premium and gives that
                  elegent touch and feel
                </p>
                <div className="row ">
                  <div className="col-4 col-lg-3 pe-2 mt-2">
                    <div className="ReviewCardIMG">
                      <img
                        className="cardReview"
                        src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                      />
                    </div>
                  </div>
                  <div className="col-4 col-lg-3 pe-2 mt-2">
                    <div className="ReviewCardIMG">
                      <img
                        className="cardReview"
                        src="https://5.imimg.com/data5/SELLER/Default/2021/10/HH/MA/HA/138371483/visit-card-design-service-500x500.jpeg"
                      />
                      <button
                        className="videoPlay_Icon"
                        data-bs-toggle="modal"
                        data-bs-target="#productGallary"
                      >
                        <img
                          className="video_Icon"
                          src="/front/img/videoPlay.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex ReviewSection">
              <img
                className="reviewSProfile"
                src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
                alt=""
              />
              <div className="ms-3">
                <h3>Rhea Kapoor</h3>
                <div>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                  <a href="" className="ratingStar">
                    <i className="fa fa-star"></i>
                  </a>
                </div>
                <p>
                  If you&apos;re looking for a way to upgrade your networking
                  game, I highly recommend Rich Kardz. Their NFC cards are{" "}
                  <br />
                  the perfect combination of style and functionality
                </p>
              </div>
            </div>
          </div>
          <nav aria-label="...">
            <ul className="pagination customPagination">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Page 1 of 3
                </a>
              </li>
              <li className="page-item paginationNumber">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li
                className="page-item paginationNumber active"
                aria-current="page"
              >
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item paginationNumber">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div
        className="modal fade productSliderGallary"
        id="productGallary"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="productGallaryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="">
              <button
                type="button"
                className="btn-close Modal_btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-close"></i>
              </button>
            </div>
            <div className="modal-body">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner productGallarySlider">
                  <div className="carousel-item active">
                    <img
                      src="/front/img/BusinessCards1.png"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/front/img/BusinessCards2.png"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/front/img/BannerBG.png"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="mt-3 d-flex align-items-center modalProfile">
                <img
                  className=""
                  src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
                  alt=""
                />
                <div className="ms-3">
                  <h3>Rhea Kapoor</h3>
                  <div>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                    <a href="" className="ratingStar">
                      <i className="fa fa-star"></i>
                    </a>
                  </div>
                  <p>
                    Such a cool and sexy card, looks premium and gives that
                    elegent touch and feel
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
