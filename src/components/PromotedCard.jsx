export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-5 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md z-10">
          🔥 Promoted
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
