import React from "react";
import { Outlet } from "react-router-dom";
import store from "../store/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
};

export default Layout;
