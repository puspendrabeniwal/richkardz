"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Skeleton } from "primereact/skeleton";

import instance from "@/app/axiosInterceptor";
import { API_URL } from "@/app/global_constant";

export default function InstamojoPaymentStatus() {
  const searchParams = useSearchParams();

  useEffect(() => {
    updateOrderStatus();
  });

  const updateOrderStatus = () => {
    let formdata = new FormData();
    formdata.append("payment_id", searchParams.get("payment_id"));
    formdata.append("payment_status", searchParams.get("payment_status"));
    formdata.append("payment_request_id", searchParams.get("payment_request_id"));
    instance
      .post(`${API_URL}/`, formdata)
      .then((response) => {
        let data = response && response.result ? response.result : {};
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
  <div className="row">
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="border-round border-1 surface-border p-4 surface-card">
        <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
        <Skeleton className="mb-2" width="75%"></Skeleton>
        <Skeleton width="50%" className="mb-2"></Skeleton>
        <Skeleton width="90%" className="mb-2"></Skeleton>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="border-round border-1 surface-border p-4 surface-card">
        <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
        <Skeleton className="mb-2" width="75%"></Skeleton>
        <Skeleton width="50%" className="mb-2"></Skeleton>
        <Skeleton width="90%" className="mb-2"></Skeleton>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="border-round border-1 surface-border p-4 surface-card">
        <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
        <Skeleton className="mb-2" width="75%"></Skeleton>
        <Skeleton width="50%" className="mb-2"></Skeleton>
        <Skeleton width="90%" className="mb-2"></Skeleton>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="border-round border-1 surface-border p-4 surface-card">
        <Skeleton className="mb-2" width="100%" height="150px"></Skeleton>
        <Skeleton className="mb-2" width="75%"></Skeleton>
        <Skeleton width="50%" className="mb-2"></Skeleton>
        <Skeleton width="90%" className="mb-2"></Skeleton>
      </div>
    </div>
  </div>
  );
}
