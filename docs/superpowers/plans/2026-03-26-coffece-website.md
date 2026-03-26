# Coffece Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, bilingual (SK/EN) website for Coffece -- a B2B office coffee company -- with an interactive 5-step order picker, product pages, and email-based lead capture.

**Architecture:** Next.js 15 App Router with locale-prefixed routing via next-intl. Shared layout (navbar + footer) wraps all pages. The order picker is a full-screen modal overlay accessible from any page. Form submissions hit API routes that send emails via Nodemailer/Google SMTP.

**Tech Stack:** Next.js 15, Tailwind CSS v4, shadcn/ui, Framer Motion, next-intl, next-themes, Nodemailer

**Spec:** `docs/superpowers/specs/2026-03-26-coffece-website-design.md`

---

## File Structure

```
coffece/
├── public/
│   └── images/
│       ├── logos/
│       │   ├── coffece-logo-black.png
│       │   └── coffece-logo-white.png
│       ├── labels/
│       │   ├── original-label.png
│       │   └── zlaty-label.png
│       ├── products/
│       │   ├── original-office.png
│       │   ├── original-kitchen.png
│       │   ├── original-desk.png
│       │   ├── zlaty-office.png
│       │   └── zlaty-kitchen.png
│       ├── lifestyle/
│       │   ├── coffee-desk-1.png
│       │   ├── coffee-desk-2.png
│       │   ├── coffee-desk-3.png
│       │   └── coffee-desk-4.png
│       └── decorative/
│           ├── coffee-beans-pattern.png
│           └── coffee-plant.png
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            -- locale layout with providers
│   │   │   ├── page.tsx              -- landing page (assembles sections)
│   │   │   ├── original/page.tsx
│   │   │   ├── zlaty-standard/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   └── cookies/page.tsx
│   │   ├── api/
│   │   │   ├── order/route.ts
│   │   │   └── contact/route.ts
│   │   ├── layout.tsx                -- root layout (html, body, fonts)
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── cookie-banner.tsx
│   │   │   └── language-toggle.tsx
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
│   │   │   ├── option-card.tsx
│   │   │   ├── step-office-size.tsx
│   │   │   ├── step-daily-drinkers.tsx
│   │   │   ├── step-coffee-choice.tsx
│   │   │   ├── step-delivery-freq.tsx
│   │   │   └── step-contact-form.tsx
│   │   ├── product/
│   │   │   ├── product-hero.tsx
│   │   │   ├── product-specs.tsx
│   │   │   └── product-cta.tsx
│   │   ├── providers.tsx             -- theme + intl providers
│   │   └── ui/                       -- shadcn/ui components
│   ├── lib/
│   │   ├── email.ts
│   │   ├── utils.ts
│   │   └── order-schema.ts           -- zod validation for order form
│   ├── i18n/
│   │   ├── request.ts
│   │   └── routing.ts
│   └── messages/
│       ├── sk.json
│       └── en.json
├── tailwind.config.ts
├── next.config.ts
├── components.json                   -- shadcn/ui config
├── package.json
├── .env.local
└── .gitignore
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/utils.ts`, `components.json`, `.env.local`, `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/zsoltvarju/Desktop/Projects/coffece
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Note: If prompted about overwriting existing files, proceed -- the project currently has no code files.

- [ ] **Step 2: Install core dependencies**

```bash
npm install framer-motion next-intl next-themes nodemailer zod
npm install -D @types/nodemailer
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init -d
```

Select: New York style, Zinc base color, CSS variables: yes.

- [ ] **Step 4: Install required shadcn/ui components**

```bash
npx shadcn@latest add button card accordion dialog input textarea label checkbox select sheet toast separator
```

- [ ] **Step 5: Create .env.local**

```bash
cat > .env.local << 'ENVEOF'
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_TO=recipient@coffece.sk
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENVEOF
```

- [ ] **Step 6: Update .gitignore to include project-specific entries**

Append to the existing `.gitignore`:

```
# Project
.env.local
.superpowers/
```

- [ ] **Step 7: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000` without errors.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind, shadcn/ui, and dependencies"
```

---

### Task 2: Asset Organization

**Files:**
- Create: `public/images/logos/`, `public/images/labels/`, `public/images/products/`, `public/images/lifestyle/`, `public/images/decorative/`

- [ ] **Step 1: Create image directories and copy assets**

```bash
cd /Users/zsoltvarju/Desktop/Projects/coffece
mkdir -p public/images/{logos,labels,products,lifestyle,decorative}

# Logos
cp "logo/coffece_logo_black_transparent.PNG" public/images/logos/coffece-logo-black.png
cp "logo/Coffece_logo_white.png" public/images/logos/coffece-logo-white.png

# Labels
cp "labels/coffece original label final.png" public/images/labels/original-label.png
cp "labels/coffece zlaty standard label final.png" public/images/labels/zlaty-label.png

# Product photos
cp "ai product photos/IMG_3067.PNG" public/images/products/zlaty-office.png
cp "ai product photos/IMG_3069.jpg" public/images/products/zlaty-kitchen.jpg
cp "ai product photos/IMG_3070.PNG" public/images/products/original-kitchen.png
cp "ai product photos/IMG_3072.PNG" public/images/products/original-living.png
cp "ai product photos/IMG_3073.jpg" public/images/products/original-desk.jpg

# Lifestyle
cp "design_elements/coffee_notebook.png" public/images/lifestyle/coffee-desk-1.png
cp "design_elements/coffee_notebook2.png" public/images/lifestyle/coffee-desk-2.png
cp "design_elements/coffee notebook3.png" public/images/lifestyle/coffee-desk-3.png
cp "design_elements/coffee notebook4.png" public/images/lifestyle/coffee-desk-4.png

# Decorative
cp "design_elements/coffe beans transparent.png" public/images/decorative/coffee-beans-pattern.png
cp "design_elements/coffe plant transparent.png" public/images/decorative/coffee-plant.png
```

- [ ] **Step 2: Verify all assets copied correctly**

```bash
find public/images -type f | sort
```

Expected: 16 image files across 5 directories.

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "chore: organize image assets into public/images/"
```

---

### Task 3: Tailwind Theme Configuration

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update tailwind.config.ts with Coffece brand tokens**

Replace the contents of `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F5C518",
          "gold-light": "#FFF9E6",
          "gold-dark": "#B8860B",
          black: "#0a0a0a",
          dark: "#111111",
          surface: "#1a1a1a",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.0625rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display": ["2.4375rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "heading-lg": ["1.9375rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
        "heading": ["1.5625rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "700" }],
        "overline": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

- [ ] **Step 2: Update globals.css with CSS variables for light/dark themes**

Replace the contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 48 20% 98%;
    --foreground: 0 0% 7%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 7%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 7%;
    --primary: 48 92% 53%;
    --primary-foreground: 0 0% 7%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 7%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 40%;
    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 7%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 48 92% 53%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 0 0% 7%;
    --foreground: 0 0% 96%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 96%;
    --popover: 0 0% 10%;
    --popover-foreground: 0 0% 96%;
    --primary: 48 92% 53%;
    --primary-foreground: 0 0% 7%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 96%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 96%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 17%;
    --input: 0 0% 17%;
    --ring: 48 92% 53%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 3: Verify the app renders with new theme**

```bash
npm run dev
```

Open http://localhost:3000. Page should render with the off-white background.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind with Coffece brand tokens and light/dark themes"
```

---

### Task 4: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/messages/sk.json`, `src/messages/en.json`, `src/middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create i18n routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
});
```

- [ ] **Step 2: Create i18n request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "sk" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create Slovak messages file**

Create `src/messages/sk.json`:

```json
{
  "nav": {
    "home": "Domov",
    "original": "Original",
    "zlaty": "Zlatý Štandard",
    "faq": "FAQ",
    "contact": "Kontakt",
    "order": "Objednať",
    "language": "EN"
  },
  "hero": {
    "overline": "Čerstvá káva pre váš office",
    "title": "Premeňte svoj office na",
    "titleHighlight": "kaviareň",
    "subtitle": "Čerstvo pražená káva z Brazílie. Doručujeme priamo do vašej kancelárie. Žiadne záväzky, žiadne starosti.",
    "cta": "Objednať",
    "learnMore": "Zistiť viac"
  },
  "why": {
    "overline": "Prečo my",
    "title": "Prečo si vybrať Coffece?",
    "fresh": "Čerstvo pražená",
    "freshDesc": "Pražíme v malých dávkach pre maximálnu čerstvosť a chuť.",
    "delivery": "Priamo do kancelárie",
    "deliveryDesc": "Pravidelné dodávky až k vám, bez starostí.",
    "noCommit": "Bez záväzkov",
    "noCommitDesc": "Žiadna zmluva. Objednajte koľko chcete, kedykoľvek."
  },
  "products": {
    "overline": "Naša ponuka",
    "title": "Naša ponuka kávy",
    "learnMore": "Zistiť viac",
    "original": {
      "name": "Original",
      "type": "100% Arabica",
      "region": "Brazília"
    },
    "zlaty": {
      "name": "Zlatý Štandard",
      "type": "100% výberová Arabica",
      "region": "Brazília"
    }
  },
  "howItWorks": {
    "overline": "Jednoduchý proces",
    "title": "Ako to funguje?",
    "step1": "Vyplňte formulár",
    "step1Desc": "Povedzte nám o vašej kancelárii a preferenciách.",
    "step2": "Pripravíme ponuku",
    "step2Desc": "Na mieru pre vašu kanceláriu a tím.",
    "step3": "Doručíme kávu",
    "step3Desc": "Čerstvo pražená káva priamo k vám do office."
  },
  "origin": {
    "overline": "Náš príbeh",
    "title": "Srdce našej kávy",
    "text": "Naša káva pochádza z farmy Agron Cereale Minerio v Brazílii. Každé zrnko je starostlivo vybraté a pražené v malých dávkach pre zachovanie unikátnej chuti a arómy.",
    "badge": "BRAZIL"
  },
  "cta": {
    "title": "Pripravení na lepšiu kávu?",
    "subtitle": "Objednajte si čerstvo praženú kávu priamo do vašej kancelárie.",
    "button": "Objednať teraz"
  },
  "product": {
    "intensity": "Intenzita",
    "region": "Región",
    "weight": "Hmotnosť",
    "roastDate": "Dátum praženia",
    "type": "Typ",
    "orderThis": "Objednať",
    "original": {
      "hero": "Silná, vyvážená chuť pre každodenné potešenie v kancelárii.",
      "description": "Coffece Original je naša vlajková zmes 100% Arabica zŕn z Brazílie. S intenzitou 4/5 ponúka bohatú, plnú chuť s jemnými čokoládovými tónmi a orechovou dochutou. Ideálna pre tých, čo ocenia klasickú kávu bez kompromisov.",
      "notes": "Čokoládové tóny, orechová dochuť, plné telo"
    },
    "zlaty": {
      "hero": "Prémiová výberová Arabica pre náročných kávičkárov.",
      "description": "Coffece Zlatý Štandard je naša prémiová zmes 100% výberovej Arabica. Starostlivo vybraté zrná z brazílskych fariem ponúkajú jemnú, komplexnú chuť s ovocnými a kvetinovými tónmi. Pre tých, čo hľadajú to najlepšie.",
      "notes": "Ovocné a kvetinové tóny, jemná kyselinkovosť, hodvábne telo"
    }
  },
  "order": {
    "title": "Nezáväzná cenová ponuka",
    "close": "Zavrieť",
    "next": "Ďalší krok",
    "back": "Späť",
    "submit": "Odoslať",
    "callInstead": "Radšej zavoláte?",
    "step1": {
      "title": "Aká veľká je vaša kancelária?",
      "subtitle": "Vyberte možnosť, ktorá najlepšie popisuje váš priestor.",
      "small": "Malá kancelária",
      "smallDesc": "1 – 10 ľudí",
      "medium": "Stredná kancelária",
      "mediumDesc": "11 – 30 ľudí",
      "large": "Veľká kancelária",
      "largeDesc": "31 – 100 ľudí",
      "other": "Iný priestor",
      "otherDesc": "Coworking, showroom..."
    },
    "step2": {
      "title": "Koľko ľudí pije kávu denne?",
      "subtitle": "Pomôže nám to odhadnúť správne množstvo."
    },
    "step3": {
      "title": "Akú kávu preferujete?",
      "subtitle": "Vyberte si jednu alebo obe.",
      "both": "Obe",
      "bothDesc": "Mix oboch kávových zmesí"
    },
    "step4": {
      "title": "Ako často chcete dodávať kávu?",
      "subtitle": "Frekvenciu môžete kedykoľvek zmeniť.",
      "weekly": "Týždenne",
      "biweekly": "Dvojtýždenne",
      "monthly": "Mesačne",
      "onDemand": "Podľa potreby"
    },
    "step5": {
      "title": "Posledný krok — kontaktné údaje",
      "subtitle": "Ozveme sa vám s ponukou do 24 hodín.",
      "name": "Meno a priezvisko",
      "company": "Názov firmy",
      "email": "Email",
      "phone": "Telefón",
      "message": "Správa (voliteľné)",
      "gdpr": "Súhlasím so spracovaním osobných údajov podľa",
      "gdprLink": "zásad ochrany osobných údajov",
      "successTitle": "Ďakujeme!",
      "successText": "Vaša požiadavka bola odoslaná. Ozveme sa vám do 24 hodín.",
      "errorText": "Niečo sa nepodarilo. Skúste to prosím znova."
    },
    "progress": {
      "step1": "Veľkosť kancelárie",
      "step2": "Denne spotrebitelia",
      "step3": "Výber kávy",
      "step4": "Frekvencia dodania",
      "step5": "Kontaktné údaje"
    }
  },
  "contact": {
    "title": "Kontakt",
    "subtitle": "Máte otázky? Napíšte nám alebo zavolajte.",
    "form": {
      "name": "Meno a priezvisko",
      "email": "Email",
      "phone": "Telefón",
      "company": "Firma",
      "message": "Správa",
      "submit": "Odoslať správu",
      "success": "Správa bola odoslaná. Ďakujeme!",
      "error": "Niečo sa nepodarilo. Skúste to znova."
    },
    "info": {
      "emailLabel": "Email",
      "email": "info@coffece.sk",
      "phoneLabel": "Telefón",
      "phone": "+421 xxx xxx xxx",
      "addressLabel": "Adresa",
      "address": "Ulica 123, 010 01 Mesto, Slovensko"
    }
  },
  "faq": {
    "title": "Často kladené otázky",
    "subtitle": "Nenašli ste odpoveď? Kontaktujte nás.",
    "categories": {
      "ordering": "Objednávky",
      "delivery": "Dodanie",
      "products": "Produkty",
      "general": "Všeobecné"
    },
    "items": [
      { "q": "Aké je minimálne množstvo objednávky?", "a": "Minimálna objednávka je 1 kg kávy (4 balenia po 250g). Pre väčšie kancelárie odporúčame pravidelné dodávky.", "cat": "ordering" },
      { "q": "Ako si objednám kávu?", "a": "Jednoducho vyplňte náš online formulár alebo nás kontaktujte telefonicky. Pripravíme vám ponuku na mieru.", "cat": "ordering" },
      { "q": "Aké sú platobné podmienky?", "a": "Prijímame platbu bankovým prevodom a faktúrou. Pre pravidelných zákazníkov ponúkame mesačnú fakturáciu.", "cat": "ordering" },
      { "q": "Kam doručujete?", "a": "Doručujeme po celom Slovensku. Pre Bratislavu a okolie zabezpečujeme vlastnú dopravu.", "cat": "delivery" },
      { "q": "Ako často môžem dostávať kávu?", "a": "Ponúkame týždenné, dvojtýždenné alebo mesačné dodávky. Frekvenciu môžete kedykoľvek zmeniť.", "cat": "delivery" },
      { "q": "Aký je rozdiel medzi Original a Zlatý Štandard?", "a": "Original je naša klasická zmes 100% Arabica s plnou chuťou. Zlatý Štandard je prémiová výberová Arabica s jemnejšou, komplexnejšou chuťou.", "cat": "products" },
      { "q": "Ako dlho vydrží čerstvosť kávy?", "a": "Odporúčame spotrebovať do 4 týždňov od praženia pre najlepšiu chuť. Dátum praženia je uvedený na každom balení.", "cat": "products" },
      { "q": "Ako skladovať kávu?", "a": "Uchovávajte v suchu, na tmavom mieste, v uzavretom obale. Neodporúčame ukladať do chladničky.", "cat": "products" },
      { "q": "Ponúkate skúšobnú objednávku?", "a": "Áno! Prvá objednávka je bez záväzkov. Vyskúšajte našu kávu a rozhodnite sa sami.", "cat": "general" },
      { "q": "Môžem objednávku kedykoľvek zrušiť?", "a": "Samozrejme. Nemáme žiadne dlhodobé zmluvy. Objednávku môžete zrušiť alebo pozastaviť kedykoľvek.", "cat": "general" }
    ]
  },
  "footer": {
    "tagline": "Čerstvá káva pre váš office",
    "nav": "Navigácia",
    "contactTitle": "Kontakt",
    "social": "Sociálne siete",
    "privacy": "Ochrana súkromia",
    "cookies": "Cookies",
    "rights": "Všetky práva vyhradené."
  },
  "cookie": {
    "message": "Táto stránka používa cookies pre zlepšenie vášho zážitku.",
    "accept": "Prijať",
    "decline": "Odmietnuť",
    "learnMore": "Zistiť viac"
  },
  "privacy": {
    "title": "Ochrana osobných údajov",
    "content": "Toto je zástupný text zásad ochrany osobných údajov. Bude nahradený skutočným obsahom."
  },
  "cookiesPage": {
    "title": "Cookies",
    "content": "Toto je zástupný text zásad používania cookies. Bude nahradený skutočným obsahom."
  }
}
```

- [ ] **Step 4: Create English messages file**

Create `src/messages/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "original": "Original",
    "zlaty": "Gold Standard",
    "faq": "FAQ",
    "contact": "Contact",
    "order": "Order",
    "language": "SK"
  },
  "hero": {
    "overline": "Fresh coffee for your office",
    "title": "Turn your office into a",
    "titleHighlight": "café",
    "subtitle": "Freshly roasted coffee from Brazil. Delivered right to your office. No commitments, no worries.",
    "cta": "Order",
    "learnMore": "Learn more"
  },
  "why": {
    "overline": "Why us",
    "title": "Why choose Coffece?",
    "fresh": "Freshly Roasted",
    "freshDesc": "We roast in small batches for maximum freshness and flavor.",
    "delivery": "Office Delivery",
    "deliveryDesc": "Regular deliveries right to your door, hassle-free.",
    "noCommit": "No Commitments",
    "noCommitDesc": "No contracts. Order what you want, whenever you want."
  },
  "products": {
    "overline": "Our selection",
    "title": "Our Coffee Selection",
    "learnMore": "Learn more",
    "original": {
      "name": "Original",
      "type": "100% Arabica",
      "region": "Brazil"
    },
    "zlaty": {
      "name": "Gold Standard",
      "type": "100% Select Arabica",
      "region": "Brazil"
    }
  },
  "howItWorks": {
    "overline": "Simple process",
    "title": "How does it work?",
    "step1": "Fill out the form",
    "step1Desc": "Tell us about your office and preferences.",
    "step2": "We prepare your offer",
    "step2Desc": "Customized for your office and team.",
    "step3": "We deliver coffee",
    "step3Desc": "Freshly roasted coffee delivered to your office."
  },
  "origin": {
    "overline": "Our story",
    "title": "The Heart of Our Coffee",
    "text": "Our coffee comes from the Agron Cereale Minerio farm in Brazil. Every bean is carefully selected and roasted in small batches to preserve its unique flavor and aroma.",
    "badge": "BRAZIL"
  },
  "cta": {
    "title": "Ready for better coffee?",
    "subtitle": "Order freshly roasted coffee delivered right to your office.",
    "button": "Order now"
  },
  "product": {
    "intensity": "Intensity",
    "region": "Region",
    "weight": "Weight",
    "roastDate": "Roast Date",
    "type": "Type",
    "orderThis": "Order",
    "original": {
      "hero": "Strong, balanced flavor for everyday office enjoyment.",
      "description": "Coffece Original is our flagship 100% Arabica blend from Brazil. With an intensity of 4/5, it offers a rich, full-bodied taste with subtle chocolate tones and a nutty finish. Perfect for those who appreciate classic coffee without compromise.",
      "notes": "Chocolate tones, nutty finish, full body"
    },
    "zlaty": {
      "hero": "Premium select Arabica for discerning coffee lovers.",
      "description": "Coffece Gold Standard is our premium 100% select Arabica blend. Carefully chosen beans from Brazilian farms deliver a delicate, complex flavor with fruity and floral notes. For those seeking the very best.",
      "notes": "Fruity and floral notes, gentle acidity, silky body"
    }
  },
  "order": {
    "title": "Get a Free Quote",
    "close": "Close",
    "next": "Next step",
    "back": "Back",
    "submit": "Submit",
    "callInstead": "Rather call?",
    "step1": {
      "title": "How big is your office?",
      "subtitle": "Select the option that best describes your space.",
      "small": "Small office",
      "smallDesc": "1 – 10 people",
      "medium": "Medium office",
      "mediumDesc": "11 – 30 people",
      "large": "Large office",
      "largeDesc": "31 – 100 people",
      "other": "Other space",
      "otherDesc": "Coworking, showroom..."
    },
    "step2": {
      "title": "How many people drink coffee daily?",
      "subtitle": "This helps us estimate the right amount."
    },
    "step3": {
      "title": "Which coffee do you prefer?",
      "subtitle": "Choose one or both.",
      "both": "Both",
      "bothDesc": "Mix of both blends"
    },
    "step4": {
      "title": "How often would you like delivery?",
      "subtitle": "You can change the frequency anytime.",
      "weekly": "Weekly",
      "biweekly": "Bi-weekly",
      "monthly": "Monthly",
      "onDemand": "On demand"
    },
    "step5": {
      "title": "Last step — your contact details",
      "subtitle": "We'll get back to you with a quote within 24 hours.",
      "name": "Full name",
      "company": "Company name",
      "email": "Email",
      "phone": "Phone",
      "message": "Message (optional)",
      "gdpr": "I agree to the processing of personal data according to the",
      "gdprLink": "privacy policy",
      "successTitle": "Thank you!",
      "successText": "Your request has been sent. We'll get back to you within 24 hours.",
      "errorText": "Something went wrong. Please try again."
    },
    "progress": {
      "step1": "Office size",
      "step2": "Daily drinkers",
      "step3": "Coffee choice",
      "step4": "Delivery frequency",
      "step5": "Contact details"
    }
  },
  "contact": {
    "title": "Contact",
    "subtitle": "Have questions? Write to us or give us a call.",
    "form": {
      "name": "Full name",
      "email": "Email",
      "phone": "Phone",
      "company": "Company",
      "message": "Message",
      "submit": "Send message",
      "success": "Message sent. Thank you!",
      "error": "Something went wrong. Please try again."
    },
    "info": {
      "emailLabel": "Email",
      "email": "info@coffece.sk",
      "phoneLabel": "Phone",
      "phone": "+421 xxx xxx xxx",
      "addressLabel": "Address",
      "address": "Street 123, 010 01 City, Slovakia"
    }
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Can't find your answer? Contact us.",
    "categories": {
      "ordering": "Ordering",
      "delivery": "Delivery",
      "products": "Products",
      "general": "General"
    },
    "items": [
      { "q": "What is the minimum order quantity?", "a": "The minimum order is 1 kg of coffee (4 packs of 250g). For larger offices, we recommend regular deliveries.", "cat": "ordering" },
      { "q": "How do I order coffee?", "a": "Simply fill out our online form or contact us by phone. We'll prepare a custom offer for you.", "cat": "ordering" },
      { "q": "What are the payment terms?", "a": "We accept bank transfer and invoice payments. Regular customers can opt for monthly billing.", "cat": "ordering" },
      { "q": "Where do you deliver?", "a": "We deliver throughout Slovakia. For Bratislava and surrounding areas, we provide our own delivery service.", "cat": "delivery" },
      { "q": "How often can I receive coffee?", "a": "We offer weekly, bi-weekly, or monthly deliveries. You can change the frequency at any time.", "cat": "delivery" },
      { "q": "What's the difference between Original and Gold Standard?", "a": "Original is our classic 100% Arabica blend with a full-bodied taste. Gold Standard is a premium select Arabica with a more delicate, complex flavor profile.", "cat": "products" },
      { "q": "How long does the coffee stay fresh?", "a": "We recommend consuming within 4 weeks of roasting for the best flavor. The roast date is printed on every package.", "cat": "products" },
      { "q": "How should I store the coffee?", "a": "Keep in a dry, dark place in a sealed container. We don't recommend storing in the refrigerator.", "cat": "products" },
      { "q": "Do you offer a trial order?", "a": "Yes! Your first order is commitment-free. Try our coffee and decide for yourself.", "cat": "general" },
      { "q": "Can I cancel my order anytime?", "a": "Of course. We have no long-term contracts. You can cancel or pause your order at any time.", "cat": "general" }
    ]
  },
  "footer": {
    "tagline": "Fresh coffee for your office",
    "nav": "Navigation",
    "contactTitle": "Contact",
    "social": "Social",
    "privacy": "Privacy Policy",
    "cookies": "Cookies",
    "rights": "All rights reserved."
  },
  "cookie": {
    "message": "This website uses cookies to improve your experience.",
    "accept": "Accept",
    "decline": "Decline",
    "learnMore": "Learn more"
  },
  "privacy": {
    "title": "Privacy Policy",
    "content": "This is placeholder privacy policy text. It will be replaced with actual content."
  },
  "cookiesPage": {
    "title": "Cookie Policy",
    "content": "This is placeholder cookie policy text. It will be replaced with actual content."
  }
}
```

- [ ] **Step 5: Create middleware for locale detection**

Create `src/middleware.ts`:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico).*)"],
};
```

- [ ] **Step 6: Update next.config.ts**

Replace `next.config.ts` with:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Verify i18n works**

```bash
npm run dev
```

Open http://localhost:3000 -- should redirect to `/sk`. Open http://localhost:3000/en -- should serve English locale.

- [ ] **Step 8: Commit**

```bash
git add src/i18n/ src/messages/ src/middleware.ts next.config.ts
git commit -m "feat: configure next-intl with SK/EN locale support"
```

---

### Task 5: Root Layout, Providers, and Theme

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`, `src/components/providers.tsx`

- [ ] **Step 1: Create providers component**

Create `src/components/providers.tsx`:

```tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Update root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Coffece — Čerstvá káva pre váš office",
  description:
    "Čerstvo pražená káva z Brazílie doručená priamo do vašej kancelárie. 100% Arabica, bez záväzkov.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 3: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "sk" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create a minimal landing page placeholder**

Create `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-display-lg">Coffece</h1>
    </main>
  );
}
```

- [ ] **Step 5: Verify app loads with theme and i18n**

```bash
npm run dev
```

Open http://localhost:3000/sk -- should show "Coffece" centered in large text with Inter font.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/\[locale\]/layout.tsx src/app/\[locale\]/page.tsx src/components/providers.tsx
git commit -m "feat: add root layout with next-themes and next-intl providers"
```

---

### Task 6: Navbar Component

**Files:**
- Create: `src/components/layout/navbar.tsx`, `src/components/layout/mobile-nav.tsx`, `src/components/layout/language-toggle.tsx`

- [ ] **Step 1: Create language toggle component**

Create `src/components/layout/language-toggle.tsx`:

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === "sk" ? "en" : "sk";
    const pathWithoutLocale = pathname.replace(/^\/(sk|en)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="text-xs font-semibold tracking-wider"
    >
      {locale === "sk" ? "EN" : "SK"}
    </Button>
  );
}
```

- [ ] **Step 2: Create mobile nav component**

Create `src/components/layout/mobile-nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MobileNav({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/original" as const, label: t("original") },
    { href: "/zlaty-standard" as const, label: t("zlaty") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => {
              setOpen(false);
              onOrderClick();
            }}
            className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold mt-4"
          >
            {t("order")}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

Note: We need to add `Link` to the next-intl routing. Update `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

- [ ] **Step 3: Create navbar component**

Create `src/components/layout/navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/original" as const, label: t("original") },
    { href: "/zlaty-standard" as const, label: t("zlaty") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={
              scrolled
                ? "/images/logos/coffece-logo-black.png"
                : "/images/logos/coffece-logo-white.png"
            }
            alt="Coffece"
            width={120}
            height={40}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/images/logos/coffece-logo-white.png"
            alt="Coffece"
            width={120}
            height={40}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageToggle />

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={scrolled ? "" : "text-white hover:text-brand-gold"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            onClick={onOrderClick}
            className="hidden md:inline-flex bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold"
          >
            {t("order")}
          </Button>

          <MobileNav onOrderClick={onOrderClick} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Install lucide-react icons**

```bash
npm install lucide-react
```

- [ ] **Step 5: Verify navbar renders**

Temporarily add the navbar to the locale layout to test. Update `src/app/[locale]/layout.tsx` body content:

Add `import { Navbar } from "@/components/layout/navbar";` and wrap children with a simple test. Then check http://localhost:3000/sk.

After verifying, revert -- the navbar will be properly integrated in the layout assembly task.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ src/i18n/routing.ts
git commit -m "feat: add navbar with language toggle, theme switch, and mobile nav"
```

---

### Task 7: Footer Component

**Files:**
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: Create footer component**

Create `src/components/layout/footer.tsx`:

```tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");

  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logos/coffece-logo-white.png"
              alt="Coffece"
              width={120}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-400">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {t("nav")}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/original" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("original")}
              </Link>
              <Link href="/zlaty-standard" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("zlaty")}
              </Link>
              <Link href="/faq" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("faq")}
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-brand-gold transition-colors">
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {t("contactTitle")}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>{tContact("email")}</span>
              <span>{tContact("phone")}</span>
              <span>{tContact("address")}</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {t("social")}
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Coffece. {t("rights")}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-gold transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-brand-gold transition-colors">
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: add footer with navigation, contact, and social links"
```

---

### Task 8: Landing Page — Hero Section

**Files:**
- Create: `src/components/landing/hero.tsx`

- [ ] **Step 1: Create hero component**

Create `src/components/landing/hero.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="/images/decorative/coffee-beans-pattern.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Vertical side text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="text-[10px] tracking-[0.3em] text-gray-700 uppercase writing-mode-vertical"
              style={{ writingMode: "vertical-rl" }}>
          Freshly Roasted
        </span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-overline uppercase text-brand-gold mb-4"
            >
              {t("overline")}
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-display-lg text-white mb-6"
            >
              {t("title")}{" "}
              <span className="text-brand-gold">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg text-gray-400 mb-8 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-4"
            >
              <Button
                size="lg"
                onClick={onOrderClick}
                className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold text-base px-8"
              >
                {t("cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 font-medium text-base"
                onClick={() => {
                  document.getElementById("why-coffece")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("learnMore")}
              </Button>
            </motion.div>
          </div>

          {/* Product images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center gap-6 lg:gap-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative -rotate-3"
            >
              <Image
                src="/images/products/original-kitchen.png"
                alt="Coffece Original"
                width={220}
                height={320}
                className="rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="relative rotate-3 mt-8"
            >
              <Image
                src="/images/products/zlaty-office.png"
                alt="Coffece Zlatý Štandard"
                width={220}
                height={320}
                className="rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "feat: add hero section with animated entrance and floating product images"
```

---

### Task 9: Landing Page — Why Coffece & How It Works Sections

**Files:**
- Create: `src/components/landing/why-coffece.tsx`, `src/components/landing/how-it-works.tsx`

- [ ] **Step 1: Create why-coffece component**

Create `src/components/landing/why-coffece.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Coffee, Truck, HandshakeIcon } from "lucide-react";

const cards = [
  { icon: Coffee, key: "fresh" as const },
  { icon: Truck, key: "delivery" as const },
  { icon: HandshakeIcon, key: "noCommit" as const },
];

export function WhyCoffece() {
  const t = useTranslations("why");

  return (
    <section id="why-coffece" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-overline uppercase text-muted-foreground mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-xl border p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="text-heading-sm mb-3">{t(card.key)}</h3>
              <p className="text-muted-foreground">{t(`${card.key}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create how-it-works component**

Create `src/components/landing/how-it-works.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = [
  { num: 1, key: "step1" as const },
  { num: 2, key: "step2" as const },
  { num: 3, key: "step3" as const },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-overline uppercase text-muted-foreground mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[2.25rem] left-[16%] right-[16%] h-[2px] bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full bg-brand-black text-brand-gold font-bold text-2xl mb-6 relative z-10">
                {step.num}
              </div>
              <h3 className="text-heading-sm mb-2">{t(step.key)}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                {t(`${step.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/why-coffece.tsx src/components/landing/how-it-works.tsx
git commit -m "feat: add Why Coffece and How It Works landing sections"
```

---

### Task 10: Landing Page — Product Showcase Section

**Files:**
- Create: `src/components/landing/product-showcase.tsx`

- [ ] **Step 1: Create product showcase component**

Create `src/components/landing/product-showcase.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function ProductShowcase() {
  const t = useTranslations("products");

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-overline uppercase text-muted-foreground mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display">{t("title")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Original */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/original" className="block group">
              <div className="bg-brand-black rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <div className="relative w-48 h-64 mx-auto mb-6">
                  <Image
                    src="/images/products/original-kitchen.png"
                    alt={t("original.name")}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-heading text-white mb-1">
                  {t("original.name")}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {t("original.type")} &middot; {t("original.region")}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-white border border-gray-600 rounded-lg px-4 py-2 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
                  {t("learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Zlaty */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link href="/zlaty-standard" className="block group">
              <div className="bg-brand-gold-light rounded-2xl p-8 text-center border border-brand-gold hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <div className="relative w-48 h-64 mx-auto mb-6">
                  <Image
                    src="/images/products/zlaty-office.png"
                    alt={t("zlaty.name")}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-heading text-brand-black mb-1">
                  {t("zlaty.name")}
                </h3>
                <p className="text-brand-gold-dark text-sm mb-4">
                  {t("zlaty.type")} &middot; {t("zlaty.region")}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-brand-black border border-brand-gold rounded-lg px-4 py-2 group-hover:bg-brand-gold transition-colors">
                  {t("learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/product-showcase.tsx
git commit -m "feat: add product showcase section with Original and Zlaty cards"
```

---

### Task 11: Landing Page — Origin Story & CTA Banner

**Files:**
- Create: `src/components/landing/origin-story.tsx`, `src/components/landing/cta-banner.tsx`

- [ ] **Step 1: Create origin story component**

Create `src/components/landing/origin-story.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function OriginStory() {
  const t = useTranslations("origin");

  return (
    <section className="py-24 bg-brand-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="/images/decorative/coffee-beans-pattern.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-overline uppercase text-brand-gold mb-3">
              {t("overline")}
            </p>
            <h2 className="text-display text-white mb-6">{t("title")}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t("text")}
            </p>
            <div className="inline-flex items-center gap-3 bg-brand-surface rounded-lg px-5 py-3">
              <span className="text-2xl">&#127463;&#127479;</span>
              <span className="text-brand-gold font-bold tracking-wider">
                {t("badge")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <Image
                src="/images/decorative/coffee-plant.png"
                alt="Coffee plant illustration"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create CTA banner component**

Create `src/components/landing/cta-banner.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CtaBanner({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("cta");

  return (
    <section className="py-20 bg-brand-gold">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display text-brand-black mb-4">{t("title")}</h2>
          <p className="text-brand-black/70 text-lg mb-8 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
          <Button
            size="lg"
            onClick={onOrderClick}
            className="bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold text-base px-10"
          >
            {t("button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/origin-story.tsx src/components/landing/cta-banner.tsx
git commit -m "feat: add origin story and CTA banner landing sections"
```

---

### Task 12: Landing Page Assembly

**Files:**
- Modify: `src/app/[locale]/page.tsx`, `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Update locale layout to include navbar and footer**

Replace `src/app/[locale]/layout.tsx` with:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "sk" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create the landing page with all sections**

Replace `src/app/[locale]/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { WhyCoffece } from "@/components/landing/why-coffece";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OriginStory } from "@/components/landing/origin-story";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <Hero onOrderClick={() => setOrderOpen(true)} />
        <WhyCoffece />
        <ProductShowcase />
        <HowItWorks />
        <OriginStory />
        <CtaBanner onOrderClick={() => setOrderOpen(true)} />
      </main>
      <Footer />
      {/* Order picker modal will be added in Task 15 */}
    </>
  );
}
```

- [ ] **Step 3: Verify the full landing page renders**

```bash
npm run dev
```

Open http://localhost:3000/sk -- all 6 sections should render with proper styling and animations.

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/layout.tsx src/app/\[locale\]/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

### Task 13: Product Pages (Original & Zlatý Štandard)

**Files:**
- Create: `src/components/product/product-hero.tsx`, `src/components/product/product-specs.tsx`, `src/components/product/product-cta.tsx`, `src/app/[locale]/original/page.tsx`, `src/app/[locale]/zlaty-standard/page.tsx`

- [ ] **Step 1: Create product hero component**

Create `src/components/product/product-hero.tsx`:

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductHeroProps {
  name: string;
  tagline: string;
  imageSrc: string;
  variant: "original" | "zlaty";
}

export function ProductHero({ name, tagline, imageSrc, variant }: ProductHeroProps) {
  const isDark = variant === "original";

  return (
    <section
      className={`min-h-[70vh] flex items-center pt-24 ${
        isDark ? "bg-brand-black" : "bg-brand-gold-light"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-display-lg mb-4 ${
                isDark ? "text-white" : "text-brand-black"
              }`}
            >
              {name}
            </h1>
            <p
              className={`text-xl ${
                isDark ? "text-gray-400" : "text-brand-gold-dark"
              }`}
            >
              {tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex justify-center"
          >
            <Image
              src={imageSrc}
              alt={name}
              width={400}
              height={500}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create product specs component**

Create `src/components/product/product-specs.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductSpecsProps {
  variant: "original" | "zlaty";
  labelSrc: string;
  decorativeSrc: string;
}

export function ProductSpecs({ variant, labelSrc, decorativeSrc }: ProductSpecsProps) {
  const t = useTranslations("product");
  const tProduct = useTranslations(`product.${variant}`);

  const specs = [
    { label: t("type"), value: variant === "original" ? "100% Arabica" : "100% Výberová Arabica" },
    { label: t("intensity"), value: "4/5" },
    { label: t("region"), value: "Brazil" },
    { label: t("weight"), value: "250g" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Description + specs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {tProduct("description")}
            </p>

            <div className="mb-8">
              <h3 className="text-heading-sm mb-2">{t("intensity")}</h3>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${
                      i <= 4
                        ? variant === "original"
                          ? "bg-brand-black"
                          : "bg-brand-gold"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Tasting Notes
              </p>
              <p className="font-medium">{tProduct("notes")}</p>
            </div>
          </motion.div>

          {/* Label image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src={labelSrc}
                alt="Product label"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10">
              <Image
                src={decorativeSrc}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create product CTA component**

Create `src/components/product/product-cta.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductCtaProps {
  productName: string;
  variant: "original" | "zlaty";
  onOrderClick: () => void;
}

export function ProductCta({ productName, variant, onOrderClick }: ProductCtaProps) {
  const t = useTranslations("product");
  const isDark = variant === "original";

  return (
    <section
      className={`py-20 ${isDark ? "bg-brand-black" : "bg-brand-gold"}`}
    >
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-display mb-6 ${
              isDark ? "text-white" : "text-brand-black"
            }`}
          >
            {t("orderThis")} {productName}
          </h2>
          <Button
            size="lg"
            onClick={onOrderClick}
            className={
              isDark
                ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold text-base px-10"
                : "bg-brand-black text-brand-gold hover:bg-brand-black/90 font-bold text-base px-10"
            }
          >
            {t("orderThis")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Original product page**

Create `src/app/[locale]/original/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductCta } from "@/components/product/product-cta";

export default function OriginalPage() {
  const t = useTranslations("product.original");
  const tProducts = useTranslations("products.original");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <ProductHero
          name={tProducts("name")}
          tagline={t("hero")}
          imageSrc="/images/products/original-desk.jpg"
          variant="original"
        />
        <ProductSpecs
          variant="original"
          labelSrc="/images/labels/original-label.png"
          decorativeSrc="/images/decorative/coffee-beans-pattern.png"
        />
        <ProductCta
          productName={tProducts("name")}
          variant="original"
          onOrderClick={() => setOrderOpen(true)}
        />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Create Zlatý Štandard product page**

Create `src/app/[locale]/zlaty-standard/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductCta } from "@/components/product/product-cta";

export default function ZlatyStandardPage() {
  const t = useTranslations("product.zlaty");
  const tProducts = useTranslations("products.zlaty");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main>
        <ProductHero
          name={tProducts("name")}
          tagline={t("hero")}
          imageSrc="/images/products/zlaty-kitchen.jpg"
          variant="zlaty"
        />
        <ProductSpecs
          variant="zlaty"
          labelSrc="/images/labels/zlaty-label.png"
          decorativeSrc="/images/decorative/coffee-plant.png"
        />
        <ProductCta
          productName={tProducts("name")}
          variant="zlaty"
          onOrderClick={() => setOrderOpen(true)}
        />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify both product pages render**

```bash
npm run dev
```

Check http://localhost:3000/sk/original and http://localhost:3000/sk/zlaty-standard.

- [ ] **Step 7: Commit**

```bash
git add src/components/product/ src/app/\[locale\]/original/ src/app/\[locale\]/zlaty-standard/
git commit -m "feat: add Original and Zlaty Standard product pages"
```

---

### Task 14: Email Utility & Order API Route (TDD)

**Files:**
- Create: `src/lib/email.ts`, `src/lib/order-schema.ts`, `src/app/api/order/route.ts`
- Test: `src/lib/__tests__/order-schema.test.ts`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Add to `package.json` scripts: `"test": "vitest run", "test:watch": "vitest"`

- [ ] **Step 2: Write failing test for order schema validation**

Create `src/lib/__tests__/order-schema.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { orderSchema } from "../order-schema";

describe("orderSchema", () => {
  it("validates a complete valid order", () => {
    const result = orderSchema.safeParse({
      officeSize: "small",
      dailyDrinkers: "1-10",
      coffeeChoice: "original",
      deliveryFrequency: "weekly",
      contact: {
        name: "Ján Novák",
        company: "ACME s.r.o.",
        email: "jan@acme.sk",
        phone: "+421912345678",
        message: "Test message",
        gdprConsent: true,
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = orderSchema.safeParse({
      officeSize: "small",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = orderSchema.safeParse({
      officeSize: "small",
      dailyDrinkers: "1-10",
      coffeeChoice: "original",
      deliveryFrequency: "weekly",
      contact: {
        name: "Test",
        company: "Test",
        email: "not-an-email",
        phone: "+421912345678",
        gdprConsent: true,
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects without gdpr consent", () => {
    const result = orderSchema.safeParse({
      officeSize: "small",
      dailyDrinkers: "1-10",
      coffeeChoice: "original",
      deliveryFrequency: "weekly",
      contact: {
        name: "Test",
        company: "Test",
        email: "test@test.sk",
        phone: "+421912345678",
        gdprConsent: false,
      },
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL -- `order-schema` module not found.

- [ ] **Step 4: Implement order schema**

Create `src/lib/order-schema.ts`:

```typescript
import { z } from "zod";

export const orderSchema = z.object({
  officeSize: z.enum(["small", "medium", "large", "other"]),
  dailyDrinkers: z.enum(["1-10", "11-25", "26-50", "50+"]),
  coffeeChoice: z.enum(["original", "zlaty", "both"]),
  deliveryFrequency: z.enum(["weekly", "biweekly", "monthly", "onDemand"]),
  contact: z.object({
    name: z.string().min(1),
    company: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    message: z.string().optional(),
    gdprConsent: z.literal(true, {
      errorMap: () => ({ message: "GDPR consent is required" }),
    }),
  }),
});

export type OrderData = z.infer<typeof orderSchema>;
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```

Expected: 4 tests PASS.

- [ ] **Step 6: Create email utility**

Create `src/lib/email.ts`:

```typescript
import nodemailer from "nodemailer";
import type { OrderData } from "./order-schema";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(data: OrderData) {
  const { officeSize, dailyDrinkers, coffeeChoice, deliveryFrequency, contact } = data;

  const html = `
    <h2>Nová objednávka z coffece.sk</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Veľkosť kancelárie</td><td style="padding:8px;border:1px solid #ddd;">${officeSize}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Denne pije kávu</td><td style="padding:8px;border:1px solid #ddd;">${dailyDrinkers}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Výber kávy</td><td style="padding:8px;border:1px solid #ddd;">${coffeeChoice}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Frekvencia dodania</td><td style="padding:8px;border:1px solid #ddd;">${deliveryFrequency}</td></tr>
    </table>
    <h3>Kontaktné údaje</h3>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Meno</td><td style="padding:8px;border:1px solid #ddd;">${contact.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${contact.company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${contact.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefón</td><td style="padding:8px;border:1px solid #ddd;">${contact.phone}</td></tr>
      ${contact.message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Správa</td><td style="padding:8px;border:1px solid #ddd;">${contact.message}</td></tr>` : ""}
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    replyTo: contact.email,
    subject: `Nová objednávka – ${contact.company} (${contact.name})`,
    html,
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}) {
  const html = `
    <h2>Nová správa z coffece.sk</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Meno</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefón</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${data.company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Správa</td><td style="padding:8px;border:1px solid #ddd;">${data.message}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    replyTo: data.email,
    subject: `Kontakt – ${data.company} (${data.name})`,
    html,
  });
}
```

- [ ] **Step 7: Create order API route**

Create `src/app/api/order/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { sendOrderEmail } from "@/lib/email";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return false;
  }

  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await sendOrderEmail(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to send order. Please try again." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/ src/app/api/order/ vitest.config.ts package.json
git commit -m "feat: add order schema validation, email utility, and order API route"
```

---

### Task 15: Order Picker — Modal Shell & Progress

**Files:**
- Create: `src/components/order-picker/order-modal.tsx`, `src/components/order-picker/step-progress.tsx`, `src/components/order-picker/option-card.tsx`

- [ ] **Step 1: Create option card component**

Create `src/components/order-picker/option-card.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon?: string;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function OptionCard({
  icon,
  title,
  description,
  selected,
  onClick,
  className,
  children,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-2 p-5 text-left transition-all duration-200 w-full",
        selected
          ? "border-brand-gold bg-brand-gold-light dark:bg-brand-gold/10"
          : "border-border hover:border-brand-gold/50 bg-card",
        className
      )}
    >
      {icon && <span className="text-2xl mb-2 block">{icon}</span>}
      {children}
      {!children && (
        <>
          <span className="font-semibold block">{title}</span>
          {description && (
            <span className="text-sm text-muted-foreground mt-1 block">
              {description}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}
```

- [ ] **Step 2: Create step progress component**

Create `src/components/order-picker/step-progress.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  answers: Record<number, string>;
}

const stepKeys = ["step1", "step2", "step3", "step4", "step5"] as const;

export function StepProgress({ currentStep, answers }: StepProgressProps) {
  const t = useTranslations("order.progress");

  return (
    <div className="flex flex-col gap-0">
      {stepKeys.map((key, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isUpcoming = stepNum > currentStep;

        return (
          <div key={key}>
            <div className="flex items-center gap-3">
              {/* Circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                  isCompleted && "bg-green-600 text-white",
                  isCurrent && "bg-brand-gold text-brand-black",
                  isUpcoming && "bg-gray-800 text-gray-500 border border-gray-700"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
              </div>

              {/* Label */}
              <div className="min-w-0">
                <span
                  className={cn(
                    "text-sm block",
                    isCompleted && "text-green-500",
                    isCurrent && "text-brand-gold font-semibold",
                    isUpcoming && "text-gray-600"
                  )}
                >
                  {isCompleted && answers[stepNum]
                    ? answers[stepNum]
                    : t(key)}
                </span>
              </div>
            </div>

            {/* Connector line */}
            {i < stepKeys.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-5 ml-[15px] transition-colors",
                  stepNum < currentStep ? "bg-green-600" : "bg-gray-800"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Create order modal shell**

Create `src/components/order-picker/order-modal.tsx`:

```tsx
"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProgress } from "./step-progress";
import { StepOfficeSize } from "./step-office-size";
import { StepDailyDrinkers } from "./step-daily-drinkers";
import { StepCoffeeChoice } from "./step-coffee-choice";
import { StepDeliveryFreq } from "./step-delivery-freq";
import { StepContactForm } from "./step-contact-form";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  preselectedCoffee?: "original" | "zlaty";
}

export interface OrderFormData {
  officeSize: string;
  dailyDrinkers: string;
  coffeeChoice: string;
  deliveryFrequency: string;
  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
  };
}

const TOTAL_STEPS = 5;

export function OrderModal({ open, onClose, preselectedCoffee }: OrderModalProps) {
  const t = useTranslations("order");
  const tContact = useTranslations("contact.info");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    officeSize: "",
    dailyDrinkers: "",
    coffeeChoice: preselectedCoffee ?? "",
    deliveryFrequency: "",
    contact: { name: "", company: "", email: "", phone: "", message: "", gdprConsent: false },
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const updateField = useCallback(
    <K extends keyof OrderFormData>(key: K, value: OrderFormData[K], label?: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (label) setAnswers((prev) => ({ ...prev, [step]: label }));
    },
    [step]
  );

  const canProceed = () => {
    switch (step) {
      case 1: return formData.officeSize !== "";
      case 2: return formData.dailyDrinkers !== "";
      case 3: return formData.coffeeChoice !== "";
      case 4: return formData.deliveryFrequency !== "";
      case 5:
        return (
          formData.contact.name !== "" &&
          formData.contact.company !== "" &&
          formData.contact.email !== "" &&
          formData.contact.phone !== "" &&
          formData.contact.gdprConsent
        );
      default: return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <div className="text-5xl mb-6">&#9749;</div>
          <h2 className="text-heading-lg mb-3">{t("step5.successTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("step5.successText")}</p>
          <Button onClick={onClose} className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold">
            {t("close")}
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1: return <StepOfficeSize value={formData.officeSize} onChange={(v, label) => updateField("officeSize", v, label)} />;
      case 2: return <StepDailyDrinkers value={formData.dailyDrinkers} onChange={(v, label) => updateField("dailyDrinkers", v, label)} />;
      case 3: return <StepCoffeeChoice value={formData.coffeeChoice} onChange={(v, label) => updateField("coffeeChoice", v, label)} />;
      case 4: return <StepDeliveryFreq value={formData.deliveryFrequency} onChange={(v, label) => updateField("deliveryFrequency", v, label)} />;
      case 5: return <StepContactForm data={formData.contact} onChange={(c) => updateField("contact", c)} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="relative mx-auto my-4 lg:my-8 w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left panel (desktop) */}
        <div className="hidden lg:flex flex-col justify-between w-[280px] bg-brand-black p-6 shrink-0">
          <div>
            <Image
              src="/images/logos/coffece-logo-white.png"
              alt="Coffece"
              width={100}
              height={33}
              className="h-7 w-auto mb-2"
            />
            <p className="text-xs text-gray-500 mb-8">{t("title")}</p>
            <StepProgress currentStep={step} answers={answers} />
          </div>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-600 mb-1">{t("callInstead")}</p>
            <p className="text-white text-sm font-semibold">{tContact("phone")}</p>
            <p className="text-gray-400 text-xs">{tContact("email")}</p>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="lg:hidden bg-muted p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {step}/{TOTAL_STEPS}
            </span>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-gold rounded-full"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Right panel (step content) */}
        <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto">
          {/* Close button (desktop) */}
          <button
            onClick={onClose}
            className="hidden lg:flex self-end items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            {t("close")} <X className="h-4 w-4" />
          </button>

          {/* Step content */}
          <div className="flex-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {!submitted && (
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={back} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> {t("back")}
                </Button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <Button
                  onClick={next}
                  disabled={!canProceed()}
                  className="bg-brand-black text-white hover:bg-brand-black/90 gap-2 dark:bg-white dark:text-brand-black dark:hover:bg-white/90"
                >
                  {t("next")} <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitting}
                  className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold gap-2"
                >
                  {submitting ? "..." : t("submit")}
                </Button>
              )}
            </div>
          )}

          {error && (
            <p className="text-destructive text-sm mt-3 text-center">
              {t("step5.errorText")}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/order-picker/order-modal.tsx src/components/order-picker/step-progress.tsx src/components/order-picker/option-card.tsx
git commit -m "feat: add order picker modal shell with step progress and animations"
```

---

### Task 16: Order Picker — Steps 1-4

**Files:**
- Create: `src/components/order-picker/step-office-size.tsx`, `src/components/order-picker/step-daily-drinkers.tsx`, `src/components/order-picker/step-coffee-choice.tsx`, `src/components/order-picker/step-delivery-freq.tsx`

- [ ] **Step 1: Create step 1 — Office Size**

Create `src/components/order-picker/step-office-size.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = [
  { value: "small", icon: "🏢", key: "small" },
  { value: "medium", icon: "🏬", key: "medium" },
  { value: "large", icon: "🏣", key: "large" },
  { value: "other", icon: "⚙", key: "other" },
] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepOfficeSize({ value, onChange }: Props) {
  const t = useTranslations("order.step1");

  return (
    <div>
      <h2 className="text-heading-lg mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            title={t(opt.key)}
            description={t(`${opt.key}Desc`)}
            selected={value === opt.value}
            onClick={() => onChange(opt.value, t(opt.key))}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create step 2 — Daily Drinkers**

Create `src/components/order-picker/step-daily-drinkers.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = ["1-10", "11-25", "26-50", "50+"] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepDailyDrinkers({ value, onChange }: Props) {
  const t = useTranslations("order.step2");

  return (
    <div>
      <h2 className="text-heading-lg mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard
            key={opt}
            title={`${opt} ľudí`}
            selected={value === opt}
            onClick={() => onChange(opt, `${opt} ľudí`)}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create step 3 — Coffee Choice**

Create `src/components/order-picker/step-coffee-choice.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { OptionCard } from "./option-card";

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepCoffeeChoice({ value, onChange }: Props) {
  const t = useTranslations("order.step3");
  const tProducts = useTranslations("products");

  return (
    <div>
      <h2 className="text-heading-lg mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-3 gap-3">
        <OptionCard
          title={tProducts("original.name")}
          description={tProducts("original.type")}
          selected={value === "original"}
          onClick={() => onChange("original", tProducts("original.name"))}
        >
          <div className="relative w-20 h-20 mx-auto mb-3 bg-brand-black rounded-lg overflow-hidden">
            <Image
              src="/images/labels/original-label.png"
              alt="Original"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold block text-center">{tProducts("original.name")}</span>
          <span className="text-xs text-muted-foreground block text-center">{tProducts("original.type")}</span>
        </OptionCard>

        <OptionCard
          title={tProducts("zlaty.name")}
          description={tProducts("zlaty.type")}
          selected={value === "zlaty"}
          onClick={() => onChange("zlaty", tProducts("zlaty.name"))}
        >
          <div className="relative w-20 h-20 mx-auto mb-3 bg-brand-gold-light rounded-lg overflow-hidden">
            <Image
              src="/images/labels/zlaty-label.png"
              alt="Zlatý Štandard"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold block text-center">{tProducts("zlaty.name")}</span>
          <span className="text-xs text-muted-foreground block text-center">{tProducts("zlaty.type")}</span>
        </OptionCard>

        <OptionCard
          title={t("both")}
          description={t("bothDesc")}
          selected={value === "both"}
          onClick={() => onChange("both", t("both"))}
        >
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-brand-black to-brand-gold-light">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold drop-shadow-lg">Mix</span>
            </div>
          </div>
          <span className="font-semibold block text-center">{t("both")}</span>
          <span className="text-xs text-muted-foreground block text-center">{t("bothDesc")}</span>
        </OptionCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create step 4 — Delivery Frequency**

Create `src/components/order-picker/step-delivery-freq.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { OptionCard } from "./option-card";

const options = [
  { value: "weekly", key: "weekly" },
  { value: "biweekly", key: "biweekly" },
  { value: "monthly", key: "monthly" },
  { value: "onDemand", key: "onDemand" },
] as const;

interface Props {
  value: string;
  onChange: (value: string, label: string) => void;
}

export function StepDeliveryFreq({ value, onChange }: Props) {
  const t = useTranslations("order.step4");

  return (
    <div>
      <h2 className="text-heading-lg mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={t(opt.key)}
            selected={value === opt.value}
            onClick={() => onChange(opt.value, t(opt.key))}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/order-picker/step-office-size.tsx src/components/order-picker/step-daily-drinkers.tsx src/components/order-picker/step-coffee-choice.tsx src/components/order-picker/step-delivery-freq.tsx
git commit -m "feat: add order picker steps 1-4 (office size, drinkers, coffee, delivery)"
```

---

### Task 17: Order Picker — Step 5 (Contact Form) & Integration

**Files:**
- Create: `src/components/order-picker/step-contact-form.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create step 5 — Contact Form**

Create `src/components/order-picker/step-contact-form.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

interface ContactData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
}

interface Props {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export function StepContactForm({ data, onChange }: Props) {
  const t = useTranslations("order.step5");

  const update = (field: keyof ContactData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-heading-lg mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">{t("subtitle")}</p>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">{t("name")} *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="company">{t("company")} *</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => update("company", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t("email")} *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">{t("phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea
            id="message"
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex items-start gap-2 mt-2">
          <Checkbox
            id="gdpr"
            checked={data.gdprConsent}
            onCheckedChange={(checked) => update("gdprConsent", checked === true)}
          />
          <Label htmlFor="gdpr" className="text-sm leading-relaxed font-normal">
            {t("gdpr")}{" "}
            <Link href="/privacy" className="text-brand-gold hover:underline" target="_blank">
              {t("gdprLink")}
            </Link>
            . *
          </Label>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Integrate order modal into landing page**

Update `src/app/[locale]/page.tsx` -- add the `OrderModal` import and render it:

After the `<Footer />` line, add:

```tsx
import { OrderModal } from "@/components/order-picker/order-modal";
```

And render inside the fragment, after `<Footer />`:

```tsx
<OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
```

- [ ] **Step 3: Add order modal to product pages too**

Add the same `OrderModal` import and rendering to both `src/app/[locale]/original/page.tsx` and `src/app/[locale]/zlaty-standard/page.tsx`, passing `preselectedCoffee` prop.

For Original: `<OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} preselectedCoffee="original" />`

For Zlaty: `<OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} preselectedCoffee="zlaty" />`

- [ ] **Step 4: Verify the full order picker flow works**

```bash
npm run dev
```

Open http://localhost:3000/sk, click "Objednat", walk through all 5 steps.

- [ ] **Step 5: Commit**

```bash
git add src/components/order-picker/step-contact-form.tsx src/app/\[locale\]/
git commit -m "feat: add order picker step 5 contact form and integrate modal into all pages"
```

---

### Task 18: Contact Page & Contact API Route

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`, `src/app/api/contact/route.ts`

- [ ] **Step 1: Create contact API route**

Create `src/app/api/contact/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create contact page**

Create `src/app/[locale]/contact/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [orderOpen, setOrderOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-display-lg mb-4">{t("title")}</h1>
            <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-name">{t("form.name")}</Label>
                  <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="c-company">{t("form.company")}</Label>
                  <Input id="c-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-email">{t("form.email")}</Label>
                  <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="c-phone">{t("form.phone")}</Label>
                  <Input id="c-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
              </div>
              <div>
                <Label htmlFor="c-message">{t("form.message")}</Label>
                <Textarea id="c-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required />
              </div>
              <Button type="submit" disabled={status === "sending"} className="w-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold">
                {status === "sending" ? "..." : t("form.submit")}
              </Button>
              {status === "success" && <p className="text-green-600 text-sm text-center">{t("form.success")}</p>}
              {status === "error" && <p className="text-destructive text-sm text-center">{t("form.error")}</p>}
            </motion.form>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-brand-gold mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{t("info.emailLabel")}</p>
                  <p className="text-muted-foreground">{t("info.email")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-brand-gold mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{t("info.phoneLabel")}</p>
                  <p className="text-muted-foreground">{t("info.phone")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-brand-gold mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{t("info.addressLabel")}</p>
                  <p className="text-muted-foreground">{t("info.address")}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-brand-gold transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-brand-gold transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-brand-gold transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Verify contact page works**

```bash
npm run dev
```

Check http://localhost:3000/sk/contact.

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/contact/ src/app/api/contact/
git commit -m "feat: add contact page with form and contact API route"
```

---

### Task 19: FAQ Page

**Files:**
- Create: `src/app/[locale]/faq/page.tsx`

- [ ] **Step 1: Create FAQ page**

Create `src/app/[locale]/faq/page.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function FaqPage() {
  const t = useTranslations("faq");
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const items = t.raw("items") as Array<{ q: string; a: string; cat: string }>;
  const categories = t.raw("categories") as Record<string, string>;

  const filtered = useMemo(
    () => (activeCategory === "all" ? items : items.filter((item) => item.cat === activeCategory)),
    [items, activeCategory]
  );

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-display-lg mb-4">{t("title")}</h1>
            <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90" : ""}
            >
              Všetky / All
            </Button>
            {Object.entries(categories).map(([key, label]) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(key)}
                className={activeCategory === key ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90" : ""}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">{t("subtitle")}</p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline">Kontakt</Button>
              </Link>
              <Button onClick={() => setOrderOpen(true)} className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold">
                Objednať
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Verify FAQ page**

```bash
npm run dev
```

Check http://localhost:3000/sk/faq.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/faq/
git commit -m "feat: add FAQ page with categorized accordion"
```

---

### Task 20: Legal Pages (Privacy & Cookies)

**Files:**
- Create: `src/app/[locale]/privacy/page.tsx`, `src/app/[locale]/cookies/page.tsx`

- [ ] **Step 1: Create privacy policy page**

Create `src/app/[locale]/privacy/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-display-lg mb-8">{t("title")}</h1>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>{t("content")}</p>

            <h2>1. Správca osobných údajov</h2>
            <p>Coffece s.r.o., Ulica 123, 010 01 Mesto, Slovensko. IČO: XX XXX XXX. Email: info@coffece.sk</p>

            <h2>2. Aké údaje zbierame</h2>
            <p>Zbierame osobné údaje, ktoré nám poskytnete prostredníctvom formulárov na našej webovej stránke: meno, priezvisko, email, telefónne číslo, názov firmy, a správu.</p>

            <h2>3. Účel spracovania</h2>
            <p>Vaše údaje spracúvame za účelom: odpovede na vaše otázky, prípravy cenovej ponuky, plnenia objednávky a zasielania obchodných oznámení (len s vaším súhlasom).</p>

            <h2>4. Doba uchovávania</h2>
            <p>Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu ich spracovania, maximálne 3 roky od posledného kontaktu.</p>

            <h2>5. Vaše práva</h2>
            <p>Máte právo na prístup k svojim údajom, ich opravu, vymazanie, obmedzenie spracovania, prenosnosť údajov a právo podať sťažnosť dozornému orgánu.</p>

            <h2>6. Kontakt</h2>
            <p>V prípade otázok ohľadom spracovania osobných údajov nás kontaktujte na info@coffece.sk.</p>
          </div>
        </div>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Create cookie policy page**

Create `src/app/[locale]/cookies/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrderModal } from "@/components/order-picker/order-modal";
import { Link } from "@/i18n/routing";

export default function CookiesPage() {
  const t = useTranslations("cookiesPage");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-display-lg mb-8">{t("title")}</h1>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>{t("content")}</p>

            <h2>1. Čo sú cookies</h2>
            <p>Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve webovej stránky. Pomáhajú nám zapamätať si vaše preferencie a zlepšiť vaše používateľské prostredie.</p>

            <h2>2. Aké cookies používame</h2>
            <ul>
              <li><strong>Nevyhnutné cookies</strong> — zabezpečujú základnú funkčnosť stránky (jazykové preferencie, téma).</li>
              <li><strong>Analytické cookies</strong> — pomáhajú nám pochopiť, ako návštevníci používajú našu stránku (zástupný text).</li>
            </ul>

            <h2>3. Ako spravovať cookies</h2>
            <p>Cookies môžete spravovať alebo zakázať v nastaveniach vášho prehliadača. Upozorňujeme, že zakázanie cookies môže ovplyvniť funkčnosť stránky.</p>

            <h2>4. Viac informácií</h2>
            <p>
              Pre viac informácií o spracovaní vašich údajov si prečítajte naše{" "}
              <Link href="/privacy" className="text-brand-gold hover:underline">zásady ochrany osobných údajov</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/privacy/ src/app/\[locale\]/cookies/
git commit -m "feat: add privacy policy and cookie policy pages"
```

---

### Task 21: Cookie Consent Banner

**Files:**
- Create: `src/components/layout/cookie-banner.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create cookie banner component**

Create `src/components/layout/cookie-banner.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4"
        >
          <div className="container mx-auto max-w-3xl bg-card border rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              {t("message")}{" "}
              <Link href="/cookies" className="text-brand-gold hover:underline">
                {t("learnMore")}
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={decline}>
                {t("decline")}
              </Button>
              <Button
                size="sm"
                onClick={accept}
                className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold"
              >
                {t("accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add cookie banner to locale layout**

In `src/app/[locale]/layout.tsx`, add `import { CookieBanner } from "@/components/layout/cookie-banner";` and render `<CookieBanner />` inside the `<Providers>` component, after `{children}`.

- [ ] **Step 3: Verify cookie banner appears**

```bash
npm run dev
```

Open http://localhost:3000/sk -- cookie banner should slide up from bottom after 1.5s. Clear localStorage to test again.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/cookie-banner.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add cookie consent banner with localStorage persistence"
```

---

### Task 22: Build Verification & Polish

**Files:**
- Various fixes based on build output

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

- [ ] **Step 2: Run tests**

```bash
npm test
```

All tests should pass.

- [ ] **Step 3: Run dev server and visually verify all pages**

```bash
npm run dev
```

Check each page in both SK and EN, light and dark mode:
- http://localhost:3000/sk (landing)
- http://localhost:3000/en (landing EN)
- http://localhost:3000/sk/original
- http://localhost:3000/sk/zlaty-standard
- http://localhost:3000/sk/contact
- http://localhost:3000/sk/faq
- http://localhost:3000/sk/privacy
- http://localhost:3000/sk/cookies
- Test the order picker flow (all 5 steps)
- Toggle dark/light mode
- Toggle SK/EN language
- Test mobile responsive (resize browser)

- [ ] **Step 4: Fix any visual issues found**

Address spacing, alignment, color, or responsive layout issues found during verification.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: build verification and visual polish"
```

---

### Task 23: Create TASK.md Progress Tracker

**Files:**
- Create: `TASK.md`

- [ ] **Step 1: Create TASK.md**

Create `TASK.md` in the project root summarizing all tasks and their completion status. This file allows resuming work if stopped mid-project.

```markdown
# Coffece Website - Task Progress

## Status: [Update as tasks complete]

- [x] Task 1: Project Scaffolding
- [x] Task 2: Asset Organization
- [x] Task 3: Tailwind Theme Configuration
- [x] Task 4: i18n Setup (next-intl)
- [x] Task 5: Root Layout, Providers, and Theme
- [x] Task 6: Navbar Component
- [x] Task 7: Footer Component
- [x] Task 8: Landing Page — Hero Section
- [x] Task 9: Landing Page — Why Coffece & How It Works
- [x] Task 10: Landing Page — Product Showcase
- [x] Task 11: Landing Page — Origin Story & CTA Banner
- [x] Task 12: Landing Page Assembly
- [x] Task 13: Product Pages (Original & Zlatý Štandard)
- [x] Task 14: Email Utility & Order API Route (TDD)
- [x] Task 15: Order Picker — Modal Shell & Progress
- [x] Task 16: Order Picker — Steps 1-4
- [x] Task 17: Order Picker — Step 5 & Integration
- [x] Task 18: Contact Page & Contact API Route
- [x] Task 19: FAQ Page
- [x] Task 20: Legal Pages (Privacy & Cookies)
- [x] Task 21: Cookie Consent Banner
- [x] Task 22: Build Verification & Polish
- [x] Task 23: Create TASK.md

## Spec
See: `docs/superpowers/specs/2026-03-26-coffece-website-design.md`

## Plan
See: `docs/superpowers/plans/2026-03-26-coffece-website.md`
```

- [ ] **Step 2: Commit**

```bash
git add TASK.md
git commit -m "docs: add TASK.md progress tracker"
```
