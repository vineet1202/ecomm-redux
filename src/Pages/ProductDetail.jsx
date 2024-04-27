import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaStarHalfAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { add, updateCart } from "../store/features/cartSlice";
import { toast } from "react-toastify";
import { getProducts } from "../store/features/productSlice";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { productID } = useParams();
  const cartProducts = useSelector((state) => state.cart);
  const { data: products, status } = useSelector((state) => state.products);

  let itemCount = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch an action for fetch products
    dispatch(getProducts());
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };
  const showToastMessage = () => {
    toast.success("Item Added to Cart !");
  };

  const itemProduct = products.find((prod) => {
    console.log(prod.id);
    return prod.id === parseInt(productID);
  });

  const addItemToCart = () => {
    const existingItem = cartProducts.find(
      (item) => item.itemData.id === parseInt(productID)
    );
    const itemObj = {
      itemData: itemProduct,
      count: itemCount,
    };
    if (existingItem) {
      const updatedCart = cartProducts.map((item) => {
        if (item.itemData.id === parseInt(productID)) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      dispatch(updateCart(updatedCart));
    } else {
      addToCart(itemObj);
    }
  };

  const handleClick = () => {
    addItemToCart();
    showToastMessage();
  };

  const renderStars = () => {
    const stars = [];
    let num = itemProduct.rating.rate;
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
    <div>
      {!itemProduct ? (
        <Loading />
      ) : (
        <div className="max-w-[950px]  mx-auto mt-12  px-4">
          <div className=" flex flex-col sm:flex-row  items-center">
            <img
              src={itemProduct.image}
              className="h-60 w-60 sm:h-80 sm:w-80"
            />
            <div className="shadow-md  shadow-slate-300 p-6 flex flex-col content-between m-6 rounded-lg [&>*]:mt-4">
              <h1 className="text-2xl font-semibold">{itemProduct.title}</h1>
              <p className="text-lg font-serif ">{itemProduct.description}</p>

              <div className="text-orange-400 flex text-xl ">
                {renderStars()}
              </div>
              <p className="text-xl font-serif ">₹{itemProduct.price}</p>
              <p className="border border-slate-400 rounded-full w-fit px-2 py-1">
                ○ {itemProduct.category}
              </p>
              <button
                className="bg-orange-400 text-white px-2 py-1 rounded-full w-fit hover:bg-orange-600"
                onClick={handleClick}
              >
                Add to cart
              </button>
            </div>
          </div>
          <Link to="/">
            <button className="float-end text-lg bg-blue-400 text-white px-5 py-1 rounded-full w-fit hover:bg-blue-600">
              Shop More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
