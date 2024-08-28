import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: providers,
});
