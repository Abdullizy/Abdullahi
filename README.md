# Abdullahi - Portfolio 3 (door hero, multicolour)

Next.js 15 · React 19 · TypeScript · Tailwind v4 · shadcn-style UI · framer-motion

## Run
```
pnpm install
pnpm dev
```
Open http://localhost:3000

## Edit your content
Everything lives in `lib/data.ts`: name, email, WhatsApp, city, hero text, services, process, about, testimonial and the projects.

## Your photo (the door)
1. Use a portrait photo, 3:4 ratio, face in the centre, plain or light background.
2. Save it as `public/me.jpg`.
3. In `lib/data.ts` set `hero.photo: '/me.jpg'`.
The photo is split in two halves, which are the two door leaves. While `photo` is empty a placeholder silhouette is shown.
Second photo for About: `about.photo`.

## Projects
Edit the `projects` array in `lib/data.ts`. Put screenshots in `public/projects/` and reference them (`/projects/x.jpg`). Each project gets its own page at `/work/<slug>`.

## Contact form
Create a free form at formspree.io and paste its URL into `site.formEndpoint`. Without it, the form opens the visitor's email app.

## How the door works
`components/site/door-hero.tsx`: the section is 300-340vh tall with a sticky screen. Scroll progress (0 to 1) rotates the two leaves, scales the door up and reveals the next page through a clip-path. Tune the numbers inside `apply()`.

## Deploy
Push to GitHub, import the repo in Vercel, deploy.
