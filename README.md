## Getting Started
```bash
npm run dev
# or
bun dev
```

# Memos

### DB: Firebase
- Penser a activer authentification par mdp et email sur site firebase
- Restreindre requêtes pour que seulement le serveur puisse requêter la db
- firebase admin for server
- firebase client for front

### Cron
With vercel.json + func in api/cron

### Packages
- shadcn-ui: utiliser les commandes pour ajouter des ui components

  -> ex pour form: npx shadcn-ui@latest add form

### 3rd party API
- Spotifiy
- Youtube


# Deploy

### Add env variables in vercel

### For firebase admin: creds are in a json, can not use on vercel, so store json in env variable

- FIREBASE_ADMIN_DEV or FIREBASE_ADMIN_PROD with:
```bash
cat firebase-admin-dev.json | jq -c
# or
cat firebase-admin-prod.json | jq -c
```

# TODO
- [x] create/edit/delete shows (admin)
- [x] Automatically sort shows by date
- [x] Add auth (only for us) and display features conditionally
- [x] lyrics: create/update/delete (admin)
- [x] Lyrics: drag and drop lyric order
- [x] Lyrics: update lyric.order in db when ordering lyrics
- [x] Lyrics: update order counter when deleting lyric
- [x] Lyrics: update lyrics order when deleting lyric
- [x] lyric: add slug based on songName to handle URL lyrics/slug
- [x] faire une db de dev et une de prod
- [x] responsive
- [x] server side rendering
- [x] deploy CI/CD
- [x] cron job that deletes the shows after the date is passed (cron with vercel)
- [x] protect API routes if no auth (PATCH/POST/DELETE)
- [x] domain add
- [x] Spotify: get tracks from spotify and choose wich one to display
- [x] Admin dashboard
- [] tester page en client vs ssr pour voir le temps
- [] Youtube API to select and display videos
- [] Form Contact
- [] optimiser SEO
- [] fix cron

