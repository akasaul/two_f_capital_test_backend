import { Order } from "@prisma/client";
import prisma from "../prisma";

export async function createOrderPrisma(
  orderData: Omit<Order, "id">,
  additionalToppings?: number[]
) {
  const order = await prisma.order.create({
    data: {
      ...orderData,
      toppings: {
        connect:
          additionalToppings &&
          additionalToppings.map((topping) => ({ id: topping })),
      },
    },
  });
  return order;
}
