# Laiba Haque — Portfolio

Personal site for Laiba Haque, a junior game developer at Techversol in Karachi. It presents selected work, events, background, and a way to get in touch.

## Stack

- [Next.js](https://nextjs.org) (App Router) and React
- TypeScript
- Tailwind CSS
- GSAP, Lenis, and Three.js for motion

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Home: intro, practice areas, featured work, experience, and contact |
| `/work` | Project index, filterable by category |
| `/work/[slug]` | A single project |
| `/events` | Events attended |
| `/about` | Background, education, skills, and achievements |

Site copy lives in `src/data`. Start with `src/data/site.ts` for name, role, links, and the public description.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the live domain before you deploy. That value is used for canonical URLs and metadata. On Vercel, the production domain is used when the variable is unset.

## Scripts

```bash
npm run dev    # development server
npm run build  # production build
npm run start  # serve the production build
npm run lint   # ESLint
```

## Deploy

The app is a standard Next.js project and deploys on [Vercel](https://vercel.com). Point `NEXT_PUBLIC_SITE_URL` at the public URL so Open Graph, sitemap, and robots metadata resolve to the live site.
