import { Router } from "express";
import {
  updateRole,
  assignRole,
  createRole,
  getRoles,
  getRolePermissions,
} from "../../controllers/role.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  assignPermisionValidator,
  assignRoleValidator,
  createRoleValidator,
  getRolePermissionsValidator,
  getRolesValidator,
} from "../../validators/role.validator";

const router = Router();

router.post(
  "/",
  authenticate,
  attachRole(),
  validateData(createRoleValidator),
  createRole
);

router.get(
  "/:roleId/permissions",
  authenticate,
  attachRole(),
  validateData(getRolePermissionsValidator),
 getRolePermissions 
);

router.get(
  "/",
  authenticate,
  attachRole(),
  validateData(getRolesValidator),
  getRoles
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
  updateRole
);

export default router;
