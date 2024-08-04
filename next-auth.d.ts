import { UserRole } from "@prisma/client";
import { DefaultSession, User } from "next-auth";

type ExtendUser = DefaultSession['user'] & {
  role: UserRole
  emailVerified: Date | null
}

declare module "next-auth" {
  interface User {
    role: UserRole
    emailVerified: Date | null
  }

  interface Session {
    user: ExtendUser;
  }
}
