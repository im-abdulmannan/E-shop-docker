import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cartAction";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already exists in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item has been added to cart");
      }
    }
  };

  return (
    <div
      className={`mx-8 block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 gap-5`}
    >
      <div className="w-full lg:w-[50%] m-auto items-center justify-center flex">
        <img src={`${backend_url}${data?.images[0]}`} alt="" />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="text-justify">{data?.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>

          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} Sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex w-full gap-4 justify-end">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.cart_button} bg-blue-700 text-white`}>
              See details
            </div>
          </Link>
          <div
            className={`${styles.cart_button} bg-blue-700 text-white`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
