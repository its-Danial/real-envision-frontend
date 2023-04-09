import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// @ts-ignore
import clientPromise from "../../../utils/mongodbClientPromise";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  theme: {
    colorScheme: "auto",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
