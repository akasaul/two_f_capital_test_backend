import { Order, OrderStatus } from "@prisma/client";
import { Pagination } from "../../types";
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
      pizza: {
        include: {
          toppings: true,
        },
      },
    },
  });
  return order;
}

export async function getMyOrdersPrisma(userId: number) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      toppings: true,
      pizza: true,
    },
  });
  return orders;
}

export async function getOrdersRestaurantPrisma(
  restaurantId: number,
  pagination: Pagination,
  search?: string,
  filters?: {
    status?: OrderStatus;
    toppings?: string;
  }
) {
  const { page, limit } = pagination;

  const orders = await prisma.order.findMany({
    where: {
      restaurantId,
      ...(filters?.status && {
        status: filters?.status,
      }),
      ...(filters?.toppings && {
        OR: [
          {
            pizza: {
              toppings: {
                some: {
                  id: {
                    in: JSON.parse(filters?.toppings),
                  },
                },
              },
            },
          },
          {
            toppings: {
              some: {
                id: {
                  in: JSON.parse(filters?.toppings),
                },
              },
            },
          },
        ],
      }),
      ...(search && {
        OR: [
          {
            pizza: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              phoneNumber: {
                contains: search,
              },
            },
          },
        ],
      }),
    },
    include: {
      toppings: true,
      pizza: {
        include: {
          toppings: true,
        },
      },
      user: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return orders;
}

export const getOrderDetails = (orderId: number) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      toppings: true,
    },
  });
};
