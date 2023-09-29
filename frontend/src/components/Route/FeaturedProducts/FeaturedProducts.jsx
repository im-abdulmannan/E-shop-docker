import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.product);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        {allProducts && allProducts.length !== 0 ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {allProducts &&
              allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        ) : (
          <p className="text-[#000000b1] flex justify-center items-center mb-7">
            Oops! there are no popular products!!
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
