import prisma from "./db/prisma";
import { User } from "@prisma/client";
import { AbilityBuilder, Ability } from "@casl/ability";
import { PrismaAbility } from "@casl/prisma";

export const defineAbilitiesFor = async (user: User) => {
  const { can, rules } = new AbilityBuilder(PrismaAbility);

  const userRoles = await prisma.role.findMany({
    where: { users: { some: { id: user.id } } },
    include: { permissions: true },
  });

  userRoles.forEach((role) => {
    role.permissions.forEach((permission) => {
      can(permission.action, permission.subject);
    });
  });

  return new Ability(rules);
};
