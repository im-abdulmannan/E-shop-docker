import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineFolderAdd,
  AiOutlineMoneyCollect,
} from "react-icons/ai";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShopOrders } from "../../redux/actions/orderAction";
import { getAllShopProducts } from "../../redux/actions/productAction";
import styles from "../../styles/styles";

const DashboardMain = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const availableBalance = seller?.availableBalance.toFixed(2);

  useEffect(() => {
    dispatch(getShopOrders(seller._id));
    dispatch(getAllShopProducts(seller._id));
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.row.status;
        return status === "Delivered" || status === "Refund Success"
          ? "text-green-600"
          : "text-red-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Preview Order Details",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US $" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px]">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        {/* Total Balance */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charges)</span>
            </h3>
          </div>

          <h5 className="pt-2 pl-9 text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to={"/dashboard-withdraw-money"}>
            <h5 className="pt-4 pl-7 text-[#077f9c]">Withdraw money</h5>
          </Link>
        </div>

        {/* Total Orders */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center gap-2">
            <PiShoppingBagOpenLight
              size={27}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>

          <h5 className="pt-2 pl-9 text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to={"/dashboard-orders"}>
            <h5 className="pt-4 pl-7 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        {/* Total Products */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center gap-2">
            <AiOutlineFolderAdd size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>

          <h5 className="pt-2 pl-9 text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to={"/dashboard-products"}>
            <h5 className="pt-4 pl-7 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>

      <br />

      <div>
        <h3 className="text-[22px] font-Poppins pb-2">Latest Order</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
