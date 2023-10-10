import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_APP_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_OAUTH_APP_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "repo",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log({ session, token });
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      console.log({ token, account });
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
