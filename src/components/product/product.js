import React from "react";

const styles = {
  product: {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
    width: "200px",
    display: "inline-block",
  },
};

const Product = ({ product }) => {
  return (
    <div className="product" style={styles.product}>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
};

export default Product;