"use client";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import instance from "@/app/admin/axiosInterceptor";
import Header from "@/app/components0/Header0/page";
import Footer from "@/app/components0/Footer0/page";
export default function Product() {
    const [products , setProducts] = useState([]);
    const [cardType , setCardType] = useState("All");
    const [imageUrl , setImageUrl] = useState("");
    useEffect(() => {
        getList();
    }, [cardType]);

    const getList = ()=>{
        instance
      .post("products", {skip : 0, card_type : cardType})
      .then((response) => {
        let data = response.result ? response.result : {};
        setImageUrl(response.image_url ? response.image_url : "")
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  return (
    
    <html lang="en">
      <head>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="keywords" />

        <title>Products</title>

        <link rel="shortcut icon" href="/admin/assets/media/logos/favicon.png" />

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="/front/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/common.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/responsive.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/animate.css" rel="stylesheet" type="text/css" />
        <link href="/front/css/swiper-bundle.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body className="bodyMain">

        <Header />
        <section className="py-4 py-md-15 container">
         <ul className="nav nav-tabs productTabs border-0" id="myTab" role="tablist">
            <li  className="nav-item" role="presentation">
               <button onClick={(()=>setCardType("All"))} className="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button"
                  role="tab" aria-controls="all" aria-selected="true">All</button>
            </li>
            <li  className="nav-item" role="presentation">
               <button onClick={(()=>setCardType("PVC Glossy"))} className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                  role="tab" aria-controls="home" aria-selected="true">PVC Cards</button>
            </li>
            <li className="nav-item" role="presentation">
               <button onClick={(()=>setCardType("Metal Cards"))}  className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                  role="tab" aria-controls="profile" aria-selected="false">Metal Cards</button>
            </li>
         </ul>

         <div className="tab-content mt-4" id="myTabContent">
         <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab"
               data-aos="fade-up" data-aos-delay="100">
               <div className="row">
               { 
                        products.map((row, index)=>{
                            let image = (row.images && row.images.length >0) ? row.images[0]["name"] : "";
                            let imagePath = (imageUrl && image) ? imageUrl+image : "/front/img/card.png" 
                            return  <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                            <Link href={`/products/${row?._id}`}><div className="productMainCard">
                               <div className="productMainImage text-center">
                                  <img className="img-fluid" src={imagePath} alt="" />
                               </div>
                               <div className="productTitle">
                                  <h3>{row?.product_name}1</h3>
                               </div>
                               <div className="mt-2">
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStarText">(4.6)</span>
                               </div>
                               <div className="productPrice">
                                  <h2>₹ {row?.discount}</h2>
                                  <del>₹ {row?.price}</del>
                                  <h5 className="">( 20% OFF )</h5>
                               </div>
                            </div>
                            </Link>
                         </div>
                        
                        })
                    }
               </div>
            </div>
            <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab"
               data-aos="fade-up" data-aos-delay="100">
               <div className="row">
               { 
                        products.map((row, index)=>{
                            let image = (row.images && row.images.length >0) ? row.images[0]["name"] : "";
                            let imagePath = (imageUrl && image) ? imageUrl+image : "/front/img/card.png" 
                            return   <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                                <Link href={`/products/${row?._id}`}>
                            <div className="productMainCard">
                               <div className="productMainImage text-center">
                                  <img className="img-fluid" src={imagePath} alt="" />
                               </div>
                               <div className="productTitle">
                                  <h3>{row?.product_name}2</h3>
                               </div>
                               <div className="mt-2">
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStarText">(4.6)</span>
                               </div>
                               <div className="productPrice">
                                  <h2>₹ {row?.discount}</h2>
                                  <del>₹ {row?.price}</del>
                                  <h5 className="">( 20% OFF )</h5>
                               </div>
                            </div>
                            </Link>
                         </div>
                         
                        })
                    }
               </div>
            </div>

            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" data-aos="fade-up"
               data-aos-delay="100">
               <div className="row">
                    { 
                        products.map((row, index)=>{
                            let image = (row.images && row.images.length >0) ? row.images[0]["name"] : "";
                            let imagePath = (imageUrl && image) ? imageUrl+image : "/front/img/card.png" 
                            return   <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                                <Link href={`/products/${row?._id}`}>
                            <div className="productMainCard">
                               <div className="productMainImage text-center">
                                  <img className="img-fluid" src={imagePath} alt="" />
                               </div>
                               <div className="productTitle">
                                  <h3>{row?.product_name}3</h3>
                               </div>
                               <div className="mt-2">
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStar"><i className="fa fa-star"></i></span>
                                  <span className="ratingStarText">(4.6)</span>
                               </div>
                               <div className="productPrice">
                                  <h2>₹ {row?.discount}</h2>
                                  <del>₹ {row?.price}</del>
                                  <h5 className="">( 20% OFF )</h5>
                               </div>
                            </div>
                            </Link>
                         </div>
                        })
                    }
               </div>
            </div>
         </div>
      </section>
      <section className=" container pb-md-5 pb-3">
         <div className="row align-items-center">
            <div className="col-lg-3">
               <ul className="nav d-lg-block nav-tabs productVarticalTabs border-0" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                     <button className="nav-link active" id="pvccardTab-tab" data-bs-toggle="tab"
                        data-bs-target="#pvccardTab" type="button" role="tab" aria-controls="home"
                        aria-selected="true">PVC Cards</button>
                  </li>
                  <li className="nav-item" role="presentation">
                     <button className="nav-link" id="metalCards2-tab" data-bs-toggle="tab" data-bs-target="#metalCards2"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Metal
                     Cards</button>
                  </li>
               </ul>
            </div>
            <div className="col-lg-9 ps-lg-0">
               <div className="tab-content matalNfcCard shadow mt-4" id="myTab_ContentVartical">
                  <div className="tab-pane fade show active" id="pvccardTab" role="tabpanel"
                     aria-labelledby="pvccardTab-tab" data-aos="fade-up" data-aos-delay="100">
                     <div className="row align-items-center">
                        <div className="col-lg-5">
                           <div className="row">
                              <div className="col-lg-12 col-md-6">
                                 <img src="/front/img/pvccard1.png" alt="" />
                              </div>
                              <div className="col-lg-12  col-md-6 mt-3 mt-md-0 mt-lg-3">
                                 <img className="" src="/front/img/pvccard2.png" alt="" />
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-7 mt-4 mt-lg-0">
                           <h2>PVC</h2>
                           <h1> NFC Cards</h1>
                           <p>Make a lasting impression with the customized wooden NFC-based card featuring your
                              logo from RICHKARDZ. Whether you&apos;re pitching, selling, or networking, this digital
                              card will set you apart and make a memorable first impression. The utilization of
                              Wooden NFC Cards by RICHKARDZ is revolutionizing the manner in which people exchange
                              digital information with others they encounter in the physical world. Get your
                              unique Wooden NFC Card today from RICHKARDZ.
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane fade" id="metalCards2" role="tabpanel" aria-labelledby="metalCards2-tab"
                     data-aos="fade-up" data-aos-delay="100">
                     <div className="row align-items-center">
                        <div className="col-lg-5">
                           <div className="row">
                              <div className="col-lg-12 col-md-6">
                                 <img src="/front/img/pvccard1.png" alt="" />
                              </div>
                              <div className="col-lg-12  col-md-6 mt-3 mt-md-0 mt-lg-3">
                                 <img className="" src="/front/img/pvccard2.png" alt="" />
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-7 mt-4 mt-lg-0">
                           <h2>Metal</h2>
                           <h1> NFC Cards 222</h1>
                           <p>Make a lasting impression with the customized wooden NFC-based card featuring your
                              logo from RICHKARDZ. Whether you&apos;re pitching, selling, or networking, this digital
                              card will set you apart and make a memorable first impression. The utilization of
                              Wooden NFC Cards by RICHKARDZ is revolutionizing the manner in which people exchange
                              digital information with others they encounter in the physical world. Get your
                              unique Wooden NFC Card today from RICHKARDZ.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
        <Footer />
        
        <Script type="text/javascript" src="/front/js/jquery.min.js"></Script>
        <Script type="text/javascript" src="/front/js/bootstrap.min.js"></Script>
        <Script type="text/javascript" src="/front/js/particles.min.js"></Script>
        <Script type="text/javascript" src="/front/js/swiper-bundle.min.js"></Script>
        <Script type="text/javascript" src="/front/js/custom.js"></Script>
        <Script type="text/javascript" src="/front/js/mobile-nav.js"></Script>
        <Script type="text/javascript" src="/front/js/wow.js"></Script>
      </body>
    </html>
  )
}
