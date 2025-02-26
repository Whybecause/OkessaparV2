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


### DB: @upstash/redis - added in vercel project from vercel marketplace (KV Storage)
- Used for user session cache

### Cron
With vercel.json + func in api/cron

### Packages
- EmailJS pour l'envoi de mails
- shadcn-ui: utiliser les commandes pour ajouter des ui components

### 3rd party API
- Spotifiy
- Youtube
- Discovery API: to find venue names


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
- [x] Form Contact that sends us an email
- [x] admin lyrics: also edit/delete on /admin/lyrics
- [x] fix copy paste in text editor
- [x] handle modal max width and height
- [x] motion div
- [x] admin shows manager
- [x] proper error handle from api to client
- [x] remove cron
- [x] refacto responsive add show form (col for mobile)
- [x] enhance ui admin shows
- [x] KV Storage upstash/redis pour avoir un cache de session user
- [x] auto suggest venues name to fill the form while taping name in form input (ticketmaster api)
- [x] admin: only fetch spotify or youtube
- [x] scroll haut de page après login
- [x] admin shows: mettre plus de width sur les shows
- [x] admin music: afficher message d'erreur sur get plutôt que toast
- [x] admin dashboard graphs
- [x] no index admin pages
- [x] optimiser: aria-label sur les bouton et link
- [x] enhance LP and fonts
- [x] enhance nav
- [] maj portfolio

Features ideas
/lyrics
  -> aperçu des histoires derrière chaque morceau (inspiration, histoire etc.)

/shows
  -> carte interactive des concerts: marqueurs là où le groupe à joué ou va jouer
  -> live countdown pour le prochain show

/gallery
  -> rétrospective concerts: photos/vidéos


