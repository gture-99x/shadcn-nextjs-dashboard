# Calendar

## Overview

The Calendar page allows users to manage their schedule by viewing upcoming events and performing quick actions such as adding new events or sharing the calendar. A full interactive calendar grid is reserved as a placeholder for integration with a calendar component library.

**Route:** `/dashboard/calendar`  
**File:** `app/(dashboard)/dashboard/calendar/page.tsx`

---

## Page Header

- Title: "Calendar"
- Subtitle: "Manage your schedule and upcoming events."
- Primary action: **New Event** button with a `Plus` icon

---

## Layout

The page uses a 3-column grid on large screens:
- **Left area** (`lg:col-span-2`): Calendar grid view
- **Right area** (`lg:col-span-1`): Upcoming events list + Quick actions

---

## Calendar Grid View

A card displaying the current month's calendar.

- Card title: "March 2024" with a `Calendar` icon
- Content area: 400px tall placeholder with a dashed border showing a `Calendar` icon and labels:
  - "Calendar view placeholder"
  - "Interactive calendar component would go here"

> An interactive calendar component (e.g., `react-big-calendar`, `@fullcalendar/react`) is intended to replace the placeholder.

---

## Upcoming Events List

A card listing events sorted by date, each item displaying:

| Field | Detail |
|-------|--------|
| Title | Event name |
| Time | Start time + duration (e.g., "10:00 AM • 1 hour") with a `Clock` icon |
| Location | Venue or "Virtual Meeting" with a `MapPin` icon |
| Attendees | Count (e.g., "3 attendees") with a `Users` icon |
| Type badge | Event category with appropriate variant |

### Event Types & Badge Variants

| Type | Badge Variant |
|------|--------------|
| Meeting | `default` |
| Presentation | `secondary` |
| Deadline | `outline` |

### Sample Events

| Title | Date | Time | Duration | Location | Attendees | Type |
|-------|------|------|----------|----------|-----------|------|
| Team Meeting | 2024-03-20 | 10:00 AM | 1 hour | Conference Room A | 3 | Meeting |
| Client Presentation | 2024-03-21 | 2:00 PM | 2 hours | Virtual Meeting | 2 | Presentation |
| Project Deadline | 2024-03-25 | 5:00 PM | All day | Office | 2 | Deadline |
| Lunch with Client | 2024-03-22 | 12:00 PM | 1 hour | Restaurant Downtown | 1 | Meeting |

---

## Quick Actions

A card with shortcut buttons:

| Button | Icon | Label |
|--------|------|-------|
| Add Event | Plus | Add Event |
| View All Events | Calendar | View All Events |
| Share Calendar | Users | Share Calendar |

All buttons are `outline` size `sm` and left-aligned with icons.

---

## Dependencies

- `shadcn/ui` — Card, Button, Badge
- `lucide-react` — Plus, Calendar, Clock, MapPin, Users
