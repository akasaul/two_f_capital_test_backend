import prisma from "./db/prisma";
import { Pizza, Restaurant, Topping, User } from "@prisma/client";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Pizza: Pizza;
      Restaurant: Restaurant;
      Topping: Topping;
    }>
  ],
  PrismaQuery
>;

export const defineAbilitiesFor = async (user: User, req: any) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  const userWithRole = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      Role: {
        include: { permissions: true },
      },
    },
  });

  if (userWithRole?.Role) {
    const role = userWithRole.Role;

    let condition = {};

    console.log({ restaurantId: role.restaurantId ?? 0 });

    // can("getMy", "Pizza", {
    //   where: {
    //     restaurantId: role.restaurantId ?? 0,
    //   },
    // });

    cannot("getMy", "Pizza", {
      restaurantId: { not: role.restaurantId ?? 0 },
    });

    // Allow pizzas where restaurantId matches the manager's restaurantId
    can("getMy", "Pizza", {
      restaurantId: role.restaurantId ?? 0,
    });
    // role.permissions.forEach((permission) => {
    //   if (permission.subject === "Role" && permission.action === "createUser") {
    //     condition = { restaurantId: role.restaurantId };
    //   } else if (
    //     permission.subject === "Pizza" &&
    //     permission.action === "getMy"
    //   ) {
    //     condition = {
    //       id: Number(req.params.id),
    //       restaurantId: role.restaurantId,
    //     };
    //   }
    //   console.log(permission.subject, permission.action, condition);
    //   can(
    //     permission.action,
    //     permission.subject as "User" | "Pizza" | "Restaurant",
    //     condition
    //   );
    // });
  }

  return build();
};
