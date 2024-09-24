import { Router } from "express";
import { createPizza } from "../../controllers/pizza.controller";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { authorize } from "../../middleware/auth/authorize.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import { createPizzaValidator } from "../../validators/pizza.validator";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("create", "pizza"),
  validateData(createPizzaValidator),
  createPizza
);

export default router;
