'use client'
import React, { useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { Formik, FormikValues, FormikHelpers } from "formik";
import Header from './../components/Header';
import Footer from './../components/Footer';
import Sidebar from './../components/Sidebar';
import Breadcrumbs from './../components/Breadcrumbs';
const  UserProfile = ()=> {

    async function handleSubmit() {
        helper.setSubmitting(true);
        try {
          const response = await axios.post(
            `${AppConstants.Api_BaseUrl}/contact_us`,
            values
          );
          helper.setSubmitting(false);
          helper.resetForm();
          showSuccess();
        } catch (error) {
          helper.setSubmitting(false);
          console.log(error);
        }
      }
  return (
    <>

	<head>
		<title>RICH KARDZ :: Revolutionise your Networking game</title>
		<meta charset="utf-8" />
		<meta name="description" content="The most advanced Bootstrap Admin Theme on Themeforest trusted by 94,000 beginners and professionals. Multi-demo, Dark Mode, RTL support and complete React, Angular, Vue &amp; Laravel versions. Grab your copy now and get life-time updates for free." />
		<meta name="keywords" content="Metronic, bootstrap, bootstrap 5, Angular, VueJs, React, Laravel, admin themes, web design, figma, web development, free templates, free admin themes, bootstrap theme, bootstrap template, bootstrap dashboard, bootstrap dak mode, bootstrap button, bootstrap datepicker, bootstrap timepicker, fullcalendar, datatables, flaticon" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="article" />
		<meta property="og:title" content="Metronic - Bootstrap 5 HTML, VueJS, React, Angular &amp; Laravel Admin Dashboard Theme" />
		<meta property="og:url" content="https://richkardz.com" />
		<meta property="og:site_name" content="Rich Kardz" />
		<link rel="canonical" href="https://richkardz.com" />
		<link rel="shortcut icon" href="/admin/assets/media/logos/favicon.ico" />

		<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet"/>
		<link href="/admin/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/admin/assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/admin/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/admin/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
	</head>

	<body id="kt_body" className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style={{"--kt-toolbar-height":"55px","--kt-toolbar-height-tablet-and-mobile":"55px"}}>
  		<div className="d-flex flex-column flex-root">
			<div className="page d-flex flex-row flex-column-fluid">
				<Sidebar />
				<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header />
					{/* <Breadcrumbs /> */}
                    {/* <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap">
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        <img src="/admin/assets/media/avatars/300-1.jpg" alt="image" />
                                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center mb-2">
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">Max Smith</a>
                                                <a href="#"><i className="ki-duotone ki-verify fs-1 text-primary"><span className="path1"></span><span className="path2"></span></i></a>
                                            </div>                      
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    <i className="ki-duotone ki-profile-circle fs-4 me-1"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i>                                Developer
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    <i className="ki-duotone ki-geolocation fs-4 me-1"><span className="path1"></span><span className="path2"></span></i>                                SF, Bay Area
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                                    <i className="ki-duotone ki-sms fs-4"><span className="path1"></span><span className="path2"></span></i>                                max@kt.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap flex-stack">
                                    <div className="d-flex flex-column flex-grow-1 pe-8">
                                        <div className="d-flex flex-wrap">
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>                                    <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="4500" data-kt-countup-prefix="$">0</div>
                                                </div>
                                                <div className="fw-semibold fs-6 text-gray-400">Earnings</div>
                                            </div>
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="ki-duotone ki-arrow-down fs-3 text-danger me-2"><span className="path1"></span><span className="path2"></span></i>                                    <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="80">0</div>
                                                </div>
                                                <div className="fw-semibold fs-6 text-gray-400">Projects</div>
                                            </div>
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>                                    <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="60" data-kt-countup-prefix="%">0</div>
                                                </div>
                                                <div className="fw-semibold fs-6 text-gray-400">Success Rate</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     */}

                    <div className="card mb-5 mb-xl-10">
                        <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            <div className="card-title m-0">
                                <h3 className="fw-bold m-0">Profile Details</h3>
                            </div>
                        </div>
                        <div id="kt_account_settings_profile_details" className="collapse show">
                            <Formik
                                initialValues={{
                                first_name: "",
                                last_name: "",
                                phone: "",
                                email: "",
                                }}
                                validate={(values) => {
                                const errors = {};
                                if (!values.first_name) {
                                    errors.first_name = "First name can not be blank";
                                }
                                if (!values.last_name) {
                                    errors.last_name = "Last name can not be blank";
                                }
                                if (!values.phone) {
                                    errors.phone = "Phone number cannot be blank";
                                } else if (values.phone.length < 8) {
                                    errors.phone = "At least 8 digits are required";
                                }

                                if (!values.email) {
                                    errors.email = "Email can not be blank";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }
                                return errors;
                                }}
                                onSubmit={(values, helper) => {
                                handleSubmit(values, helper);
                                }}
                            >
                                {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                                /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body border-top p-9">
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Avatar</label>   
                                                <div className="col-lg-8">
                                                    <div className="image-input image-input-outline" data-kt-image-input="true" style={{"backgroundImage": "url(/metronic8/demo1/assets/media/svg/avatars/blank.svg)"}}>
                                                        <div className="image-input-wrapper w-125px h-125px" style={{"backgroundImage": "url(/admin/assets/media/avatars/300-1.jpg)"}}></div>
                                                        <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                                                            <i className="ki-duotone ki-pencil fs-7"><span className="path1"></span><span className="path2"></span></i>
                                                            <input type="file" name="avatar" accept=".png, .jpg, .jpeg"/>
                                                            <input type="hidden" name="avatar_remove"/>
                                                        </label>
                                                        <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                            <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span className="path2"></span></i>                            </span>
                                                        <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                            <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span className="path2"></span></i>                            </span>
                                                    </div>
                                                    <div className="form-text">Allowed file types:  png, jpg, jpeg.</div>
                                                </div>
                                            </div>

                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                                                <div className="col-lg-8">
                                                    <div className="row">
                                                        <div className="col-lg-6 fv-row">
                                                            <input 
                                                                type="text" 
                                                                name="first_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.first_name} 
                                                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                                                                placeholder="First name" 
                                                            />
                                                        </div>
                                                        <div className="col-lg-6 fv-row">
                                                            <input 
                                                                type="text" 
                                                                name="last_name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.last_name} 
                                                                className="form-control form-control-lg form-control-solid" 
                                                                placeholder="Last name" 
                                                            />
                                                        </div>
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {errors.last_name && touched.last_name && errors.last_name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Email</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="email" className="form-control form-control-lg form-control-solid" placeholder="Email Address" value="Keenthemes" />
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                    <span className="required"> Phone</span>

                                                    
                                                    <span className="ms-1"  data-bs-toggle="tooltip" title="Phone number must be active" >
                                                        <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                            <span className="path3"></span>
                                                        </i>
                                                    </span>                    
                                                </label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="tel" name="phone" className="form-control form-control-lg form-control-solid" placeholder="Phone number" value="044 3276 454 935" />
                                                </div>
                                            </div>

                                            {/* <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Company Site</label>
                                                <div className="col-lg-8 fv-row">
                                                    <input type="text" name="website" className="form-control form-control-lg form-control-solid" placeholder="Company website" value="keenthemes.com" />
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                                    <span className="required">Country</span> 
                                                    <span className="ms-1"  data-bs-toggle="tooltip" title="Country of origination" >
                                                        <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                            <span className="path3"></span>
                                                        </i>
                                                    </span>                    
                                                </label>
                                                <div className="col-lg-8 fv-row">
                                                    <select name="country" aria-label="Select a Country" data-control="select2" data-placeholder="Select a country..." className="form-select form-select-solid form-select-lg fw-semibold">
                                                        <option value="">Select a Country...</option>
                                                        <option data-kt-flag="flags/afghanistan.svg" value="AF">Afghanistan</option>
                                                        <option data-kt-flag="flags/aland-islands.svg" value="AX">Aland Islands</option>
                                                        <option data-kt-flag="flags/albania.svg" value="AL">Albania</option>
                                                        <option data-kt-flag="flags/zimbabwe.svg" value="ZW">Zimbabwe</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Language</label>
                                                <div className="col-lg-8 fv-row">
                                                    <select name="language" aria-label="Select a Language" data-control="select2" data-placeholder="Select a language..." className="form-select form-select-solid form-select-lg">
                                                        <option value="">Select a Language...</option>
                                                        <option data-kt-flag="flags/indonesia.svg" value="id">Bahasa Indonesia - Indonesian</option>
                                                        <option data-kt-flag="flags/malaysia.svg" value="msa">Bahasa Melayu - Malay</option>
                                                        <option data-kt-flag="flags/china.svg" value="zh-cn">简体中文 - Simplified Chinese</option>
                                                        <option data-kt-flag="flags/taiwan.svg" value="zh-tw">繁體中文 - Traditional Chinese</option>
                                                    </select>
                                                    <div className="form-text">
                                                        Please select a preferred language, including date, time, and number formatting.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Time Zone</label>
                                                <div className="col-lg-8 fv-row">
                                                    <select name="timezone" aria-label="Select a Timezone" data-control="select2" data-placeholder="Select a timezone.." className="form-select form-select-solid form-select-lg">
                                                        <option value="">Select a Timezone..</option>
                                                        <option data-bs-offset="43200" value="Kamchatka">(GMT+12:00) Kamchatka</option>
                                                        <option data-bs-offset="43200" value="Marshall Is.">(GMT+12:00) Marshall Is.</option>
                                                        <option data-bs-offset="43200" value="Auckland">(GMT+12:00) Auckland</option>
                                                        <option data-bs-offset="43200" value="Wellington">(GMT+12:00) Wellington</option>
                                                        <option data-bs-offset="46800" value="Nuku'alofa">(GMT+13:00) Nuku'alofa</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label  fw-semibold fs-6">Currency</label>
                                                <div className="col-lg-8 fv-row">
                                                    <select name="currnecy" aria-label="Select a Currency" data-control="select2" data-placeholder="Select a currency.." className="form-select form-select-solid form-select-lg">
                                                        <option value="">Select a currency..</option>
                                                        <option data-kt-flag="flags/united-states.svg" value="USD"><b>USD</b>&nbsp;-&nbsp;USA dollar</option>
                                                        <option data-kt-flag="flags/united-kingdom.svg" value="GBP"><b>GBP</b>&nbsp;-&nbsp;British pound</option>
                                                        <option data-kt-flag="flags/australia.svg" value="AUD"><b>AUD</b>&nbsp;-&nbsp;Australian dollar</option>
                                                        <option data-kt-flag="flags/japan.svg" value="JPY"><b>JPY</b>&nbsp;-&nbsp;Japanese yen</option>
                                                        <option data-kt-flag="flags/sweden.svg" value="SEK"><b>SEK</b>&nbsp;-&nbsp;Swedish krona</option>
                                                        <option data-kt-flag="flags/canada.svg" value="CAD"><b>CAD</b>&nbsp;-&nbsp;Canadian dollar</option>
                                                        <option data-kt-flag="flags/switzerland.svg" value="CHF"><b>CHF</b>&nbsp;-&nbsp;Swiss franc</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="row mb-6">
                                                <label className="col-lg-4 col-form-label required fw-semibold fs-6">Communication</label>
                                                <div className="col-lg-8 fv-row">
                                                    <div className="d-flex align-items-center mt-3">
                                                        <label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                                                            <input className="form-check-input" name="communication[]" type="checkbox" value="1"/>
                                                            <span className="fw-semibold ps-2 fs-6">
                                                                Email
                                                            </span>
                                                        </label>
                                                        <label className="form-check form-check-custom form-check-inline form-check-solid">
                                                            <input className="form-check-input" name="communication[]" type="checkbox" value="2"/>
                                                            <span className="fw-semibold ps-2 fs-6">
                                                                Phone
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-0">
                                                <label className="col-lg-4 col-form-label fw-semibold fs-6">Allow Marketing</label>
                                                <div className="col-lg-8 d-flex align-items-center">
                                                    <div className="form-check form-check-solid form-switch form-check-custom fv-row">
                                                        <input className="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" checked />
                                                        <label className="form-check-label" for="allowmarketing"></label>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="card-footer d-flex justify-content-end py-6 px-9">
                                            <button type="reset" className="btn btn-light btn-active-light-primary me-2">Discard</button>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save Changes</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
					<Footer />  
				</div>
			</div>
		</div>
		<script>var hostUrl = "assets/"</script>
		<script src="/admin/assets/plugins/global/plugins.bundle.js"></script>
		<script src="/admin/assets/js/scripts.bundle.js"></script>
		<script src="/admin/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js"></script>
		<script src="/admin/assets/plugins/custom/datatables/datatables.bundle.js"></script>
		<script src="/admin/assets/js/widgets.bundle.js"></script>
		<script src="/admin/assets/js/custom/widgets.js"></script>
		<script src="/admin/assets/js/custom/apps/chat/chat.js"></script>
		<script src="/admin/assets/js/custom/utilities/modals/upgrade-plan.js"></script>
		<script src="/admin/assets/js/custom/utilities/modals/create-app.js"></script>
		<script src="/admin/assets/js/custom/utilities/modals/users-search.js"></script>
  </body>
    </>
  )
}

export default UserProfile;