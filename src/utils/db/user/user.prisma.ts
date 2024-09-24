import prisma from "../prisma";

export async function userCreatePrisma(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: { firstName, lastName, email, password },
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
