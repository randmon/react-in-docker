import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
};

export default Product;