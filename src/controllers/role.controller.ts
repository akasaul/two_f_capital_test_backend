import { subject } from "@casl/ability";
import { NextFunction, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import { getRestaurantByManagerId } from "../utils/db/user/restaurant.prisma";
import {
  createRolePrisma,
  getRoleById,
  updateRolePermissionsPrisma,
} from "../utils/db/user/role.prisma";
import {
  userGetByIdPrisma,
  userRoleUpdatePrisma,
} from "../utils/db/user/user.prisma";

export async function createRole(req: any, res: Response, next: NextFunction) {
  const { name, permissions } = req.body;

  const ability = defineAbilitiesFor(req.auth);
  const restaurant = await getRestaurantByManagerId(req.auth.user.id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }

  try {
    console.log({ restaurant });
    if (ability.cannot("createRole", subject("Restaurant", restaurant))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const role = await createRolePrisma(
      { name, restaurantId: req.auth.role.restaurantId, isActive: true },
      permissions
    );
    return res.status(201).json(role);
  } catch (error) {
    return next(error);
  }
}

export async function assignRole(req: any, res: Response, next: NextFunction) {
  const { userId, roleId } = req.body;

  const ability = defineAbilitiesFor(req.auth);
  const user = await userGetByIdPrisma(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  try {
    if (ability.cannot("manageRole", subject("Role", user.Role))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const newRole = await getRoleById(roleId);

    if (!newRole) {
      return res.status(404).json({ message: "Role not found!" });
    }

    if (ability.cannot("manageRole", subject("Role", newRole))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const role = await userRoleUpdatePrisma(userId, roleId);

    return res.status(201).json({ role });
  } catch (error) {
    return next(error);
  }
}

export async function assignPermissions(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { roleId, permissions } = req.body;

  const ability = defineAbilitiesFor(req.auth);
  const role = await getRoleById(roleId);

  if (!role) {
    return res.status(404).json({ message: "Role not found!" });
  }

  try {
    if (ability.cannot("manageRole", subject("Role", role))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const updatedRole = await updateRolePermissionsPrisma(roleId, permissions);
    return res.status(201).json(updatedRole);
  } catch (error) {
    return next(error);
  }
}
