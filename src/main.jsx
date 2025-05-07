import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./utils/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContext.Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContext.Provider>
);
