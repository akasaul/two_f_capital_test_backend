import { NextFunction, Request, Response } from "express";
import createUserToken from "../utils/auth/createUserToken";
import userCreatePrisma from "../utils/db/user/userCreatePrisma";
import userGetEmailPrisma from "../utils/db/user/userGetEmailPrisma";
import { compareWithHash, hashPassword } from "../utils/hashPasswords";
import userViewer from "../view/userViewer";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await userGetEmailPrisma(email);
    if (!user) return res.sendStatus(404);

    console.log(password, user.password);
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
  const { email, password, username } = req.body;
  try {
    const hashed = hashPassword(password);
    const user = await userCreatePrisma(username, email, hashed);
    const token = createUserToken(user);
    const userView = userViewer(user, token);

    return res.status(201).json(userView);
  } catch (error) {
    return next(error);
  }
}
