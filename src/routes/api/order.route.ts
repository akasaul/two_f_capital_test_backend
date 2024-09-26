import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import { createOrderValidator } from "../../validators/order.validator";
import { createOrder } from "../../controllers/order.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  attachRole(),
  validateData(createOrderValidator),
  createOrder
);

export default router;
