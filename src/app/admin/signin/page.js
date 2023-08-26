'use client'

export const  Sign = ()=> {
  return (

    <div className="d-flex flex-column flex-root" id="kt_app_root">
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">    
            <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                    <div className="w-lg-500px p-10">
                        <form className="form w-100" novalidate="novalidate" id="kt_sign_in_form" data-kt-redirect-url="/metronic8/demo1/../demo1/index.html" action="#">
                            <div className="text-center mb-11">

                                <h1 className="text-dark fw-bolder mb-3">
                                    Sign In
                                </h1>
                            
                                <div className="text-gray-500 fw-semibold fs-6">
                                    Your Social Campaigns
                                </div>

                            </div>

                            {/* <div className="row g-3 mb-9">
                                <div className="col-md-6">
                                    <a href="#" className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                                        <img alt="Logo" src="/metronic8/demo1/assets/media/svg/brand-logos/google-icon.svg" className="h-15px me-3"/>   
                                        Sign in with Google
                                    </a>
                        
                                </div>

                                <div className="col-md-6">

                                    <a href="#" className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                                        <img alt="Logo" src="/metronic8/demo1/assets/media/svg/brand-logos/apple-black.svg" className="theme-light-show h-15px me-3"/>
                                        <img alt="Logo" src="/metronic8/demo1/assets/media/svg/brand-logos/apple-black-dark.svg" className="theme-dark-show h-15px me-3"/>     
                                        Sign in with Apple
                                    </a>
                        
                                </div>

                            </div>

                            <div className="separator separator-content my-14">
                                <span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
                            </div> */}

                            <div className="fv-row mb-8">
                                <input type="text" placeholder="Email" name="email" autocomplete="off" className="form-control bg-transparent"/> 
                            </div>
                            <div className="fv-row mb-3">                     
                                <input type="password" placeholder="Password" name="password" autocomplete="off" className="form-control bg-transparent"/>
                        
                            </div>
                            {/* <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                <div></div>
                                <a href="/metronic8/demo1/../demo1/authentication/layouts/corporate/reset-password.html" className="link-primary">
                                    Forgot Password ?
                                </a>
                            </div> */}

                            <div className="d-grid mb-10">
                                <button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
                                    <span className="indicator-label">Sign In</span>
                                    <span className="indicator-progress">
                                        Please wait...    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                            </button>
                            </div>

                            {/* <div className="text-gray-500 text-center fw-semibold fs-6">
                                Not a Member yet?

                                <a href="/metronic8/demo1/../demo1/authentication/layouts/corporate/sign-up.html" className="link-primary">
                                    Sign up
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>
                <div className="w-lg-500px d-flex flex-stack px-10 mx-auto">

                    {/* <div className="me-10">             

                        <button className="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" data-kt-menu-offset="0px, 0px">
                            <img  data-kt-element="current-lang-flag" className="w-20px h-20px rounded me-3" src="/metronic8/demo1/assets/media/flags/united-states.svg" alt=""/>
                            
                            <span data-kt-element="current-lang-name" className="me-1">English</span>

                            <span className="d-flex flex-center rotate-180">
                                <i className="ki-duotone ki-down fs-5 text-muted m-0"></i>                    </span>
                        </button>
            
                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7" data-kt-menu="true" id="kt_auth_lang_menu">

                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link d-flex px-5" data-kt-lang="English">
                                        <span className="symbol symbol-20px me-4">
                                            <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/united-states.svg" alt=""/>
                                        </span>
                                        <span data-kt-element="lang-name">English</span>
                                    </a>
                                </div>

                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link d-flex px-5" data-kt-lang="Spanish">
                                        <span className="symbol symbol-20px me-4">
                                            <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/spain.svg" alt=""/>
                                        </span>
                                        <span data-kt-element="lang-name">Spanish</span>
                                    </a>
                                </div>

                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link d-flex px-5" data-kt-lang="German">
                                        <span className="symbol symbol-20px me-4">
                                            <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/germany.svg" alt=""/>
                                        </span>
                                        <span data-kt-element="lang-name">German</span>
                                    </a>
                                </div>

                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link d-flex px-5" data-kt-lang="Japanese">
                                        <span className="symbol symbol-20px me-4">
                                            <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/japan.svg" alt=""/>
                                        </span>
                                        <span data-kt-element="lang-name">Japanese</span>
                                    </a>
                                </div>

                                <div className="menu-item px-3">
                                    <a href="#" className="menu-link d-flex px-5" data-kt-lang="French">
                                        <span className="symbol symbol-20px me-4">
                                            <img data-kt-element="lang-flag" className="rounded-1" src="/metronic8/demo1/assets/media/flags/france.svg" alt=""/>
                                        </span>
                                        <span data-kt-element="lang-name">French</span>
                                    </a>
                                </div>

                            </div>
                
                    </div> */}

                    {/* <div className="d-flex fw-semibold text-primary fs-base gap-5">
                        <a href="#" target="_blank">Terms</a>

                        <a href="#" target="_blank">Plans</a>
                        
                        <a href="#" target="_blank">Contact Us</a>
                    </div> */}

                </div>
            </div>
            <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2" style={{"backgroundImage": "url(/admin/assets/media/misc/search-bg.png)"}}>

                <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">          

                    <a href="#" className="mb-0 mb-lg-12">
                        <img alt="Logo" src="/admin/assets/media/logos/logo-1-dark.png" className="h-60px h-lg-75px"/>
                    </a>    
                    
                    <img className="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20" src="./admin/assets/media/misc/auth-screens.png" alt=""/>                 
        
                    <h1 className="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"> 
                        Fast, Efficient and Productive
                    </h1>  

                    <div className="d-none d-lg-block text-white fs-base text-center">
                        In this kind of post, <a href="#" className="opacity-75-hover text-warning fw-bold me-1">the blogger</a> 

                        introduces a person they’ve interviewed <br/> and provides some background information about 
                        
                        <a href="#" className="opacity-75-hover text-warning fw-bold me-1">the interviewee</a> 
                        and their <br/> work following this is a transcript of the interview.  
                    </div>

                </div>

            </div>
        </div>
    </div>
  
)
 
}

export default Sign;