import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../store/features/cartSlice";
import { Slider } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { getProducts } from "../store/features/productSlice";

const ProductPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const { data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleSlider = (event, value) => {
    setMinPrice(value);
  };
  const [category, setCategory] = useState("all");

  useEffect(() => {
    //dispatch an action for fetch products
    dispatch(getProducts());
  }, []);

  if (status === "Loading") {
    return <Loading />;
  }

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const handleFilterChange = (cat) => {
    setCategory(cat);
  };
  const handleRating = (rating) => {
    setMinRating(rating);
  };

  const filteredProducts = data.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const ratingMatch = item.rating.rate >= minRating;
    const priceMatch = item.price >= minPrice;

    return categoryMatch && ratingMatch && priceMatch;
  });

  return (
    <div className=" flex flex-col sm:flex-row ">
      <div className="sm:w-72 px-8 ">
        <h1 className="text-xl font-bold mt-12 sm:mt-32">Category</h1>
        <div className=" flex flex-col pl-8 text-lg  ">
          <button
            onClick={() => handleFilterChange(`all`)}
            className="hover:cursor-pointer text-left hover:text-yellow-600 text-slate-500"
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange(`men's clothing`)}
            className="hover:cursor-pointer text-left hover:text-yellow-600 text-slate-700"
          >
            Men's clothing
          </button>
          <button
            onClick={() => handleFilterChange(`women's clothing`)}
            className="hover:cursor-pointer text-left hover:text-yellow-600 text-slate-700"
          >
            Women's clothing
          </button>
          <button
            onClick={() => handleFilterChange(`electronics`)}
            className="hover:cursor-pointer text-left hover:text-yellow-600 text-slate-700"
          >
            Electronics
          </button>
          <button
            onClick={() => handleFilterChange(`jewelery`)}
            className="hover:cursor-pointer text-left hover:text-yellow-600 text-slate-700"
          >
            Jewelery
          </button>
        </div>
        <h1 className="text-xl font-bold mt-6">Price ({minPrice}+)</h1>
        <Slider
          aria-label="Price"
          defaultValue={5}
          valueLabelDisplay="off"
          shiftStep={30}
          step={100}
          marks
          min={5}
          max={999}
          onChange={handleSlider}
        />
        <h1 className="text-xl font-bold mt-6">Customer Reviews</h1>

        <div
          className="flex text-xl mt-2 hover:cursor-pointer items-center text-orange-400 hover:text-orange-600 "
          onClick={() => handleRating(4)}
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <CiStar />
          <p>& up</p>
        </div>
        <div
          className="flex text-xl mt-2 hover:cursor-pointer items-center text-orange-400 hover:text-orange-600"
          onClick={() => handleRating(3)}
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <CiStar />
          <CiStar />
          <p>& up</p>
        </div>
        <div
          className="flex text-xl mt-2 hover:cursor-pointer items-center text-orange-400 hover:text-orange-600"
          onClick={() => handleRating(2)}
        >
          <FaStar />
          <FaStar />
          <CiStar />
          <CiStar />
          <CiStar />
          <p>& up</p>
        </div>
        <div
          className="flex text-xl mt-2 hover:cursor-pointer items-center text-orange-400 hover:text-orange-600"
          onClick={() => handleRating(1)}
        >
          <FaStar />
          <CiStar />
          <CiStar />
          <CiStar />
          <CiStar />
          <p>& up</p>
        </div>
      </div>

      <div className=" w-fit  mt-8 px-2 ">
        <h1 className="text-2xl  font-bold ">Products</h1>
        <h1 className="text-xl  font-bold ">{category.toUpperCase()}</h1>
        <p className="text-lg">({minRating} stars & up)</p>

        <h1 className="text-xl mb-8">Results : {filteredProducts.length}</h1>

        <div className="flex flex-wrap max-w-[950px] mx-auto  ">
          {filteredProducts.map((item) => (
            <Product key={item.id} itemData={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
