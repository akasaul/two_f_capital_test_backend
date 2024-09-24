import { NextFunction, Request, Response } from "express";
import {
  browsePizzaPrisma,
  createPizzaPrisma,
} from "../utils/db/user/pizza.prisma";

export async function createPizza(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pizza = await createPizzaPrisma(req.body);
    return res.status(201).json(pizza);
  } catch (error) {
    return next(error);
  }
}

export async function browsePizza(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pizza = await browsePizzaPrisma();
    return res.status(201).json(pizza);
  } catch (error) {
    return next(error);
  }
}
