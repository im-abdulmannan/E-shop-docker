import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllShopProducts } from "../../redux/actions/productAction";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllShopProducts(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    toast.success("Logout from shop successfully!");
    window.location.reload();
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${backend_url}${data?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description}
            </p>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000a6]">{averageRating}/5</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>

          {isOwner && (
            <>
              <div className="py-3 px-4">
                <Link to={"/dashboard-settings"}>
                  <div
                    className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                  >
                    <span className="text-white">Edit Shop</span>
                  </div>
                </Link>

                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                  onClick={logoutHandler}
                >
                  <span className="text-white">Log Out</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
