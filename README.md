# unroooled shop — maintainer guide

The live site is at **[unroooled.shop](https://unroooled.shop)** (also `https://unroooled.github.io/shop/`).  
It is a React + Vite app deployed automatically to GitHub Pages every time you push to the `main` branch.

---

## Table of contents

1. [Quick start — run it locally](#1-quick-start)
2. [How deploying works](#2-how-deploying-works)
3. [Update product listings](#3-update-product-listings)
4. [Update past projects / portfolio](#4-update-past-projects--portfolio)
5. [Update testimonials (wall of love)](#5-update-testimonials)
6. [Swap product images](#6-swap-product-images)
7. [Update the logo / favicon](#7-update-the-logo--favicon)
8. [Update text, prices, stock counts](#8-update-text-prices-stock-counts)
9. [Update the footer year or ticker text](#9-update-footer-year-or-ticker-text)
10. [Custom domain — if you ever move hosts](#10-custom-domain)
11. [File map — where everything lives](#11-file-map)

---

## 1. Quick start

You need **Node.js 18+** and **Git** installed.

```bash
# clone the repo (first time only)
git clone https://github.com/unroooled/shop.git
cd shop

# install dependencies
npm install --legacy-peer-deps

# run locally at http://localhost:3000
npm run dev
```

Open `http://localhost:3000` in your browser. Changes you save appear instantly without refreshing.

---

## 2. How deploying works

Pushing to the `main` branch on GitHub is **all you need to do** — a GitHub Action builds the site and publishes it automatically.

```
you edit a file  →  git add + commit + push  →  GitHub builds it  →  live in ~2 minutes
```

The workflow file is at `.github/workflows/deploy.yml` — don't touch it.

**Pushing changes (do this every time you edit something):**

```bash
git add .
git commit -m "describe what you changed"
git push
```

Go to `github.com/unroooled/shop/actions` to watch it build. Green tick = live.

---

## 3. Update product listings

**File:** `src/data/shopData.ts` → `CLAY_PRODUCTS` array

Each product looks like this:

```ts
{
  id: 'customised-face-badge',       // unique slug, no spaces
  name: 'customised face badge',     // shown as the product title
  price: 60,                         // number, in ₹
  category: 'custom badges',         // shown in filter chips
  description: 'Mini hand-sculpted…',
  image: IMAGES.womanPortrait,       // which photo to use (see section 6)
  badgeText: 'bestseller ★',         // little label shown on the card
  badgeTone: 'yellow',               // yellow | pink | lilac
  chipIcon: 'face',                  // Google Material icon name
  chipText: 'hand-sculpted clay',    // small chip label below the name
  footerIcon: 'sentiment_very_satisfied',
  footerText: 'starts at ₹60',
  dimensions: '3.0cm × 3.0cm',
  hardware: 'locking clutch pin back',
  stockLeft: 12,                     // shown as "X left" on the card
},
```

**To add a new product** — copy an existing block, paste it at the end of the array (before the `]`), and change every field. Give it a unique `id`.

**To remove a product** — delete the entire `{…},` block for it.

**To update stock** — just change `stockLeft: 12` to however many you have.

---

## 4. Update past projects / portfolio

**File:** `src/data/shopData.ts` → `PAST_PROJECTS` array

Each project looks like this:

```ts
{
  id: 'batch-01',
  batchCode: '#batch01',
  title: 'no-face & kuromi clay magnets',
  summary: 'One-line description shown on the card',
  fullStory: 'Longer description shown when someone clicks the card.',
  category: 'brand mascots',         // shown as a filter
  image: IMAGES.magnetTrio,          // photo for this project
  pieceCount: '2 pieces',
  glaze: 'triple-gloss uv resin',
  turnaround: '5 days',
  rotationClass: 'sm:rotate-1',      // slight card tilt: rotate-1 / -rotate-1 / rotate-2 / -rotate-2
  batchColorClass: 'text-primary',   // accent colour: text-primary / text-secondary / text-tertiary
},
```

**To add a new batch** — paste a new block at the end of the array, increment the batch number.

**To retire an old batch** — just delete its block.

---

## 5. Update testimonials

**File:** `src/data/shopData.ts` → `TESTIMONIALS` array

Each testimonial is a screenshot from WhatsApp or Instagram:

```ts
{
  id: 'tw1',
  image: `${b}/assets/real/13.jpg`,  // path to the screenshot image
  quote: 'Sooo cuteee 😭😭',         // caption shown below the screenshot
  product: 'family face badges',     // shown as "— family face badges"
  rotation: 'sm:-rotate-1',         // sm:rotate-1 / sm:-rotate-1 / sm:rotate-2 / sm:-rotate-2
},
```

**To add a new testimonial:**

1. Save the screenshot as `public/assets/real/20.jpg` (use the next available number)
2. Add a block to the array:
```ts
{
  id: 'tw9',
  image: `${b}/assets/real/20.jpg`,
  quote: 'paste the message here',
  product: 'what they ordered',
  rotation: 'sm:rotate-1',
},
```

**To remove one** — delete the block.

---

## 6. Swap product images

All real product photos live in `public/assets/real/`.  
They are numbered `1.jpg`, `2.jpg` … up to whatever is the latest.

**To replace an image:**
- Save your new photo with the **exact same filename** (e.g. `6.jpg`) in `public/assets/real/`
- The site will automatically use the new photo — no code changes needed

**To add a brand-new image slot:**
1. Add your photo as the next number, e.g. `public/assets/real/20.jpg`
2. Open `src/data/shopData.ts`, add a line to the `IMAGES` object:
```ts
newPhoto: `${b}/assets/real/20.jpg`,
```
3. Use `IMAGES.newPhoto` wherever you want it (in a product or project)

**Image tips:**
- Shoot in good natural light — the site shows them square/tall
- JPG is fine, keep files under 1MB for fast loading
- Recommended size: at least 800×800px

---

## 7. Update the logo / favicon

**Logo** — the logo image is `public/assets/aistudio/WhatsApp_Image_2026-11-27_at_12.54.14_04086d61.jpeg`.  
To replace it: save a new photo, then update the two lines at the top of `src/data/shopData.ts`:
```ts
logo: `${b}/assets/aistudio/YOUR_NEW_FILENAME.jpeg`,
mascot: `${b}/assets/aistudio/YOUR_NEW_FILENAME.jpeg`,
```

**Favicon** (the icon in the browser tab) — replace `public/favicon.jpg` with a new square image.  
Keep the filename `favicon.jpg` and it'll auto-update.

---

## 8. Update text, prices, stock counts

Everything text-based is in `src/data/shopData.ts`:

| What to change | Where in the file |
|---|---|
| Product name, price, description | `CLAY_PRODUCTS` → find by `id` |
| Product stock count | `CLAY_PRODUCTS` → `stockLeft` field |
| Portfolio batch story | `PAST_PROJECTS` → find by `id` |
| Testimonial caption | `TESTIMONIALS` → find by `id` |
| FAQ questions & answers | `FAQ_ITEMS` array |

For anything else (hero headline, studio section copy, page descriptions) — search the `src/components/` folder for the exact text string and edit it there.

---

## 9. Update footer year or ticker text

**Footer year** — `src/components/Footer.tsx` line ~159:
```tsx
<span>© 2026 unroooled ceramic &amp; clay laboratory. all rights squished.</span>
```
Change `2026` to the new year.

**Scrolling ticker text** — same file, look for the `animate-marquee` div:
```tsx
<span>✦ tiny charms, big joy</span>
<span>batch drop 04 restocked</span>
```
Edit, add, or remove `<span>` lines to update the ticker.

---

## 10. Custom domain

The site is set up for `unroooled.shop`. If you ever move to a new domain or host:

1. Update `vite.config.ts`:
   - Custom domain → `base: '/'`
   - GitHub Pages sub-path (like `/shop/`) → `base: '/shop/'`

2. Update DNS at your registrar (Hostinger etc.):
   - Add a `CNAME` record: `www` → `unroooled.github.io`
   - Add 4 `A` records for the apex domain pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. Add the domain in GitHub → Settings → Pages → Custom domain.

---

## 11. File map

```
unroooled/shop/
│
├── public/
│   ├── assets/
│   │   ├── real/           ← ALL product & testimonial photos (1.jpg … 19.jpg)
│   │   └── aistudio/       ← logo image
│   └── favicon.jpg         ← browser tab icon
│
├── src/
│   ├── data/
│   │   └── shopData.ts     ← ★ MAIN FILE — products, projects, testimonials, images
│   │
│   ├── components/
│   │   ├── ShopDropsView.tsx       ← main shop page layout
│   │   ├── TestimonialsSection.tsx ← wall of love section
│   │   ├── Footer.tsx              ← footer (year, ticker, links)
│   │   ├── Header.tsx              ← top nav bar
│   │   └── ResilientImage.tsx      ← image component (don't touch)
│   │
│   └── types.ts            ← TypeScript types (don't touch)
│
├── .github/
│   └── workflows/
│       └── deploy.yml      ← auto-deploy to GitHub Pages (don't touch)
│
├── vite.config.ts          ← build config — only touch `base` if domain changes
└── index.html              ← page title, favicon, meta tags
```

---

## Common tasks — quick reference

| Task | File | What to change |
|---|---|---|
| Update a product price | `src/data/shopData.ts` | `price:` field in `CLAY_PRODUCTS` |
| Mark something out of stock | `src/data/shopData.ts` | `stockLeft: 0` |
| Add a new batch photo | `public/assets/real/` | save as next number, add to `IMAGES` |
| Add a new testimonial screenshot | `public/assets/real/` + `src/data/shopData.ts` | see section 5 |
| Change the page title | `index.html` | `<title>` tag |
| Change the footer year | `src/components/Footer.tsx` | `© 2026` |
| Swap the logo | `public/assets/aistudio/` + `src/data/shopData.ts` | see section 7 |

---

> Built with Vite + React + TypeScript + Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.
