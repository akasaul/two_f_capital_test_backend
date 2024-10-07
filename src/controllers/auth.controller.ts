import { subject } from "@casl/ability";
import { NextFunction, Request, Response } from "express";
import { defineAbilitiesFor } from "../utils/abilities/pizza";
import createUserToken from "../utils/auth/createUserToken";
import { getAllPermissionsPrisma } from "../utils/db/user/permissions.prisma";
import { createRestaurantPrisma } from "../utils/db/user/restaurant.prisma";
import {
  createRolePrisma,
  getRoleById,
  updateRestaurantRolePrisma,
} from "../utils/db/user/role.prisma";
import userGetEmailPrisma, {
  userCreatePrisma,
} from "../utils/db/user/user.prisma";
import { compareWithHash, hashPassword } from "../utils/hashPasswords";
import { userViewer } from "../view/userViewer";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await userGetEmailPrisma(email);
    if (!user) return res.sendStatus(404);

    if (!compareWithHash(password, user.password)) return res.sendStatus(403);

    const token = createUserToken(user);

    const userView = userViewer(user, token);

    if (user.Role.restaurantId) {
      return res.json({ ...userView, restaurantId: user.Role.restaurantId });
    }

    return res.json(userView);
  } catch (error) {
    return next(error);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  try {
    const hashed = hashPassword(password);
    const user = await userCreatePrisma({
      email,
      isActive: true,
      password: hashed,
      firstName,
      lastName,
      phoneNumber,
      roleId: 1,
    });
    const token = createUserToken(user);
    const userView = userViewer(user, token);

    return res.status(201).json(userView);
  } catch (error) {
    return next(error);
  }
}

export async function registerRestaurantAndManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, firstName, lastName, ...rest } = req.body;
  try {
    const hashed = hashPassword(password);

    const managerPermissions = await getAllPermissionsPrisma()

    const role = await createRolePrisma(
      {
        name: "restaurantManager",
        restaurantId: null,
        isActive: true,
        createdAt: new Date(),
      },
      managerPermissions.map(permission => permission.id)
    );

    const user = await userCreatePrisma({
      email,
      isActive: true,
      password: hashed,
      firstName,
      phoneNumber: rest.phoneNumber,
      lastName,
      roleId: role.id,
    });

    const token = createUserToken(user);
    const userView = userViewer(user, token);

    const restaurant = await createRestaurantPrisma(rest, user.id);

    await updateRestaurantRolePrisma(role.id, restaurant.id);

    return res.status(201).json({
      user: userView,
      restaurant,
    });
  } catch (error) {
    return next(error);
  }
}

export async function registerRestaurantUser(
  req: any,
  res: Response,
  next: NextFunction
) {
  const ability = defineAbilitiesFor(req.auth);
  const { email, password, firstName, lastName, role, phoneNumber } = req.body;

  try {
    const selectedRole = await getRoleById(role);
    if (!selectedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    const hashed = hashPassword(password);
    const newUser = {
      email,
      password: hashed,
      firstName,
      phoneNumber: phoneNumber,
      lastName,
      roleId: role,
      isActive: true,
    };

    if (ability.cannot("createUser", subject("Role", selectedRole))) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const user = await userCreatePrisma(newUser);
    const token = createUserToken(user);
    const userView = userViewer(user, token);

    return res.status(201).json({
      user: userView,
    });
  } catch (error) {
    return next(error);
  }
}
