import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i <= rating) {
      stars.push(<BsStarFill key={i} size={17} color="#f6b100" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsStarHalf key={i} size={17} color="#f6b100" />);
    } else stars.push(<BsStar key={i} size={17} color="#f6b100" />);
  }

  return <div className="flex gap-2">{stars}</div>;
};

export default Ratings;
