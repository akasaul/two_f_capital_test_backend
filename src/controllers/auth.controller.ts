import { NextFunction, Request, Response } from "express";
import createUserToken from "../utils/auth/createUserToken";
import { createRestaurantPrisma } from "../utils/db/user/restaurant.prisma";
import userGetEmailPrisma, {
  userCreatePrisma,
} from "../utils/db/user/user.prisma";
import { compareWithHash, hashPassword } from "../utils/hashPasswords";
import userViewer from "../view/userViewer";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await userGetEmailPrisma(email);
    if (!user) return res.sendStatus(404);

    if (!compareWithHash(password, user.password)) return res.sendStatus(403);

    const token = createUserToken(user);

    const userView = userViewer(user, token);

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

export async function registerManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, firstName, lastName, ...rest } = req.body;
  try {
    const hashed = hashPassword(password);
    const user = await userCreatePrisma({
      email,
      password: hashed,
      firstName,
      phoneNumber: rest.phoneNumber,
      lastName,
      roleId: 2,
    });
    const token = createUserToken(user);
    const userView = userViewer(user, token);

    const restaurant = await createRestaurantPrisma(rest, user.id);

    return res.status(201).json({
      user: userView,
      restaurant,
    });
  } catch (error) {
    return next(error);
  }
}
