import { User } from "@prisma/client";

export default function userViewer(user: User, token: string) {
  const userView = {
    user: {
      email: user.email,
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
  return userView;
}
