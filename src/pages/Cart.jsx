import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "../components/ItemList";
import { clearItems, removeItems } from "../utils/cartStore";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(removeItems(clearItems()));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 shadow-sm"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-500 font-semibold">
            🛒 Your cart is empty
          </h2>
          <p className="text-gray-400 mt-2">
            Looks like you haven't added anything yet.
          </p>
        </div>
      ) : (
        <ItemList data={cartItems} />
      )}
    </div>
  );
};

export default Cart;
