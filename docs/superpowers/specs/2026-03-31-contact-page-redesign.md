# Contact Page Redesign — 5 A/B Test Variants

## Context
The current contact page has visual bugs (floating beans and watermark logo in the hero that shouldn't be there) and a basic design that doesn't match the quality of the rest of the site. The goal is to create 5 completely different contact page designs accessible via `/sk/contact/A` through `/sk/contact/E` so the team can evaluate which approach works best for B2B lead capture.

## Requirements
- **Primary goal**: B2B lead capture (convert visitors into office coffee clients)
- **Routing**: `/[locale]/contact/[variant]` using Next.js dynamic route (A, B, C, D, E)
- **Default**: `/[locale]/contact` renders version A (or redirects to it)
- **Shared**: All versions share the same `handleSubmit` logic (POST to `/api/contact`), Navbar, Footer, OrderModal
- **Form fields**: Can vary per version (experimentation allowed)
- **Removed from all versions**: FloatingBeans component, watermark logo image in hero
- **Translations**: All user-facing text uses next-intl. New translation keys added under `contact.variants.*`

## Routing Architecture

```
src/app/[locale]/contact/
  page.tsx              → redirects to /contact/A (or renders A directly)
  [variant]/
    page.tsx            → reads variant param, renders ContactA–ContactE
```

Variant components live in:
```
src/components/contact/
  contact-a.tsx
  contact-b.tsx
  contact-c.tsx
  contact-d.tsx
  contact-e.tsx
  shared.tsx            → shared form logic, types, submit handler
```

The `[variant]/page.tsx` validates the variant param (A-E, case-insensitive), returns `notFound()` for invalid values, and renders the matching component.

## Shared Module (`shared.tsx`)

Exports:
- `ContactFormState` type: `{ name, company, email, phone, message }` (all string, all optional — each variant picks which fields to use)
- `useContactForm()` hook: manages form state, handleChange, handleSubmit, status ("idle" | "loading" | "success" | "error")
- `StatusMessage` component: renders success/error feedback (reused across all variants)

## Version A — "Dark Split"

**Visual**: Dark theme (`bg-brand-black`), two-column layout, no hero section.
**Layout**:
- Left column (40%): Large bold heading "Kontaktujte nas", subtitle, 3-4 bullet-point benefits with checkmark icons (fresh roasted, direct delivery, no commitment, 100% Arabica), contact info (email, phone, address) at the bottom.
- Right column (60%): Dark card (`bg-brand-surface`) with form fields. Inputs have dark backgrounds with subtle light borders, light placeholder text.
**Form fields**: name, company, email, phone, message (full set)
**Accent**: Gold for submit button, bullet icons, and focus rings.

## Version B — "Conversational Wizard"

**Visual**: Light/cream theme (`bg-background`), centered single column, max-w-2xl.
**Layout**: Step-by-step flow with 3 steps and a progress indicator bar at top.
- Step 1: "Ako velka je vasa kancelaria?" — 3 clickable cards (<10 ludi, 10-30 ludi, 30+ ludi) with icons
- Step 2: "Ako pijete kavu?" — 3 clickable cards (Espresso, Filter, Oboje)
- Step 3: "Posledny krok" — email + company name fields + submit button
**Form fields**: office_size (card selection), coffee_type (card selection), email, company
**Animations**: Cards fade in, step transitions slide left/right.
**Submit**: Sends all collected data (including card selections) to `/api/contact`.

## Version C — "Full-Width Floating Form"

**Visual**: Light theme with a decorative gold-to-cream gradient band across the top portion.
**Layout**: Full-width section. Two-column inside a container.
- Left (45%): Large display-size heading, subtitle paragraph, three stacked contact info blocks (email, phone, address) with gold-accented icons.
- Right (55%): White floating card with rounded corners, subtle shadow, containing the form.
**Form fields**: name, company, email, message (no phone — shorter form)
**Accent**: Gold gradient bar at top of the form card.

## Version D — "Social Proof + Form"

**Visual**: Light cream background, two sections.
**Layout**:
- Top banner: Dark background strip with centered heading + one stat line ("100+ kancelarii nam doveruje")
- Below: Two-column layout.
  - Left (40%): 2-3 testimonial cards. Each has a quote, person name, company name, and a small star rating. Cards have white bg, subtle shadow, gold left border.
  - Right (60%): Standard form card on white background.
**Form fields**: name, company, email, phone, message (full set)
**Testimonials**: Hardcoded placeholder data (can be translated). 3 testimonials from fictional office managers.

## Version E — "Minimal Single Column"

**Visual**: White/cream background, ultra-clean, centered. Max-w-lg.
**Layout**: Single centered column with generous vertical spacing.
- Large heading (text-4xl)
- One-line subtitle
- 3 form fields stacked: email, company name, message
- Large gold submit button (full width)
- Below form: single horizontal line with email | phone | address separated by dots
**Form fields**: email, company, message (minimal — 3 fields only)
**Design principle**: No cards, no borders, no decorations, no icons. Pure typography and whitespace.

## Translations

New keys added under `contact.variants` in both `sk.json` and `en.json`:
- `contact.variants.a.*` — headings, benefits list, form labels
- `contact.variants.b.*` — step titles, card labels, form labels
- `contact.variants.c.*` — heading, subtitle, form labels
- `contact.variants.d.*` — banner heading, stat text, testimonials, form labels
- `contact.variants.e.*` — heading, subtitle, form labels

Shared form labels (name, email, company, phone, message, submit) remain at `contact.form.*`.

## Existing Components to Reuse
- `Button` from `@/components/ui/button`
- `Input` from `@/components/ui/input`
- `Textarea` from `@/components/ui/textarea`
- `Label` from `@/components/ui/label`
- `Navbar` from `@/components/layout/navbar`
- `Footer` from `@/components/layout/footer`
- `OrderModal` from `@/components/order-picker/order-modal`
- `motion` from `framer-motion` (already a dependency)

## Verification
1. Visit `/sk/contact` — should render version A
2. Visit `/sk/contact/A` through `/sk/contact/E` — each renders a distinct design
3. Visit `/sk/contact/X` — should show 404
4. No floating beans or watermark logo on any version
5. Form submission works on all versions (POST to `/api/contact`)
6. No Next.js Image warnings in console
7. All versions are responsive (mobile + desktop)
8. Navbar and Footer render correctly on all versions
