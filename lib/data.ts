import type { Color } from './colors'

// ──────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change the text on the whole website.
//  Anything in [BRACKETS] is a placeholder: replace it.
// ──────────────────────────────────────────────────────────────

export const site = {
  name: 'Abdullahi',
  role: 'Frontend developer',
  url: 'https://your-site.vercel.app',
  email: 'hello@example.com',
  whatsapp: '2340000000000', // country code + number, no + or spaces. '' hides it.
  city: '[YOUR CITY]',
  available: true,
  /**
   * Contact form: make a free form at https://formspree.io and paste its URL
   * here (looks like https://formspree.io/f/abcdwxyz). While it is empty the
   * form opens the visitor's email app instead.
   */
  formEndpoint: '',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
}

export const hero = {
  eyebrow: 'Available for projects',
  greeting: 'Hello,',
  intro: "I'm",
  name: 'Abdullahi.',
  text: 'Frontend developer building websites that load fast, look sharp and move.',
  /**
   * YOUR PHOTO: put it in the /public folder (for example public/me.jpg) and
   * write '/me.jpg' here. Use a portrait photo (3:4, taller than wide) with your
   * face in the middle: the door splits it down the centre. Empty = placeholder.
   */
  photo: '/me.jpg',
  stickers: [
    { label: 'React', color: 'blue' as Color },
    { label: 'Next.js', color: 'mint' as Color },
    { label: 'Motion', color: 'pink' as Color },
    { label: 'TypeScript', color: 'violet' as Color },
  ],
}

// The page you walk into after the door opens.
export const room = {
  label: 'Welcome in',
  // Words in *stars* are coloured. Add :blue or :coral after the word to choose the colour.
  title: 'I build websites that *feel:coral* *alive.:blue*',
  text: 'Clean code, bold design and smooth motion, so your customers remember you.',
}

export const ribbons = {
  top: ['Websites', 'Landing pages', 'Web apps', 'Redesigns', 'Speed'],
  bottom: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma'],
}

export const services: { title: string; text: string; goodFor: string; color: Color }[] = [
  { title: 'Business websites', text: 'Clear, credible sites that explain what you do and bring in enquiries.', goodFor: 'shops, clinics, firms', color: 'coral' },
  { title: 'Landing pages', text: 'Focused single pages for an offer or campaign, built to convert.', goodFor: 'launches, events', color: 'sun' },
  { title: 'Interactive web apps', text: 'Dashboards, booking flows and tools with an interface people enjoy using.', goodFor: 'startups, teams', color: 'blue' },
  { title: 'Redesigns & speed', text: 'A fresh look for an old site, and pages that load fast on any phone.', goodFor: 'slow, dated sites', color: 'mint' },
]

export const steps: { title: string; text: string; color: Color }[] = [
  { title: 'Discover', text: 'We talk through your goals, your customers and what the site must do.', color: 'coral' },
  { title: 'Design', text: 'You see the layout first and give feedback before any code is written.', color: 'sun' },
  { title: 'Build', text: 'I build it fast and share progress so you can watch it take shape.', color: 'blue' },
  { title: 'Launch', text: 'We test everything, go live, and I stay available for fixes.', color: 'mint' },
]

export const about = {
  title: 'A developer who treats your site like a *business tool.*',
  p1: `I'm a frontend developer based in ${site.city}. I use HTML, CSS, JavaScript and React with modern tooling to build websites quickly without cutting corners on design.`,
  p2: '[One sentence about what makes you different.]',
  photo: '/me-2.jpg', // a second photo, e.g. '/me2.jpg' inside /public. Empty = placeholder.
  chips: [
    { label: 'Founders & small businesses', color: 'sun' as Color },
    { label: 'Reply within 24 hours', color: 'white' as const },
    { label: 'Clear timeline', color: 'blue' as Color },
    { label: 'Fixed scope', color: 'coral' as Color },
  ],
}

export const testimonial = {
  quote: '[A short, real client quote goes here: one or two sentences about the result.]',
  name: 'Client name',
  role: 'Role, Company',
}

export type Project = {
  slug: string // the page address: /work/<slug>
  title: string
  kind: string
  year: string
  tags: string
  summary: string
  color: Color
  client: string
  role: string
  stack: string
  liveUrl: string // '' hides the "Visit live site" button
  image: string // e.g. '/projects/one.png' inside /public. Empty = colourful sketch.
  gallery: string[] // more screenshots, same rule
  challenge: string
  approach: string[]
  results: { value: string; label: string }[]
  quote?: { text: string; by: string }
}

const common = {
  client: '[Client name]',
  role: 'Design & development',
  liveUrl: '',
  image: '',
  gallery: [] as string[],
  challenge: '[What the client struggled with: an outdated site, slow pages on phones, few enquiries.]',
  approach: [
    '[A short paragraph on what you did: the structure and design choices.]',
    '[A second paragraph on how you made it fast and easy to use on phones.]',
  ],
  results: [
    { value: '+00%', label: 'More enquiries in the first month' },
    { value: '0.0s', label: 'Load time on mobile' },
    { value: '0 days', label: 'From first call to launch' },
  ],
  quote: { text: '[Short quote from this client about working with you.]', by: 'Client name, Company' },
}

export const projects: Project[] = [
  { ...common, slug: 'project-one', title: 'Project one', kind: 'Business website', year: '2026', color: 'coral', tags: 'Business website · Next.js', stack: 'Next.js, TypeScript', summary: '[One or two sentences: who the client is and what the website achieved for them.]' },
  { ...common, slug: 'project-two', title: 'Project two', kind: 'Landing page', year: '2026', color: 'blue', tags: 'Landing page · React', stack: 'React, Tailwind', summary: '[One or two sentences: who the client is and what the page achieved for them.]' },
  { ...common, slug: 'project-three', title: 'Project three', kind: 'Web app', year: '2026', color: 'sun', tags: 'Web app · TypeScript', stack: 'React, TypeScript', summary: '[One or two sentences: what the app does and who uses it.]' },
  { ...common, slug: 'project-four', title: 'Project four', kind: 'Redesign', year: '2026', color: 'mint', tags: 'Redesign · Performance', stack: 'Next.js, Tailwind', summary: '[One or two sentences: what changed and how it improved.]' },
]
