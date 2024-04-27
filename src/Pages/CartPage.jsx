import React from "react";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove, updateCart } from "../store/features/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(remove(id));
  };

  const increment = (id) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.itemData.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    dispatch(updateCart(updatedCart));
  };

  const decrement = (id) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.itemData.id === id) {
        let itemCount = item.count - 1;
        console.log(itemCount);
        if (itemCount !== 0) {
          return { ...item, count: itemCount };
        }
      }
      return item;
    });
    dispatch(updateCart(updatedCart));
  };

  const total = () => {
    let val = 0;
    cartProducts.map((item) => {
      val = val + item.itemData.price * item.count;
    });
    return val.toFixed(2);
  };

  console.log("cartProducts", cartProducts);
  // const count = 1;
  return (
    <div className="max-w-[1024px] mx-auto mt-8 ">
      <h1 className="text-3xl font-serif">Your Cart</h1>
      <div className="mt-4">
        {cartProducts.map((item) => (
          <div className=" flex max-w-[950px] py-4 justify-between border-t border-slate-300">
            <div className="flex  w-3/4">
              <img
                src={item.itemData.image}
                alt="item-image"
                className="h-36 w-32  ml-4 mr-8"
              />
              <div>
                <p className=" text-xl font-semibold text-blue-800">
                  {item.itemData.title}
                </p>
                <button className="px-2  rounded-md bg-slate-200 mt-4 flex items-center">
                  <span className="text-md font-semibold  px-1 w-20 ">
                    Qty: {item.count}
                  </span>
                  <span
                    onClick={() => increment(item.itemData.id)}
                    className="rounded-md px-1 my-2  text-xl    "
                  >
                    +
                  </span>
                  <span
                    onClick={() => decrement(item.itemData.id)}
                    className=" rounded-md px-2 my-2 text-xl  "
                  >
                    -
                  </span>
                </button>
              </div>
            </div>
            <p className=" text-xl font-bold text-red-600">
              <span className="text-black">{item.count} × </span>₹
              {item.itemData.price}
            </p>
            <button onClick={() => removeItem(item.itemData.id)}>
              {" "}
              <MdDeleteOutline className="text-3xl" />
            </button>
          </div>
        ))}
        {Math.floor(total()) === 0.0 ? (
          <div className=" mt-12 text-center">
            <p className="text-2xl ">Cart is Empty!!</p>
            <Link to="/">
              <button className=" mt-4 text-lg bg-blue-400 text-white px-5 py-1 rounded-full w-fit hover:bg-blue-600">
                Back to Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="border-t border-slate-300 mb-20 flex justify-end text-3xl pr-36 pt-4">
            <h1 className="mr-12">Your Total: </h1>
            <p>₹{total()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
