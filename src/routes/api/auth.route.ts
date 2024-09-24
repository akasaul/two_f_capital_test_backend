import { Router } from "express";
import {
  login,
  register,
  registerManager,
} from "../../controllers/auth.controller";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  loginSchema,
  restaurantSignUpSchema,
  signUpSchema,
} from "../../validators/auth.validator";

const router = Router();

router.post("/login", validateData(loginSchema), login);

router.post("/register", validateData(signUpSchema), register);

router.post(
  "/register-restaurant",
  validateData(restaurantSignUpSchema),
  registerManager
);

export default router;
