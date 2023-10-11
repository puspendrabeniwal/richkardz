'use client'
import withAuth from "@/hocFront/withAuth";
const  Dashboard = ()=> {
  return (
	  <main>
      <div className="d-flex flex-column flex-column-fluid mb-10" id="kt_content">
        <div className="toolbar" id="kt_toolbar">
            <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                    <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">
                    <span className="h-20px border-1 border-gray-200 border-start ms-3 mx-2 me-1">Home</span>
                    {/* <span className="text-muted fs-7 fw-bold mt-2">#XRS-45670</span> */}
                    </h1>

                </div>
            </div>
        </div>
      </div>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
        {/* <div className="row g-5 g-xl-8">
              <div className="col-xl-4">
                  <a href="#" className="card bg-body hoverable card-xl-stretch mb-xl-8">
                      <div className="card-body">
                          <i className="ki-duotone ki-chart-simple text-primary fs-2x ms-n1"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></i>        

                          <div className="text-gray-900 fw-bold fs-2 mb-2 mt-5">           
                              500M$                   
                          </div>

                          <div className="fw-semibold text-gray-400">
                          SAP UI Progress        </div>
                      </div>
                  </a>
              </div>
              <div className="col-xl-4">
                  <a href="#" className="card bg-dark hoverable card-xl-stretch mb-xl-8">
                      <div className="card-body">
                          <i className="ki-duotone ki-chart-simple text-gray-100 fs-2x ms-n1"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></i>        

                          <div className="text-gray-100 fw-bold fs-2 mb-2 mt-5">           
                              500M$                   
                          </div>

                          <div className="fw-semibold text-gray-100">
                          New Customers        </div>
                      </div>
                  </a>
              </div>
              <div className="col-xl-4">
                  <a href="#" className="card bg-warning hoverable card-xl-stretch mb-xl-8">
                      <div className="card-body">
                          <i className="ki-duotone ki-chart-simple text-primary fs-2x ms-n1"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></i>        

                          <div className="text-white fw-bold fs-2 mb-2 mt-5">           
                              1500M$                   
                          </div>

                          <div className="fw-semibold text-white">
                          Milestone Reached </div>
                      </div>
                  </a>
              </div>
          </div>

          <div className="row g-5 g-xl-8">
            <div className="col-xl-4">
                <div className="card bg-light-success card-xl-stretch mb-xl-8">

                    <div className="card-body my-3">
                        <a href="#" className="card-title fw-bold text-success fs-5 mb-3 d-block">
                            Project Progress        </a>
                        
                        <div className="py-1">
                            <span className="text-dark fs-1 fw-bold me-2">50%</span>
                            
                            <span className="fw-semibold text-muted fs-7">Avarage</span>
                        </div>

                        <div className="progress h-7px bg-success bg-opacity-50 mt-7">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: "50%"}} ariaValuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-xl-4">
                <div className="card bg-light-warning card-xl-stretch mb-xl-8">

                    <div className="card-body my-3">
                        <a href="#" className="card-title fw-bold text-warning fs-5 mb-3 d-block">
                            Company Finance        </a>
                        
                        <div className="py-1">
                            <span className="text-dark fs-1 fw-bold me-2">50%</span>
                            
                            <span className="fw-semibold text-muted fs-7">Avarage</span>
                        </div>

                        <div className="progress h-7px bg-warning bg-opacity-50 mt-7">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "50%"}} ariaValuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-xl-4">
                <div className="card bg-light-info card-xl-stretch mb-xl-8">

                    <div className="card-body my-3">
                        <a href="#" className="card-title fw-bold text-info fs-5 mb-3 d-block">
                            Marketing Analysis        </a>
                        
                        <div className="py-1">
                            <span className="text-dark fs-1 fw-bold me-2">50%</span>
                            
                            <span className="fw-semibold text-muted fs-7">Avarage</span>
                        </div>

                        <div className="progress h-7px bg-info bg-opacity-50 mt-7">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} ariaValuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                </div>

            </div>
          </div> */}

          <div className="row gy-5 g-xl-10">
            <div className="col-sm-6 col-xl-3 mb-xl-10">
              <div className="card h-lg-100">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M18.4 5.59998C21.9 9.09998 21.9 14.8 18.4 18.3C14.9 21.8 9.2 21.8 5.7 18.3L18.4 5.59998Z" fill="currentColor" />
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM19.9 11H13V8.8999C14.9 8.6999 16.7 8.00005 18.1 6.80005C19.1 8.00005 19.7 9.4 19.9 11ZM11 19.8999C9.7 19.6999 8.39999 19.2 7.39999 18.5C8.49999 17.7 9.7 17.2001 11 17.1001V19.8999ZM5.89999 6.90002C7.39999 8.10002 9.2 8.8 11 9V11.1001H4.10001C4.30001 9.4001 4.89999 8.00002 5.89999 6.90002ZM7.39999 5.5C8.49999 4.7 9.7 4.19998 11 4.09998V7C9.7 6.8 8.39999 6.3 7.39999 5.5ZM13 17.1001C14.3 17.3001 15.6 17.8 16.6 18.5C15.5 19.3 14.3 19.7999 13 19.8999V17.1001ZM13 4.09998C14.3 4.29998 15.6 4.8 16.6 5.5C15.5 6.3 14.3 6.80002 13 6.90002V4.09998ZM4.10001 13H11V15.1001C9.1 15.3001 7.29999 16 5.89999 17.2C4.89999 16 4.30001 14.6 4.10001 13ZM18.1 17.1001C16.6 15.9001 14.8 15.2 13 15V12.8999H19.9C19.7 14.5999 19.1 16.0001 18.1 17.1001Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex flex-column my-7">
                    <span className="fw-bold fs-3x text-gray-800 lh-1 ls-n2">327</span>
                    <div className="m-0">
                      <span className="fw-bold fs-6 text-gray-400">Orders</span>
                    </div>
                  </div>
                  <span className="badge badge-success fs-base">
                  <span className="svg-icon svg-icon-5 svg-icon-white ms-n1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                      <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                    </svg>
                  </span>
                  2.1%</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mb-xl-10">
              <div className="card h-lg-100">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M18.4 5.59998C21.9 9.09998 21.9 14.8 18.4 18.3C14.9 21.8 9.2 21.8 5.7 18.3L18.4 5.59998Z" fill="currentColor" />
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM19.9 11H13V8.8999C14.9 8.6999 16.7 8.00005 18.1 6.80005C19.1 8.00005 19.7 9.4 19.9 11ZM11 19.8999C9.7 19.6999 8.39999 19.2 7.39999 18.5C8.49999 17.7 9.7 17.2001 11 17.1001V19.8999ZM5.89999 6.90002C7.39999 8.10002 9.2 8.8 11 9V11.1001H4.10001C4.30001 9.4001 4.89999 8.00002 5.89999 6.90002ZM7.39999 5.5C8.49999 4.7 9.7 4.19998 11 4.09998V7C9.7 6.8 8.39999 6.3 7.39999 5.5ZM13 17.1001C14.3 17.3001 15.6 17.8 16.6 18.5C15.5 19.3 14.3 19.7999 13 19.8999V17.1001ZM13 4.09998C14.3 4.29998 15.6 4.8 16.6 5.5C15.5 6.3 14.3 6.80002 13 6.90002V4.09998ZM4.10001 13H11V15.1001C9.1 15.3001 7.29999 16 5.89999 17.2C4.89999 16 4.30001 14.6 4.10001 13ZM18.1 17.1001C16.6 15.9001 14.8 15.2 13 15V12.8999H19.9C19.7 14.5999 19.1 16.0001 18.1 17.1001Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex flex-column my-7">
                    <span className="fw-bold fs-3x text-gray-800 lh-1 ls-n2">327</span>
                    <div className="m-0">
                      <span className="fw-bold fs-6 text-gray-400">Orders</span>
                    </div>
                  </div>
                  <span className="badge badge-success fs-base">
                  <span className="svg-icon svg-icon-5 svg-icon-white ms-n1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                      <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                    </svg>
                  </span>
                  2.1%</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mb-xl-10">
              <div className="card h-lg-100">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M18.4 5.59998C21.9 9.09998 21.9 14.8 18.4 18.3C14.9 21.8 9.2 21.8 5.7 18.3L18.4 5.59998Z" fill="currentColor" />
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM19.9 11H13V8.8999C14.9 8.6999 16.7 8.00005 18.1 6.80005C19.1 8.00005 19.7 9.4 19.9 11ZM11 19.8999C9.7 19.6999 8.39999 19.2 7.39999 18.5C8.49999 17.7 9.7 17.2001 11 17.1001V19.8999ZM5.89999 6.90002C7.39999 8.10002 9.2 8.8 11 9V11.1001H4.10001C4.30001 9.4001 4.89999 8.00002 5.89999 6.90002ZM7.39999 5.5C8.49999 4.7 9.7 4.19998 11 4.09998V7C9.7 6.8 8.39999 6.3 7.39999 5.5ZM13 17.1001C14.3 17.3001 15.6 17.8 16.6 18.5C15.5 19.3 14.3 19.7999 13 19.8999V17.1001ZM13 4.09998C14.3 4.29998 15.6 4.8 16.6 5.5C15.5 6.3 14.3 6.80002 13 6.90002V4.09998ZM4.10001 13H11V15.1001C9.1 15.3001 7.29999 16 5.89999 17.2C4.89999 16 4.30001 14.6 4.10001 13ZM18.1 17.1001C16.6 15.9001 14.8 15.2 13 15V12.8999H19.9C19.7 14.5999 19.1 16.0001 18.1 17.1001Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex flex-column my-7">
                    <span className="fw-bold fs-3x text-gray-800 lh-1 ls-n2">327</span>
                    <div className="m-0">
                      <span className="fw-bold fs-6 text-gray-400">Orders</span>
                    </div>
                  </div>
                  <span className="badge badge-success fs-base">
                  <span className="svg-icon svg-icon-5 svg-icon-white ms-n1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                      <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                    </svg>
                  </span>
                  2.1%</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mb-xl-10">
              <div className="card h-lg-100">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M18.4 5.59998C21.9 9.09998 21.9 14.8 18.4 18.3C14.9 21.8 9.2 21.8 5.7 18.3L18.4 5.59998Z" fill="currentColor" />
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM19.9 11H13V8.8999C14.9 8.6999 16.7 8.00005 18.1 6.80005C19.1 8.00005 19.7 9.4 19.9 11ZM11 19.8999C9.7 19.6999 8.39999 19.2 7.39999 18.5C8.49999 17.7 9.7 17.2001 11 17.1001V19.8999ZM5.89999 6.90002C7.39999 8.10002 9.2 8.8 11 9V11.1001H4.10001C4.30001 9.4001 4.89999 8.00002 5.89999 6.90002ZM7.39999 5.5C8.49999 4.7 9.7 4.19998 11 4.09998V7C9.7 6.8 8.39999 6.3 7.39999 5.5ZM13 17.1001C14.3 17.3001 15.6 17.8 16.6 18.5C15.5 19.3 14.3 19.7999 13 19.8999V17.1001ZM13 4.09998C14.3 4.29998 15.6 4.8 16.6 5.5C15.5 6.3 14.3 6.80002 13 6.90002V4.09998ZM4.10001 13H11V15.1001C9.1 15.3001 7.29999 16 5.89999 17.2C4.89999 16 4.30001 14.6 4.10001 13ZM18.1 17.1001C16.6 15.9001 14.8 15.2 13 15V12.8999H19.9C19.7 14.5999 19.1 16.0001 18.1 17.1001Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex flex-column my-7">
                    <span className="fw-bold fs-3x text-gray-800 lh-1 ls-n2">100</span>
                    <div className="m-0">
                      <span className="fw-bold fs-6 text-gray-400">Products</span>
                    </div>
                  </div>
                  <span className="badge badge-success fs-base">
                  <span className="svg-icon svg-icon-5 svg-icon-white ms-n1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                      <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                    </svg>
                  </span>
                  2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default withAuth(Dashboard);