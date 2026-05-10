# Dashboard Overview

## Overview

The dashboard home page is the default landing page after a user signs in. It provides a high-level summary of key business metrics, a live activity feed, and quick-access action buttons.

**Route:** `/dashboard`  
**File:** `app/(dashboard)/dashboard/page.tsx`

---

## Stats Grid

Displays four KPI cards arranged in a responsive grid (2 columns on medium screens, 4 columns on extra-large screens).

| Stat | Current Value | Icon | Trend |
|------|---------------|------|-------|
| Total Revenue | $45,231.89 | DollarSign | +20.1% from last month |
| Subscriptions | +2,350 | Users | +180.1% from last month |
| Sales | +12,234 | CreditCard | +19% from last month |
| Active Now | +573 | Activity | +201 since last hour |

**Card behaviour:**
- Each card has a hover shadow effect (`hover:shadow-lg transition-all`)
- The icon container switches from muted background to `primary/10` on hover
- The icon colour transitions from muted to primary on hover

---

## Recent Activity

A card listing the latest system events, ordered chronologically (most recent first).

**Each activity item shows:**
- A coloured dot indicating event type (green = user event, blue = payment, orange = system)
- Event title (e.g., "New user registered")
- Relative timestamp (e.g., "2 minutes ago")

**Current sample events:**
1. New user registered — 2 minutes ago (green)
2. Payment processed — 5 minutes ago (blue)
3. System update completed — 1 hour ago (orange)

---

## Quick Actions

A card with a 2×2 button grid providing shortcuts to frequently used features.

| Button | Icon |
|--------|------|
| Add User | Users |
| New Sale | CreditCard |
| Reports | Activity |
| Analytics | DollarSign |

**Button behaviour:**
- Each button is a full-height bordered tile with centred icon and label
- Hover state changes background to `muted`

---

## Layout

- The stats grid and the two content cards (Recent Activity, Quick Actions) are stacked vertically with `space-y-8` spacing.
- Content cards sit in a 2-column grid on large screens (`lg:grid-cols-2`), stacking to single column on smaller viewports.
- Page header shows "Dashboard" title and a welcome subtitle.

---

## Responsiveness

| Breakpoint | Stats grid | Content cards |
|------------|------------|---------------|
| Default (mobile) | 1 column | 1 column |
| `md` | 2 columns | 1 column |
| `xl` | 4 columns | — |
| `lg` | — | 2 columns |

---

## Dependencies

- `shadcn/ui` — Card, CardContent, CardHeader, CardTitle
- `lucide-react` — Activity, CreditCard, DollarSign, Users
