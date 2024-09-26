import "./App.css";
import React from "react";
import Product from "./components/product/product";
const NODE_API_URL =
  process.env.REACT_APP_NODE_API_URL || "http://localhost:5000";

function App() {
  const [message, setMessage] = React.useState("Loading...");
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState("null");

  React.useEffect(() => {
    fetch(`${NODE_API_URL}/api/status`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(`✅ ${data.message}`);
      })
      .catch((error) => {
        setMessage("⚠️ Error: " + error);
      });

    fetchProducts();
  }, []);

  const submitProduct = (event) => {
    event.preventDefault();
    const form = event.target.form;
    setError("no error");
    const name = form.name.value;
    const price = form.price.value;

    fetch(`${NODE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    })
      .catch((error) => {
        setError("Error adding product: " + error);
      })
      .then((res) => res.json())
      .then(() => {
        fetchProducts();
      });
  };

  const fetchProducts = () => {
    fetch(`${NODE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  };

  return (
    <div className="App">
      <h1>My shopping list</h1>
      <p>Server status: {message}</p>
      <hr />
      {!products && <p>No products found</p>}
      {products && (
        <div>
          <h1>Product Gallery</h1>
          <div className="gallery">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <form>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" />
            <br />
            <label htmlFor="price">Price:</label>
            <input id="price" type="number" name="price" />
            <br />
            <button type="submit" onClick={submitProduct}>
              Add product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
