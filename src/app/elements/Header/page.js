"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header =()=>{
  const pathname = usePathname();
    return (
        <header id="header" className="navbarscroll w-100 headerNav headerTop ">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="">
              <a className="p-0 d-flex align-items-center" href="/">
                <img className="logo-top" src="/front/img/Richkardz-logo.png" />
              </a>
          </div>

          <ul className="d-lg-none">
              <li className="d-inline-block mx-2">
                <select className="vodiaMobilepicker ms-lg-4">
                    <option value="au"
                      data-thumbnail="https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg?q=10&h=200">
                      IND</option>
                    <option value="uk"
                      data-thumbnail="https://img.freepik.com/free-vector/illustration-pakistan-flag_53876-27123.jpg">
                      PAK</option>
                    <option value="cn"
                      data-thumbnail="https://cdn.freebiesupply.com/logos/large/2x/united-states-of-america-logo-png-transparent.png">
                      US</option>

                </select>

                <div className="lang-Mobileselect">
                    <button className="countryMobileSelect" value=""></button>
                    <div className="countryMobileMainSelect">
                      <ul id="countryMobileSelectList"></ul>
                    </div>
                </div>

              </li>
              <li className="d-inline-block mx-2"><a className="" href=""><i className="fa fa-phone text-white" aria-hidden="true"></i>
                </a>
              </li>
              <li className="d-inline-block mx-2">
                <a className="" href="#"> <i className="fa fa-user-o ms-1 text-white" aria-hidden="true"></i>
                </a>
              </li>
          </ul>
          <button className="navbar-toggler mobile-nav-toggle border-0 p-0 d-lg-none" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation"> <i className="fa fa-bars text-white" aria-hidden="true"></i> </button>
          <div className="main-nav d-none d-lg-flex">
              <button className="navbar-toggler mobileMenuDrop d-lg-none mobile-nav-toggle border-0 p-0 d-lg-none" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation"> <i className="fa fa-bars text-dark" aria-hidden="true"></i> </button>

              <ul className=" d-lg-flex align-items-lg-center float-lg-left">
                <li className=""><Link href="/" className={(pathname === "/") ? "active" : ""}> Home</Link></li>
                <li className=""><Link href="/products" className={(pathname === "/products") ? "active" : ""}>Products</Link></li>
                <li className=""><Link href="/aboutUs" className={(pathname === "/aboutUs") ? "active" : ""}>About</Link></li>
                <li className=""><Link href="/contactUs" className={(pathname === "/contactUs") ? "active" : ""}>Conatct Us</Link></li>
                <li className="d-none d-lg-inline-block">
                    <select className="vodiapicker ms-lg-4">
                      <option value="au"
                          data-thumbnail="https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg?q=10&h=200">
                          IND</option>
                      <option value="uk"
                          data-thumbnail="https://img.freepik.com/free-vector/illustration-pakistan-flag_53876-27123.jpg">
                          PAK</option>
                      <option value="cn"
                          data-thumbnail="https://cdn.freebiesupply.com/logos/large/2x/united-states-of-america-logo-png-transparent.png">
                          US</option>
                    </select>

                    <div className="lang-select">
                      <button className="countrySelect" value=""></button>
                      <div className="countryMainSelect">
                          <ul id="countrySelectList"></ul>
                      </div>
                    </div>

                </li>
                <li className="d-none d-lg-inline-block"><a className="" href=""><i className="fa fa-phone" aria-hidden="true"></i>
                    </a></li>
                <li className="d-none d-lg-inline-block"><a className="scrollLink" href="#"> <i className="fa fa-user-o ms-1" aria-hidden="true"></i>
                    </a>
                </li>
              </ul>
          </div>
        </div>
    </header>
    )
}
export default  Header