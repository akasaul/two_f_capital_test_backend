import { NextFunction, Response } from "express";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../../utils/abilities";

export const authorize = (action: string, subject: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = req.auth.user;

      const ability: Ability = await defineAbilitiesFor(user, req);

      if (ability.can(action, subject)) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
