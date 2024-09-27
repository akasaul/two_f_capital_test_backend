import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export const attachFilePath =
  (key: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log("attach file path");
    if (req.file) {
      req.body[key] =
        `http://localhost:${process.env.PORT}/static/` + req.file.filename;
    }
    next();
  };
