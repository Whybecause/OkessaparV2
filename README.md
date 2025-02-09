## Getting Started

First, run the development server:

```bash
npm run dev
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
[x] responsive
[x] create/update/delete lyrics (admin)
[] Lyrics: rearranger order (dragp n drop)
[] server side for fetch concerts
[] Lyrics update + delete
[] cron job that deletes the shows after the date is passed (node-cron + github action)
[] Add auth
[] Form Contact
[] Musique: spotify player
[] Home: youtube videos (updatable)
[] update gist with .env.local et les json de firebase
[] optimiser SEO
