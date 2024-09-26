import {
  Permission,
  Pizza,
  Restaurant,
  Role,
  Topping,
  User,
} from "@prisma/client";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Pizza: Pizza;
      Restaurant: Restaurant;
      Role: Role;
      Topping: Topping;
    }>
  ],
  PrismaQuery
>;

interface PopulatedRole extends Role {
  permissions: Permission[];
}

interface PopulatedUser {
  user: User;
  role: PopulatedRole;
}

export const defineAbilitiesFor = (user: PopulatedUser) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  user.role.permissions.forEach((permission) => {
    if (permission.action === "getMy") {
      can("getMy", "Pizza", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } else if (
      permission.action == "createUser" &&
      permission.subject === "Role"
    ) {
      can("createUser", "Role", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } else if (
      permission.action == "createRole" &&
      permission.subject === "Restaurant"
    ) {
      can("createRole", "Restaurant", {
        managerId: user.user.id,
      });
    } else if (
      permission.action == "manageRole" &&
      permission.subject === "Role"
    ) {
      can("manageRole", "Role", {
        restaurantId: user.role.restaurantId,
      });
    } else {
      can(permission.action, permission.subject as "User" | "Pizza");
    }
  });

  if (!user.role.isActive) {
    user.role.permissions.forEach((permission) => {
      cannot(permission.action, permission.subject as "User" | "Pizza");
    });
  }

  return build();
};
