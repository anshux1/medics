import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/lib/auth.config";
import { prisma } from "@workspace/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          onBoardedOnTest: true,
          role: true,
        },
      });
      if (user) {
        session.user.onBoarded = user.onBoardedOnTest;
        if (user.role) session.user.role = user.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
