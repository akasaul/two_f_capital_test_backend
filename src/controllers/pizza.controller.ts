import { subject } from "@casl/ability";
import { NextFunction, Request, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import {
  browsePizzaPrisma,
  createPizzaPrisma,
  getPizzaDetailsPrisma,
  getPopularPizzasPrisma,
} from "../utils/db/user/pizza.prisma";
import { getRestaurantByManagerId } from "../utils/db/user/restaurant.prisma";
import { getAvailableToppingsForARestaurant } from "../utils/db/user/toppings.prisma";
import { PizzaDetailsView, PopularPizzaView } from "../view/pizzaViewer";

export async function createPizza(req: any, res: Response, next: NextFunction) {
  const ability = defineAbilitiesFor(req.auth);
  try {
    if (ability.cannot("create", "Pizza")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const restaurant = await getRestaurantByManagerId(req.auth.user.id);

    const { toppings } = req.body;

    const toppingsIds = JSON.parse(toppings);

    const pizza = await createPizzaPrisma(
      {
        ...req.body,
        price: parseInt(req.body.price),
        toppings: Object.values(toppingsIds),
        restaurantId: restaurant?.id,
      },
      Object.values(toppingsIds)
      // req.body.toppings
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
  try {
    const pizza = await getPizzaDetailsPrisma(parseInt(req.params.id));

    if (!pizza) {
      return res.status(404).json({ message: "Not Found" });
    }

    const allToppings = await getAvailableToppingsForARestaurant(
      pizza.restaurantId
    );

    const toppings = allToppings.map((allTopping) => ({
      ...allTopping,
      isDefault: pizza.toppings.find((topping) => topping.id === allTopping.id)
        ? true
        : false,
    }));

    const pizzaDetails = PizzaDetailsView(pizza, toppings);

    return res.status(201).json(pizzaDetails);
  } catch (error) {
    return next(error);
  }
}

export async function getPopularPizzas(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const pizzas = await getPopularPizzasPrisma();
    const pizzaView = pizzas.map(({ toppings, Restaurant, ...rest }) =>
      PopularPizzaView(rest, toppings, Restaurant)
    );
    return res.status(201).json(pizzaView);
  } catch (error) {
    return next(error);
  }
}
