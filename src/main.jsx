import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1 className=" text-center text-4xl mt-3 mb-8">Memory game</h1>
    <App />
  </React.StrictMode>
);
