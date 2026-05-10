# Database

## Overview

The Database page provides an administrative view of all connected databases, including their type, size, table count, status, and last backup time. It also exposes quick-action cards for running backup, maintenance, and export operations.

**Route:** `/dashboard/database`  
**File:** `app/(dashboard)/dashboard/database/page.tsx`

---

## Page Header

- Title: "Database"
- Subtitle: "Manage your databases and data operations."
- Action buttons (top-right):
  - **Import** — outline button with `Upload` icon
  - **New Database** — primary button with `Plus` icon

---

## Stats Cards

Four summary cards in a responsive grid (2 columns on `md`, 4 columns on `lg`):

| Stat | Value | Change |
|------|-------|--------|
| Total Databases | 4 | +1 from last month |
| Total Size | 20.6 GB | +2.1 GB from last month |
| Active Connections | 127 | +12 from last hour |
| Backup Status | Healthy | Last backup: 2 hours ago |

All icons use the `Database` lucide icon.

---

## Database List

A card listing each database with full metadata and per-row actions.

### Database Row Fields

| Field | Detail |
|-------|--------|
| Icon | `Database` icon in a `bg-gray-100` rounded container |
| Name | Database name (e.g., `users_db`) |
| Metadata | DB type · table count · size (e.g., "PostgreSQL • 15 tables • 2.4 GB") |
| Status badge | "Active" = `default`, "Inactive" = `secondary` |
| Last backup | Relative time label |
| Row actions | Icon buttons: View, Edit, Download, Delete |

### Sample Databases

| Name | Type | Size | Tables | Status | Last Backup |
|------|------|------|--------|--------|-------------|
| users_db | PostgreSQL | 2.4 GB | 15 | Active | 2 hours ago |
| analytics_db | MySQL | 5.1 GB | 28 | Active | 1 day ago |
| cache_db | Redis | 856 MB | 0 | Active | 6 hours ago |
| archive_db | PostgreSQL | 12.3 GB | 42 | Inactive | 1 week ago |

### Per-Row Action Buttons

| Button | Icon | Action |
|--------|------|--------|
| View | Eye | View database details |
| Edit | Edit | Edit configuration |
| Download | Download | Export / download database |
| Delete | Trash2 | Delete database |

---

## Quick Action Cards

Three cards at the bottom of the page, laid out in a responsive grid (2 columns on `md`, 3 columns on `lg`):

### Backup
- Icon: `RefreshCw`
- Description: "Create a backup of all your databases"
- Button: **Create Backup**

### Maintenance
- Icon: `Settings`
- Description: "Run database maintenance tasks"
- Button: **Run Maintenance**

### Export
- Icon: `Download`
- Description: "Export database schemas and data"
- Button: **Export Data**

---

## Layout

```
[Page header + Import + New Database buttons]
[4 Stats cards]
[Database list card]
[3 Quick action cards]
```

---

## Dependencies

- `shadcn/ui` — Card, CardContent, CardHeader, CardTitle, Button, Badge
- `lucide-react` — Database, Plus, Download, Upload, RefreshCw, Settings, Eye, Edit, Trash2
