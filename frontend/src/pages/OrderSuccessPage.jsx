import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animations/animation_lmm0ef0n.json";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        You will recieve your order within 3 to 7 working days
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
