import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../server/db/client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ session, user }) {
      session.user!.id = user.id;
      return session;
    },
    signIn({ account, user }) {
      if (user && account) {
        return "/projects";
      }
      return "/projects";
    },
  },
});
