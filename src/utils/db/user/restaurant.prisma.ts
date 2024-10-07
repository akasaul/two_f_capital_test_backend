import { Restaurant, User } from "@prisma/client";
import { Pagination } from "../../types";
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

export async function getRestaurantUsersPrisma(
  restaurantId: number,
  pagination: Pagination
) {
  const { page, limit } = pagination;
  const restaurants = await prisma.role.findMany({
    where: {
      restaurantId,
    },
    distinct: "id",
    include: {
      priceUser: true,
    },
  });
  const users: User[] = [];

  restaurants.forEach((restaurant) => {
    users.push(...restaurant.priceUser);
  });

  const skip = (page - 1) * limit;
  const take = skip + limit;
  const rowCount = users.length;

  const restaurantsLimit = users.slice(skip, take);

  return { users: restaurantsLimit, pagination: { ...pagination, rowCount } };
}

export const getUserByIdPrisma = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      Role: true,
    },
  });
  return user;
};

export const updateUserActivityPrisma = async (
  userId: number,
  isActive: boolean
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
  return user;
};

export const deleteUserPrisma = async (userId: number) => {
  const user = await prisma.user.delete({
    where: { id: userId },
  });
  return user;
};
