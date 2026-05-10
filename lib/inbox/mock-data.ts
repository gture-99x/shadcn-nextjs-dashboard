export type MessageType = "system" | "direct";

export interface InboxMessage {
	id: string;
	type: MessageType;
	sender: string;
	senderEmail?: string;
	senderAvatar?: string;
	subject: string;
	preview: string;
	body: string;
	timestamp: string;
	read: boolean;
	archived: boolean;
}

export const MOCK_MESSAGES: InboxMessage[] = [
	{
		id: "msg-001",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "New task assigned to you",
		preview: "You have been assigned to the 'API Integration' task in Project Alpha.",
		body: `Hello,

You have been assigned a new task: "API Integration" in Project Alpha.

Task Details:
- Priority: High
- Due Date: May 20, 2026
- Assigned by: Jane Smith

Please review the task requirements and update the status accordingly.

Best,
The Platform Team`,
		timestamp: "2026-05-10T08:30:00Z",
		read: false,
		archived: false,
	},
	{
		id: "msg-002",
		type: "direct",
		sender: "Jane Smith",
		senderEmail: "jane.smith@example.com",
		subject: "Re: Q2 Report Review",
		preview: "I've reviewed the Q2 report draft and left some comments. Can we sync tomorrow?",
		body: `Hi,

I've gone through the Q2 report draft you shared. Overall it looks solid — just a few sections that need some clarification.

I left inline comments on the shared doc. The main areas to revisit:
1. Revenue projections on slide 7 — the numbers don't match the spreadsheet
2. Customer growth chart — missing data for March
3. Executive summary feels a bit long; let's trim it down

Can we sync tomorrow at 10am to go through these together?

Cheers,
Jane`,
		timestamp: "2026-05-10T07:15:00Z",
		read: false,
		archived: false,
	},
	{
		id: "msg-003",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "API key created successfully",
		preview: "A new API key 'Production Key v2' was created for your account.",
		body: `Hello,

A new API key has been created for your account.

Key Details:
- Name: Production Key v2
- Created: May 9, 2026 at 3:45 PM
- Permissions: Read, Write

If you did not create this key, please revoke it immediately from your Security settings and contact support.

Best,
The Security Team`,
		timestamp: "2026-05-09T15:45:00Z",
		read: false,
		archived: false,
	},
	{
		id: "msg-004",
		type: "direct",
		sender: "Bob Johnson",
		senderEmail: "bob.johnson@example.com",
		subject: "Files uploaded to shared drive",
		preview: "I've uploaded the design assets to the shared drive. Let me know if anything is missing.",
		body: `Hey,

I've finished uploading all the design assets to our shared drive. Here's what's included:

- Brand guidelines (PDF + source files)
- Logo variations (SVG, PNG @ 2x and 3x)
- Icon set (48 icons, Figma + SVG export)
- Color palette tokens (JSON + CSS variables)

The folder is organized by component. Let me know if anything is missing or if you need a different format.

Cheers,
Bob`,
		timestamp: "2026-05-09T11:20:00Z",
		read: true,
		archived: false,
	},
	{
		id: "msg-005",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "Unusual login activity detected",
		preview: "A login was detected from a new device in Singapore. Was this you?",
		body: `Security Alert,

We detected a login to your account from a new device or location.

Details:
- Date: May 8, 2026 at 11:02 PM
- Location: Singapore (approximate)
- Device: Chrome on Windows 11
- IP Address: 103.22.xxx.xxx

If this was you, no action is needed. If you don't recognize this activity, please change your password immediately and review your active sessions in Security settings.

Stay safe,
The Security Team`,
		timestamp: "2026-05-08T23:02:00Z",
		read: false,
		archived: false,
	},
	{
		id: "msg-006",
		type: "direct",
		sender: "Alice Brown",
		senderEmail: "alice.brown@example.com",
		subject: "Meeting notes from today's standup",
		preview: "Sharing the notes from today's standup. Action items are highlighted.",
		body: `Hi team,

Here are the notes from today's standup:

Attendees: Alice, Bob, Charlie, Jane

Updates:
- Alice: Completed user auth module, starting on dashboard widgets
- Bob: Design assets delivered, waiting on feedback
- Charlie: Found a bug in the payment flow — fix in progress, ETA EOD
- Jane: Q2 report review done, needs final approval

Action Items:
- [Alice] Set up staging environment by Friday
- [Charlie] Submit payment bug fix PR before EOD
- [Jane] Get sign-off on Q2 report from leadership

Next standup: Tomorrow 9:30 AM

Alice`,
		timestamp: "2026-05-08T10:00:00Z",
		read: true,
		archived: false,
	},
	{
		id: "msg-007",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "Your subscription renews in 7 days",
		preview: "Your Pro plan subscription is set to renew on May 17, 2026.",
		body: `Hello,

This is a reminder that your Pro plan subscription will automatically renew in 7 days.

Renewal Details:
- Plan: Pro
- Renewal Date: May 17, 2026
- Amount: $49/month
- Payment Method: Visa ending in 4242

To update your billing info or cancel, visit your Billing settings before the renewal date.

Thank you,
The Billing Team`,
		timestamp: "2026-05-07T09:00:00Z",
		read: true,
		archived: false,
	},
	{
		id: "msg-008",
		type: "direct",
		sender: "Charlie Wilson",
		senderEmail: "charlie.wilson@example.com",
		subject: "Payment bug fix — PR ready for review",
		preview: "Hey, I've raised the PR for the payment flow bug. Can you review it today?",
		body: `Hey,

I've submitted the fix for the payment flow bug we discussed in standup. The PR is up and ready for review.

PR Link: #247 — Fix: Race condition in checkout payment confirmation

What changed:
- Added mutex lock around the payment confirmation callback
- Increased timeout for payment gateway response to 15s
- Added retry logic (max 3 attempts) with exponential backoff
- Added unit tests covering the race condition scenario

I've tested it locally and on staging. Looks good. Let me know if you have any questions.

Charlie`,
		timestamp: "2026-05-08T17:30:00Z",
		read: false,
		archived: false,
	},
	{
		id: "msg-009",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "Weekly activity summary",
		preview: "Here's your activity summary for the week of May 4 – 10, 2026.",
		body: `Hello,

Here is your weekly activity summary for May 4 – 10, 2026:

Activity Overview:
- Tasks completed: 8
- Tasks in progress: 3
- Comments posted: 14
- Files uploaded: 6
- API calls made: 1,204

Top projects this week:
1. Project Alpha — 12 updates
2. Dashboard Redesign — 5 updates
3. API Integration — 3 updates

Keep up the great work!

The Platform Team`,
		timestamp: "2026-05-10T06:00:00Z",
		read: true,
		archived: false,
	},
	{
		id: "msg-010",
		type: "direct",
		sender: "Jane Smith",
		senderEmail: "jane.smith@example.com",
		subject: "Welcome to the team!",
		preview: "Just wanted to say welcome! Happy to have you on board.",
		body: `Hi,

Just wanted to send a quick note to say welcome to the team! We're really excited to have you on board.

Your onboarding checklist should have arrived separately — it covers everything from tool access to your first week schedule. Don't hesitate to reach out if you need anything or have questions.

We have a team lunch on Friday if you'd like to join — it's a great way to meet everyone in a relaxed setting.

Looking forward to working with you!

Jane`,
		timestamp: "2026-05-06T08:45:00Z",
		read: true,
		archived: true,
	},
	{
		id: "msg-011",
		type: "system",
		sender: "System",
		senderEmail: "noreply@platform.io",
		subject: "Password changed successfully",
		preview: "Your account password was changed on May 5, 2026.",
		body: `Hello,

Your account password was successfully changed on May 5, 2026 at 2:30 PM.

If you did not make this change, please contact support immediately and reset your password.

Best,
The Security Team`,
		timestamp: "2026-05-05T14:30:00Z",
		read: true,
		archived: true,
	},
	{
		id: "msg-012",
		type: "direct",
		sender: "Bob Johnson",
		senderEmail: "bob.johnson@example.com",
		subject: "Icon set revision — v2 ready",
		preview: "Updated the icon set based on your feedback. Thicker strokes and updated color tokens.",
		body: `Hey,

I've revised the icon set based on the feedback from last week's review.

What's new in v2:
- Stroke weight increased from 1.5px to 2px across all icons
- Updated color tokens to match the new brand palette
- Added 12 new icons: notification bell, inbox, archive, trash, filter, sort, drag handle, and 5 social icons
- Fixed inconsistent sizing on the arrow icons

Everything is in the same shared drive folder. The old v1 files are in an /archive subfolder.

Let me know if there are any more changes needed before we sign off.

Bob`,
		timestamp: "2026-05-07T14:00:00Z",
		read: true,
		archived: false,
	},
];
