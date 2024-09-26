import { Router } from "express";
import {
  assignPermissions,
  assignRole,
  createRole,
} from "../../controllers/role.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  assignPermisionValidator,
  assignRoleValidator,
  createRoleValidator,
} from "../../validators/role.validator";

const router = Router();

router.post(
  "/",
  authenticate,
  attachRole(),
  validateData(createRoleValidator),
  createRole
);

router.put(
  "/assign",
  authenticate,
  attachRole(),
  validateData(assignRoleValidator),
  assignRole
);

router.put(
  "/assign-permissions",
  authenticate,
  attachRole(),
  validateData(assignPermisionValidator),
  assignPermissions
);

export default router;
