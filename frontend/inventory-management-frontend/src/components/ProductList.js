// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
