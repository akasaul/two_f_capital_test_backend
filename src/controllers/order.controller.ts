import { NextFunction, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import { createOrderPrisma } from "../utils/db/user/order.prisma";
import { getPizzaById } from "../utils/db/user/pizza.prisma";
import { getToppingsWithIds } from "../utils/db/user/toppings.prisma";

export async function createOrder(req: any, res: Response, next: NextFunction) {
  const { pizzaId, additionalToppings, qty } = req.body;
  const ability = defineAbilitiesFor(req.auth);

  try {
    const pizza = await getPizzaById(pizzaId);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza Not found" });
    }

    if (ability.cannot("create", "Order")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    if (additionalToppings) {
      const toppings = await getToppingsWithIds(additionalToppings);

      toppings.forEach((topping) => {
        if (topping.restaurantId != pizza.restaurantId) {
          return res
            .status(403)
            .json({ message: "Toppings are not available" });
        }
      });
    }

    const order = await createOrderPrisma(
      {
        pizzaId,
        restaurantId: pizza.restaurantId,
        userId: req.auth.user.id,
        qty,
      },
      additionalToppings
    );

    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
}
