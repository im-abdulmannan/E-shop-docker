import React from "react";
import AdminWithdraw from "../components/Admin/AdminWithdraw";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";

const AdminWithdrawPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={7} />
          </div>
          <AdminWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawPage;
