import "./App.css";
import React from "react";
const NODE_API_URL = process.env.REACT_APP_NODE_API_URL || "http://localhost:5000";

function App() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetch(NODE_API_URL)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Shop App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
