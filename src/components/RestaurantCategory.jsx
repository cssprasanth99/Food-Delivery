import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  // const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    // setShowItems(!showItems);
    // state uplift
    setShowIndex();
  };

  return (
    <div className="mx-auto my-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
        <div
          onClick={handleClick}
          className="flex justify-between items-center cursor-pointer"
        >
          <span className="font-semibold text-xl text-gray-800">
            {data.title} ({data.itemCards.length})
          </span>
          <span
            className={`text-gray-600 transform transition-transform duration-300 ${
              showItems ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
        {/* Accordion Body */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showItems ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 max-h-[70vh] overflow-y-auto">
            <ItemList data={data.itemCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
