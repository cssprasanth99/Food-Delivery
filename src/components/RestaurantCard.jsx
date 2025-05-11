import FoodImage from "../assets/food-logo.png"; // Make sure the path is correct

const RestaurantCard = ({ resData }) => {
  // console.log(resData);
  if (!resData?.info) {
    return null;
  }

  const { name, cuisines, avgRating, sla, cloudinaryImageId, costForTwo } =
    resData.info;

  const imageUrl = cloudinaryImageId
    ? `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200,c_fill/${cloudinaryImageId}`
    : FoodImage; // fallback to local FoodImage.jpg if no image

  return (
    <div
      data-testid="resCard"
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {cuisines?.join(", ") || "Various Cuisines"}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span data-testid="rating">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {avgRating ? `${avgRating} ★` : "No Ratings"}
            </span>
          </span>
          <span className="text-gray-700">{costForTwo}</span>
        </div>

        <div className="mt-2 text-gray-600 text-xs">
          {sla?.slaString || "Delivery time unavailable"}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
