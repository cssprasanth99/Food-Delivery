import React from "react";
import foodImage from "../assets/food-logo.png";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartStore";

const ItemList = ({ data }) => {
  const dispatch = useDispatch();
  // console.log("data", data);
  const handleItem = (item) => {
    // dispatch action
    dispatch(addItems(item));
  };

  return (
    <div className="space-y-6">
      {data.map((item) => (
        <div
          key={item.card.info.id}
          className="flex gap-6 items-start border-b border-gray-100 py-5 px-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          {/* Image */}
          <div className="relative flex-shrink-0">
            <img
              src={item.card.info.imageId || foodImage}
              alt={item.card.info.name}
              className="w-28 h-28 object-cover rounded-lg border border-gray-100"
              onError={(e) => (e.target.src = foodImage)} // Fallback to default image
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {item.card.info.name}
                </h3>
                <span className="text-green-600 font-semibold text-base">
                  ₹
                  {item.card.info.defaultPrice
                    ? (item.card.info.defaultPrice / 100).toFixed(2)
                    : (item.card.info.price / 100).toFixed(2)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {item.card.info.description || "No description available"}
            </p>
            <button
              onClick={() => handleItem(item)}
              className="mt-4 px-5 py-2 bg-gradient-to-r cursor-pointer from-green-500 to-green-600 text-white rounded-full text-sm font-medium hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
