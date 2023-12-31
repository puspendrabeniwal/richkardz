"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
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
  },[])
  return (
      <main>
        <section className="HometopBg defaultPaddingTB">
            <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-6 order-lg-last mb-4 mb-lg-0">
                    {/* <video className="homeVideo" muted="true" preload="auto" autoplay="true" loop="true"
                        playsinline="playsinline">
                        <source src="video/homeVideo.mp4" type="video/mp4">
                    </video> */}
                    <img className="" src="/front/img/rk.gif" />

                  </div>
                  <div className="col-lg-6">
                    <div className="">
                        <h1>be unforgettable,
                          leaving a lasting
                          impression behind.
                        </h1>
                        <p>
                          Using RichKardz, instantly share your Contact information with a simple tap, leaving a lasting
                          impression
                          in the minds of your contacts
                        </p>
                    </div>
                    <div className="d-flex align-items-center mt-5">
                        <Link href="/products" className="btn btn-white">
                          Buy Now
                        </Link>

                        <ul className="userHomeProfile ms-lg-5 ms-5 ps-lg-5">
                          <li><img
                                src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM="
                                alt="" /></li>
                          <li><img src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" alt="" />
                          </li>
                          <li><img src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" alt="" />
                          </li>
                        </ul>
                        <div className="viewUser ms-3">
                          <h3>5k+</h3>
                          <h6>Active Users</h6>
                        </div>

                    </div>
                  </div>
              </div>
            </div>
        </section>

        <section className="dontSettle defaultPaddingTB">
            <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="userAreProMain">
                        <img className="w-100" src="/front/img/popupImgOpen.png" alt="" />
                        <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                          <img className="" src="/front/img/videoPlay.png" alt="" />
                        </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="ps-xl-5">
                        <h1>Don&apos;t settle for forgettable interactions.
                          Traditional paper visiting cards just can&apos;t
                          keep up in our digital world.
                        </h1>
                        <p className="">Frustrated by missed opportunities and lost connections?
                          Your business deserves better.
                        </p>
                        <p className="">
                          With NFC Business Cards, effortlessly share your digital
                          information, portfolio, and more, all with a simple tap..
                        </p>
                        <p>
                          Stand out from the competition, make a memorable impact,
                          and leave a lasting impression in the minds of your contacts.
                        </p>
                    </div>
                  </div>
              </div>
            </div>
        </section>

        <section className="BenefitsSection">
            <div className="container">
              <div className="py-5 text-center">
                  <h1 className="px-3 px-lg-0">RichKardz Benefits
                  </h1>
                  <h3>With NFC Business Cards, effortlessly share your digital information, portfolio, and more, all with a
                    simple tap.
                    Stand out from the competition, make a memorable impact, and leave a lasting impression
                    in the minds of your contacts.</h3>

                  <div className="col-lg-5 mx-auto mt-5 pb-md-5 mb-md-5">
                    <img src="/front/img/cardImgs.jpeg" alt="" />
                  </div>
              </div>
              <div className="row align-items-center">
                  <div className="col-lg-7 pe-xl-5 ">
                    <div className="benefits_CardM">

                        <div className="benefitsCard">
                          <img className="benefits-CardIcon" src="/front/img/InstantConnection.png" alt="" />
                          <div>
                              <h3>Instant Connection
                              </h3>
                              <p className="">
                                You can effortlessly share your contact information, website,
                                or portfolio with a simple tap, instantly connecting with
                                potential clients or collaborators.
                              </p>
                          </div>
                        </div>
                        <div className="benefitsCard">
                          <img className="benefits-CardIcon" src="/front/img/EnhancedProfessonalism.png" alt="" />
                          <div>
                              <h3>Enhanced Professionalism
                              </h3>
                              <p className="">
                                You can showcase yourself having a tech-forward mindset
                                and commitment to staying ahead of the curve. This makes
                                you a forward-thinking professional in the minds of your contacts
                              </p>
                          </div>
                        </div>
                        <div className="benefitsCard">
                          <img className="benefits-CardIcon" src="/front/img/ecology.png" alt="" />
                          <div>
                              <h3>Eco-Friendly and Sustainable
                              </h3>
                              <p className="">
                                RichKardz are environmentally friendly alternatives to traditional
                                paper cards. By adopting NFC technology, you reduce paper
                                waste and contribute to a greener future.
                              </p>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-5 my-4 my-lg-0 ps-xl-5">
                  <img className="" src="/front/img/rk.gif" />
                  </div>
              </div>
            </div>
        </section>

        <section className="userAreSaying defaultPaddingTB">
            <div className="container">
              <div className="userAre_Heading text-center">
                  <h1>What our <br /> Clients Say ??
                  </h1>
                  <p>
                    Happy clients are what make a brand strong and visible in the market. Rich Kardz has been <br />
                    blessed with satisfied customers, and we build ourselves on trusted testimonials.
                  </p>
              </div>



              <div className="swiper userAreSlider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide userssaying">
                        <div className="userProfile">
                          <img className="" src="/front/img/testimonial/Arun.png" alt="" />
                        </div>
                        <div className="userAreProText">
                          <h3>Arun S</h3>
                        </div>
                        <p className="userAreProPText">I was impressed with the digital NFC business card provided by Rich Kardz. It is extremely convenient to share my contact information with potential clients without worrying about running out of physical business cards. The process is seamless, and the card&apos;s design is customizable, making it an essential tool for any business professional. I had a hard time deciding which card I should buy because there are so many options.
                        </p>
                        <div className="mt-2">
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                        </div>
                    </div>

                    <div className="swiper-slide userssaying">
                        <div className="userProfile">
                          <img className="" src="/front/img/testimonial/Dinesh.png" alt="" />
                        </div>
                        <div className="userAreProText">
                          <h3>Dinesh Brahma</h3>
                        </div>
                        <p className="userAreProPText">The digital NFC business card provided by Rich Kardz is a game-changer. It&apos;s eco-friendly, and I can easily update my contact information without having to reprint physical business cards. It has helped make our company eco-friendly and sustainable. Also it has brought down our card printing budget drastically. I don&apos;t know how it can get better.
                        </p>
                        <div className="mt-2">
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                        </div>
                    </div>

                    <div className="swiper-slide userssaying">
                        <div className="userProfile">
                          <img className="" src="/front/img/testimonial/Shishir.png" alt="" />
                        </div>
                        <div className="userAreProText">
                          <h3>Shishir Pal Singh</h3>
                        </div>
                        <p className="userAreProPText">As a business owner, I was hesitant about making the switch to digital business cards. However, after using Rich Kardz, I&apos;m a complete convert. The technology is impressive, and it&apos;s convenient to have to carry only 1 card instead of a bulk of cards. Also I land up directly in my prospective client&apos;s phone book. Absolutely does away with misplacement and throwing away of paper visiting cards.
                        </p>
                        <div className="mt-2">
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                        </div>
                    </div>


                    <div className="swiper-slide userssaying">
                        <div className="userProfile">
                          <img className="" src="/front/img/testimonial/Shreya.png" alt="" />
                        </div>
                        <div className="userAreProText">
                          <h3>Shreya Raghav</h3>
                        </div>
                        <p className="userAreProPText">I&apos;ve been using Rich Kardz for 2 months, and it&apos;s transformed the way I network. The card is easy to use, and I no longer have to worry about carrying crumpled paper cards. Also it makes me stand out in the sea of people handing out paper visiting cards. Makes me look tech-savvy. Who doesn&apos;t like to look cool?.
                        </p>
                        <div className="mt-2">
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                          <a href="" className="ratingStar"><i className="fa fa-star"></i></a>
                        </div>
                    </div>

                  </div>
                  <div className="swiper-pagination"></div>
              </div>
            </div>
        </section>

        <section className="ExploreOurSmart">
            <marquee>
              <ul className="">
                  <li>Explore Our Smart Business Cards</li>
                  <li>Explore Our Smart Business Cards</li>
                  <li>Explore Our Smart Business Cards</li>
              </ul>
            </marquee>
        </section>

        <section className="BusinessCardsSection defaultPaddingTB">
            <div className="container">
              <div className="swiper businesscardsslider">
                  <div className="swiper-wrapper pb-5">
                    <div className="swiper-slide">
                        <div className="BusinessCrds">
                          <img src="/front/img/BusinessCards1.png" alt="" />
                          <div className="BusinessCrdOverlay">
                              <div className="BusinessCrdOvlyText">
                                <h2>Pvc Card</h2>
                                <Link href="/products?type=PVC Glossy">Explore <i className="fa fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="BusinessCrds">
                          <img src="/front/img/BusinessCards2.png" alt="" />
                          <div className="BusinessCrdOverlay">
                              <div className="BusinessCrdOvlyText">
                                <h2>Metal Cards</h2>
                                <Link href="/products?type=Metal Cards">Explore <i className="fa fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="BusinessCrds">
                          <img src="/front/img/BusinessCards1.png" alt="" />
                          <div className="BusinessCrdOverlay">
                              <div className="BusinessCrdOvlyText">
                                <h2>Pvc Card</h2>
                                <Link href="/products?type=PVC Glossy">Explore <i className="fa fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="BusinessCrds">
                          <img src="/front/img/BusinessCards2.png" alt="" />
                          <div className="BusinessCrdOverlay">
                              <div className="BusinessCrdOvlyText">
                                <h2>Metal Cards</h2>
                                <Link href="/products?type=Metal Cards">Explore <i className="fa fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="swiper-pagination"></div>

              </div>
            </div>
        </section>

        <section className="whyRichKardsMain defaultPaddingTB">
            <div className="container">
              <div className="row align-items-center whyRichKards">
                  <div className="col-lg-6 order-lg-last mb-4 mb-lg-0">
                    <div className="whyRichKardsImgOveraly">
                        <img className="w-100" src="/front/img/WhyRichMan.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="">
                        <h1>Why <br />
                          RichKardz <br />
                          is the best? po!
                        </h1>
                        <p>
                          RichKardz are environmentally friendly alternatives to
                          traditional paper cards. By adopting NFC technology, you
                          reduce paper waste and contribute to a greener future.
                        </p>
                        <p>
                          RichKardz are environmentally friendly alternatives to \
                          traditional paper cards. By adopting NFC technology, you
                          reduce paper waste and contribute to a greener future. py;
                        </p>
                    </div>
                  </div>
              </div>
              <div className="swiper whyRich_KardSlider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/instantlyShare.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/showcase.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/updateCalendar.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/accessvaluable.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/seamlessIcon.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/updateCalendar.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/accessvaluable.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/seamlessIcon.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/updateCalendar.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/accessvaluable.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                    <div className="swiper-slide">
                        <img className="userAreProfile" src="/front/img/seamlessIcon.png" alt="" />
                        <p className="userAreProPText">RichKardz are environmentally friendly alternatives to traditional paper
                          cards.
                        </p>
                    </div>
                  </div>
                  <div className="swiper-pagination"></div>
              </div>
            </div>
        </section>

        <section className="HowRichWorks pt-lg-5">
            <div className="container">
              <h1 className="text-center mb-3">How RichKardz Works?</h1>
              <div className="col-lg-9 col-10 mx-auto">
                  <div className="HowRichWorksMain">
                    <img src="/front/img/howToWorks.jpeg" alt="" />
                    <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                        <img className="" src="/front/img/videoPlay.png" alt="" />
                    </button>
                  </div>
              </div>
            </div>
        </section>

        <section className="frequeltyAsked defaultPaddingTB">
            <div className="container">
              <div className="row py-lg-5 py-3">
                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>

                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>


                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>

                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>
                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>
                  <div className="col-lg-2 companyLogo text-center mb-4 md-lg-0 col-4">
                    <img src="/front/img/artLogo.png" alt="" />
                  </div>
              </div>

              <h1>Frequltly Asked Questions</h1>
              <div className="col-lg-10 mx-auto mt-md-4">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseOne" aria-expanded={true} aria-controls="collapseOne">
                              <span className="frequltyNumber">1.</span>System requirements
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <p className="mb-3">Frustrated by missed opportunities and lost connections?
                                      Your business deserves better.
                                    </p>
                                    <p className="mb-3">With NFC Business Cards, effortlessly share your digital
                                      information, portfolio, and more, all with a simple tap.
                                    </p>
                                    <p className="mb-3">
                                      Stand out from the competition, make a memorable impact,
                                      and leave a lasting impression in the minds of your contacts.
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="userAreProMain">
                                      <img className="w-100" src="/front/img/askedQustion.png" alt="" />
                                      <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                          <img className="" src="/front/img/videoPlay.png" alt="" />
                                      </button>
                                    </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              <span className="frequltyNumber">2.</span> Where can | learn more about how to get started?
                          </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <p className="mb-3">Frustrated by missed opportunities and lost connections?
                                      Your business deserves better.
                                    </p>
                                    <p className="mb-3">With NFC Business Cards, effortlessly share your digital
                                      information, portfolio, and more, all with a simple tap.
                                    </p>
                                    <p className="mb-3">
                                      Stand out from the competition, make a memorable impact,
                                      and leave a lasting impression in the minds of your contacts.
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="userAreProMain">
                                      <img className="w-100" src="/front/img/popupImgOpen.png" alt="" />
                                      <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                          <img className="" src="/front/img/videoPlay.png" alt="" />
                                      </button>
                                    </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              <span className="frequltyNumber">3.</span> Is Acme available for Linux?
                          </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <p className="mb-3">Frustrated by missed opportunities and lost connections?
                                      Your business deserves better.
                                    </p>
                                    <p className="mb-3">With NFC Business Cards, effortlessly share your digital
                                      information, portfolio, and more, all with a simple tap.
                                    </p>
                                    <p className="mb-3">
                                      Stand out from the competition, make a memorable impact,
                                      and leave a lasting impression in the minds of your contacts.
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="userAreProMain">
                                      <img className="w-100" src="/front/img/popupImgOpen.png" alt="" />
                                      <button className="videoPlayIcon" data-bs-toggle="modal" data-bs-target="#videoPlayModal">
                                          <img className="" src="/front/img/videoPlay.png" alt="" />
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
        </section>

        <section className="defaultPaddingTB">
            <div className="container">
              <div className="latestBlogsSection row align-items-center">
                  <div className="col-lg-6 col-sm-9">
                    <h1>Latest Blogs
                    </h1>
                    <p className="mt-md-3">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                        massa.
                    </p>
                  </div>
                  <div className="col-lg-6 text-sm-end mt-3 mt-sm-0 col-sm-3">
                    <a href="" className="btn btnNavyBlue">View All</a>
                  </div>
              </div>
              <div className="swiper latestBlogs">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img className="" src="/front/img/userSay1.png" alt="" />
                        <h4>These are the 4 best cards for fueling
                          up right now</h4>
                        <p>Frustrated by missed opportunities and lost connections?</p>
                        <a href="" className="aLink">Read More</a>
                    </div>

                    <div className="swiper-slide">
                        <img className="" src="/front/img/userSay2.png" alt="" />
                        <h4>These are the 4 best cards for fueling
                          up right now</h4>
                        <p>Frustrated by missed opportunities and lost connections?</p>
                        <a href="" className="aLink">Read More</a>
                    </div>


                    <div className="swiper-slide">
                        <img className="" src="/front/img/userSay3.png" alt="" />
                        <h4>These are the 4 best cards for fueling
                          up right now</h4>
                        <p>Frustrated by missed opportunities and lost connections?</p>
                        <a href="" className="aLink">Read More</a>
                    </div>


                    <div className="swiper-slide">
                        <img className="" src="/front/img/userSay1.png" alt="" />
                        <h4>These are the 4 best cards for fueling
                          up right now</h4>
                        <p>Frustrated by missed opportunities and lost connections?</p>
                        <a href="" className="aLink">Read More</a>
                    </div>


                    <div className="swiper-slide">
                        <img className="" src="/front/img/userSay2.png" alt="" />
                        <h4>These are the 4 best cards for fueling
                          up right now</h4>
                        <p>Frustrated by missed opportunities and lost connections?</p>
                        <a href="" className="aLink">Read More</a>
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
                  <Link href="/products" className="makeAStrongBtn btn">Buy Now</Link>
              </div>
            </div>
        </section>
        <div className="modal fade youtubeModal" id="videoPlayModal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" aria-labelledby="videoPlayModalLabel" aria-hidden={true}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                  <div className="">
                    <button type="button" className="btn-close Modal_btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i className="fa fa-close"></i>
                    </button>
                  </div>
                  <div className="modal-body p-0">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item YouTubeVideo" src="https://www.youtube.com/embed/WDQM9dTg6pk"
                          title="" frameBorder="0" allow="" allowFullScreen></iframe>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </main>
  )
}
