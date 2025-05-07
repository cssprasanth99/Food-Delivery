import RestaurantCard from "../components/RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel } from "../components/PromotedCard";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listofRestaurant, setListofRestaurant] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9180626&lng=77.6156642&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const response = await data.json();

      const restaurants =
        response?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListofRestaurant(restaurants);
      setAllRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
      console.log("restaurants", restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-red-500">
        🔴 You are offline
      </div>
    );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchText}
              placeholder="🔍 Search restaurants..."
              onChange={(e) => {
                const searchValue = e.target.value;
                setSearchText(searchValue);

                if (searchValue === "") {
                  setFilteredRestaurant(listofRestaurant);
                } else {
                  const filteredList = listofRestaurant.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  );
                  setFilteredRestaurant(filteredList);
                }
              }}
            />
            <button
              className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => {
                const filteredList = allRestaurants.filter(
                  (res) => res.info.avgRating > 4.5
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              🌟 Top Rated
            </button>

            <label>User Name</label>
            <input
              className="p-2 border-2"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredRestaurant.length === 0 ? (
              <h2 className="col-span-full text-center text-xl font-semibold text-gray-600">
                😔 No restaurants found
              </h2>
            ) : (
              filteredRestaurant.map((restaurant) => (
                <Link
                  to={"/restaurant/" + restaurant.info.id}
                  key={restaurant.info.id}
                  className="hover:scale-105 transform transition"
                >
                  {restaurant.info.avgRating > 4.3 ? (
                    <RestaurantCardPromoted resData={restaurant} />
                  ) : (
                    <RestaurantCard resData={restaurant} />
                  )}
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
