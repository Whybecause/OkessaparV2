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
[x] Automatically sort shows by date
[x] Add auth (only for us) and display features conditionally
[x] lyrics: create/update/delete (admin)
[x] Lyrics: drag and drop lyric order
[x] Lyrics: update lyric.order in db when ordering lyrics
[x] Lyrics: update order counter when deleting lyric
[x] Lyrics: update lyrics order when deleting lyric
[x] faire une db de dev et une de prod (penser ajoute NODE_ENV=production sur vercel ainsi que l'url de l'api, ansi que les cred de co pour la db client de prod)
[x] responsive
[x] server side rendering
[] Musique: spotify player
[] Youtube API to select and display videos
[] Form Contact
[] cron job that deletes the shows after the date is passed (node-cron + github action)
[] optimiser SEO
[] deploy CI/CD

## Deploy
1.Make sure to have env variables
2. For firebase admin: creds are in a json, can not use on vercel, so store json in env variable FIREBASE_ADMIN_DEV or FIREBASE_ADMIN_PROD with:
cat firebase-admin-dev.json | jq -c
cat firebase-admin-prod.json | jq -c


