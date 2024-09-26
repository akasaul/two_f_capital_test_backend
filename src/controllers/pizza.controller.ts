import { subject } from "@casl/ability";
import { NextFunction, Request, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import {
  browsePizzaPrisma,
  createPizzaPrisma,
  getPizzaDetailsPrisma,
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

export async function getPizzaDetails(
  req: any,
  res: Response,
  next: NextFunction
) {
  const ability = defineAbilitiesFor(req.auth);

  try {
    const pizza = await getPizzaDetailsPrisma(parseInt(req.params.id));

    if (!pizza) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (ability.cannot("getMy", subject("Pizza", pizza))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    return res.status(201).json(pizza);
  } catch (error) {
    return next(error);
  }
}
