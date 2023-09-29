import React from "react";
import AdminOrders from "../components/Admin/AdminOrders";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";

const AdminDashboardOrdersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={2} />
          </div>
          <AdminOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersPage;
