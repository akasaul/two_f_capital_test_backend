import { Router } from "express";
import {
  updateRole,
  assignRole,
  createRole,
  getRoles,
  getRolePermissions,
  changeActivity,
  getMyPermissions,
  getAllPermissions,
  deleteRole,
} from "../../controllers/role.controller";
import { attachRole } from "../../middleware/auth/attachRole.middleware";
import { authenticate } from "../../middleware/auth/authenticator.middleware";
import validateData from "../../middleware/validators/validateData.middleware";
import {
  assignPermisionValidator,
  assignRoleValidator,
  changeActivityValidator,
  createRoleValidator,
  deleteRoleValidator,
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

router.get("/my-permissions", authenticate, attachRole(), getMyPermissions);

router.get("/all-permissions", authenticate, attachRole(), getAllPermissions);

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

router.put(
  "/:roleId/change-activity",
  authenticate,
  attachRole(),
  validateData(changeActivityValidator),
  changeActivity
);

router.delete(
  "/:roleId",
  authenticate,
  attachRole(),
  validateData(deleteRoleValidator),
  deleteRole
);

export default router;
