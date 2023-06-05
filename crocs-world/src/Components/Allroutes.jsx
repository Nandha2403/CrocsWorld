import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Men from "../Pages/Men";
import Women from "../Pages/Women";
import Kid from "../Pages/Kid";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import OrderSuccessful from "../Pages/OrderSuccessful";
import Wishlist from "../Pages/Wishlist";
import PaymentSuccessPage from "../Pages/PaymentSuccessPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kid" element={<Kid />} />

      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/cart"  element={<Cart />}/>
      <Route path="successful"  element={<OrderSuccessful />}/>
      <Route path="/wishlist"  element={<Wishlist />}/>
      <Route path="/paymentsuccess"  element={<PaymentSuccessPage />}/>

      {/* Authentication Routes */}
      <Route path="/login"  element={<Login />}/>
      <Route path="/register"  element={<Register />}/>

      {/* Not found page*/}
      <Route path="*"  element={<NotFound />}/>
    </Routes>
  );
};

export default Allroutes;
