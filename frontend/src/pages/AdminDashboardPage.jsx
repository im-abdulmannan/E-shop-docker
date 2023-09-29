import React from "react";
import AdminHero from "../components/Admin/AdminHero";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={1} />
          </div>
          <div className="w-full">
            <AdminHero />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
