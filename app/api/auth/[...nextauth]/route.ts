import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name : 'credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }
                console.log(credentials, "credentials");
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                console.log(user, "user");
                if (!user || !user?.hashedPassword ) {
                    throw new Error("No user found with that email");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, 
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid password");
                }

                return user;
            }
        })
    ],      
    pages: {
        signIn: '/',
    },
    callbacks: {
        async session({ session, user }) {
            return session;
        },
    },
    debug: true,
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };