import prisma from "../prisma";

export async function getAvailableToppings() {
  const toppings = await prisma.topping.findMany();
  return toppings;
}
