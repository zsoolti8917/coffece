# Company Values Section — Design Spec

## Context

The Coffece landing page needs a "company values" section replicating the layout and feel of a reference Hungarian coffee company site. This section showcases 6 key value propositions (24/7 support, instant service, next-day delivery, 7-day trial, partner portal, predictable costs) in a dark, premium card grid with a background coffee-bean image.

## Placement

Insert **after Why Coffece** and **before Product Showcase** in the main page flow:

```
Hero → Why Coffece → **Company Values** → Product Showcase → How It Works → Origin Story → CTA
```

## Component

**File:** `src/components/landing/company-values.tsx`

### Structure

```
<section> (relative, overflow-hidden, bg-brand-black, py-20 lg:py-28)
  <img> (absolute, inset-0, object-cover, opacity-[0.06], imageOfBeans.avif)
  <div> (absolute, inset-0, bg-gradient-to-t from-brand-black) — bottom fade overlay
  <div container> (relative z-10)
    <header> (centered, mb-12)
      <span> gold overline/caption
      <h2> white heading (responsive: single line desktop, wrapped mobile)
    </header>
    <div grid> (grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6)
      <ValueCard /> x6
    </div>
  </div>
</section>
```

### Card Design

- Background: `bg-white/5` with `border border-white/10`
- Rounded: `rounded-xl`
- Padding: `p-6`
- Content: Icon (gold circle, 48px) → Title (white, text-lg, font-semibold) → Description (text-white/50)

### Icons (Lucide React)

| # | Value               | Lucide Icon        |
|---|---------------------|--------------------|
| 1 | 24/7 Support       | `Headphones`       |
| 2 | Instant Service    | `Wrench`           |
| 3 | Next-day Delivery  | `Truck`            |
| 4 | 7-day Trial        | `CalendarCheck`    |
| 5 | Partner Portal     | `LayoutDashboard`  |
| 6 | Predictable Costs  | `BadgeDollarSign`  |

### Animations (Framer Motion)

- Scroll-triggered: `whileInView`, `viewport: { once: true }`
- Header: fade-up `opacity 0→1, y 40→0`, duration `0.6s`
- Cards: same fade-up, staggered `delay: index * 0.1s`
- Matches existing section animation patterns

### Background Image

- Source: `Photos/imageOfBeans.avif` → copy to `public/images/backgrounds/beans-bg.avif`
- Positioned: absolute, covers full section
- Opacity: ~6% for subtle texture
- Gradient overlay fading to solid black at bottom edge

## Translations

New `values` key in `src/messages/sk.json` and `src/messages/en.json`:

```json
{
  "values": {
    "caption": "Naše kľúčové hodnoty",
    "title": "Bezproblémové kávové riešenia pre pracoviská už viac ako 13 rokov",
    "items": [
      {
        "title": "0-24 zákaznícka podpora",
        "description": "Naša zákaznícka linka je dostupná 24 hodín denne — kedykoľvek nám môžete zavolať s otázkami alebo pripomienkami."
      },
      {
        "title": "Okamžitý servis",
        "description": "V prípade poruchy vám náhradný stroj pošleme už nasledujúci pracovný deň, aby ste nezostali bez kávy."
      },
      {
        "title": "Doručenie na druhý deň",
        "description": "Naša kávová kuriérska služba doručí vašu objednávku nasledujúci pracovný deň — zásobovanie bez prerušenia."
      },
      {
        "title": "7-dňová skúšobná doba",
        "description": "Vyskúšajte naše služby celý týždeň nezáväzne, skôr než sa rozhodnete."
      },
      {
        "title": "Prehľadný partnerský portál",
        "description": "Na našom online portáli vybavíte všetko od doobjednania kávy po nahlásenie poruchy — jednoducho a na jednom mieste."
      },
      {
        "title": "Predvídateľné náklady",
        "description": "Žiadne nájomné, žiadne servisné ani prepravné poplatky — platíte presne toľko, koľko si objednáte."
      }
    ]
  }
}
```

English translations follow the same structure with appropriate EN text.

## Main Page Integration

In `src/app/[locale]/page.tsx`, import and render `CompanyValues` between `WhyCoffece` and `ProductShowcase`.

## Verification

1. `npm run dev` — section renders at correct position
2. Responsive: check 1-col mobile, 2-col tablet, 3-col desktop grid
3. Background image visible at subtle opacity
4. Scroll animations trigger correctly (once per visit)
5. Translations load correctly in SK locale
6. No layout shift or performance issues from background image
