import { Router } from "express";
import {
  changeUserActivity,
  deleteRestaurantUser,
  getRestaurantUsers,
  getTopRestaurants,
} from "../../controllers/restaurant.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  changeUserActivityValidator,
  deleteRestaurantUserValidator,
} from "../../validators/role.validator";

const router = Router();

router.get("/top", getTopRestaurants);
router.get("/users", authenticate, attachRole(), getRestaurantUsers);
router.put(
  "/users/:id",
  authenticate,
  attachRole(),
  validateData(changeUserActivityValidator),
  changeUserActivity
);

router.delete(
  "/users/:id",
  authenticate,
  attachRole(),
  validateData(deleteRestaurantUserValidator),
  deleteRestaurantUser
);

export default router;
