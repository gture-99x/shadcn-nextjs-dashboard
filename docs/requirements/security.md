# Security

## Overview

The Security page gives users visibility into their account security posture. It shows a security score, active login sessions, a feed of recent security events, and toggleable security settings. Users can revoke individual sessions from this page.

**Route:** `/dashboard/security`  
**File:** `app/(dashboard)/dashboard/security/page.tsx`

---

## Page Header

- Title: "Security"
- Subtitle: "Manage your account security and monitor activity."

---

## Security Overview Cards

Four summary cards in a responsive grid (2 columns on `md`, 4 columns on `lg`):

| Card | Value | Note |
|------|-------|------|
| Security Score | 95/100 | "Excellent security posture" |
| Active Sessions | 3 | "Across different devices" |
| Last Login | 2 min ago | "From New York, NY" |
| Threats Blocked | 12 | "This month" |

Icons used: `Shield`, `Eye`, `Clock`, `AlertTriangle`.

---

## Security Settings

A card with toggle switches for the following security controls:

| Setting | Default State | Description |
|---------|--------------|-------------|
| Two-Factor Authentication | On | Add an extra layer of security |
| Login Notifications | On | Get notified of new login attempts |
| Session Timeout | Off | Auto log out after inactivity |
| Location Tracking | On | Track login locations for security |
| Password History | On | Prevent reuse of recent passwords |

Each row shows the setting label, a descriptive subtitle, and a `Switch` component. The card header includes a `Shield` icon.

---

## Recent Security Events

A card listing the latest security-related account activity.

### Event Item Fields

| Field | Detail |
|-------|--------|
| Icon | Status-coded icon (CheckCircle, AlertTriangle, Lock, Smartphone) |
| Type | Event category (e.g., "Login", "Failed Login") |
| Badge | Status variant (success = `default`, warning = `secondary`, info = `outline`) |
| Description | Human-readable event description |
| Timestamp | Relative time (e.g., "2 minutes ago") |

### Icon Colour Rules

| Status | Colour |
|--------|--------|
| success | `text-green-600` |
| warning | `text-yellow-600` |
| info | `text-blue-600` |

### Sample Events

| Type | Description | Time | Status |
|------|-------------|------|--------|
| Login | Successful login from New York, NY | 2 minutes ago | success |
| Failed Login | Failed login attempt from unknown location | 1 hour ago | warning |
| Password Change | Password changed successfully | 3 hours ago | success |
| New Device | New device logged in from San Francisco, CA | 1 day ago | info |

---

## Active Sessions

A card listing all sessions currently authenticated on the account.

### Session Row Fields

| Field | Detail |
|-------|--------|
| Device icon | `Smartphone` icon in a `bg-gray-100` container |
| Device name | e.g., "MacBook Pro" |
| Location | City, state with a `MapPin` icon |
| IP address | Full IP string |
| Last active | Relative timestamp |
| Current badge | "Current" `default` badge shown only for the active session |
| Revoke button | Outline `sm` button; disabled/hidden for the current session |

### Sample Sessions

| Device | Location | IP | Last Active | Current |
|--------|----------|----|-------------|---------|
| MacBook Pro | New York, NY | 192.168.1.100 | 2 minutes ago | Yes |
| iPhone 15 | San Francisco, CA | 10.0.0.50 | 1 hour ago | No |
| Windows PC | London, UK | 172.16.0.25 | 3 days ago | No |

---

## Layout

```
[Page header]
[4 Security overview cards]
[Security Settings card] | [Recent Security Events card]
[Active Sessions card]
```

Left and right cards in the middle row are side-by-side on `lg` screens and stacked on smaller viewports.

---

## Dependencies

- `shadcn/ui` — Card, Button, Badge, Switch, Label
- `lucide-react` — Shield, Lock, Eye, AlertTriangle, CheckCircle, Clock, MapPin, Smartphone
