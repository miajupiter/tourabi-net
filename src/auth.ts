import NextAuth from "next-auth"
import type { NextAuthConfig, User, DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import Facebook from "next-auth/providers/facebook"
// import Yandex from "next-auth/providers/yandex"
// import GitHub from "next-auth/providers/github"
// import Slack from "next-auth/providers/slack"
// import Email from "next-auth/providers/email"

// import Auth0 from "next-auth/providers/auth0"
// import Apple from "next-auth/providers/apple"
import Twitter from "next-auth/providers/twitter"

import { randomUUID } from 'crypto'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from './db/mongodb'
import { NextResponse } from 'next/server'

// export interface UserEX extends User {
//   picture?: string,
//   role?: string,
//   token?: string,
// }

declare module "next-auth" {
  interface Session {
    // user: UserEX,

    user: {
      picture?: string,
    } & Omit<User, "id">,

  }

}

const baseUrl = process.env.NEXT_PUBLIC_API_URI
export const authConfig = {
  debug: false,
  cookies: {
    callbackUrl: {
      name: 'tourabi.callbackUrl',
      options: {
        encode(value) {
          // console.log('callbackUrl encode val', value)
          return value
        },
      }
    },
    sessionToken: {
      name: "tourabi.sessionToken",
      options: {

        encode(value) {
          // console.log('sessionToken encode val', value)
          return value
        },
      }
    },
    csrfToken: {

      name: "tourabi.csrfToken",
      options: {
        encode(value) {
          // console.log('csrfToken encode val', value)
          return value
        },
      }
    },
    state: {
      name: "tourabi.state"
    }
  },
  // adapter: MongoDBAdapter(clientPromise, {
  //   collections: {
  //     Accounts: 'accounts',
  //     Users: 'users',
  //     Sessions: 'sessions',
  //     VerificationTokens: 'verificationTokens'
  //   },
  //   // databaseName: 'passportdb',
  // }),
  session: {
    maxAge: 86400000,
    updateAge: 86400000,
    // strategy: 'database',
    strategy: 'jwt',
    generateSessionToken() {
      const ret = randomUUID()
      console.log(`generateSessionToken ret:`, ret)
      return ret
    },
  },
  providers: [
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,

    // }),
    // Facebook({
    //   clientId: process.env.AUTH_FACEBOOK_ID,
    //   clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    // }),
    // Yandex({
    //   clientId: process.env.AUTH_YANDEX_ID,
    //   clientSecret: process.env.AUTH_YANDEX_SECRET,
    // }),
    // Twitter({
    //   clientId: process.env.AUTH_TWITTER_ID,
    //   clientSecret: process.env.AUTH_TWITTER_SECRET,
    // }),
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    // Slack({
    //   clientId: process.env.AUTH_SLACK_ID,
    //   clientSecret: process.env.AUTH_SLACK_SECRET,

    // }),
    // Email({
    //   from: process.env.AUTH_EMAIL_FROM,
    //   server: process.env.AUTH_EMAIL_SERVER,
    // }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },

      },

      async authorize(credentials, request) {
        const { email, password } = credentials
        // const result = await request.json() ?? null
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          }
        )
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            const sess = {
              id: result.data.user._id,
              name: result.data.user.name,
              email: result.data.user.email,
              image: result.data.user.image,
              role: result.data.user.role,
              token: result.data.token,
            }
            return sess
          } else {
            return null
          }

        } else {
          return null
        }


      },

    }),

  ],
  // jwt: {
  //   maxAge: 86400000

  // },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut, } = NextAuth(authConfig)
