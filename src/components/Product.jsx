import React, { useState, useTimeout } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaStarHalfAlt } from "react-icons/fa";

const Product = ({ key, itemData }) => {
  const renderStars = () => {
    const stars = [];
    let num = itemData.rating.rate;
    if (num % 1 === 0) {
      for (let i = 0; i < num; i++) {
        stars.push(<FaStar />);
      }
      for (let i = 0; i < 5 - num; i++) {
        stars.push(<CiStar />);
      }
    } else {
      for (let i = 0; i < Math.floor(num); i++) {
        stars.push(<FaStar />);
      }
      stars.push(<FaStarHalfAlt />);
      for (let i = 0; i < 5 - Math.ceil(num); i++) {
        stars.push(<CiStar />);
      }
    }
    return stars;
  };

  return (
    <div
      key={key}
      // border border-slate-400
      className=" shadow hover:shadow-lg rounded  w-56 my-1 flex flex-col items-center py-2 mx-1"
    >
      <Link to={`${itemData.id}`}>
        <img
          src={itemData.image}
          alt="product-img"
          className="h-32 w-24 mx-auto mb-2"
        />
      </Link>
      <p className=" text-center h-12 overflow-hidden m-1">{itemData.title}</p>
      <div className="text-orange-400 flex">{renderStars()}</div>
      <p className="text-lg m-1 font-bold">₹{itemData.price}</p>
    </div>
  );
};

export default Product;
