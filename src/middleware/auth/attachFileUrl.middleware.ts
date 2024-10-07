import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export const attachFilePath =
  (key: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log("attach file path");
    if (req.file) {
      req.body[key] =
        `https://two-f-capital-test-backend.onrender.com/static/` +
        req.file.filename;
    }
    next();
  };
