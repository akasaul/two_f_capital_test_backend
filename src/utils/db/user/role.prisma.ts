import { Role } from "@prisma/client";
import { Pagination } from "../../types";
import prisma from "../prisma";

export async function createRolePrisma(
  roleData: Omit<Role, "id">,
  permissions: number[]
) {
  const role = await prisma.role.create({
    data: {
      ...roleData,
      permissions: {
        connect: permissions.map((permission) => ({ id: permission })),
      },
    },
  });
  return role;
}

export async function updateRolePrisma(
  roleId: number,
  roleData: Omit<Role, "id">
) {
  const role = await prisma.role.update({
    where: {
      id: roleId,
    },
    data: roleData,
  });
  return role;
}

export const getRoleById = async (roleId: number) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: {
      permissions: true,
    },
  });
  return role;
};

export async function updateRolePermissionsPrisma(
  id: number,
  permissions: number[]
) {
  const role = await prisma.role.update({
    where: {
      id,
    },
    data: {
      permissions: {
        connect: permissions.map((permission) => ({ id: permission })),
      },
    },
  });
  return role;
}

export async function updateRestaurantRolePrisma(
  roleId: number,
  restaurantId: number
) {
  await prisma.role.update({
    where: { id: roleId },
    data: { restaurantId },
  });
}

export async function getRolesByRestaurantIdPrisma(
  restaurantId: number,
  pagination: Pagination
) {
  const { page, limit } = pagination;
  const roles = await prisma.role.findMany({
    where: { restaurantId },
    include: {
      permissions: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return roles;
}
