import { NextFunction, Response } from "express";
import prisma from "../../utils/db/prisma";

export const attachRole = () => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userWithRole = await prisma.user.findUnique({
        where: { id: req.auth?.user?.id },
        include: {
          Role: {
            include: { permissions: true },
          },
        },
      });

      if (!userWithRole || !userWithRole.Role) {
        return res
          .status(403)
          .json({ message: "Role not found or user unauthorized" });
      }

      req.auth.role = userWithRole.Role;

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
