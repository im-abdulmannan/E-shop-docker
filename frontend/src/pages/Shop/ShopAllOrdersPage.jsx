import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import ShopAllOrders from "../../components/Shop/ShopAllOrders";

const ShopAllOrdersPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
