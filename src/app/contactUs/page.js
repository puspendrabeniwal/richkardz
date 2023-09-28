"use client";
import Link from "next/link";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";

const ContactUs=()=>{
    return(
        <html lang="en">
            <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="keywords" />
    
            <title>Contact Us</title>
    
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
                <section className="contactPage py-md-5 py-3">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-5">
                            <h1 className="mb-md-3">Contact us</h1>
                            <p>RICH KARDZ is an NFC-based digital card. With just a tap, you can share your contact information
                                using this.
                            </p>
                            <div className="bg-white border shadow radius mt-3 p-3">
                                <form>
                                    <div className="row">
                                    <div className="col-md-6 customFrom mb-3">
                                        <label htmlFor="">Full Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                        <label htmlFor="">Email Address</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                        <label htmlFor="">Phone Number</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-6 customFrom mb-3">
                                        <label htmlFor="">City</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-12 customFrom mb-3">
                                        <label htmlFor="">Message</label>
                                        <textarea name="" className="form-control" id="" rows="4"></textarea>
                                    </div>
                                    </div>
                                    <iframe title=""
                                    src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Lfy2EglAAAAAJ87k3SkISp7kPQw7PwIaPXKYd1G&amp;co=aHR0cHM6Ly93d3cucmljaGthcmR6LmNvbTo0NDM.&amp;hl=en&amp;v=sNQO7xVld1CuA2hfFHvkpVL-&amp;size=normal&amp;cb=cbcm5h1zphlu"
                                    width="304" height="78" role="presentation" name="a-53ciwno6dhub" frameBorder="0"
                                    scrolling="no"
                                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
                                </form>
                                <button className="btn btnNavyBlue px-5 mt-4 py-2">Send</button>
                            </div>
                        </div>
                        <div className="col-lg-6 my-4">
                            <img className="contactBanners" src="/front/img/contactb.png" alt="" />
                        </div>
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
                <Footer />
            </body>
        </html>
    )
}

export default ContactUs;