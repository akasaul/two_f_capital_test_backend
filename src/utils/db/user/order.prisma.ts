import { Order, OrderStatus } from "@prisma/client";
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

export async function updateOrderStatusPrisma(
  orderId: number,
  status: OrderStatus
) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
    },
  });
  return order;
}

export async function getOrderById(orderId: number) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      toppings: true,
    },
  });
  return order;
}
