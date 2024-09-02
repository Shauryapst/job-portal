import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { User as NextAuthUser, Profile, Account } from "next-auth";
import User from "./models/user";
import { connectDB } from "./lib/mongoose";

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

export interface UserInterface extends NextAuthUser{
    userId ?: string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        signOut: "/signout",
    },
    providers: providers,
    callbacks: {
        async signIn({ user, account }: { user: UserInterface, account:any }) {
            try {
                // Connect to the database
                await connectDB();
                // console.log(user);
                // console.log(account);

                // Check if the user exists in the database
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    existingUser =  await User.create({ email: user.email });
                }
                // console.log(existingUser._id.toString());
                user.userId = existingUser._id.toString();
                return true;
            } catch (err) {
                return false;
            }
        },
        async session({ session, token }: { session: any, token: any }) {
            // Attach MongoDB ID to the session object
            if (token?.userId) {
                session.user.id = token.userId;
            }
            // console.log(session);
            return session;
        },
        async jwt({ token, user }: { token: any, user?: UserInterface }) {
            if (user) {
                token.userId = user.userId;
            }
            return token;
        },
    },
});
