import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/animation_lm94i8ca.json";

const Loader = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-[full] h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={150} height={150} />
    </div>
  );
};

export default Loader;
