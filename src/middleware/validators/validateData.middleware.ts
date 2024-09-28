import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import httpStatus from "http-status";

const validateData = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body, ...req.params, ...req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(httpStatus.BAD_REQUEST).json({
          error: "Invalid data",
          details: errorMessages,
        });
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
        });
      }
    }
  };
};

export default validateData;
