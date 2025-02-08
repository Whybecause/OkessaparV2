## Getting Started

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

## Memos
DB: Firebase
shadcn-ui: utiliser les commandes pour ajouter des ui components
  -> ex pour form: npx shadcn-ui@latest add form

## TODO
[x] create/edit/delete shows (admin)
[x] Automatically sort shows by date (backend + front lors edit)
[x] faire une db de dev et une de prod (penser ajoute NODE_ENV=production sur vercel)
[x] Lyrics ajout
[] responsive
[] server side for fetch concerts + next/navigation refresh
[] Lyrics: rearranger order
[] Lyrics update + delete
[] cron job that deletes the shows after the date is passed (node-cron + github action)
[] Add auth
[] Form Contact
[] Musique: spotify player
[] Home: youtube videos (updatable)
[] update gist with .env.local et les json de firebase
[] optimiser SEO

date added to state after add: "2025-02-21T23:00:00.000Z"
