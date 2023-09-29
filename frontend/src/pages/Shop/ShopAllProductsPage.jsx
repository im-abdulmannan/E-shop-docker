import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import ShopAllProducts from "../../components/Shop/ShopAllProducts";

const ShopAllProductsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProductsPage;
