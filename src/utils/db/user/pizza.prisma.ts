import { Pizza } from "@prisma/client";
import prisma from "../prisma";

export async function createPizzaPrisma(pizza: Pizza, toppings: number[]) {
  const user = await prisma.pizza.create({
    data: {
      ...pizza,
      toppings: {
        connect: toppings.map((topping) => ({
          id: topping,
        })),
      },
    },
  });
  return user;
}

export async function browsePizzaPrisma() {
  const user = await prisma.pizza.findMany({
    include: {
      toppings: true,
    },
  });
  return user;
}
