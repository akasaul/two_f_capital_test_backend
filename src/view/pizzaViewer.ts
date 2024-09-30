import { Pizza, Restaurant, Topping } from "@prisma/client";

export const PopularPizzaView = (
  pizza: Pizza,
  toppings: Topping[],
  restaurant: Restaurant
) => {
  let sum = 0;
  toppings.forEach((topping) => {
    sum += topping.price;
  });

  const pizzaView = {
    id: pizza.id,
    name: pizza.name,
    price: pizza.price + sum,
    pizzaCover: pizza.pizzaCover,
    toppings: toppings.map((topping) => topping.name),
    restaurant: {
      logo: restaurant.logo,
      name: restaurant.name,
    },
  };
  return pizzaView;
};

interface ToppingView extends Topping {
  isDefault: boolean;
}

export const PizzaDetailsView = (pizza: Pizza, toppings: ToppingView[]) => {
  let sum = 0;
  toppings
    .filter((topping) => topping.isDefault)
    .forEach((topping) => {
      sum += topping.price;
    });

  const pizzaView = {
    id: pizza.id,
    name: pizza.name,
    price: pizza.price + sum,
    pizzaCover: pizza.pizzaCover,
    toppings: toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      isDefault: topping.isDefault,
    })),
  };

  return pizzaView;
};
