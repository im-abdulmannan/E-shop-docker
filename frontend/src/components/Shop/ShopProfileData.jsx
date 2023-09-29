import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { getAllShopEvents } from "../../redux/actions/eventAction";
import { getAllShopProducts } from "../../redux/actions/productAction";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import Ratings from "../Products/Ratings";
import ProductCard from "../Route/ProductCard/ProductCard";

const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const { events } = useSelector((state) => state.event);

  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllShopProducts(id));
    dispatch(getAllShopEvents(seller && seller._id));
  }, [dispatch, seller, id]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex gap-5">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[500] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div>
          {isOwner && (
            <div>
              <Link to={"/dashboard"}>
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go to Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {/* Shop Products */}
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard key={index} data={i} isShop={true} />
            ))}
        </div>
      )}

      {/* Shop Events */}
      {active === 2 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {events &&
            events.map((i, index) => (
              <ProductCard key={index} data={i} isShop={true} isEvent={true} />
            ))}
        </div>
      )}

      {/* Shop reviews */}
      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div key={item} className="w-full flex my-4">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-4">
                  <div className="flex gap-2 w-full items-center">
                    <h1 className="font-[500] text-[19px]">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-[#000000a9] text-[16px]">
                    {item?.comment}
                  </p>
                  <p className="text-[#00000099] text-[12px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
