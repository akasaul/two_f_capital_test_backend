import { Permission, Pizza, Restaurant, Role, User } from "@prisma/client";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Pizza: Pizza;
      Restaurant: Restaurant;
    }>
  ],
  PrismaQuery
>;

interface PopulatedUser extends User {
  role: Role;
}

export const defineAbilitiesForPizza = (
  user: PopulatedUser,
  permissions: Permission[]
) => {
  const { can, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  permissions.forEach((permission) => {
    if (permission.action === "getMy") {
      can("getMy", "Pizza", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } else {
      can(permission.action, permission.subject as "User" | "Pizza");
    }
  });

  return build();
};
