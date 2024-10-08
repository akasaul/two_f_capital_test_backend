import {
  Permission,
  Pizza,
  Restaurant,
  Role,
  Topping,
  User,
  Order,
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
      Order: Order;
      Permission: Permission;
    }>
  ],
  PrismaQuery
>;

interface CustomRole extends Role {
  isUserActive: boolean;
}

interface PopulatedRole extends CustomRole {
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
      permission.action == "update" &&
      permission.subject === "Order"
    ) {
      can("update", "Order", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } else if (
      permission.action == "readDetails" &&
      permission.subject === "Order"
    ) {
      can("readDetails", "Order", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } 

else if (
      permission.action == "readPermission" &&
      permission.subject === "Role"
    ) {
      can("readPermission", "Role", {
        restaurantId: user.role.restaurantId ?? 0,
      });
    } 
    else if (
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

  if (!user.role.isActive || !user.role.isUserActive) {
    user.role.permissions.forEach((permission) => {
      cannot(permission.action, permission.subject as "User" | "Pizza");
    });
  }

  return build();
};
