import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  // const [showItems, setShowItems] = useState();

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  // const itemCards =
  //   resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
  //     ?.card?.itemCards || [];

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(categories);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {cuisines?.join(", ")} - {costForTwoMessage}
        </p>
      </div>
      {/* 
      <div className="space-y-6">
        {itemCards.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No items available
          </p>
        ) : (
          itemCards.map((item) => (
            <div
              key={item.card.info.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800">
                  {item.card.info.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.card.info.description || "No description available."}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-800">
                  {(item.card.info.defaultPrice || item.card.info.price) / 100}{" "}
                  ₹
                </span>
              </div>
            </div>
          ))
        )}
      </div> */}
      {/* Categories accordians */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
