"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";

import instance from "@/app/axiosInterceptor";
import { API_IMG_URL } from "@/app/global_constant";

export default function Product() {
  const searchParams = useSearchParams();
  const typeOfCard = searchParams.get("type");

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cardType, setCardType] = useState(typeOfCard ? typeOfCard : "All");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getList();
    setLoading(false);
  }, [cardType]);

  const getList = () => {
    setProducts([])
    let formdata = new FormData();
    formdata.append("skip", 0);
    formdata.append("type", cardType);
    formdata.append("status", 1);
    instance
      .post("products", formdata)
      .then((response) => {
        let data =
          response && response.result ? response.result : [];
        setImageUrl(API_IMG_URL);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  return (
    <main>
      <section className="py-4 py-md-15 container">
        <ul
          className="nav nav-tabs productTabs border-0"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setCardType("All")}
              className={`nav-link ${cardType === "All" ? "active" : ""}`}
              id="all-tab"
              data-bs-toggle="tab"
              data-bs-target="#all"
              type="button"
              role="tab"
              aria-controls="all"
              aria-selected="true"
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setCardType("PVC Glossy")}
              className={`nav-link ${
                cardType === "PVC Glossy" ? "active" : ""
              }`}
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              PVC Cards
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setCardType("Metal Cards")}
              className={`nav-link ${
                cardType === "Metal Cards" ? "active" : ""
              }`}
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Metal Cards
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setCardType("Combo")}
              className={`nav-link ${cardType === "Combo" ? "active" : ""}`}
              id="combo-tab"
              data-bs-toggle="tab"
              data-bs-target="#combo"
              type="button"
              role="tab"
              aria-controls="combo"
              aria-selected="false"
            >
              COMBO
            </button>
          </li>
        </ul>
        {loading ? 
            
            <div className="row">
            <div className="col-lg-4 col-md-6 col-xl-3">
              <div className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
                <Skeleton className="mb-2" width="75%"></Skeleton>
                <Skeleton width="50%" className="mb-2"></Skeleton>
                <Skeleton width="90%" className="mb-2"></Skeleton>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3">
              <div className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
                <Skeleton className="mb-2" width="75%"></Skeleton>
                <Skeleton width="50%" className="mb-2"></Skeleton>
                <Skeleton width="90%" className="mb-2"></Skeleton>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3">
              <div className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
                <Skeleton className="mb-2" width="75%"></Skeleton>
                <Skeleton width="50%" className="mb-2"></Skeleton>
                <Skeleton width="90%" className="mb-2"></Skeleton>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3">
              <div className="border-round border-1 surface-border p-4 surface-card">
                <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
                <Skeleton className="mb-2" width="75%"></Skeleton>
                <Skeleton width="50%" className="mb-2"></Skeleton>
                <Skeleton width="90%" className="mb-2"></Skeleton>
              </div>
            </div>
          </div> :
        <div className="tab-content mt-4" id="myTabContent">
          <div
           className="tab-pane fade show active"
           id="all"
           role="tabpanel"
           aria-labelledby="all-tab"
           data-aos="fade-up"
           data-aos-delay="100"
         >
           <div className="row">
             {products.map((row, index) => {
               let image = row.product_image;
               let imagePath =
                 imageUrl && image ? imageUrl + image : "/front/img/card.png";
               return (
                 <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                   <Link href={`/products/view/${row?.product_id}`}>
                     <div className="productMainCard">
                       <div className="productMainImage text-center">
                         <img className="img-fluid" src={imagePath} alt="" />
                       </div>
                       <div className="productTitle">
                         <h3>{row?.product_name}</h3>
                       </div>
                       <div className="mt-2">
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
                         <span className="ratingStarText">{`(${row.rating})`}</span>
                       </div>
                       <div className="productPrice">
                         <h2>₹ {row?.discount}</h2>
                         <del>₹ {row?.price}</del>
                         <h5 className="">( 20% OFF )</h5>
                       </div>
                     </div>
                   </Link>
                 </div>
               );
             })}
           </div>
         </div>

         <div
           className="tab-pane fade"
           id="home"
           role="tabpanel"
           aria-labelledby="home-tab"
           data-aos="fade-up"
           data-aos-delay="100"
         >
           <div className="row">
             {products.map((row, index) => {
               let image = row.product_image ? row.product_image : "";
               let imagePath =
                 imageUrl && image ? imageUrl + image : "/front/img/card.png";
               return (
                 <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                   <Link href={`/products/view/${row?.product_id}`}>
                     <div className="productMainCard">
                       <div className="productMainImage text-center">
                         <img className="img-fluid" src={imagePath} alt="" />
                       </div>
                       <div className="productTitle">
                         <h3>{row?.product_name}</h3>
                       </div>
                       <div className="mt-2">
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
                         <span className="ratingStarText">{`(${row.rating})`}</span>
                       </div>
                       <div className="productPrice">
                         <h2>₹ {row?.discount}</h2>
                         <del>₹ {row?.price}</del>
                         <h5 className="">( 20% OFF )</h5>
                       </div>
                     </div>
                   </Link>
                 </div>
               );
             })}
           </div>
         </div>

         <div
           className="tab-pane fade"
           id="profile"
           role="tabpanel"
           aria-labelledby="profile-tab"
           data-aos="fade-up"
           data-aos-delay="100"
         >
           <div className="row">
             {(products.length > 0) ? products.map((row, index) => {
               let image = row.product_image ? row.product_image : "";
               let imagePath =
                 imageUrl && image ? imageUrl + image : "/front/img/card.png";
               return (
                 <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                   <Link href={`/products/view/${row?.product_id}`}>
                     <div className="productMainCard">
                       <div className="productMainImage text-center">
                         <img className="img-fluid" src={imagePath} alt="" />
                       </div>
                       <div className="productTitle">
                         <h3>{row?.product_name}</h3>
                       </div>
                       <div className="mt-2">
                         <span className="">
                           <i className="fa fa-star"></i>
                         </span>
                         <span className="">
                           <i className="fa fa-star"></i>
                         </span>
                         <span className="">
                           <i className="fa fa-star"></i>
                         </span>
                         <span className="">
                           <i className="fa fa-star"></i>
                         </span>
                         <span className="">
                           <i className="fa fa-star"></i>
                         </span>
                         <span className="ratingStarText">{`(${row.rating})`}</span>
                       </div>
                       <div className="productPrice">
                         <h2>₹ {row?.discount}</h2>
                         <del>₹ {row?.price}</del>
                         <h5 className="">( 20% OFF )</h5>
                       </div>
                     </div>
                   </Link>
                 </div>
               );
             })
             : <div className="col-lg-12 col-md-12 col-xl-12 text-center">
             <img src="/front/img/no_product.png" alt="no product found"/>
           </div>
             }
           </div>
         </div>  
         <div
           className="tab-pane fade"
           id="combo"
           role="tabpanel"
           aria-labelledby="combo-tab"
           data-aos="fade-up"
           data-aos-delay="100"
         >
           <div className="row">
             {(products.length > 0) ? products.map((row, index) => {
               let images = row.product_image ? row.product_image : [];
               return (
                 <div className="col-lg-4 col-md-6 col-xl-3" key={index}>
                   <Link
                     href={`/combo-products/printing-details/${row?.product_id}`}
                   >
                     <div className="productMainCard">
                         <div className="productMainImage">
                           <div
                             id={`carouselExampleControls${index}`}
                             className="carousel slide productCarousel"
                             data-bs-ride="carousel"
                           >
                             <div className="carousel-indicators">
                               <button
                                 type="button"
                                 data-bs-target={`#carouselExampleIndicators${index}`}
                                 data-bs-slide-to={0}
                                 className="active"
                                 aria-current="true"
                                 aria-label="Slide 1"
                               ></button>
                               <button
                                 type="button"
                                 data-bs-target={`#carouselExampleIndicators${index}`}
                                 data-bs-slide-to={1}
                                 aria-label="Slide 2"
                               ></button>
                               <button
                                 type="button"
                                 data-bs-target={`#carouselExampleIndicators${index}`}
                                 data-bs-slide-to={2}
                                 aria-label="Slide 3"
                               ></button>
                             </div>
                             <div className="carousel-inner">
                               <>
                                 {images &&
                                   Array.isArray(images) &&
                                   images.length > 0 &&
                                   images.map((item, index) => (
                                  
                                     <div
                                       className={`carousel-item ${
                                         index === 0 ? "active" : ""
                                       }`}
                                       key={index}
                                     >
                                       <img
                                         src={API_IMG_URL + item.product_image}
                                         alt="Product Image"
                                       />
                                     </div>
                                   ))}
                               </>
                             </div>
                             <button
                               className="carousel-control-prev"
                               type="button"
                               data-bs-target={`#carouselExampleControls${index}`}
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
                               data-bs-target={`#carouselExampleControls${index}`}
                               data-bs-slide="next"
                             >
                               <span
                                 className="carousel-control-next-icon"
                                 aria-hidden="true"
                               ></span>
                               <span className="visually-hidden">Next</span>
                             </button>
                           </div>
                         </div>
                         <br />
                         <div className="productTitle">
                           <h3>{row?.product_name}</h3>
                         </div>
                         <div className="mt-2">
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
                           <span className="ratingStarText">{`(${row.rating})`}</span>
                         </div>
                         <div className="productPrice">
                           <h2>₹ {row?.discount}</h2>
                           <del>₹ {row?.price}</del>
                           <h5 className="">( 20% OFF )</h5>
                         </div>
                     </div>
                   </Link>
                 </div>
               );
             })
             : <div className="col-lg-12 col-md-12 col-xl-12 text-center">
               <img src="/front/img/no_product.png" alt="No product found"/>
             </div>
           } 
           </div>
         </div>
        </div>
         }

      </section>
      <section className=" container pb-md-5 pb-3">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <ul
              className="nav d-lg-block nav-tabs productVarticalTabs border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pvccardTab-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pvccardTab"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  PVC Cards
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="metalCards2-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#metalCards2"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Metal Cards
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 ps-lg-0">
            <div
              className="tab-content matalNfcCard shadow mt-4"
              id="myTab_ContentVartical"
            >
              <div
                className="tab-pane fade show active"
                id="pvccardTab"
                role="tabpanel"
                aria-labelledby="pvccardTab-tab"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <img src="/front/img/pvccard1.png" alt="" />
                      </div>
                      <div className="col-lg-12  col-md-6 mt-3 mt-md-0 mt-lg-3">
                        <img
                          className=""
                          src="/front/img/pvccard2.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 mt-4 mt-lg-0">
                    <h2>PVC</h2>
                    <h1> NFC Cards</h1>
                    <p>
                      Make a lasting impression with the customized wooden
                      NFC-based card featuring your logo from RICHKARDZ. Whether
                      you&apos;re pitching, selling, or networking, this digital
                      card will set you apart and make a memorable first
                      impression. The utilization of Wooden NFC Cards by
                      RICHKARDZ is revolutionizing the manner in which people
                      exchange digital information with others they encounter in
                      the physical world. Get your unique Wooden NFC Card today
                      from RICHKARDZ.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="metalCards2"
                role="tabpanel"
                aria-labelledby="metalCards2-tab"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="row align-items-center">
                  <div className="col-lg-5">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <img src="/front/img/pvccard1.png" alt="" />
                      </div>
                      <div className="col-lg-12  col-md-6 mt-3 mt-md-0 mt-lg-3">
                        <img
                          className=""
                          src="/front/img/pvccard2.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 mt-4 mt-lg-0">
                    <h2>Metal</h2>
                    <h1> NFC Cards 222</h1>
                    <p>
                      Make a lasting impression with the customized wooden
                      NFC-based card featuring your logo from RICHKARDZ. Whether
                      you&apos;re pitching, selling, or networking, this digital
                      card will set you apart and make a memorable first
                      impression. The utilization of Wooden NFC Cards by
                      RICHKARDZ is revolutionizing the manner in which people
                      exchange digital information with others they encounter in
                      the physical world. Get your unique Wooden NFC Card today
                      from RICHKARDZ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
