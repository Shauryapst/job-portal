import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import prisma from "@/prisma/prismaClient";


const providers = [
    // Credentials({
    //     credentials: {
    //         email: {},
    //         password: {},
    //     },
    //     authorize: async (credentials) => {
    //         let user = null;
    //         console.log(credentials)
    //         if(credentials.email === 'admin' && credentials.password === 'admin'){
    //             user = {
    //                 id: "admin",
    //                 name : "admin",
    //                 email : "test@test.com"
    //             }
    //         }
    //         if (!user) {
    //             throw new Error("User not found.");
    //         }
    //         return user;
    //     },
    // }),
    GitHubProvider,
];

export interface UserInterface extends NextAuthUser {
    userId?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        signOut: "/signout",
    },
    providers: providers,
    callbacks: {
        async signIn({ user, account }: { user: UserInterface; account: any }) {
            try {
                
                await prisma.$connect();
                let existingUser = await prisma.user.findUnique({
                    where: { email : user.email || "" },
                });

                if(!user?.email){
                    return false;
                }
                
                if (!existingUser) {
                    existingUser = await prisma.user.create({
                        data: {
                            email: user.email,
                        },
                    });
                    
                }
                // console.log(existingUser);
                user.userId = existingUser.id;

                return true;
            } catch (err) {
                return false;
            }
        },
        async session({ session, token }: { session: any; token: any }) {
            // Attach MongoDB ID to the session object
            if (token?.userId) {
                session.user.id = token.userId;
            }
            // console.log(session);
            return session;
        },
        async jwt({ token, user }: { token: any; user?: UserInterface }) {
            if (user) {
                token.userId = user.userId;
            }
            return token;
        },
    },
});
