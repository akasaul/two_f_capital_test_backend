import { subject } from "@casl/ability";
import { Response, Request, NextFunction } from "express";
import { PAGINATION } from "../utils/abilities/constants";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import {
  deleteUserPrisma,
  getRestaurantUsersPrisma,
  getTopRestaurantsPrisma,
  getUserByIdPrisma,
  updateUserActivityPrisma,
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
  const ability = defineAbilitiesFor(req.auth);

  const paginationInfo = {
    page: page ? Number(page) : PAGINATION.defaultPage,
    limit: limit ? Number(limit) : PAGINATION.defaultLimit,
  };

  const restaurantId = req.auth.role.restaurantId;
  const { users, pagination } = await getRestaurantUsersPrisma(
    restaurantId,
    paginationInfo
  );


    if (ability.cannot("read", "User")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

  const userView = users.map((user) => restaurantUserView(user));
  return res.status(200).send({ users: userView, pagination });
};

export const changeUserActivity = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const ability = defineAbilitiesFor(req.auth);

  try {
    const user = await getUserByIdPrisma(parseInt(id));

    if (!user) return res.status(404).send("User not found");

    if (ability.cannot("manageRole", subject("Role", user.Role))) {
      return res.status(401).send({ message: "Forbidden: Access Denied" });
    }

    const updatedUser = await updateUserActivityPrisma(user.id, isActive);

    return res.status(200).send({ user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

export const deleteRestaurantUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ability = defineAbilitiesFor(req.auth);

  try {
    const user = await getUserByIdPrisma(parseInt(id));

    if (!user) return res.status(404).send("User not found");

    if (ability.cannot("manageRole", subject("Role", user.Role))) {
      return res.status(401).send({ message: "Forbidden: Access Denied" });
    }

    await deleteUserPrisma(user.id);

    return res.status(200).send("successfully deleted");
  } catch (error) {
    return next(error);
  }
};
