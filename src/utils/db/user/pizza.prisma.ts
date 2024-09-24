import { Pizza } from "@prisma/client";
import prisma from "../prisma";

export async function createPizzaPrisma(pizza: Pizza) {
  const user = await prisma.pizza.create({
    data: pizza,
  });
  return user;
}
