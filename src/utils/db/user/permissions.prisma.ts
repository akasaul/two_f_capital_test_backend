import prisma from "../prisma"

export const getAllPermissionsPrisma = async () => {
  const permissions = await prisma.permission.findMany()
  return permissions
}
