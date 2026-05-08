# Error Pages

## Overview

The application includes a set of purpose-built error pages that handle different failure scenarios. Each error page has a unique visual design and message appropriate to its HTTP status or system state. A dedicated dashboard view lists all error pages for easy navigation during development.

**Route group:** `app/(error)/`  
**Error overview page:** `/dashboard/errors`

---

## Error Pages Overview (`/dashboard/errors`)

An internal dashboard page that catalogs all available error pages as clickable cards.

**File:** `app/(dashboard)/dashboard/errors/page.tsx`

- Title: "Error Pages"
- Subtitle: "A collection of uniquely designed error pages for different scenarios."
- Grid: 1 column on mobile, 2 on `md`, 3 on `lg`

Each card displays:
- Icon with coloured background
- Page title
- Description of when the error occurs
- Status badge ("Ready")
- "View Error Page" link button (outline); or a note for auto-triggered pages

---

## Error Page Catalog

| Page | Route | Trigger | Icon | Icon Colour |
|------|-------|---------|------|-------------|
| 404 Not Found | `/error/404` | Accessing a non-existent URL | Search | `text-gray-500` |
| 401 Unauthorized | `/error/401` | Unauthenticated access attempt | Shield | `text-yellow-600` |
| 403 Forbidden | `/error/403` | Authenticated but insufficient permissions | Lock | `text-red-500` |
| 500 Server Error | `/error/500` | Server-side failure | Server | `text-red-500` |
| Maintenance | `/error/maintenance` | Scheduled system downtime | Wrench | `text-blue-600` |
| Generic Error | `/dashboard/errors` | Client-side React error boundary | AlertTriangle | `text-red-500` |

> The Generic Error page is triggered automatically by React error boundaries and does not have a standalone manual test route.

---

## 404 Not Found

**File:** `app/not-found.tsx`  
**Trigger:** Automatic — Next.js renders this when a route cannot be matched.

- Informs the user that the page they requested does not exist.
- Provides navigation back to a known-good route (e.g., dashboard home).

---

## 401 Unauthorized

**Route:** `/error/401`  
**File:** `app/(error)/error/401/page.tsx`

- Tells the user they must be logged in to access the requested resource.
- Provides a link or button to the login page.

---

## 403 Forbidden

**Route:** `/error/403`  
**File:** `app/(error)/error/403/page.tsx`

- Informs the user they are authenticated but do not have permission.
- Provides a link back to the dashboard or a contact-support option.

---

## 500 Internal Server Error

**Route:** `/error/500`  
**File:** `app/(error)/error/500/page.tsx`

- Notifies the user of an unexpected server failure.
- Provides support contact options and a retry/go-home action.

---

## Maintenance

**Route:** `/error/maintenance`  
**File:** `app/(error)/error/maintenance/page.tsx`

- Displays during scheduled downtime windows.
- Shows downtime information and an estimated recovery time.

---

## Generic / Client Error

**Shared component:** `components/shared/ErrorPage.tsx`  
**Trigger:** React error boundaries catch runtime exceptions and render this component.

- A reusable `ErrorPage` component used across the application for unexpected client-side errors.
- Provides a "Try again" option.

---

## Shared Component

All error pages use the `ErrorPage` shared component located at `components/shared/ErrorPage.tsx` as a base, with page-specific props (icon, title, description, actions).

---

## Dependencies

- `shadcn/ui` — Card, Button, Badge, Separator
- `lucide-react` — AlertTriangle, Search, Server, Shield, Lock, Wrench, ArrowRight
- `next/link` — Navigation links within error pages
