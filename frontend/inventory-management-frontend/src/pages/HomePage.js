// src/pages/HomePage.js
import React from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const HomePage = () => {
  return (
    <div>
      <h1>Inventory Management System</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default HomePage;
