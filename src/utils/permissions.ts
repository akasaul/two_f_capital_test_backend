import { Permission } from "@prisma/client";

export const permissions: Omit<Permission, "id">[] = [
  {
    name: "browse pizza",
    action: "browse",
    subject: "Pizza",
    conditions: {},
  },
  {
    name: "create pizza",
    action: "create",
    subject: "Pizza",
    conditions: {},
  },
];

export const restaurantManagerPermissions: number[] = [1, 2];
