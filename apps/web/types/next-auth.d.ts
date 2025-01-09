import { DefaultSession } from "next-auth";

import { Role } from "@workspace/database";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  onBoarded: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
