import NextAuth from "next-auth"
import type { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Yandex from "next-auth/providers/yandex"
import GitHub from "next-auth/providers/github"
import Slack from "next-auth/providers/slack"
import Email from "next-auth/providers/email"

declare module "next-auth" {
  interface Session {
    user: {
      picture?: string
    } & Omit<User, "id">
  }
}

export const authConfig = {
  debug: false,
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
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Slack({
      clientId: process.env.AUTH_SLACK_ID,
      clientSecret: process.env.AUTH_SLACK_SECRET,
    }),
    // Email({
    //   from:process.env.AUTH_EMAIL_FROM,
    //   server:process.env.AUTH_EMAIL_SERVER,

    // }),
    Credentials({
      credentials: { password: { label: "Password", type: "password" } },
      authorize(c) {
        if (c.password !== "1") return null
        return {
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://www.fillmurray.com/64/64",
          id: "1",
        }
      },
    }),
  ],
  callbacks: {
    authorized(params) {
      console.log(`callbacks params:`, params)
      return !!params.auth?.user
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
