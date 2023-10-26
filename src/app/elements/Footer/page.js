"use client";
import Link from "next/link";
import { useEffect } from "react";
const Footer = () => {
  useEffect(() => {
    var loadScript = function (src) {
      var tag = document.createElement("script");
      tag.async = false;
      tag.defer = false;
      tag.src = src;
      document.head.appendChild(tag);
    };
    loadScript("/front/js/jquery.min.js");
    loadScript("/front/js/bootstrap.min.js");
    loadScript("/front/js/particles.min.js");
    loadScript("/front/js/swiper-bundle.min.js");
    loadScript("/front/js/custom.js");
    loadScript("/front/js/mobile-nav.js");
    loadScript("/front/js/wow.js");
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footerSection defaultPaddingTB">
          <div className="col-xl-5 col-lg-6">
            <a className="p-0 d-inline-block" href="index.html">
              <img
                className="logo-top mb-3"
                src="/front/img/Richkardz-logo.png"
                alt=""
              />
            </a>
            <p className="mb-3">
              Rich Kardz NFC card is an essential tool for professionals to
              connect with potential clients and stay organized and
              productive.All rights reserved.
            </p>
            <p>J2D FASHIONS PRIVATE LIMITED</p>
            <div className="row mt-5">
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <h5>CALL OUR OFFICE</h5>
                <p>+91 9070 108 108</p>
              </div>
              <div className="col-lg-6 col-md-6">
                <h5>SEND A MESSEGE</h5>
                <p>grouplO8@contact.com</p>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 ms-auto mt-4 mt-md-0">
            {/* <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
                          <div className="position-relative mt-2 footerInput">
                              <input className="form-control" type="text" placeholder="Email address">
                              <a href="" className="subscribe">Subscribe <i className="fa fa-long-arrow-right"></i></a>
                          </div> */}
            <div className="row pt-3">
              <div className="col-lg-6 col-6 mt-4">
                <h5>COMPANY</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/products">Products</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-6 mt-4">
                <h5>FOLLOW US</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://www.linkedin.com/company/rich-kardz/" target="_blank">Linkedin</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/richkardz_/" target="_blank">Instagram</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row py-3 border-top footerBottom">
          <div className="col-xl-4 col-lg-3">
            <p className="text-center text-lg-start">
              Copyright ©2023 Rich Kardz
            </p>
          </div>
          <div className="col-xl-8 col-lg-9">
            <ul className="text-lg-end text-center mt-3 mt-md-0">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy">Retum & Refund Policy</Link>
              </li>
              <li>
                <Link href="/shipping-delivery-policy">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
