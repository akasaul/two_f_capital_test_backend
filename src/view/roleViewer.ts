import { Role } from "@prisma/client";

export const getRolesViewer = (role: Role) => {
  const roleView = {
    id: role.id,
    name: role.name,
    isActive: role.isActive,
  };
  return roleView;
};
