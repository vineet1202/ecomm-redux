import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartProducts = useSelector((state) => state.cart);

  return (
    <nav className="shadow  px-12 py-2 ">
      <div className=" flex justify-between max-w-[950px] mx-auto items-center">
        <Link to="/" className="text-2xl hover:text-blue-500 font-mono">
          <img
            src="https://logowik.com/content/uploads/images/shopee7488.logowik.com.webp"
            className="h-14"
          />
        </Link>
        <div className="relative">
          <Link to="/cart" className=" text-4xl ">
            <IoCartOutline />
          </Link>
          {cartProducts.length > 0 && (
            <div className=" bg-red-400 rounded-full absolute -top-1 -right-5 w-6 text-center text-white ">
              {cartProducts.length}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
