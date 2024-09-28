import { Order, Pizza, Topping, User } from "@prisma/client";
import { Pagination } from "../utils/types";

export const getMyOrdersViewer = (
  order: Order,
  pizza: Pizza,
  toppings: Topping[]
) => {
  let sum = 0;
  toppings.forEach((topping) => {
    sum += topping.price;
  });

  const orderView = {
    id: order.id,
    pizzaCover: pizza.pizzaCover,
    pizzaName: pizza.name,
    toppings: toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.price,
    })),
    price: (pizza.price + sum) * order.qty,
    qty: order.qty,
  };
  return orderView;
};

export const getRestaurantOrdersViewer = (
  order: Order,
  pizza: Pizza,
  user: User,
  pizzaToppings: Topping[],
  toppings: Topping[]
) => {
  let sum = 0;
  toppings.forEach((topping) => {
    sum += topping.price;
  });

  const orderView = {
    id: order.id,
    pizzaCover: pizza.pizzaCover,
    pizzaName: pizza.name,
    status: order.status,
    additionalToppings: toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.price,
    })),
    defaultToppings: pizzaToppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.price,
    })),
    qty: order.qty,
    price: (pizza.price + sum) * order.qty,
    customerNumber: user.phoneNumber,
    createdAt: order.createdAt,
  };
  return orderView;
};

export const getOrderDetailsViewer = (
  order: Order,
  pizza: Pizza,
  pizzaToppings: Topping[],
  toppings: Topping[]
) => {
  let sum = 0;
  toppings.forEach((topping) => {
    sum += topping.price;
  });

  const orderView = {
    id: order.id,
    pizzaCover: pizza.pizzaCover,
    pizzaName: pizza.name,
    additionalToppings: toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.price,
    })),
    defaultToppings: pizzaToppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      price: topping.price,
    })),
    qty: order.qty,
    price: (pizza.price + sum) * order.qty,
    createdAt: order.createdAt,
  };
  return orderView;
};
