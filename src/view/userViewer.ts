import { User } from "@prisma/client";

export default function userViewer(user: User, token: string) {
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
