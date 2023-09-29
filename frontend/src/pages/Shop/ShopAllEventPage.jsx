import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import ShopAllEvents from "../../components/Shop/ShopAllEvents";

const ShopAllEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventPage;
