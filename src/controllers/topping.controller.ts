import { NextFunction, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import { getRestaurantByIdPrisma } from "../utils/db/user/restaurant.prisma";
import {
  createToppingPrisma,
  getToppingsFromRestaurantPrisma,
} from "../utils/db/user/toppings.prisma";

export async function createTopping(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { name, price } = req.body;
  const ability = defineAbilitiesFor(req.auth);
  const restaurantId = req.auth.role.restaurantId;

  try {
    const restaurant = await getRestaurantByIdPrisma(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restuarant Not found" });
    }

    if (ability.cannot("create", "Topping")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const topping = await createToppingPrisma({ name, price, restaurantId });

    return res.status(201).json(topping);
  } catch (error) {
    return next(error);
  }
}

export async function getRestaurantToppings(
  req: any,
  res: Response,
  next: NextFunction
) {
  const restaurantId = req.auth.role.restaurantId;

  try {
    const topping = await getToppingsFromRestaurantPrisma(restaurantId);

    return res.status(201).json(topping);
  } catch (error) {
    return next(error);
  }
}
