import { Router } from "express";
import {
  getRestaurantUsers,
  getTopRestaurants,
} from "../../controllers/restaurant.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";

const router = Router();

router.get("/top", getTopRestaurants);
router.get("/users", authenticate, attachRole(), getRestaurantUsers);

export default router;
