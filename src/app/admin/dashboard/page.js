'use client'
import Link from 'next/link';
import Image from 'next/image'
import Header from './../components/Header';
import Footer from './../components/Footer';
import Sidebar from './../components/Sidebar';
import Breadcrumbs from './../components/Breadcrumbs';
export const  Dashboard = ()=> {
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
					<Breadcrumbs />
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

export default Dashboard;