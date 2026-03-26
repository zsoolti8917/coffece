# Coffece Website -- Design Specification

## Overview

Coffece is a Slovak B2B coffee company selling freshly roasted coffee in bulk to offices. This spec defines a modern, professional website that converts first-time visitors into leads through an interactive order picker.

**Business model:** B2B office coffee delivery (no e-commerce cart -- lead generation via quote request form)
**Target audience:** Office managers, facility managers, HR -- typically visit once, so first impression is critical.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, latest stable) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Animations | Framer Motion |
| i18n | next-intl (Slovak primary, English secondary) |
| Email | Nodemailer via Google SMTP |
| Hosting | Self-hosted on VPS (`next start` or Docker) |
| Theme | Light/dark mode via shadcn/ui + next-themes |

---

## Design Direction: Hybrid (Dark Hero, Light Content)

### Color Palette

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Background (hero/footer) | `#0a0a0a` | `#0a0a0a` |
| Background (content) | `#FAFAF8` | `#111111` |
| Surface (cards) | `#FFFFFF` | `#1a1a1a` |
| Text primary | `#111111` | `#F5F5F5` |
| Text secondary | `#666666` | `#999999` |
| Brand accent (gold) | `#F5C518` | `#F5C518` |
| Original product | `#111111` | `#111111` |
| Zlaty product | `#F5C518` | `#F5C518` |
| Success (form) | `#4CAF50` | `#4CAF50` |
| Border | `#E5E5E5` | `#2A2A2A` |

### Typography

- **Font family:** Inter (via Google Fonts) -- clean, professional, excellent readability
- **Headings:** Inter 800 (Extra Bold), tight letter-spacing (-0.02em)
- **Body:** Inter 400/500, line-height 1.6
- **Overlines:** Inter 600, uppercase, letter-spacing 0.15em, small caps
- **Scale:** Major third (1.25 ratio): 14, 16, 20, 25, 31, 39, 49px

### Animation Strategy

All animations via Framer Motion:
- **Hero entrance:** Staggered fade-up for heading, subtext, CTA buttons (0.3s intervals)
- **Product bags:** Slight rotation + float animation on hero entry
- **Scroll reveals:** `whileInView` fade-up with 60px offset, 0.6s duration, `once: true`
- **Section transitions:** Opacity crossfade between dark/light sections
- **Product cards:** Scale(1.02) + shadow elevation on hover
- **Order picker:** Step transitions via `AnimatePresence` slide-left/right
- **Progress bar:** Smooth width animation on step change
- **CTA buttons:** Subtle scale(1.05) on hover with spring physics
- **Page transitions:** Fade between routes (0.3s)

**Performance rule:** All animations respect `prefers-reduced-motion`. No animation blocks content visibility.

---

## Site Structure

### Shared Components

#### Navbar
- Fixed/sticky at top, transparent over hero, solid background on scroll
- Left: Coffece logo (white variant on dark, black variant on light)
- Center/Right: Navigation links (Original, Zlaty Standard, FAQ, Kontakt)
- Right: Language toggle (SK | EN), dark/light mode toggle (sun/moon icon)
- Far right: "Objednat" CTA button (gold background, black text, prominent)
- Mobile: Hamburger menu with slide-in drawer

#### Footer
- Dark background (`#0a0a0a`) in both themes
- 4-column grid: Brand (logo + tagline), Navigation links, Contact info, Social links
- Bottom bar: Copyright, Privacy link, Cookies link
- Social icons: Instagram, Facebook, LinkedIn

#### Cookie Consent Banner
- Bottom-fixed banner with Accept/Decline/Customize options
- Stores preference in localStorage
- Links to cookie policy page

---

## Pages

### 1. Home (Landing Page) -- `/`

The most important page. Designed for maximum first impression and conversion.

**Section flow (top to bottom):**

#### 1.1 Hero Section (DARK background)
- Full viewport height on desktop
- Overline: "cerstva kava pre vas office" (gold, uppercase, tracked)
- Headline: "Premente svoj office na kaviaren" (white, 49px, with "kaviaren" in gold)
- Subtext: Brief value proposition (gray, 18px, max-width 500px)
- Two CTAs: "Objednat" (gold, primary) + "Zistit viac" (outline, secondary)
- Right side: Both product bags floating with subtle rotation, parallax-like depth
- Decorative: Coffee bean pattern from `design_elements/` as subtle overlay at 5% opacity
- Vertical text on right edge: "FRESHLY ROASTED" (very subtle)
- Bottom: Scroll indicator arrow

#### 1.2 Why Coffece? (LIGHT background)
- Overline: "preco my" + Heading: "Preco si vybrat Coffece?"
- 3 benefit cards in a grid:
  1. **Cerstve prazena** -- Freshly roasted in small batches for max freshness
  2. **Priamo do kancelarie** -- Regular delivery right to your office
  3. **Bez zavazkov** -- No contracts, order what you need
- Cards: white surface, subtle border, icon at top, hover elevation

#### 1.3 Product Showcase (LIGHT background)
- Overline + Heading: "Nasa ponuka kavy"
- Two product cards side by side:
  - **Original:** Dark card (`#111`), product photo from `ai product photos/`, label image, specs (100% Arabica, Brazil, 4/5 intensity), "Zistit viac" link
  - **Zlaty Standard:** Light gold card, product photo, label image, specs (100% Vyberova Arabica, Brazil, 4/5 intensity), "Zistit viac" link
- Cards link to respective product subpages
- Hover: subtle scale + shadow lift

#### 1.4 How It Works (LIGHT background)
- Overline + Heading: "Ako to funguje?"
- 3 horizontal steps with numbered circles (gold numbers on dark circles):
  1. **Vyplnte formular** -- Tell us about your office
  2. **Pripravime ponuku** -- Custom offer for your space
  3. **Dostavame kavu** -- Fresh coffee delivered to you
- Connected by horizontal lines/arrows
- Clean, professional illustration style

#### 1.5 Origin Story (DARK background)
- Overline: "nas pribeh" + Heading: "Srdce nasej kavy"
- Split layout: text left, coffee plant illustration right (from `design_elements/coffe plant transparent.png`)
- Copy about the Brazilian farm origin (Agron Cereale Minerio)
- Brazil flag badge/indicator
- This section uses the coffee plant and coffee beans design elements as decorative overlays

#### 1.6 CTA Banner (GOLD background)
- Full-width gold (`#F5C518`) background
- Headline: "Pripraveni na lepsiu kavu?" (black text)
- Subtext: "Objednajte si cerstvo prazenu kavu priamo do vasej kancelarie."
- CTA button: Black background, gold text "Objednat teraz"
- This is the conversion push before the footer

#### 1.7 Footer
- Shared footer component (described above)

---

### 2. Product Page: Original -- `/original`

Dedicated subpage for the Original blend.

- **Hero:** Dark background, large product photo (use `ai product photos/IMG_3070.PNG` or `IMG_3072.PNG`), product name + tagline
- **Specs section:** Tasting notes, intensity meter (4/5 visual), region (Brazil), weight (250g), type (100% Arabica), roast date indicator
- **Label showcase:** Full label image from `labels/coffece original label final.png` with the coffee bean pattern visible
- **Origin details:** Story about the specific beans, processing method
- **CTA:** "Objednat Original" button opening the order picker (pre-selecting Original in step 3)
- **Design accent:** Coffee beans pattern from `design_elements/coffe beans transparent.png` used as decorative element

---

### 3. Product Page: Zlaty Standard -- `/zlaty-standard`

Same structure as Original but with gold/yellow color treatment.

- **Hero:** Warm light background with gold accents, product photo (use `ai product photos/IMG_3067.PNG` or `IMG_3069.jpg`)
- **Specs section:** Same structure, different values (100% Vyberova Arabica, 4/5 intensity)
- **Label showcase:** Full label from `labels/coffece zlaty standard label final.png` with coffee plant illustration
- **Origin details:** Emphasis on "vyberova" (select) quality
- **CTA:** "Objednat Zlaty Standard" button
- **Design accent:** Coffee plant illustration from `design_elements/coffe plant transparent.png`

---

### 4. Contact Page -- `/contact`

- **Hero:** Minimal, professional header
- **Two-column layout:**
  - Left: Contact form (name, email, phone, company, message) -- sends email via Google SMTP
  - Right: Contact details (email, phone, address), social links
- All contact details are placeholders for now
- Form submission sends email + shows success toast

---

### 5. FAQ Page -- `/faq`

- **Hero:** Minimal header
- **Accordion component** (shadcn/ui Accordion)
- **Categories with auto-generated placeholder questions:**
  - **Objednavky (Ordering):** Minimum order, how to order, pricing model, payment methods
  - **Dodanie (Delivery):** Delivery areas, frequency, shipping cost, delivery time
  - **Produkty (Products):** Difference between Original and Zlaty, freshness guarantee, storage recommendations
  - **Vseobecne (General):** Company info, returns, custom blends
- CTA at bottom linking to contact page or order picker

---

### 6. Privacy Policy -- `/privacy`

- Auto-generated placeholder privacy policy
- Covers: data collection, usage, storage, rights, contact for data requests
- GDPR-compliant structure
- Simple text page with proper heading hierarchy

### 7. Cookie Policy -- `/cookies`

- Auto-generated placeholder cookie policy
- Covers: what cookies are used, purposes, how to manage
- Links to privacy policy
- Simple text page

---

## Interactive Order Picker (Modal Overlay)

The centerpiece conversion feature. Opens as a full-screen modal when clicking any "Objednat" button.

### Layout
- **Two-panel design** (desktop):
  - **Left panel (280px, dark `#0a0a0a`):** Logo, vertical step progress indicator, previous answers shown as completed steps with green checkmarks, "Rather call?" fallback contact info at bottom
  - **Right panel (remaining width, white):** Current step question, option cards, back/next navigation
- **Mobile:** Single panel, progress bar at top (horizontal), step content below

### Step Progress Indicator
- Vertical numbered steps (1-5) connected by lines
- Current step: Gold circle with white number
- Completed steps: Green checkmark with answer text
- Upcoming steps: Dark circle with gray number
- Lines animate fill as user progresses

### Steps

#### Step 1: Office Size (single-select)
- Question: "Aka velka je vasa kancelaria?"
- Subtitle: "Vyberte moznost, ktora najlepsie popisuje vas priestor."
- Options (2x2 grid of cards):
  - Mala kancelaria (1-10 ludi)
  - Stredna kancelaria (11-30 ludi)
  - Velka kancelaria (31-100 ludi)
  - Iny priestor (Coworking, showroom...)
- Each card: icon + title + subtitle, border highlight on select

#### Step 2: Daily Coffee Drinkers (single-select)
- Question: "Kolko ludi pije kavu denne?"
- Options (horizontal cards):
  - 1-10
  - 11-25
  - 26-50
  - 50+

#### Step 3: Coffee Selection (single-select, uses label images)
- Question: "Aku kavu preferujete?"
- Subtitle: "Mozete vybrat jednu alebo obe."
- Options (3 cards):
  - Original (shows label image from `labels/coffece original label final.png`)
  - Zlaty Standard (shows label image from `labels/coffece zlaty standard label final.png`)
  - Obe (Both -- split visual showing both labels)
- Selected card gets gold border highlight

#### Step 4: Delivery Frequency (single-select)
- Question: "Ako casto chcete dodavat kavu?"
- Options:
  - Tyzdenne (Weekly)
  - Dvojtyzdenne (Bi-weekly)
  - Mesacne (Monthly)
  - Podla potreby (On demand)

#### Step 5: Contact Details (form fields)
- Question: "Posledny krok -- kontaktne udaje"
- Fields:
  - Meno a priezvisko (Name) -- required, text
  - Nazov firmy (Company name) -- required, text
  - Email -- required, email validation
  - Telefon (Phone) -- required, with input mask for SK format
  - Sprava (Message) -- optional, textarea
- GDPR consent checkbox (required, links to privacy policy)
- Submit button: "Odoslat" (gold background)

### Submission
- API route: `POST /api/order`
- Collects all 5 steps into a structured payload
- Sends formatted email via Nodemailer + Google SMTP to configured recipient
- On success: Shows thank-you message with confirmation
- On error: Shows error message with retry option

### Animations
- Step transitions: Slide left (forward) / slide right (back) via `AnimatePresence`
- Option selection: Scale bounce + border color transition
- Progress indicator: Smooth line fill animation
- Modal entrance: Fade overlay + slide-up content

---

## Internationalization (i18n)

- **Primary:** Slovak (sk) -- default locale
- **Secondary:** English (en)
- **Implementation:** next-intl with file-based message dictionaries
- **URL strategy:** Prefix-based (`/sk/...`, `/en/...`) with Slovak as default (no prefix needed for SK)
- **Toggle:** Language switch in navbar (SK | EN), persisted in cookie
- **Scope:** All UI text, page content, form labels, error messages, legal pages

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 640px | Single column, hamburger nav, stacked cards, order picker single panel |
| Tablet | 640-1024px | 2-column where appropriate, condensed nav |
| Desktop | > 1024px | Full layout, all columns, two-panel order picker |

---

## Image Assets (from project root)

| Asset | Location | Usage |
|-------|----------|-------|
| Logo (black) | `logo/coffece_logo_black_transparent.PNG` | Navbar (light mode), footer |
| Logo (white) | `logo/Coffece_logo_white.png` | Navbar (dark sections), footer |
| Original label | `labels/coffece original label final.png` | Product page, order picker step 3, product cards |
| Zlaty label | `labels/coffece zlaty standard label final.png` | Product page, order picker step 3, product cards |
| Coffee beans pattern | `design_elements/coffe beans transparent.png` | Hero overlay, Original product page decoration |
| Coffee plant | `design_elements/coffe plant transparent.png` | Origin section, Zlaty product page decoration |
| Lifestyle photos | `design_elements/coffee_notebook*.png` | About section, hero backgrounds, contact page |
| Product photos | `ai product photos/IMG_306*.PNG/jpg` | Product pages, product cards, hero |
| Web mockup | `web/fresh coffee for your office.png` | Reference only (original design) |

---

## API Routes

### `POST /api/order`
Handles order picker form submission.
- **Input:** JSON body with all 5 step values
- **Action:** Formats HTML email, sends via Nodemailer with Google SMTP
- **Response:** `{ success: true }` or `{ error: "message" }`
- **Rate limiting:** Basic rate limit to prevent spam (e.g., 5 requests per IP per hour)

### `POST /api/contact`
Handles contact page form submission.
- **Input:** JSON body with name, email, phone, company, message
- **Action:** Sends formatted email via same SMTP config
- **Response:** Same pattern as order API

---

## Environment Variables

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-specific-password
SMTP_TO=recipient@coffece.sk
NEXT_PUBLIC_SITE_URL=https://coffece.sk
```

---

## Project Structure

```
coffece/
├── public/
│   ├── images/
│   │   ├── logos/          (copied from logo/)
│   │   ├── labels/         (copied from labels/)
│   │   ├── products/       (copied from ai product photos/)
│   │   ├── lifestyle/      (copied from design_elements/coffee_notebook*)
│   │   └── decorative/     (copied from design_elements/coffe beans, plant)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              (landing page)
│   │   │   ├── original/page.tsx
│   │   │   ├── zlaty-standard/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   └── cookies/page.tsx
│   │   └── api/
│   │       ├── order/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── cookie-banner.tsx
│   │   ├── landing/
│   │   │   ├── hero.tsx
│   │   │   ├── why-coffece.tsx
│   │   │   ├── product-showcase.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── origin-story.tsx
│   │   │   └── cta-banner.tsx
│   │   ├── order-picker/
│   │   │   ├── order-modal.tsx
│   │   │   ├── step-progress.tsx
│   │   │   ├── step-office-size.tsx
│   │   │   ├── step-daily-drinkers.tsx
│   │   │   ├── step-coffee-choice.tsx
│   │   │   ├── step-delivery-freq.tsx
│   │   │   └── step-contact-form.tsx
│   │   ├── product/
│   │   │   ├── product-hero.tsx
│   │   │   ├── product-specs.tsx
│   │   │   └── product-cta.tsx
│   │   └── ui/                       (shadcn/ui components)
│   ├── lib/
│   │   ├── email.ts                  (Nodemailer config)
│   │   └── utils.ts
│   └── messages/
│       ├── sk.json
│       └── en.json
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── .env.local
```

---

## Performance Targets

- **Lighthouse:** 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- **LCP:** < 2.5s (optimize hero images, use next/image)
- **CLS:** < 0.1 (reserve space for images, fonts)
- **FID:** < 100ms
- **Bundle:** Code-split per route, lazy-load order picker modal
