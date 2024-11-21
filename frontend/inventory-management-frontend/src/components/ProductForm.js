// src/components/ProductForm.js
import React, { useState } from "react";
import { createProduct } from "../services/productService";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(product);
    // Optionally refresh the product list or reset the form here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
