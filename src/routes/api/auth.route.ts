import { Router } from "express";
import {
  login,
  register,
  registerRestaurantAndManager,
  registerRestaurantUser,
} from "../../controllers/auth.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  loginSchema,
  restaurantSignUpSchema,
  restaurantUserRegisterSchema,
  signUpSchema,
} from "../../validators/auth.validator";

const router = Router();

router.post("/login", validateData(loginSchema), login);

router.post("/register", validateData(signUpSchema), register);

router.post(
  "/register-restaurant",
  validateData(restaurantSignUpSchema),
  registerRestaurantAndManager
);

router.post(
  "/register-restaurant-user",
  authenticate,
  attachRole(),
  validateData(restaurantUserRegisterSchema),
  registerRestaurantUser
);

export default router;
