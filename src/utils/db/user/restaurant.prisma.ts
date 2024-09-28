import { Restaurant } from "@prisma/client";
import prisma from "../prisma";

export async function createRestaurantPrisma(
  restaurantData: Omit<Restaurant, "id">,
  managerId: number
) {
  const restaurant = await prisma.restaurant.create({
    data: { ...restaurantData, managerId },
  });
  return restaurant;
}

export async function getRestaurantByManagerId(id: number) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { managerId: id },
  });
  return restaurant;
}

export async function getRestaurantByIdPrisma(id: number) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
  });
  return restaurant;
}

export async function getTopRestaurantsPrisma() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      _count: {
        select: {
          Order: true,
        },
      },
    },
    orderBy: {
      Order: {
        _count: "desc",
      },
    },
  });
  return restaurants;
}
