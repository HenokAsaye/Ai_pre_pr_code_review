import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendJwt?: string;
    githubAccessToken?: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      login: string;
    };
  }

  interface Profile {
    login: string;
    avatar_url: string;
    html_url: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendJwt?: string;
    githubAccessToken?: string;
    login?: string;
  }
}
