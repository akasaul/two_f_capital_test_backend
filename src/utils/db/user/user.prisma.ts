import { User } from "@prisma/client";
import prisma from "../prisma";

export async function userCreatePrisma(userData: Omit<User, "id">) {
  const user = await prisma.user.create({
    data: { ...userData },
  });
  return user;
}

export default async function userGetEmailPrisma(email: string) {
  if (!email) return null;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

interface UpdateFields {
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

export async function userUpdatePrisma(email: string, info: UpdateFields) {
  if (!email) return null;
  const user = await prisma.user.update({ where: { email }, data: info });
  return user;
}
