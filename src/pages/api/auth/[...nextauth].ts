import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { redirect } from "next/dist/server/api-utils"

export default NextAuth({
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user)

      return true
    },
    // async redirect({url, baseUrl})  {
    //   return Promise.resolve(url)
    // }  
  }
})