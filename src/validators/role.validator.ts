import * as z from "zod";

export const createRoleValidator = z.object({
  name: z.string().min(5),
  permissions: z.array(z.number()),
});

export const assignRoleValidator = z.object({
  userId: z.number().min(1),
  roleId: z.number().min(1),
});

export const assignPermisionValidator = z.object({
  roleId: z.number().min(1),
  permissions: z.array(z.number()),
});
