import { Response, Request, NextFunction } from "express";
import { getTopRestaurantsPrisma } from "../utils/db/user/restaurant.prisma";
import { TopRestaurantView } from "../view/restaurantViewer";

export const getTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const restaurants = await getTopRestaurantsPrisma();
  const topRestaurants = restaurants.map((restaurant) =>
    TopRestaurantView(restaurant)
  );
  return res.status(200).send(topRestaurants);
};
