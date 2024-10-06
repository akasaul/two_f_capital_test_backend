import { User } from "@prisma/client";

export function userViewer(user: User, token: string) {
  const userView = {
    user: {
      id: user.id,
      email: user.email,
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
  return userView;
}

export function restaurantUserView(user: User) {
  const userView = {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isActive: user.isActive,
  };
  return userView;
}
