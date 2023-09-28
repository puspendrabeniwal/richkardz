"use client";
import Link from "next/link";
import Header from "@/app/elements/Header/page";
import Footer from "@/app/elements/Footer/page";

const Four0Four=()=>{
    return(
        <html lang="en">
            <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="keywords" />
    
            <title>404 Page Not Found</title>
    
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
                <section className="page404 py-5 align-items-center justify-content-center">
                    <div className="container text-center">
                        <h1>404</h1>
                        <h3 className="mt-3">page not found</h3>
                        <p className="mt-3">Oops! The Page you are looking for does not exist. it night have been moved or delete</p>

                        <Link className="btn btnNavyBlue mt-4" href="/">BACKT TO HOME</Link>
                    </div>
                </section>
                <Footer />
            </body>
        </html>
    )
}

export default Four0Four;