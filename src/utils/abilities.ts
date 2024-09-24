import prisma from "./db/prisma";
import { Pizza, User } from "@prisma/client";
import { AbilityBuilder, Ability, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Pizza: Pizza;
    }>
  ],
  PrismaQuery
>;

export const defineAbilitiesFor = async (user: User) => {
  const { can, rules } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  const userWithRole = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      Role: {
        include: { permissions: true },
      },
    },
  });

  console.log({ userWithRole });

  if (userWithRole?.Role) {
    const role = userWithRole.Role;

    role.permissions.forEach((permission) => {
      can(permission.action, permission.subject as "User" | "Pizza");
    });
  }

  return new Ability(rules);
};
