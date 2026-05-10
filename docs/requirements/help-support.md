# Help & Support

## Overview

The Help & Support page centralises user self-service and contact options. It features a search bar, an expandable FAQ accordion, multiple support channel listings, and quick-access cards for documentation, video tutorials, API reference, and community resources.

**Route:** `/dashboard/help`  
**File:** `app/(dashboard)/dashboard/help/page.tsx`

---

## Page Header

- Title: "Help & Support"
- Subtitle: "Find answers to common questions and get support when you need it."

---

## Search

A centred search input (max width `2xl`) with a `Search` icon.  
Placeholder: "Search for help articles, FAQs, or contact support..."

> Search functionality is a UI placeholder; filtering logic is not yet implemented.

---

## Frequently Asked Questions

A card with an expandable accordion. Each FAQ item is a clickable row that reveals the answer on toggle.

### FAQ Item Fields

| Field | Detail |
|-------|--------|
| Category badge | `outline` variant badge labelling the topic area |
| Question | Bold question text |
| Expand icon | `ChevronRight` (collapsed) / `ChevronDown` (expanded) |
| Answer | Descriptive paragraph shown only when expanded |

### Expand/Collapse Behaviour

- Only one FAQ can be expanded at a time (controlled by `expandedFaq` state).
- Clicking an already-open item collapses it.

### FAQ Dataset

| # | Category | Question |
|---|----------|---------|
| 1 | Account | How do I reset my password? |
| 2 | Security | How do I enable two-factor authentication? |
| 3 | Data | How do I export my data? |
| 4 | Team | How do I invite team members? |
| 5 | Projects | How do I create a new project? |
| 6 | Calendar | How do I schedule a meeting? |

---

## Support Channels

A card listing available ways to reach the support team.

| Channel | Icon | Status | Response Time |
|---------|------|--------|---------------|
| Live Chat | MessageCircle | Available | 2–5 minutes |
| Email Support | Mail | Available | 24 hours |
| Phone Support | Phone | Available | Immediate |
| Documentation | BookOpen | Available | Instant |

Each channel card shows the icon in a `bg-gray-100` container, the channel name, a `default` status badge, a description, and the expected response time.

---

## Quick Resource Cards

Four cards in a responsive grid (2 columns on `md`, 4 columns on `lg`):

| Card | Icon | Description | Button Label |
|------|------|-------------|-------------|
| Documentation | BookOpen | Browse comprehensive documentation and guides | View Docs |
| Video Tutorials | Video | Watch step-by-step tutorials | Watch Videos |
| API Reference | FileText | Explore API documentation | API Docs |
| Community | MessageCircle | Join the community forum | Join Forum |

Each card has a description paragraph and a primary full-width action button.

---

## Layout

```
[Page header]
[Search bar card]
[FAQ card] | [Support Channels card]
[4 Quick resource cards]
```

The FAQ and Support Channels cards sit side-by-side on `lg` screens and stack on smaller viewports.

---

## State

| State variable | Type | Purpose |
|---------------|------|---------|
| `expandedFaq` | `number \| null` | Tracks which FAQ index is currently expanded |

---

## Dependencies

- `shadcn/ui` — Card, Button, Input, Badge
- `lucide-react` — Search, HelpCircle, MessageCircle, Mail, Phone, BookOpen, Video, FileText, ChevronDown, ChevronRight
- `react` — `useState` for accordion state
