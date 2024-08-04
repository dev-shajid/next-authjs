import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client"




export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    newUser: '/profile'
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials' && !user.emailVerified) return false

      return true
    },
    async jwt(data) {
      const { token, user, trigger, session } = data

      if (trigger === 'update') {
        console.log({ ...session })
        return {
          ...token,
          ...session
        };
      }
      if (user) {
        return {
          ...token,
          ...user
        };
      }
      return token
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
        session.user.name = token.name
        session.user.role = token.role as UserRole
        session.user.emailVerified = token.emailVerified as Date | null
      }
      // console.log({ session })

      return session
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser && user) {
        await db.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
          },
        })
      }
    },
    // async signOut(message) {
    //   // console.log("signOut", message)
    // },
    // async createUser(message) {
    //   // console.log("createUser", message)
    // },
    // async updateUser(message) {
    //   console.log("Updated User", message)
    // },

  }
})