'use client'
import Link from "next/link";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState , useRef} from "react";

import instance from "../axiosInterceptor";

export const  Products = ()=> {
    const [products, setProducts] = useState([]);


    const getProducts=()=>{
        let loginUser = JSON.parse(localStorage.getItem("loginInfo"));

        let formData = new FormData();    //formdata object
        formData.append("user_id", loginUser._id);   //append the values with key, value pair
        formData.append("skip", 10);   //append the values with key, value pair
        formData.append("limit", 10);   //append the values with key, value pair

        instance.post("products", formData)
        .then(response => {
            let data = (response.result) ? response.result : {};
            setProducts(data);
        })
        .catch(error => {
            console.log(error);
        });
    }


    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            'product_name': { value: '', matchMode: 'contains' },
            'discount': { value: '', matchMode: 'contains' },
            'price': { value: '', matchMode: 'contains' }
        }
    });

    useEffect(() => {
        getProducts()
    },[])

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getValue(rowData.status)} severity={getSeverity(rowData.status)}></Tag>;
    };

    const featureBodyTemplate = (rowData) => {
        return <Tag value={changeLevel(rowData.is_feature)} severity={getSeverity(rowData.is_feature)}></Tag>;
    };

    const releaseBodyTemplate = (rowData) => {
        return <Tag value={changeLevel(rowData.is_new_release)} severity={getSeverity(rowData.is_new_release)}></Tag>;
    };
    const getSeverity = (value) => {
        switch (value) {
            case 1:
                return 'success';

            case 0:
                return 'warning';

            default:
                return null;
        }
    };

    const changeLevel = (value) => {
        switch (value) {
            case 1:
                return 'Yes';

            case 0:
                return 'No';

            default:
                return null;
        }
    };

    const getValue = (value) => {
        switch (value) {
            case 1:
                return 'Active';

            case 0:
                return 'Inacitve';

            default:
                return null;
        }
    };

    const UpdateButtonLink = (rowData)=>{
        return <Link href={`/admin/products/update/${rowData._id}`} className="btn btn-sm btn-info" type="button">Update</Link>
    }

    const [loading, setLoading] = useState(false);
    const onPage = (event) => {
        setlazyState(event);
    };

    const onSort = (event) => {
        setlazyState(event);
    };

    const onFilter = (event) => {
        event['first'] = 0;
        setlazyState(event);
    };

  return (
    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div className=" d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" className="container-xxl">
                <div className="card p-4" >
                    <div className="card-header border-0 pt-6">
                        <div className="card-title">

                            <div className="d-flex align-items-center position-relative my-1">
                                
                               Product Management
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">


                                <Link href="/admin/products/add" type="button" className="btn btn-primary">
                                <span className="svg-icon svg-icon-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                        <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                    </svg>
                                </span>
                                Add Product</Link>
                            </div>
                            <div className="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                                <div className="fw-bolder me-5">
                                <span className="me-2" data-kt-user-table-select="selected_count"></span>Selected</div>
                                <button type="button" className="btn btn-danger" data-kt-user-table-select="delete_selected">Delete Selected</button>
                            </div>


                        </div>
                    </div>
                    <div className="card-body py-4">
                        <DataTable  
                            value={products} 
                            filterDisplay="row" 
                            paginator
                            rows={5} 
                            totalRecords={50}   
                            tableStyle={{ minWidth: '75rem' }}
                        >
                            <Column field="" header="#"></Column>
                            <Column field="product_name" sortable  header="Name" filter filterPlaceholder="Search"></Column>
                            <Column field="discount" sortable  filter filterPlaceholder="Search" header="Discount" ></Column>
                            <Column field="price" sortable filter filterPlaceholder="Search"  header="Price"></Column>
                            <Column field="profession" sortable  header="Profession"></Column>
                            <Column field="card_type" sortable  header="Card Type"></Column>
                            <Column field="is_feature" header="Is Feature"  body={featureBodyTemplate}></Column>
                            <Column field="is_new_release" header="New Release" body={releaseBodyTemplate}></Column>
                            <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                            <Column field="" header="Action" body={UpdateButtonLink}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products;