# User Management

## Overview

The Users page provides administrators with a searchable, filterable table of all user accounts. It supports viewing user details, role and status badges, and per-user actions such as sending email, calling, editing, and deleting.

**Route:** `/dashboard/users`  
**File:** `app/(dashboard)/dashboard/users/page.tsx`

---

## Page Header

- Title: "Users"
- Subtitle: "Manage user accounts and permissions."
- Primary action: **Add User** button (top-right) with a `Plus` icon

---

## Search & Filter Bar

A card containing:
- **Search input** — placeholder "Search users..." with a `Search` icon; full-width relative to available space
- **Filter button** — outline button with a `Filter` icon (filter panel not yet implemented)

---

## Users Table

Displays all users in a full-width table with the following columns:

| Column | Content |
|--------|---------|
| User | Avatar image (with initials fallback) + full name + email address |
| Role | Role badge — "default" variant for Admin, "secondary" for others |
| Status | Status badge — "default" for Active, "secondary" for Inactive, "outline" for Pending |
| Last Seen | Relative time string (e.g., "2 hours ago", "Never") |
| Actions | Dropdown menu (see below) |

### Sample Dataset

| Name | Email | Role | Status | Last Seen |
|------|-------|------|--------|-----------|
| John Doe | john.doe@example.com | Admin | Active | 2 hours ago |
| Jane Smith | jane.smith@example.com | User | Active | 1 day ago |
| Bob Johnson | bob.johnson@example.com | Moderator | Inactive | 1 week ago |
| Alice Brown | alice.brown@example.com | User | Active | 3 hours ago |
| Charlie Wilson | charlie.wilson@example.com | User | Pending | Never |

### User Roles

- `Admin` — full access
- `Moderator` — intermediate access
- `User` — standard access

### User Statuses

- `Active` — account is in use
- `Inactive` — account is disabled or dormant
- `Pending` — account created but not yet verified/activated

---

## Per-User Actions (Dropdown)

Each row has a `MoreHorizontal` icon button that opens a dropdown with:

| Action | Icon | Behaviour |
|--------|------|-----------|
| Send Email | Mail | Composes an email to the user |
| Call | Phone | Initiates a phone call |
| Edit User | — | Opens user edit form |
| Delete User | — | Deletes the user (destructive, red text) |

---

## Layout

```
[Page header + Add User button]
[Search bar + Filter button]
[Users table card]
```

---

## Responsiveness

The table scrolls horizontally on small screens. The search bar and filter button stack vertically if needed.

---

## Dependencies

- `shadcn/ui` — Card, Button, Input, Table, Avatar, Badge, DropdownMenu
- `lucide-react` — Search, Plus, MoreHorizontal, Mail, Phone, Filter
