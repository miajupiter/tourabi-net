import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'
import FacebookProvider from 'next-auth/providers/facebook'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GITHUB_ID || !process.env.GITHUB_SECRET
  || !process.env.YANDEX_CLIENT_ID || !process.env.YANDEX_CLIENT_SECRET
  || !process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET
  ) {
  throw new Error('The environment variables GOOGLE_ID, GOOGLE_SECRET, GITHUB_ID, and GITHUB_SECRET must be set.')
}
export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ...add more providers here
  ],

  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
