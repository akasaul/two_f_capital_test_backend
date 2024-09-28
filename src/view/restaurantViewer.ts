import { Restaurant } from "@prisma/client";

export const TopRestaurantView = (
  restaurant: Restaurant & {
    _count: {
      Order: number;
    };
  }
) => {
  const restaurantView = {
    id: restaurant.id,
    name: restaurant.name,
    logo: restaurant.logo,
    orederCount: restaurant._count.Order,
  };
  return restaurantView;
};
