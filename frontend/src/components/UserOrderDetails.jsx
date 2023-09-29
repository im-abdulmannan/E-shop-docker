import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserOrders } from "../redux/actions/orderAction";
import { backend_url, server } from "../server";
import styles from "../styles/styles";

const UserOrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        setRating(1);
        setOpen(false);
        dispatch(getUserOrders(user._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund/${id}`,
        {
          status: "Processing Refund",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.cart[0].shopId;

      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to access this resource");
    }
  };


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full items-center flex justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[20px]">Order details</h1>
        </div>
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
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
            {item.isReviewed || data?.status !== "Delivered" ? null : (
              <div
                className={`${styles.cart_button} text-white min-w-max`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div>
            )}
          </div>
        ))}

      {/* Review popup card */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={25}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>

            <br />
            <div className="w-full flex">
              <img
                src={`${backend_url}/${selectedItem?.images[0]}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[18px] text-[#00000091]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* Ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1 gap-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            <br />

            <div className="w-full ml-3">
              <label htmlFor="comment" className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#0000004b]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="10"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product?"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>

            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

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

          <br />
          {data?.status === "Delivered" && (
            <div
              className={`${styles.cart_button} text-white w-[30%] rounded-md`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>

      <br />
      <div
        className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
        onClick={handleMessageSubmit}
      >
        <span className="text-white flex items-center">
          Send Message <AiOutlineMessage className="ml-1" />
        </span>
      </div>
    </div>
  );
};

export default UserOrderDetails;
