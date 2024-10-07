import * as z from "zod";

export const createRoleValidator = z.object({
  name: z.string().min(5),
  permissions: z.array(z.number()),
});

export const assignRoleValidator = z.object({
  userId: z.number().min(1),
  roleId: z.number().min(1),
});

export const getRolesValidator = z.object({
  isActive: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
});

export const getRolePermissionsValidator = z.object({
  roleId: z.string(),
});

export const assignPermisionValidator = z.object({
  roleId: z.number().min(1),
  permissions: z.array(z.number()).optional(),
  name: z.string().optional(),
});

export const changeActivityValidator = z.object({
  roleId: z.string(),
  isActive: z.boolean(),
});

export const changeUserActivityValidator = z.object({
  id: z.string().regex(/^\d+$/, {
    message: "id must be a number",
  }),
  isActive: z.boolean(),
});

export const deleteRestaurantUserValidator = z.object({
  id: z.string().regex(/^\d+$/, {
    message: "id must be a number",
  }),
});

export const deleteRoleValidator = z.object({
  roleId: z.string().regex(/^\d+$/, {
    message: "id must be a number",
  }),
});
