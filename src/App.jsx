import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Body from "./pages/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./pages/Cart";

// Lazy load Grocery
const Grocery = lazy(() => import("./pages/Grocery"));

function App() {
  const [userName, setUserName] = useState("Elon Musk");

  return (
    <Provider store={appStore}>
      {/* <h1>Hello Testing</h1> */}
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Body />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="grocery"
              element={
                <Suspense fallback={<h2>Loading Grocery Page...</h2>}>
                  <Grocery />
                </Suspense>
              }
            />
            <Route path="restaurant/:resId" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />

            {/* Error route */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
