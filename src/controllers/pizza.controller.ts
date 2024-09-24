import { NextFunction, Request, Response } from "express";
import {
  browsePizzaPrisma,
  createPizzaPrisma,
} from "../utils/db/user/pizza.prisma";
import { getRestaurantByManagerId } from "../utils/db/user/restaurant.prisma";

export async function createPizza(req: any, res: Response, next: NextFunction) {
  try {
    const restaurant = await getRestaurantByManagerId(req.auth.user.id);
    const pizza = await createPizzaPrisma(
      {
        ...req.body,
        restaurantId: restaurant?.id,
      },
      req.body.toppings
    );
    return res.status(201).json(pizza);
  } catch (error) {
    return next(error);
  }
}

export async function browsePizza(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pizzas = await browsePizzaPrisma();
    return res.status(201).json(pizzas);
  } catch (error) {
    return next(error);
  }
}
