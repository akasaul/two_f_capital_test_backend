import { Topping } from "@prisma/client";
import prisma from "../prisma";

export async function getAvailableToppings() {
  const toppings = await prisma.topping.findMany();
  return toppings;
}

export async function createToppingPrisma(toppingData: Omit<Topping, "id">) {
  const topping = await prisma.topping.create({
    data: toppingData,
  });
  return topping;
}

export async function getToppingsWithIds(toppingIds: number[]) {
  const toppings = await prisma.topping.findMany({
    where: {
      id: {
        in: toppingIds,
      },
    },
  });
  return toppings;
}
