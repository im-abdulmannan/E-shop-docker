import React from "react";
import { BsHandbag, BsShop } from "react-icons/bs";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminSidebar = ({ active }) => {
  return (
    <div className="w-full h-screen fit bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard"}
          className={`w-full flex items-center ${
            active === 1 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <RxDashboard size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-orders"}
          className={`w-full flex items-center ${
            active === 2 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <FiShoppingBag size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-sellers"}
          className={`w-full flex items-center ${
            active === 3 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <BsShop size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-users"}
          className={`w-full flex items-center ${
            active === 4 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <HiOutlineUserGroup size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-products"}
          className={`w-full flex items-center ${
            active === 5 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <BsHandbag size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-events"}
          className={`w-full flex items-center ${
            active === 6 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <MdOutlineLocalOffer size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-withdraw-request"}
          className={`w-full flex items-center ${
            active === 7 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <CiMoneyBill size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin/dashboard-settings"}
          className={`w-full flex items-center ${
            active === 8 ? "text-[crimson]" : "text-[#555]"
          }`}
        >
          <CiSettings size={30} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[500]`}>
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
