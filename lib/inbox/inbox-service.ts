/**
 * Inbox Service Layer
 *
 * All inbox data operations go through this module.
 * To swap from mock to real API, replace the implementations here —
 * all callers (InboxProvider, etc.) remain unchanged.
 */

import { MOCK_MESSAGES, type InboxMessage, type MessageType } from "./mock-data";

export type InboxFilter = "all" | "unread" | "archived";

// In-memory store seeded from mock data — acts as the "database" for this phase.
let store: InboxMessage[] = MOCK_MESSAGES.map((m) => ({ ...m }));

// ─── Queries ────────────────────────────────────────────────────────────────

export function getMessages(filter: InboxFilter = "all"): InboxMessage[] {
	let results: InboxMessage[];

	if (filter === "archived") {
		results = store.filter((m) => m.archived);
	} else if (filter === "unread") {
		results = store.filter((m) => !m.read && !m.archived);
	} else {
		results = store.filter((m) => !m.archived);
	}

	return results.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	);
}

export function getMessageById(id: string): InboxMessage | undefined {
	return store.find((m) => m.id === id);
}

export function getUnreadCount(): number {
	return store.filter((m) => !m.read && !m.archived).length;
}

// ─── Mutations ──────────────────────────────────────────────────────────────

export function markAsRead(id: string): void {
	const msg = store.find((m) => m.id === id);
	if (msg) msg.read = true;
}

export function markAllAsRead(): void {
	for (const msg of store) {
		if (!msg.archived) msg.read = true;
	}
}

export function archiveMessage(id: string): void {
	const msg = store.find((m) => m.id === id);
	if (msg) {
		msg.archived = true;
		msg.read = true;
	}
}

export function deleteMessage(id: string): void {
	store = store.filter((m) => m.id !== id);
}

export function bulkArchive(ids: string[]): void {
	const idSet = new Set(ids);
	for (const msg of store) {
		if (idSet.has(msg.id)) {
			msg.archived = true;
			msg.read = true;
		}
	}
}

export function bulkDelete(ids: string[]): void {
	const idSet = new Set(ids);
	store = store.filter((m) => !idSet.has(m.id));
}

export function bulkMarkAsRead(ids: string[]): void {
	const idSet = new Set(ids);
	for (const msg of store) {
		if (idSet.has(msg.id)) msg.read = true;
	}
}

// ─── Send (mock) ─────────────────────────────────────────────────────────────

export interface SendMessagePayload {
	to: string;
	subject: string;
	body: string;
}

export function sendMessage(payload: SendMessagePayload): InboxMessage {
	const newMsg: InboxMessage = {
		id: `msg-${Date.now()}`,
		type: "direct" as MessageType,
		sender: "You",
		senderEmail: "you@example.com",
		subject: payload.subject,
		preview: payload.body.slice(0, 80),
		body: payload.body,
		timestamp: new Date().toISOString(),
		read: true,
		archived: false,
	};
	store = [newMsg, ...store];
	return newMsg;
}
