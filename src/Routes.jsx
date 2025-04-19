import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import CustomerHomePage from "./customerhomepage";
import CartPage from "./Cart";
import OrdersPage from "./OrderPage";
import AdminLoginPage from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";





export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/customerhome" element={<CustomerHomePage/>}/>
      <Route path="/UserCartPage" element={<CartPage/>}/>
      <Route path='/OrderPage' element={<OrdersPage/>}/>
      <Route path="/admin" element={<AdminLoginPage/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
     
       
       
    </Routes>
  );
}