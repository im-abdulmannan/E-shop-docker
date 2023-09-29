import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopCreate from "../components/Shop/ShopCreate";

const ShopCreatePage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  }, [navigate, isSeller, seller]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
