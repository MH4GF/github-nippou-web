import type { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_APP_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_OAUTH_APP_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'repo',
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.login = token.login

      return session
    },
    jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        // @ts-expect-error ... GitHubProfile
        token.login = profile?.login
      }
      return token
    },
  },
}
