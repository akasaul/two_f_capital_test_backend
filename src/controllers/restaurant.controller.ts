import { Response, Request, NextFunction } from "express";
import { PAGINATION } from "../utils/abilities/constants";
import {
  getRestaurantUsersPrisma,
  getTopRestaurantsPrisma,
} from "../utils/db/user/restaurant.prisma";
import { TopRestaurantView } from "../view/restaurantViewer";
import { restaurantUserView } from "../view/userViewer";

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

export const getRestaurantUsers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  const paginationInfo = {
    page: page ? Number(page) : PAGINATION.defaultPage,
    limit: limit ? Number(limit) : PAGINATION.defaultLimit,
  };

  const restaurantId = req.auth.role.restaurantId;
  const { users, pagination } = await getRestaurantUsersPrisma(
    restaurantId,
    paginationInfo
  );
  const userView = users.map((user) => restaurantUserView(user));
  return res.status(200).send({ users: userView, pagination });
};
