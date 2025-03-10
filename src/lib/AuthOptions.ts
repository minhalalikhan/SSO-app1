
import axios from "axios";
import { error } from "console";
import { AuthOptions, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

    pages: {
        signIn: '/',


    },

    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials) {


                return { email: credentials?.email, id: credentials?.email.toString() || '' }



            },

        }),
        CredentialsProvider({
            name: 'TokenCredentials',
            id: 'TokenCredentials',

            credentials: {

                AuthCode: { label: 'AuthCode', type: 'text', placeholder: '' },
            },
            async authorize(credentials) {
                const AuthCode = credentials?.AuthCode

                if (!AuthCode)
                    throw new Error('No Token Present')

                try {

                    const getData = await axios.post((process.env.NEXT_AUTHSTORE_TOKEN_URL) as string, {
                        body: {

                            AuthCode: AuthCode,
                            ClientID: process.env.CLIENT_ID,
                            ClientKey: process.env.CLIENT_KEY,
                        }
                    })


                    const email_res = (getData.data.data || '') as string
                    return { email: email_res, id: email_res || '', name: email_res.split('@')[0] }
                } catch (e) {
                    console.log(' ther error is', e)
                }
                // console.log("got this back ", getData.data)
                throw new Error('failed auth')



            },

        })
        // GoogleProvider({})
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log("JWT callback token:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback session:", session);
            return session;
        }
    }
}