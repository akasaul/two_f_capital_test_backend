import { Router } from "express";
import {
  browsePizza,
  createPizza,
  getPizzaDetails,
  getPopularPizzas,
} from "../../controllers/pizza.controller";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import { createPizzaValidator } from "../../validators/pizza.validator";
import { uploadImage } from "../../utils/multer";
import { attachFilePath } from "../../middleware/auth/attachFileUrl.middleware";

const router = Router();

router.get("/popular", authenticate, getPopularPizzas);

router.get("/:id", authenticate, attachRole(), getPizzaDetails);

router.get("/", authenticate, browsePizza);

router.post(
  "/",
  authenticate,
  attachRole(),
  uploadImage.single("pizzaCover"),
  attachFilePath("pizzaCover"),
  validateData(createPizzaValidator),
  createPizza
);

export default router;
