import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserOrders } from "../../redux/actions/orderAction";
import styles from "../../styles/styles";

const UserTrackOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div>
      <>
        {data && data?.status === "Processing" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">Your order is processing in shop</h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "Giving away to delivery partner" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">
                Your order has been transferred to delivery partner
              </h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "Shipping" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">Your order is Shipping now</h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "Received" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">Your order is has been received</h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "On the way" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">
                Your order is on the way, stay tunned
              </h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "Delivered" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">Collect your order</h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}

        {data && data?.status === "Processing Refund" && (
          <>
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <h1 className="text-[20px]">
                Refund request has been placed successfully
              </h1>
              <br />
              <Link
                to={"/profile"}
                className={`${styles.cart_button} w-max text-white`}
              >
                Back to profile
              </Link>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default UserTrackOrder;
