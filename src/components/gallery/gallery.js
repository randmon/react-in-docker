import React, { useState, useEffect } from "react";
import Product from "../product/product";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Product Gallery</h1>
      <div className="gallery">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;