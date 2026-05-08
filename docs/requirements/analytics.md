# Analytics

## Overview

The Analytics page provides detailed business performance insights including KPI metrics, tabbed chart placeholders, traffic source breakdown, and top-page statistics. It also exposes filter, date-range, and export controls.

**Route:** `/dashboard/analytics`  
**File:** `app/(dashboard)/dashboard/analytics/page.tsx`

---

## Page Header

- Title: "Analytics"
- Subtitle: "View detailed analytics and insights about your business performance."
- Action buttons (top-right):
  - **Filter** — opens a filter panel (placeholder)
  - **Last 30 days** — date range selector (placeholder)
  - **Export** — exports report data (placeholder)

---

## Metrics Cards

Four KPI cards in a responsive grid (2 columns on `sm`, 4 columns on `lg`).

| Metric | Value | Change | Trend |
|--------|-------|--------|-------|
| Total Revenue | $45,231.89 | +20.1% | Up |
| Active Users | 2,350 | +180.1% | Up |
| Sales | 12,234 | +19% | Up |
| Conversion Rate | 2.4% | -4.3% | Down |

**Visual rules:**
- Up trends display in green; down trends display in red
- Each card shows a `TrendingUp` or `TrendingDown` icon next to the percentage change
- Card icons have a coloured background matching the metric category

---

## Analytics Tabs

A tabbed panel spanning 2/3 of the main content area on large screens. Each tab contains a chart placeholder.

### Overview Tab
- Heading: "Overview Analytics" with a `BarChart3` icon
- Badge: "Live Data"
- Chart area: 300px tall placeholder with a dashed border and a centred `BarChart3` icon and "Chart Integration Ready" label

### Revenue Tab
- Heading: "Revenue Trends" with a `DollarSign` icon
- Badge: "Updated"
- Chart area: 300px tall placeholder with an emerald-to-blue gradient background

### Users Tab
- Heading: "User Analytics" with a `Users` icon
- Badge: "Real-time"
- Chart area: 300px tall placeholder with a purple-to-pink gradient background

---

## Traffic Sources

A card in the right sidebar (1/3 width on large screens) showing visitor origin breakdown.

| Source | Percentage | Visitor Count |
|--------|-----------|---------------|
| Organic Search | 45% | 4,521 |
| Direct Traffic | 30% | 3,012 |
| Social Media | 15% | 1,508 |
| Email Campaign | 10% | 1,005 |

**Display:** Each source renders a label, visitor count, a `Progress` bar, and a percentage label below the bar.

---

## Top Pages

A card listing the most-visited internal pages.

| Page | Views | Bounce Rate | Avg Time |
|------|-------|-------------|----------|
| /dashboard | 12,453 | 24% | 3:42 |
| /analytics | 8,921 | 18% | 4:15 |
| /projects | 6,782 | 32% | 2:38 |
| /settings | 4,321 | 28% | 2:12 |

Each row shows page path, views, bounce rate, and average session duration in a muted-background rounded tile.

---

## Layout

```
[Page header with actions]
[4 Metric cards]
[2/3 Tabbed charts] | [1/3 Traffic Sources + Top Pages]
```

On smaller screens the sidebar cards stack below the tabbed content.

---

## Dependencies

- `shadcn/ui` — Card, Tabs, Badge, Button, Progress
- `lucide-react` — TrendingUp, TrendingDown, Users, DollarSign, Activity, BarChart3, PieChart, Download, Filter, Calendar
