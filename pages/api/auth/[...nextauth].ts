import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

// CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     email: {
//       label: "Email",
//       type: "email",
//       placeholder: "jasonsmith@gmail.com",
//     },
//     password: { label: "Password", type: "password" },
//   },

//   authorize: async (credentials) => {
//     const email = credentials?.email;
//     const password = credentials?.password;
//     const user = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (!user) {
//       throw new Error("User not found. Please register to Log in.");
//     }

//     const isValid = user.password === password;
//     if (!isValid) {
//       throw new Error("Invalid password");
//     }
//     return { user };
//   },
