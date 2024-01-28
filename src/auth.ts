import NextAuth from "next-auth"
import type { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Yandex from "next-auth/providers/yandex"
import GitHub from "next-auth/providers/github"
import Slack from "next-auth/providers/slack"
import Email from "next-auth/providers/email"
// import Apple from "next-auth/providers/apple"
import Twitter from "next-auth/providers/twitter"

import { randomUUID } from 'crypto'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from './utils/mongodb'

declare module "next-auth" {
  interface Session {
    // user: {
    //   picture?: string,
    // },
    user: {
      picture?: string,
    } & Omit<User, "id">
  }
}

const baseUrl = process.env.NEXT_PUBLIC_API_URI
export const authConfig = {
  debug: false,
  adapter: MongoDBAdapter(clientPromise,{
    collections: {
      Accounts:'usersAccounts',
      Users:'users',
      Sessions:'usersSessions',
      VerificationTokens:'usersVerificationTokens'
    },
    databaseName:'passportdb',
  }),
  session: {
    maxAge: 86400000,
    updateAge: 86400000,
    strategy: 'database',
    generateSessionToken() {
      const ret = randomUUID()
      console.log(`generateSessionToken ret:`, ret)
      return ret
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID,
      clientSecret: process.env.AUTH_YANDEX_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Slack({
      clientId: process.env.AUTH_SLACK_ID,
      clientSecret: process.env.AUTH_SLACK_SECRET,

    }),
    Email({
      from:process.env.AUTH_EMAIL_FROM,
      server:process.env.AUTH_EMAIL_SERVER,
    }),
    // Credentials({
    //   credentials: { password: { label: "Password", type: "password" } },
    //   authorize(c) {
    //     if (c.password !== "1") return null
    //     return {
    //       name: "Fill Murray",
    //       email: "bill@fillmurray.com",
    //       image: "https://www.fillmurray.com/64/64",
    //       id: "1",
    //     }
    //   },
    // }),
  ],
  // jwt: {
  //   maxAge: 86400000

  // },
  callbacks: {

    async jwt(params) {
      // console.log('jwt params:', params)
      // console.log('params.session:', params.session)
      // console.log('params.user:', params.user)
      // console.log('params.account:', params.account)
      return params.token
    },
    // async signIn(params) {
    //   try {
    //     const data = {
    //       id: params.user.id || '',
    //       name: params.user.name || '',
    //       email: params.user.email || '',
    //       image: params.user.image || '',
    //       provider: params.account?.provider
    //     }
    //     console.log(`callbacks signIn account:`, params.account)
    //     console.log(`callbacks signIn user:`, params.user)


    //     const ret = await fetch(`${baseUrl}/auth/socialLogin`, {
    //       body: JSON.stringify(data),
    //       headers: { "Content-Type": "application/json" },
    //       method: 'POST',
    //     } as RequestInit)

    //     const resp = await ret.json()

    //     console.log(`resp:`, resp)

    //     return true
    //   } catch (err: any) {
    //     return false
    //   }
    // },
    session(params) {
      //  console.log(`callbacks session params:`, params.session)
      return params.session
    },
    authorized(params) {
      console.log(`callbacks params:`, params)
      return !!params.auth?.user
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
