import { Router } from "express";
import {
  browsePizza,
  createPizza,
  getPizzaDetails,
} from "../../controllers/pizza.controller";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authorize } from "../../middleware/auth/authorize.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import { createPizzaValidator } from "../../validators/pizza.validator";

const router = Router();

router.get("/:id", authenticate, attachRole(), getPizzaDetails);

router.get("/", authenticate, browsePizza);

router.post(
  "/",
  authenticate,
  authorize("createPizza", "Pizza"),
  validateData(createPizzaValidator),
  createPizza
);

export default router;
