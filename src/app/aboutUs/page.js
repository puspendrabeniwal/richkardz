"use client";

import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";

const AboutUs=()=>{
    return(
        <html lang="en">
            <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="keywords" />
    
            <title>About</title>
    
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
                <section className="aboutusSection py-md-5 py-3">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-4 col-md-5">
                            <h1 className="mb-md-3">About Us</h1>
                            <p>RICH KARDZ is an NFC-based digital card. With just a tap, you can share your contact information
                                using this.
                            </p>
                        </div>
                        </div>
                    </div>
                    <img className="aboutusBanner pb-5" src="/front/img/aboutus.png" alt=""/>
                </section>

                <section className="AboutRichKardz defaultPaddingTB">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src="/front/img/aboutus-RICH.png" alt=""/>
                        </div>
                        <div className="col-lg-6 ps-lg-5  mt-4 mt-lg-0">
                            <h1>About <span>Rich Kardz</span></h1>
                            <p>At Rich Kardz, we are on a mission to make networking smarter and more eco-friendly. Every year
                                more
                                than 7.2 Million Trees are cut for visiting cards. By using Rich Kardz you can be a part of the
                                change and network the sustainable way.
                            </p>
                            <p>And what’s more is that we plant a tree for every order we receive.</p>
                            <div className="row mx-0 aboutusCard mt-3">
                                <div className="col-2 px-0  text-center col-md-2 aboutusOneCard">
                                    <img src="/front/img/oneStep.png" alt=""/>
                                </div>
                                <div className="col-10 col-md-10 ps-0">
                                    <h2>One-Stop Solution</h2>
                                    <p>RICH KARDZ is an NFC-based digital card. With just a tap, you can share your contact
                                    information using this.
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row align-items-center pt-5">
                        <div className="col-lg-6 order-lg-last">
                            <img src="/front/img/aboutus-RICH.png" alt=""/>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <h1>Customized And Control <br />
                                <span> Your Own Credit Card</span>
                            </h1>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.
                            </p>
                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                    <div className="d-flex aboutUsUser mt-3">
                                    <div className="aboutUsUcARD">
                                        <img src="/front/img/activeuser.png" alt=""/>
                                    </div>
                                    <div className="">
                                        <h2>30K+</h2>
                                        <h5>ACTIVE USERS</h5>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="d-flex aboutUsUser mt-3">
                                    <div className="aboutUsUcARD">
                                        <img src="/front/img/cardAply.png" alt=""/>
                                    </div>
                                    <div className="">
                                        <h2>40K+</h2>
                                        <h5>CARD APPLIED</h5>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btnNavyBlue mt-md-5 mt-3 btn-lg">Get It Now</button>
                        </div>
                        </div>
                    </div>
                </section>

                <section className="HowToOwnAboutus defaultPaddingTB">
                    <div className="container">
                        <div className="HowToOwn_AboutusTitle">
                        <h1 className="text-center">How To Own <br />
                            <span>Our Digital RichKardz ?</span>
                        </h1>
                        <p className="text-center">Own your smart business card today in three <br/> simple steps</p>
                        </div>
                        <div className="howToOwnCount col-lg-10 mx-auto">
                        <div className="countNumber">
                            01
                        </div>
                        <div className="countNumber">
                            02
                        </div>
                        <div className="countNumber">
                            03
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-lg-4 d-flex">
                            <div className="howToOwnCards">
                                <img src="/front/img/OrderRichKardz.png" alt=""/>
                                <h1>Order RichKardz</h1>
                                <p>Check out our cards, customize or finalize your choice and place the order. You will have
                                    your smart business card with in days.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex">
                            <div className="howToOwnCards">
                                <img src="/front/img/SetupActivate .png" alt=""/>
                                <h1>Setup & Activate
                                    Your Profile
                                </h1>
                                <p>Once the order is placed, you will be able to access a fully customized dashboard. Add all
                                    the information you want on your NFC business card profile, then start sharing it with
                                    potential customers. Your digital business card will be activated right away. So, yes! You
                                    can now use your card.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex">
                            <div className="howToOwnCards">
                                <img src="/front/img/StartSharing.png" alt=""/>
                                <h1>Start Sharing &
                                    Editing
                                </h1>
                                <p>Once your online business card profile is active, you can change and distribute it as much as
                                    you like whenever you want. No restrictions at all
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

                <section className="userAreSaying defaultPaddingTB">
                    <div className="container">
                        <div className="userAre_Heading text-center">
                        <h1>What RichKardz Users are saying?
                        </h1>
                        <p>
                            Happy clients are what make a brand strong and visible in the market. Rich Kardz has been <br/>
                            blessed with satisfied customers, and we build ourselves on trusted testimonials.
                        </p>
                        </div>
                        <div className="swiper userAreSlider">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay1.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay2.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay3.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay2.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay2.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay2.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                            <div className="swiper-slide">
                                <div className="userAreProMain">
                                    <img className="userAreProfile" src="/front/img/userSay2.png" alt=""/>
                                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                    <img className="" src="/front/img/videoPlay.png" alt=""/>
                                    </button>
                                </div>
                                <div className="userAreProText">
                                    <h3>Rahul Signh</h3>
                                    <div>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                                    </div>
                                </div>
                                <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                                    cards.
                                </p>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </section>

                <section className="makeAStrong">
                    <div className="container">
                        <div className="col-lg-10 text-center mx-auto">
                        <h1>make a strong impression
                            that people won’t forget.
                        </h1>
                        <button className="makeAStrongBtn btn">Buy Now</button>
                        </div>
                    </div>
                </section>
                <Footer />
            </body>
        </html>
    )
}

export default AboutUs;