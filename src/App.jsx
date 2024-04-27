import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import Layout from "./Pages/Layout";
import CartPage from "./Pages/CartPage";
import ProductDetail from "./Pages/ProductDetail";
import ErrorPage from "./Pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:productID" element={<ProductDetail />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
