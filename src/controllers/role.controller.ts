import { subject } from "@casl/ability";
import { NextFunction, Response } from "express";
import { PAGINATION } from "../utils/abilities/constants";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import { getAllPermissionsPrisma } from "../utils/db/user/permissions.prisma";
import { getRestaurantByManagerId } from "../utils/db/user/restaurant.prisma";
import {
  changeRoleActivityPrisma,
  createRolePrisma,
  getRoleById,
  getRolesByRestaurantIdPrisma,
  updateRolePermissionsPrisma,
  updateRolePrisma,
} from "../utils/db/user/role.prisma";
import {
  userGetByIdPrisma,
  userRoleUpdatePrisma,
} from "../utils/db/user/user.prisma";
import { getRolesViewer } from "../view/roleViewer";

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
      {
        name,
        restaurantId: req.auth.role.restaurantId,
        isActive: true,
        createdAt: new Date(),
      },
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

export async function updateRole(req: any, res: Response, next: NextFunction) {
  const { roleId, permissions, name } = req.body;

  const ability = defineAbilitiesFor(req.auth);
  const role = await getRoleById(roleId);

  if (!role) {
    return res.status(404).json({ message: "Role not found!" });
  }

  try {
    if (ability.cannot("manageRole", subject("Role", role))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const updatedRole = await updateRolePermissionsPrisma(
      roleId,
      permissions,
      name
    );
    return res.status(201).json(updatedRole);
  } catch (error) {
    return next(error);
  }
}

export async function getRoles(req: any, res: Response, next: NextFunction) {
  const { page, limit, isActive, search } = req.query;

  const paginationInfo = {
    page: page ? Number(page) : PAGINATION.defaultPage,
    limit: limit ? Number(limit) : PAGINATION.defaultLimit,
  };

  const ability = defineAbilitiesFor(req.auth);

  try {
    if (ability.cannot("read", "Role")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const { roles, rowCount } = await getRolesByRestaurantIdPrisma(
      req.auth.role.restaurantId,
      paginationInfo,
      {
        isActive,
        search,
      }
    );

    const rolesView = roles.map((role) => getRolesViewer(role));

    return res
      .status(200)
      .json({ data: rolesView, pagination: { ...paginationInfo, rowCount } });
  } catch (error) {
    return next(error);
  }
}

export async function getRolePermissions(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { roleId } = req.params;

  const ability = defineAbilitiesFor(req.auth);

  try {
    const role = await getRoleById(parseInt(roleId));

    if (!role) {
      return res.status(404).json({ message: "Role Not Found!" });
    }

    if (ability.cannot("readPermission", subject("Role", role))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const allPermissions = await getAllPermissionsPrisma();

    const permissions = allPermissions.map((permission) => ({
      id: permission.id,
      name: permission.name,
      isSelected: role.permissions.find((perm) => perm.id === permission.id)
        ? true
        : false,
    }));

    return res.status(200).json({ permissions, name: role.name });
  } catch (error) {
    return next(error);
  }
}

export async function getMyPermissions(
  req: any,
  res: Response,
  next: NextFunction
) {
  const roleId = req.auth.role.id;

  try {
    const role = await getRoleById(parseInt(roleId));

    if (!role) {
      return res.status(404).json({ message: "Role Not Found!" });
    }

    return res.status(200).json(role.permissions);
  } catch (error) {
    return next(error);
  }
}

export async function changeActivity(
  req: any,
  res: Response,
  next: NextFunction
) {
  const { isActive } = req.body;
  const { roleId } = req.params;

  const ability = defineAbilitiesFor(req.auth);
  const role = await getRoleById(parseInt(roleId));

  if (!role) {
    return res.status(404).json({ message: "Role not found!" });
  }

  try {
    if (ability.cannot("manageRole", subject("Role", role))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const updatedRole = await changeRoleActivityPrisma(
      parseInt(roleId),
      isActive
    );

    return res.status(201).json(updatedRole);
  } catch (error) {
    return next(error);
  }
}

export async function getAllPermissions(
  req: any,
  res: Response,
  next: NextFunction
) {
  const allPermissions = await getAllPermissionsPrisma();

  return res.status(201).json(allPermissions);
}
