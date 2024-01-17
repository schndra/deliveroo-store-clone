import { Button } from "@mui/material";
import { getRestaurantItems } from "../feature/restaurant/restaurantSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Restaurants = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantItems());
  }, []);

  // return <Button href="/menu/1">Go To a restaurant</Button>;
  return <Button href="/menu/1">Go To a restaurant</Button>;
};
export default Restaurants;
