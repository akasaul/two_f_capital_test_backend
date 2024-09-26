import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { createTopping } from "../../controllers/topping.controller";
import { createToppingValidator } from "../../validators/topping.validator";
import validateData from "../../middleware/validators/validateData.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  attachRole(),
  validateData(createToppingValidator),
  createTopping
);

export default router;
