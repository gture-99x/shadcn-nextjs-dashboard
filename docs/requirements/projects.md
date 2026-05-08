# Projects

## Overview

The Projects page lets teams track and manage their active work. Each project is displayed as a card showing the project name, description, completion progress, status, priority, due date, and assigned team members.

**Route:** `/dashboard/projects`  
**File:** `app/(dashboard)/dashboard/projects/page.tsx`

---

## Page Header

- Title: "Projects"
- Subtitle: "Manage and track your project progress."
- Primary action: **New Project** button with a `Plus` icon

---

## Project Cards Grid

Projects are displayed in a responsive grid:
- 1 column on mobile
- 2 columns on `md`
- 3 columns on `lg`

Each card has a hover shadow effect (`hover:shadow-lg transition-shadow`).

---

## Project Card Fields

| Field | Description |
|-------|-------------|
| Name | Project title |
| Description | Short summary of the project |
| Progress bar | `Progress` component showing % completion |
| Progress % | Numeric label alongside the bar |
| Status badge | Reflects current phase |
| Priority badge | Reflects urgency level |
| Due date | Formatted date with a `Calendar` icon |
| Team size | Member count with a `Users` icon |
| Team avatars | Overlapping avatar stack showing member initials |
| Arrow icon | `ArrowUpRight` in the top-right corner of the card header |

---

## Statuses

| Status | Badge Variant |
|--------|--------------|
| Completed | `default` |
| Almost Done | `secondary` |
| In Progress | `outline` |

---

## Priorities

| Priority | Badge Variant |
|----------|--------------|
| High | `destructive` |
| Medium | `default` |
| Low | `secondary` |

---

## Sample Dataset

| # | Name | Progress | Status | Priority | Due Date | Team |
|---|------|----------|--------|----------|----------|------|
| 1 | E-commerce Platform | 75% | In Progress | High | Apr 15, 2024 | JD, MK, AL |
| 2 | Mobile App Redesign | 45% | In Progress | Medium | May 1, 2024 | SM, RK |
| 3 | API Integration | 90% | Almost Done | High | Mar 30, 2024 | JD, AL |
| 4 | Database Migration | 30% | In Progress | Low | Jun 15, 2024 | MK, SM |
| 5 | Security Audit | 100% | Completed | High | Mar 20, 2024 | RK, AL |
| 6 | Performance Optimization | 60% | In Progress | Medium | Apr 30, 2024 | JD, MK, SM |

---

## Layout

```
[Page header + New Project button]
[Responsive 3-column card grid]
```

---

## Dependencies

- `shadcn/ui` — Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress, Avatar
- `lucide-react` — Plus, Calendar, Users, ArrowUpRight
