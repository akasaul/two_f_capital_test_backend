import { Router } from "express";
import { browsePizza, createPizza } from "../../controllers/pizza.controller";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { authorize } from "../../middleware/auth/authorize.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import { createPizzaValidator } from "../../validators/pizza.validator";

const router = Router();

router.get("/", authenticate, authorize("browse", "Pizza"), browsePizza);

router.post(
  "/",
  authenticate,
  authorize("createPizza", "Pizza"),
  validateData(createPizzaValidator),
  createPizza
);

export default router;
