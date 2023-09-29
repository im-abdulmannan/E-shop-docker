import React from "react";
import AdminSellers from "../components/Admin/AdminSellers";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";

const AdminDashboardSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={3} />
          </div>
          <AdminSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellersPage;
