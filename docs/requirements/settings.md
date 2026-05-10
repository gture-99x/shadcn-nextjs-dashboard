# Settings

## Overview

The Settings section groups user and application configuration under a shared sub-navigation layout. Each setting category is a separate page accessible via a sidebar nav within the settings area.

**Route group:** `/dashboard/settings/`  
**Layout file:** `app/(dashboard)/dashboard/settings/layout.tsx`

---

## Settings Navigation

The settings layout provides a persistent left sidebar with links to each settings sub-page:

| Label | Route |
|-------|-------|
| Profile / Account | `/dashboard/settings` → `/dashboard/settings/account` |
| Notifications | `/dashboard/settings/notifications` |
| Appearance | `/dashboard/settings/appearance` |
| Display | `/dashboard/settings/display` |
| API Keys | `/dashboard/settings/api-keys` |

---

## Account (`/dashboard/settings/account`)

Allows users to update their personal account information.

- Section heading: "Account"
- Subtitle: "Manage your account settings."
- Content: Form placeholder (form fields not yet implemented)

---

## Notifications (`/dashboard/settings/notifications`)

Allows users to configure their notification preferences.

- Section heading: "Notifications"
- Subtitle: "Configure how you receive notifications."
- Content: Form placeholder (form fields not yet implemented)

---

## Appearance (`/dashboard/settings/appearance`)

Allows users to customise the visual theme of the application.

- Section heading: "Appearance"
- Subtitle: "Customize the appearance of the app."
- Content: Form placeholder (form fields not yet implemented)

> Intended controls: light/dark/system theme toggle, font size, colour accent selection.

---

## Display (`/dashboard/settings/display`)

Allows users to configure layout and display preferences.

- Section heading: (not yet implemented)
- Content: Placeholder

---

## API Keys (`/dashboard/settings/api-keys`)

Provides full management of API keys used to authenticate external applications with the platform.

**Route:** `/dashboard/settings/api-keys`

### Create New API Key

A card with:
- **Key Name** text input — placeholder: "e.g., My Awesome App"
- **Create Key** button with a `Plus` icon

### API Keys Table

Displays all existing keys with the following columns:

| Column | Detail |
|--------|--------|
| Name | Key label (e.g., "Production Key") |
| Token | Masked token string with a `Copy` ghost icon button |
| Status | Badge — "Active" = `default`, "Revoked" = `outline` |
| Created | Creation date |
| Last Used | Relative time (e.g., "2 minutes ago", "1 month ago") |
| Actions | Dropdown menu |

#### Per-Key Actions (Dropdown)

| Action | Icon | Style |
|--------|------|-------|
| View Details | Eye | Default |
| Revoke Key | Trash2 | `text-red-500` (destructive) |

#### Sample API Keys

| Name | Token (masked) | Status | Created | Last Used |
|------|---------------|--------|---------|-----------|
| Production Key | `prod_sk_************************1234` | Active | 2023-10-21 | 2 minutes ago |
| Staging Key | `stg_sk_************************5678` | Active | 2023-09-15 | 3 days ago |
| Development Key | `dev_sk_************************abcd` | Revoked | 2023-08-01 | 1 month ago |

---

## Shared Layout Behaviour

- All settings pages share a `Separator` between the section heading and its content.
- The settings sidebar remains visible across all sub-pages.
- Pages that are not yet fully implemented show a placeholder paragraph.

---

## Dependencies

- `shadcn/ui` — Card, Button, Input, Label, Table, Badge, DropdownMenu, Separator
- `lucide-react` — Plus, MoreHorizontal, Copy, Trash2, Eye
