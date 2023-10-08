import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getShopOrders } from "../../redux/actions/orderAction";
import { server } from "../../server";
import styles from "../../styles/styles";

const ShopOrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getShopOrders(seller._id));
  }, [dispatch, seller]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Order status has been updated!");
        dispatch(getShopOrders(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Order status has been updated!");
        dispatch(getShopOrders(seller._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full items-center flex justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[20px]">Order details</h1>
        </div>
        <Link to={"/dashboard-orders"}>
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order list
          </div>
        </Link>
      </div>

      <div className="w-full items-center flex justify-between">
        <h5>
          <span className="text-[#e94560] font-[600]">Order ID#</span>{" "}
          {data?._id?.slice(0, 8)}
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: {data?.createdAt?.slice(0, 10)}
        </h5>
      </div>

      {/* Order Items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={item.images[0]}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <div className="pl-3 text-[20px]">{item.name}</div>
              <div className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </div>
            </div>
          </div>
        ))}

      <div className="border-t-4 w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>

      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address: </h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.city + ", " + data?.shippingAddress.country}
          </h4>
          <h4 className="pt-3 text-[20px]">
            <strong>Phone Number:</strong> {data?.user?.phoneNumber}
          </h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-4 text-[20px]">
            <strong>Payment Info: </strong> <br /> <tt>Status: </tt>
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "COD"}
          </h4>
        </div>
      </div>

      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      <div className="flex gap-4">
        {data &&
          data?.status !== "Processing Refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 w-[250px]"
            >
              {[
                "Processing",
                "Giving away to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Giving away to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}

        {data?.status === "Processing Refund" ||
          (data?.status === "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 w-[200px]"
            >
              {["Processing Refund", "Refund Success"]
                .slice(
                  ["Processing Refund", "Refund Success"].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          ))}
      </div>

      <div
        className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Processing Refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default ShopOrderDetails;
