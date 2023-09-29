import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortData && sortData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        {data && data.length !== 0 ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        ) : (
          <p className="text-[#000000b1] flex justify-center items-center mb-7">
            Oops! there is no best deal available for you!!
          </p>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
