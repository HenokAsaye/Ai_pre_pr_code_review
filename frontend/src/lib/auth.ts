import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { SignJWT } from "jose";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

async function signBackendJwt(input: {
  sub?: string;
  email?: string;
  login?: string;
}): Promise<string | undefined> {
  if (!input.email) return undefined;
  if (!authSecret) return undefined;
  const key = new TextEncoder().encode(authSecret);
  return await new SignJWT({
    email: input.email,
    login: input.login ?? "",
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(input.sub ?? input.email)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  secret: authSecret,
  trustHost: true,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.githubAccessToken = account.access_token;
      }
      if (profile) {
        const p = profile as { login?: string };
        token.login = p.login ?? "";
      }
      token.backendJwt = await signBackendJwt({
        sub: token.sub,
        email: token.email ?? undefined,
        login: (token.login as string | undefined) ?? "",
      });
      return token;
    },
    async session({ session, token }) {
      session.backendJwt = token.backendJwt as string;
      session.githubAccessToken = token.githubAccessToken as string;
      session.user.login = token.login as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
