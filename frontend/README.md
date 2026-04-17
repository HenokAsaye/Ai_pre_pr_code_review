This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Create env file first:

```bash
cp .env.example .env.local
```

Set `AUTH_SECRET` (or `NEXTAUTH_SECRET`), `GITHUB_ID`, and `GITHUB_SECRET`.
For backend JWT validation, make sure `AUTH_SECRET` matches backend `JWT_SECRET`.

**Port:** `NEXTAUTH_URL` must match the origin you use (including port). If something else is already bound to `3000`, Next may pick `3001`/`3002` automatically — then either free port `3000` or set `NEXTAUTH_URL` to that port and update your GitHub OAuth callback URL to match (e.g. `http://localhost:3001/api/auth/callback/github`).

To force port **3001** after the port is free:

```bash
npm run dev:3001
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
