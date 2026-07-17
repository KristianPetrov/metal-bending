# Metal Bending Corporation

Production website for [metalbending.com](https://www.metalbending.com), built with the Next.js App Router and prepared for zero-configuration deployment on Vercel.

## Stack

- Next.js 16.2.10 (latest stable release)
- React 19.2.7
- TypeScript
- Vercel Blob private storage for quote requests and CAD/drawing uploads
- Stripe Checkout for invoice and deposit payments

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel deployment

1. Import this repository into Vercel. The framework preset is detected automatically as Next.js.
2. In the project **Storage** tab, create and connect a **Private Blob** store. Vercel adds the Blob credentials automatically.
3. Add `STRIPE_SECRET_KEY` in **Settings → Environment Variables** to enable invoice payments.
4. Optionally set `SITE_URL` to `https://www.metalbending.com` for Stripe success and cancellation redirects.
5. Deploy. Vercel uses `pnpm-lock.yaml` and runs `next build` automatically.

Quote requests and uploaded drawings are stored under the `quotes/` folder in the connected private Blob store. Without the Blob store or Stripe key, the public forms fail safely and show the business phone number.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm build
```
