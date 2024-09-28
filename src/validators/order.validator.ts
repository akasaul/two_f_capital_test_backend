import * as z from "zod";
import { orderStatuses } from "../utils/abilities/constants";
import { queryValidators } from "./query.validator";

export const createOrderValidator = z.object({
  pizzaId: z.number(),
  additionalToppings: z.array(z.number()).optional(),
  qty: z.number().min(0),
});

export const getRestaurantOrderValidator = z.object({
  toppings: z.string().optional(),
  search: z.string().optional(),
  ...queryValidators,
});

export const updateOrderStatusValidator = z.object({
  status: z.enum([
    orderStatuses.PENDING,
    orderStatuses.PENDING,
    orderStatuses.DELIVERED,
  ]),
});
