# VibeCheck Live

# Lovable AI Prompt — VibeCheck

---

Build a modern, polished web app called **VibeCheck** — a live fintech platform for restaurant-goers in Tashkent. The product lets guests see real-time restaurant occupancy/vibe on a map, view their bill live at the table via QR code, and pay or split instantly through Click/Payme — no waiting for a waiter with a terminal.

## Design system

- **Color palette:** Tiffany blue (#0ABAB5 / #81D8D0 range) as the primary accent, mixed with a deeper trust-building blue (#0A4B78 / #1E5F8C range) for contrast, headers, and CTAs. Use soft off-white or very light mint (#F4FBFA) as the base background — never pure white. Dark text in a near-black navy (#0B1F2A), not pure black.

- **Style:** Clean, modern fintech aesthetic — think Revolut/Wise meets a restaurant-discovery app. Generous whitespace, rounded corners (12–20px radius), soft drop shadows, subtle glassmorphism on cards/modals.

- **Typography:** A modern geometric sans-serif (e.g. Inter, Manrope, or Plus Jakarta Sans) — bold, large headlines with tight tracking; comfortable body text.

- **Motion:** Subtle hover lifts on cards, smooth transitions between states, a soft pulsing glow on "live" indicators (the occupancy dot, the live-bill badge).

- **Iconography:** Line icons, consistent stroke width, tiffany/blue duotone style.

- Support both light backgrounds and occasional dark navy section blocks for visual rhythm (e.g. alternate light/dark sections on the landing page).

## Language support (required)

The entire website must be bilingual: **Uzbek is the primary/default language**, with **Russian as a selectable alternative**. Implement this as a proper i18n setup, not hardcoded text:

- Add a **language switcher** (e.g. "UZ / RU" toggle or a small globe icon with a dropdown) in the top navigation bar on every page — landing, auth, and the authenticated app.

- Store all UI copy (headlines, buttons, menu categories, statuses like "Waiter notified", form labels, footer text, etc.) in translation files/objects keyed by language, so switching is instant and there is no page reload flicker.

- Default the app to Uzbek on first load; persist the user's chosen language (e.g. in local state/context) for the rest of their session.

- Mock menu items, restaurant names, and other sample data should also have Uzbek and Russian variants where realistic (restaurant/dish names can stay as-is if they're proper nouns, but descriptions, categories, and statuses should switch with the language).

- Write all placeholder copy in this prompt (hero headline, step descriptions, etc.) in **both** Uzbek and Russian so Lovable has real translated content to start from, not just English.

## Site architecture

### 1. Public Landing Page

Top navigation bar: logo "VibeCheck" on the left, nav links (How it works, For Restaurants, Contact) in the center, and **Login** / **Sign Up** buttons in the top right (Sign Up as a solid tiffany/blue button, Login as an outline/ghost button).

**Hero section:**

- Headline: "VibeCheck — Tashkent's living fintech map."

- Subheadline: "See real-time crowd levels and the actual vibe of restaurants. Pay your bill in seconds via QR — no waiting for the waiter."

- Primary CTA button: "Explore the map" → routes to sign up.

- Include a hero visual: a stylized map preview with a few glowing colored pins (green/yellow/red).

**"How it works for guests" section (3 steps, card layout):**

1. **Live Map** — Venues glow color-coded on the map: Green = plenty of space, Yellow = buzzing, Red = full house, peak vibe right now.

2. **Live Bill** — Sit down, scan the table QR code, and see your bill update in real time as the waiter rings items into the till.

3. **Instant Payment** — Skip waiting for a terminal. Pay or split the bill with friends in one tap via Click or Payme.

**"For Restaurants" section (B2B, on a contrasting dark-navy background):**

- Headline: "Built for restaurant owners too."

- Two benefit cards: "Increase table turnover by 20% with instant QR payment" and "A built-in CRM to bring guests back — without burning your budget on Instagram ads."

- Secondary CTA: "Partner with VibeCheck."

**Interactive map demo section** (this is the centerpiece — build it as a real interactive component, not a static image):

- A stylized map of Tashkent (use a clean custom map style or a simple illustrated city map background) with **2–3 clickable restaurant pin markers** (e.g. "Socials", "Brasserie").

- Each pin is color-coded (mostly red/orange to show "peak vibe").

- Clicking a pin opens a small popover/card showing:

  - Occupancy: 85% (red badge)

  - Vibe: Live music

  - Tables free: 2 left

- Include a smooth open/close animation on the popover.

**Footer:**

- Columns: About/Contact info, Privacy Policy link, Terms link, and social icons (Instagram, Telegram, Facebook — use placeholder links).

- Small newsletter or "Stay in the loop" email capture (optional).

### 2. Auth pages

- Separate **Sign Up** page: name, email/phone, password, confirm password, a tiffany-accented submit button, and a link back to Login.

- Separate **Login** page: email/phone + password, "forgot password" link, and a link to Sign Up.

- Clean centered card layout on a soft gradient (tiffany → light blue) background.

- Include simple client-side form validation.

### 3. Authenticated app (after login)

**Dashboard / Map view (default landing screen post-login):**

- Full interactive map showing nearby restaurants, filterable by cuisine/restaurant type (dropdown or chip filters — e.g. Italian, Sushi, Cafe, Bar).

- Each restaurant pin shows live occupancy color + a mini info card on click (same style as the landing demo, but live data-driven with mock data).

- A restaurant detail panel/page: photos, name, cuisine type, occupancy %, vibe tag, address, and a "I'm here / Scan QR" call-to-action.

**QR scan flow (simulate with a button/modal since camera access may be limited in preview):**

- "Scan table QR" action opens a simulated scan → lands on a **Table Session** screen for that restaurant/table number.

- Two choices presented clearly as two large cards: **"Order Online"** or **"Call a Waiter."**

**Path A — Order Online:**

- Digital menu grouped by category (Starters, Mains, Drinks, Desserts) with images, names, prices, and an "add to order" stepper.

- Running order summary/cart on the side (or bottom sheet on mobile).

- Checkout step: order summary → payment method selection (**Cash** or **Card**, plus Click/Payme as the card option) → confirmation screen.

**Path B — Call a Waiter:**

- A "Live Bill" screen showing a status indicator (e.g. "Waiter notified" → "Order being prepared" → "Bill updating live") with items appearing on the bill in real time as they're mock-added.

- A live-updating total with a subtle pulse animation.

- Once the bill is finalized, show the same payment step: split with friends (equal split or custom amounts) or pay in full, choose Cash/Card/Click/Payme, then a payment confirmation screen.

**Profile page:**

- User info at top (name, email, avatar placeholder, edit button).

- "Visit history" list: each entry shows restaurant name, date, and amount paid, in a clean table/card list, most recent first.

- Optional: total spent this month, favorite restaurant badge.

## Data

Use realistic mock/sample data throughout (restaurant names, menu items with prices in UZS, occupancy percentages, order history) so every screen looks fully populated and real, not empty. Make it easy to later swap mock data for a real backend/API.

## Technical notes

- Fully responsive: mobile-first, since most guests will use this at the table on their phone.

- Use React with a component-based structure; keep the map, menu, bill, and payment flows as reusable components.

- All "live" elements (occupancy, live bill) should visually read as real-time even if powered by mock/simulated updates for now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/510fa4e7-eb12-46ff-b36c-c3e34d3a658c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
