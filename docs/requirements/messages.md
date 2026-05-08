# Messages

## Overview

The Messages page provides a two-panel chat interface: a conversation list on the left and an active chat window on the right. Users can browse conversations, view messages, and compose new messages.

**Route:** `/dashboard/messages`  
**File:** `app/(dashboard)/dashboard/messages/page.tsx`

---

## Page Header

- Title: "Messages"
- Subtitle: "Chat with your team and clients."

---

## Layout

The page uses a 3-column grid on large screens:
- **Left panel** (`lg:col-span-1`): Conversation list
- **Right panel** (`lg:col-span-2`): Active chat area

Both panels stack vertically on smaller screens.

---

## Conversation List (Left Panel)

### Search
- Input with a `Search` icon — placeholder: "Search conversations..."

### Conversation Items

Each conversation shows:
| Element | Detail |
|---------|--------|
| Avatar | User photo with initials fallback |
| Online indicator | Green dot overlay on avatar when `online: true` |
| Name | Conversation partner's full name |
| Last message | Truncated preview of the most recent message |
| Timestamp | Relative time (e.g., "2 min ago", "1 hour ago") |
| Unread badge | Circular badge showing unread count; hidden when count is 0 |

**Hover state:** Background changes to `gray-50` on hover; cursor is pointer.

### Sample Conversations

| Name | Last Message | Time | Unread | Online |
|------|-------------|------|--------|--------|
| John Doe | Hey, how's the project going? | 2 min ago | 2 | Yes |
| Jane Smith | Can we schedule a meeting? | 1 hour ago | 0 | No |
| Bob Johnson | The files have been uploaded | 3 hours ago | 1 | Yes |

---

## Active Chat Window (Right Panel)

### Chat Header
- Avatar + name + online status of the active contact
- Action buttons: `Phone`, `Video`, `MoreHorizontal` (ghost icon buttons)

### Message Thread
- Scrollable message area (400px fixed height)
- Messages alternate between sender and receiver alignment:
  - **Own messages** — right-aligned, blue background (`bg-blue-500 text-white`)
  - **Received messages** — left-aligned, gray background (`bg-gray-100 text-gray-900`)
- Each bubble shows message text and a timestamp below it

### Sample Messages

| Sender | Message | Time | Own |
|--------|---------|------|-----|
| John Doe | Hey, how's the project going? | 2:30 PM | No |
| You | It's going well! We're on track to finish by Friday. | 2:32 PM | Yes |
| John Doe | That's great to hear! Can you send me the latest updates? | 2:33 PM | No |

### Message Composer
Located at the bottom of the chat panel, separated by a top border:
- **Paperclip** icon button — attach files
- **Text input** — placeholder: "Type a message..."
- **Smile** icon button — emoji picker
- **Send** icon button — submits the message

---

## Dependencies

- `shadcn/ui` — Card, Button, Input, Avatar, Badge
- `lucide-react` — Search, Send, MoreHorizontal, Phone, Video, Paperclip, Smile
