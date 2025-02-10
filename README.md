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
[x] faire une db de dev et une de prod (penser ajoute NODE_ENV=production sur vercel ainsi que l'url de l'api, ansi que les cred de co pour la db client de prod)
[x] responsive
[x] create/update/delete lyrics (admin)
[x] server side for fetch concerts
[x] Lyrics: drag and drop lyric order
[x] update lyric.order in db when ordering lyrics
[x] update order counter when deleting lyric
[x] update lyrics order when deleting lyric
[x] update gist with .env.local et les json de firebase
[x] Add auth
[x] ouvrir social link dans nouvel onglet
[x] display features if auth
[] Form Contact
[] Musique: spotify player
[] Home: youtube videos (updatable)

[] cron job that deletes the shows after the date is passed (node-cron + github action)
[] optimiser SEO
[] deploy CI/CD
