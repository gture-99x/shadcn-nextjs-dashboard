"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { InboxFilter } from "./inbox-service";
import type { InboxMessage } from "./mock-data";
import * as inboxService from "./inbox-service";

const POLL_INTERVAL_MS = 30_000;

interface InboxContextValue {
	messages: InboxMessage[];
	unreadCount: number;
	filter: InboxFilter;
	setFilter: (filter: InboxFilter) => void;
	selectedIds: Set<string>;
	toggleSelect: (id: string) => void;
	toggleSelectAll: () => void;
	clearSelection: () => void;
	markAsRead: (id: string) => void;
	markAllAsRead: () => void;
	archiveMessage: (id: string) => void;
	deleteMessage: (id: string) => void;
	bulkMarkAsRead: () => void;
	bulkArchive: () => void;
	bulkDelete: () => void;
	refresh: () => void;
}

const InboxContext = createContext<InboxContextValue | null>(null);

export function InboxProvider({ children }: { children: React.ReactNode }) {
	const [filter, setFilterState] = useState<InboxFilter>("all");
	const [messages, setMessages] = useState<InboxMessage[]>(() =>
		inboxService.getMessages("all"),
	);
	const [unreadCount, setUnreadCount] = useState<number>(() =>
		inboxService.getUnreadCount(),
	);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const refresh = useCallback((currentFilter?: InboxFilter) => {
		const f = currentFilter ?? filter;
		setMessages(inboxService.getMessages(f));
		setUnreadCount(inboxService.getUnreadCount());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const setFilter = useCallback((f: InboxFilter) => {
		setFilterState(f);
		setSelectedIds(new Set());
		setMessages(inboxService.getMessages(f));
	}, []);

	// Poll unread count every 30 s to simulate real-time updates.
	useEffect(() => {
		const id = setInterval(() => {
			setUnreadCount(inboxService.getUnreadCount());
		}, POLL_INTERVAL_MS);
		return () => clearInterval(id);
	}, []);

	const toggleSelect = useCallback((id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}, []);

	const toggleSelectAll = useCallback(() => {
		setSelectedIds((prev) => {
			if (prev.size === messages.length) return new Set();
			return new Set(messages.map((m) => m.id));
		});
	}, [messages]);

	const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

	const markAsRead = useCallback(
		(id: string) => {
			inboxService.markAsRead(id);
			refresh();
		},
		[refresh],
	);

	const markAllAsRead = useCallback(() => {
		inboxService.markAllAsRead();
		setSelectedIds(new Set());
		refresh();
	}, [refresh]);

	const archiveMessage = useCallback(
		(id: string) => {
			inboxService.archiveMessage(id);
			setSelectedIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
			refresh();
		},
		[refresh],
	);

	const deleteMessage = useCallback(
		(id: string) => {
			inboxService.deleteMessage(id);
			setSelectedIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
			refresh();
		},
		[refresh],
	);

	const bulkMarkAsRead = useCallback(() => {
		inboxService.bulkMarkAsRead(Array.from(selectedIds));
		setSelectedIds(new Set());
		refresh();
	}, [selectedIds, refresh]);

	const bulkArchive = useCallback(() => {
		inboxService.bulkArchive(Array.from(selectedIds));
		setSelectedIds(new Set());
		refresh();
	}, [selectedIds, refresh]);

	const bulkDelete = useCallback(() => {
		inboxService.bulkDelete(Array.from(selectedIds));
		setSelectedIds(new Set());
		refresh();
	}, [selectedIds, refresh]);

	return (
		<InboxContext.Provider
			value={{
				messages,
				unreadCount,
				filter,
				setFilter,
				selectedIds,
				toggleSelect,
				toggleSelectAll,
				clearSelection,
				markAsRead,
				markAllAsRead,
				archiveMessage,
				deleteMessage,
				bulkMarkAsRead,
				bulkArchive,
				bulkDelete,
				refresh,
			}}
		>
			{children}
		</InboxContext.Provider>
	);
}

export function useInbox(): InboxContextValue {
	const ctx = useContext(InboxContext);
	if (!ctx) {
		throw new Error("useInbox must be used within an InboxProvider");
	}
	return ctx;
}
