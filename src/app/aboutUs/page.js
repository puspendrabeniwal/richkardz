"use client";

import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";

const AboutUs = () => {
  return (
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
                <p>
                  RICH KARDZ is an NFC-based digital card. With just a tap, you
                  can share your contact information using this.
                </p>
              </div>
            </div>
          </div>
          <img
            className="aboutusBanner pb-5"
            src="/front/img/aboutus.png"
            alt=""
          />
        </section>

        <section className="AboutRichKardz defaultPaddingTB">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img src="/front/img/aboutus-RICH.png" alt="" />
              </div>
              <div className="col-lg-6 ps-lg-5  mt-4 mt-lg-0">
                <h1>
                  About <span>Rich Kardz</span>
                </h1>
                <p>
                  At Rich Kardz, we understand that traditional paper business
                  cards are a staple in networking and marketing, but the
                  constant printing and disposal of paper cards can have a
                  significant impact on the environment. That&apos;s why we
                  decided to offer a solution that combines technology and
                  sustainability. Every year more than 7.2 Million Trees are cut
                  for visiting cards. By using Rich Kardz you can be a part of
                  the change and network the sustainable way. We also plant a
                  tree for every order we receive.
                </p>
                <p>
                  Our NFC business cards are made with high-quality materials
                  and embedded with a Near Field Communication (NFC) chip. This
                  chip allows you to easily share your contact information with
                  others simply by tapping your card to their smartphone.
                  It&apos;s a convenient and eco-friendly way to exchange
                  information without the need for paper.
                </p>
                <p>
                  Our team is passionate about promoting sustainability and
                  reducing waste in the business world. We believe that small
                  changes can make a big impact, and our NFC business cards are
                  just one way to do so.
                </p>
                <div className="row mx-0 aboutusCard mt-3">
                  <div className="col-2 px-0  text-center col-md-2 aboutusOneCard">
                    <img src="/front/img/oneStep.png" alt="" />
                  </div>
                  <div className="col-10 col-md-10 ps-0">
                    <h2>One-Stop Solution</h2>
                    <p>
                      RICH KARDZ is an NFC-based digital card. With just a tap,
                      you can share your contact information using this.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center pt-5">
              <div className="col-lg-6 order-lg-last">
                <img src="/front/img/aboutus-RICH.png" alt="" />
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <h1>
                  Customised to your liking <br />
                </h1>
                <p>
                  All of our cards are available in multiple of designs and can
                  also be custom designed for you with your logo, design, name,
                  contact and much more.
                </p>
                <div className="row mt-2">
                  <div className="col-12 col-md-6">
                    <div className="d-flex aboutUsUser mt-3">
                      <div className="aboutUsUcARD">
                        <img src="/front/img/activeuser.png" alt="" />
                      </div>
                      <div>
                        <h2>30K+</h2>
                        <h5>ACTIVE USERS</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex aboutUsUser mt-3">
                      <div className="aboutUsUcARD">
                        <img src="/front/img/cardAply.png" alt="" />
                      </div>
                      <div>
                        <h2>40K+</h2>
                        <h5>CARD APPLIED</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btnNavyBlue mt-md-5 mt-3 btn-lg">
                  Get It Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="HowToOwnAboutus defaultPaddingTB">
          <div className="container">
            <div className="HowToOwn_AboutusTitle">
              <h1 className="text-center">
                How To Own <br />
                <span>Our Digital RichKardz ?</span>
              </h1>
              <p className="text-center">
                Own your smart business card today in three <br /> simple steps
              </p>
            </div>
            <div className="howToOwnCount col-lg-10 mx-auto">
              <div className="countNumber">01</div>
              <div className="countNumber">02</div>
              <div className="countNumber">03</div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-flex">
                <div className="howToOwnCards">
                  <img src="/front/img/OrderRichKardz.png" alt="" />
                  <h1>Order RichKardz</h1>
                  <p>
                    Check out our cards, customize or finalize your choice and
                    place the order. You will have your smart business card with
                    in days.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div className="howToOwnCards">
                  <img src="/front/img/SetupActivate .png" alt="" />
                  <h1>Setup & Activate Your Profile</h1>
                  <p>
                    Once the order is placed, you will be able to access a fully
                    customized dashboard. Add all the information you want on
                    your NFC business card profile, then start sharing it with
                    potential customers. Your digital business card will be
                    activated right away. So, yes! You can now use your card.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div className="howToOwnCards">
                  <img src="/front/img/StartSharing.png" alt="" />
                  <h1>Start Sharing & Editing</h1>
                  <p>
                    Once your online business card profile is active, you can
                    change and distribute it as much as you like whenever you
                    want. No restrictions at all
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="userAreSaying defaultPaddingTB">
          <div className="container">
            <div className="userAre_Heading text-center">
              <h1>What our Clients Say ?</h1>
              <p>
                Happy clients are what make a brand strong and visible in the
                market. Rich Kardz has been <br />
                blessed with satisfied customers, and we build ourselves on
                trusted testimonials.
              </p>
            </div>
            <div className="swiper userAreSlider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay1.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/Dinesh.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Dinesh Brahma</h3>
                    <p>National Sales Head</p>
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
                  </div>
                  <p className="userAreProPText">
                    The digital NFC business card provided by Rich Kardz is a
                    game-changer. It&apos;s eco-friendly, and I can easily
                    update my contact information without having to reprint
                    physical business cards. It has helped make our company
                    eco-friendly and sustainable. Also it has brought down our
                    card printing budget drastically. I don&apos;t know how it
                    can get better.
                  </p>
                </div>
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay2.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/Shishir.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Shishir Pal Singh</h3>
                    <p>CBO</p>
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
                  </div>
                  <p className="userAreProPText">
                    As a business owner, I was hesitant about making the switch
                    to digital business cards. However, after using Rich Kardz,
                    I&apos;m a complete convert. The technology is impressive,
                    and it&apos;s convenient to have to carry only 1 card
                    instead of a bulk of cards. Also I land up directly in my
                    prospective client&apos;s phone book. Absolutely does away
                    with misplacement and throwing away of paper visiting cards.
                  </p>
                </div>
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay3.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/Shreya.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Shreya Raghav</h3>
                    <p>Sales Manager</p>
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
                  </div>
                  <p className="userAreProPText">
                    I&apos;ve been using Rich Kardz for 2 months, and it&apos;s
                    transformed the way I network. The card is easy to use, and
                    I no longer have to worry about carrying crumpled paper
                    cards. Also it makes me stand out in the sea of people
                    handing out paper visiting cards. Makes me look tech-savvy.
                    Who doesn&apos;t like to look cool?.
                  </p>
                </div>
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay2.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/Arun.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Arun S</h3>
                    <p>General Manager</p>
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
                  </div>
                  <p className="userAreProPText">
                    I was impressed with the digital NFC business card provided
                    by Rich Kardz. It is extremely convenient to share my
                    contact information with potential clients without worrying
                    about running out of physical business cards. The process is
                    seamless, and the card&apos;s design is customizable, making
                    it an essential tool for any business professional. I had a
                    hard time deciding which card I should buy because there are
                    so many options.
                  </p>
                </div>
                {/* <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay2.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/videoPlay.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Rahul Signh</h3>
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
                  </div>
                  <p className="userAreProPText">
                    RichKardz are environmentally friendly alternatives to
                    traditional paper cards.
                  </p>
                </div>
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay2.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/videoPlay.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Rahul Signh</h3>
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
                  </div>
                  <p className="userAreProPText">
                    RichKardz are environmentally friendly alternatives to
                    traditional paper cards.
                  </p>
                </div>
                <div className="swiper-slide">
                  <div className="userAreProMain">
                    <img
                      className="userAreProfile"
                      src="/front/img/userSay2.png"
                      alt=""
                    />
                    <button
                      className="videoPlayIcon"
                      data-bs-toggle="modal"
                      data-bs-target="#videoPlayModal"
                    >
                      <img src="/front/img/videoPlay.png" alt="" />
                    </button>
                  </div>
                  <div className="userAreProText">
                    <h3>Rahul Signh</h3>
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
                  </div>
                  <p className="userAreProPText">
                    RichKardz are environmentally friendly alternatives to
                    traditional paper cards.
                  </p>
                </div> */}
              </div>
              <div className="swiper-pagination"></div>
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
};

export default AboutUs;
