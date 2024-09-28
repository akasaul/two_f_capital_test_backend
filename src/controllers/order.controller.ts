import { subject } from "@casl/ability";
import { NextFunction, Response } from "express";
import { PAGINATION } from "../utils/abilities/constants";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import {
  createOrderPrisma,
  getMyOrdersPrisma,
  getOrderById,
  getOrdersRestaurantPrisma,
  updateOrderStatusPrisma,
} from "../utils/db/user/order.prisma";
import { getPizzaById } from "../utils/db/user/pizza.prisma";
import { getToppingsWithIds } from "../utils/db/user/toppings.prisma";
import {
  getMyOrdersViewer,
  getOrderDetailsViewer,
  getRestaurantOrdersViewer,
} from "../view/orderViewer";

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
        createdAt: new Date(),
        pizzaId,
        restaurantId: pizza.restaurantId,
        userId: req.auth.user.id,
        status: "PENDING",
        qty,
      },
      additionalToppings
    );

    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
}

export async function updateOrderStatus(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { orderId } = req.params;
  const { status } = req.body;
  const ability = defineAbilitiesFor(req.auth);

  try {
    const order = await getOrderById(Number(orderId));

    if (!order) {
      return res.status(404).json({ message: "Order Not found" });
    }

    if (ability.cannot("update", subject("Order", order))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const updatedOrder = await updateOrderStatusPrisma(Number(orderId), status);

    return res.status(201).json(updatedOrder);
  } catch (error) {
    return next(error);
  }
}

export const getMyOrders = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getMyOrdersPrisma(req.auth.user.id);
    const myOrdersViewer = orders.map((order) =>
      getMyOrdersViewer(order, order.pizza, order.toppings)
    );

    return res.status(200).json(myOrdersViewer);
  } catch (error) {
    return next(error);
  }
};

export const getOrdersRestaurant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, search, status, toppings } = req.query;

  const paginationInfo = {
    page: page ? Number(page) : PAGINATION.defaultPage,
    limit: limit ? Number(limit) : PAGINATION.defaultLimit,
  };
  const ability = defineAbilitiesFor(req.auth);

  try {
    if (ability.cannot("readRestaurant", "Order")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const orders = await getOrdersRestaurantPrisma(
      req.auth.user.restaurantId,
      paginationInfo,
      search,
      {
        status,
        toppings,
      }
    );

    const restaurantOrdersViewer = orders.map((order) =>
      getRestaurantOrdersViewer(
        order,
        order.pizza,
        order.user,
        order.pizza.toppings,
        order.toppings
      )
    );

    return res
      .status(200)
      .json({ data: restaurantOrdersViewer, pagination: paginationInfo });
  } catch (error) {
    return next(error);
  }
};

export const getOrderDetails = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const ability = defineAbilitiesFor(req.auth);
  try {
    const order = await getOrderById(Number(req.params.orderId));

    if (!order) {
      return res.status(404).json({ message: "Order Not found" });
    }

    const OrderDetailsView = getOrderDetailsViewer(
      order,
      order.pizza,
      order.pizza.toppings,
      order.toppings
    );

    if (ability.cannot("readDetails", subject("Order", order))) {
      return res.status(401).send({ message: "Forbidden: Access Denied" });
    }

    return res.status(200).json(OrderDetailsView);
  } catch (error) {
    return next(error);
  }
};
