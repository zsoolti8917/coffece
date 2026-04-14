# Sticky Zigzag Section — Design Spec

## Context

Add a scroll-pinned "What's next?" section to the landing page. As the user scrolls, the viewport stays pinned and 5 zigzag items (image + text, alternating sides) cross-fade in one at a time. Inspired by the reference Hungarian coffee site's zigzag layout, elevated with sticky scroll animation.

## Placement

After Company Values, before Product Showcase:

```
Hero → Why Coffece → Company Values → **Sticky Zigzag** → Product Showcase → How It Works → Origin Story → CTA
```

## Scroll Mechanic

**Framer Motion `useScroll` + `position: sticky`** — no new dependencies.

- **Outer container**: `600vh` tall (120vh per item × 5 items), defines total scroll distance
- **Sticky inner**: `position: sticky; top: 0; height: 100vh` — stays pinned during scroll
- **`useScroll`**: tracks `scrollYProgress` of the outer container (0 → 1)
- **Per-item progress mapping**: Each item gets a 1/5th slice:
  - Item 0: progress 0.00–0.20
  - Item 1: progress 0.20–0.40
  - Item 2: progress 0.40–0.60
  - Item 3: progress 0.60–0.80
  - Item 4: progress 0.80–1.00
- **Within each slice**: fade in (first 30% of slice), hold visible (middle 40%), fade out (last 30%)
- **Last item**: doesn't fade out — stays visible until section un-pins

### Animation Per Item

- Image slides in from its side: `x: ±80px → 0`, `opacity: 0 → 1`
- Text slides in from opposite side: `x: ∓40px → 0`, `opacity: 0 → 1`
- Zigzag alternation:
  - Items 0, 2, 4: Image left, text right
  - Items 1, 3: Text left, image right

## Component

**File:** `src/components/landing/sticky-zigzag.tsx`

### Structure

```
<section> (outer, relative, bg-background)
  <div> (container for heading, not sticky)
    <h2> "Ako ďalej?" centered heading
  </div>
  <div ref={containerRef}> (600vh tall)
    <div> (sticky, top-0, h-screen, flex items-center)
      <div container>
        {items.map → absolutely positioned, opacity/x controlled by useTransform}
          <div grid lg:grid-cols-2 gap-16>
            <ImagePlaceholder /> (gradient + icon, rounded-2xl, aspect-4/3)
            <TextContent /> (overline, h2, paragraph, arrow CTA)
          </div>
      </div>
    </div>
  </div>
</section>
```

### Mobile Behavior

On screens below `lg` breakpoint:
- Disable sticky pinning — remove `position: sticky` and `height: 600vh`
- Render all 5 items as stacked blocks with standard `whileInView` fade-up animations
- Same zigzag layout (stacked single column on mobile), just not pinned

Use a `useMediaQuery` hook or conditional classes to switch between modes.

## 5 Topics

| # | Direction    | Heading (SK)                     | Description (SK)                                                                                     | Icon           | CTA Link   |
|---|-------------|----------------------------------|------------------------------------------------------------------------------------------------------|----------------|------------|
| 1 | img-left    | Staňte sa naším partnerom        | Nech už máte akúkoľvek firmu — ak potrebujete kvalitnú kávu, spolu nájdeme riešenie!                 | Handshake      | /contact   |
| 2 | img-right   | Ponuka pre predajcov             | Predávajte prémiovú kávu a zabezpečte svojim zákazníkom nezabudnuteľný kávový zážitok!               | Store          | /contact   |
| 3 | img-left    | Naše kávy                        | Nájdite si kávu, ktorá vám sadne najlepšie!                                                           | Coffee         | /original  |
| 4 | img-right   | 7-dňová skúšobná doba            | Vyskúšajte naše služby celý týždeň nezáväzne, skôr než sa rozhodnete.                                | CalendarCheck  | /contact   |
| 5 | img-left    | Ako to funguje                   | Jednoduché tri kroky a čerstvá káva je u vás v kancelárii.                                            | ListChecks     | #how-it-works |

English translations follow the same structure.

## Image Placeholders

Gradient rectangles with centered Lucide icons:
- `rounded-2xl`, `aspect-[4/3]`
- `bg-gradient-to-br from-brand-gold/20 to-brand-black/80`
- Icon: white, `w-16 h-16`, centered
- Can be replaced with real photos later by swapping gradient div for `<Image>`

## Arrow CTA Button

- Uppercase text: "ZISTIŤ VIAC"
- Gold color (`text-brand-gold`)
- ArrowRight icon from Lucide, animated slide-right on hover
- Links to respective page/section

## Translations

New `zigzag` key in `src/messages/sk.json` and `src/messages/en.json`:

```json
{
  "zigzag": {
    "heading": "Ako ďalej?",
    "cta": "ZISTIŤ VIAC",
    "items": [
      {
        "overline": "PARTNERSTVO",
        "title": "Staňte sa naším partnerom",
        "description": "Nech už máte akúkoľvek firmu — ak potrebujete kvalitnú kávu, spolu nájdeme riešenie!"
      },
      {
        "overline": "PRE PREDAJCOV",
        "title": "Ponuka pre predajcov",
        "description": "Predávajte prémiovú kávu a zabezpečte svojim zákazníkom nezabudnuteľný kávový zážitok!"
      },
      {
        "overline": "NAŠA PONUKA",
        "title": "Naše kávy",
        "description": "Nájdite si kávu, ktorá vám sadne najlepšie!"
      },
      {
        "overline": "BEZ ZÁVÄZKOV",
        "title": "7-dňová skúšobná doba",
        "description": "Vyskúšajte naše služby celý týždeň nezáväzne, skôr než sa rozhodnete."
      },
      {
        "overline": "JEDNODUCHÝ PROCES",
        "title": "Ako to funguje",
        "description": "Jednoduché tri kroky a čerstvá káva je u vás v kancelárii."
      }
    ]
  }
}
```

## Main Page Integration

In `src/app/[locale]/page.tsx`, import and render `StickyZigzag` between `CompanyValues` and `ProductShowcase`.

## Verification

1. `npm run dev` — section renders at correct position
2. Scroll through: section pins, items cross-fade in sequence, alternating sides
3. Last item stays visible as section un-pins
4. Mobile: items stack vertically with standard fade-in animations (no pinning)
5. Translations load in SK locale
6. CTA links navigate correctly
7. No jank or layout shift during scroll pinning
