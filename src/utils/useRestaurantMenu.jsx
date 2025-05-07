import { useEffect, useState } from "react";
import { REST_MENU } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setRestInfo] = useState(null);
  const fetchMenu = async () => {
    const response = await fetch(REST_MENU + resId);
    const data = await response.json();

    // console.log(data);
    setRestInfo(data.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return resInfo;
};

export default useRestaurantMenu;
