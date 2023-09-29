import React from "react";
import AdminUsers from "../components/Admin/AdminUsers";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";

const AdminDashboardUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={4} />
          </div>
          <AdminUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsersPage;
