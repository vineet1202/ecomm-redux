import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mt-32  text-center">
      <h1 className=" font-bold text-2xl">OOPS! This Page does not exist</h1>
      <Link to="/" className="text-xl ">
        Go to <span className="text-blue-500">Home Page</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
