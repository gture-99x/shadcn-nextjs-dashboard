# Documents

## Overview

The Documents page provides a file management interface where users can browse, search, upload, download, share, and delete documents. Files are organised into named folders visible in a sidebar panel.

**Route:** `/dashboard/documents`  
**File:** `app/(dashboard)/dashboard/documents/page.tsx`

---

## Page Header

- Title: "Documents"
- Subtitle: "Manage and organize your documents and files."

---

## Toolbar

A row containing:
- **Search input** — placeholder: "Search documents..." with a `Search` icon; max width `sm`
- **Upload Document** button — primary button with a `FileText` icon

---

## Layout

A 4-column grid on large screens:
- **Left panel** (`lg:col-span-1`): Folders sidebar
- **Right panel** (`lg:col-span-3`): Recent Documents list

---

## Folders Sidebar

A card listing all folders with a document count badge for each.

| Folder | File Count |
|--------|-----------|
| Projects | 12 |
| Research | 8 |
| Design | 15 |
| Meetings | 6 |
| Finance | 4 |

Each folder row shows:
- `Folder` icon (blue)
- Folder name
- `secondary` variant badge with the file count
- Hover state with `muted` background; pointer cursor

---

## Recent Documents List

A card listing recently modified documents. Each document row includes:

| Element | Detail |
|---------|--------|
| File icon | Blue `FileText` icon in a rounded `bg-blue-100` container |
| File name | Bold label |
| File type | e.g., PDF, Excel, Sketch, Word |
| File size | e.g., "2.4 MB" |
| Last modified | Relative time (e.g., "2 hours ago") |
| Folder tag | Folder name in blue text |
| Actions menu | Dropdown triggered by `MoreHorizontal` icon button |

A `Separator` divides each document row from the next.

### Per-Document Actions (Dropdown)

| Action | Icon | Style |
|--------|------|-------|
| Download | Download | Default |
| Share | Share2 | Default |
| Delete | Trash2 | `text-red-600` (destructive) |

### Sample Documents

| Name | Type | Size | Last Modified | Folder |
|------|------|------|---------------|--------|
| Project Proposal.pdf | PDF | 2.4 MB | 2 hours ago | Projects |
| User Research Data.xlsx | Excel | 1.8 MB | 1 day ago | Research |
| Design Mockups.sketch | Sketch | 15.2 MB | 3 days ago | Design |
| Meeting Notes.docx | Word | 0.8 MB | 1 week ago | Meetings |
| Budget Report.pdf | PDF | 3.1 MB | 2 weeks ago | Finance |

---

## Responsiveness

- On small screens the toolbar row stacks vertically (search on top, upload button below).
- The sidebar and document list stack to a single column below the `lg` breakpoint.

---

## Dependencies

- `shadcn/ui` — Card, Button, Badge, Input, Separator, DropdownMenu
- `lucide-react` — FileText, Folder, Search, MoreHorizontal, Download, Trash2, Share2
