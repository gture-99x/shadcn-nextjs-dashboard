"use client";

import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import {
	Archive,
	Bell,
	CheckCheck,
	Inbox,
	MailOpen,
	MessageSquare,
	Pencil,
	Reply,
	Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInbox } from "@/lib/inbox/inbox-context";
import { sendMessage } from "@/lib/inbox/inbox-service";
import type { InboxFilter } from "@/lib/inbox/inbox-service";
import type { InboxMessage } from "@/lib/inbox/mock-data";
import { cn } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function formatTimestamp(iso: string): string {
	const date = new Date(iso);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMins < 1) return "just now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) {
		return date.toLocaleDateString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" });
	}
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDetailTimestamp(iso: string): string {
	return new Date(iso).toLocaleString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}

// ─── Compose Dialog ───────────────────────────────────────────────────────────

interface ComposeDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSent: () => void;
}

function ComposeDialog({ open, onOpenChange, onSent }: ComposeDialogProps) {
	const [to, setTo] = useState("");
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [sending, setSending] = useState(false);

	const handleSend = () => {
		if (!to.trim() || !subject.trim() || !body.trim()) {
			toast.error("Please fill in all fields.");
			return;
		}
		setSending(true);
		setTimeout(() => {
			sendMessage({ to, subject, body });
			toast.success("Message sent successfully.");
			setTo("");
			setSubject("");
			setBody("");
			setSending(false);
			onOpenChange(false);
			onSent();
		}, 600);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Pencil className="h-4 w-4" />
						New Message
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-2">
					<div className="space-y-1.5">
						<Label htmlFor="compose-to">To</Label>
						<Input
							id="compose-to"
							placeholder="recipient@example.com"
							value={to}
							onChange={(e) => setTo(e.target.value)}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="compose-subject">Subject</Label>
						<Input
							id="compose-subject"
							placeholder="Message subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="compose-body">Message</Label>
						<Textarea
							id="compose-body"
							placeholder="Write your message..."
							className="min-h-32 resize-none"
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSend} disabled={sending}>
						{sending ? "Sending..." : "Send"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// ─── Message Row ──────────────────────────────────────────────────────────────

interface MessageRowProps {
	message: InboxMessage;
	isSelected: boolean;
	isActive: boolean;
	onSelect: () => void;
	onClick: () => void;
}

const MessageRow = memo(function MessageRow({
	message,
	isSelected,
	isActive,
	onSelect,
	onClick,
}: MessageRowProps) {
	return (
		<div
			className={cn(
				"group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b last:border-b-0",
				isActive
					? "bg-primary/5 border-l-2 border-l-primary"
					: "hover:bg-muted/50",
				!message.read && !isActive && "bg-blue-50/50 dark:bg-blue-950/20",
			)}
			onClick={onClick}
		>
			{/* Checkbox — stop propagation so clicking it doesn't open the message */}
			<div
				className="mt-1 flex-shrink-0"
				onClick={(e) => {
					e.stopPropagation();
					onSelect();
				}}
			>
				<Checkbox checked={isSelected} />
			</div>

			{/* Unread dot */}
			<div className="mt-2 flex-shrink-0 w-2">
				{!message.read && (
					<span className="block h-2 w-2 rounded-full bg-blue-500" />
				)}
			</div>

			{/* Avatar */}
			<Avatar className="h-9 w-9 flex-shrink-0 mt-0.5">
				<AvatarFallback
					className={cn(
						"text-xs font-semibold",
						message.type === "system"
							? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
							: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
					)}
				>
					{message.type === "system" ? <Bell className="h-4 w-4" /> : getInitials(message.sender)}
				</AvatarFallback>
			</Avatar>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between gap-2 mb-0.5">
					<span
						className={cn(
							"text-sm truncate",
							!message.read ? "font-semibold" : "font-medium text-muted-foreground",
						)}
					>
						{message.sender}
					</span>
					<span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
						{formatTimestamp(message.timestamp)}
					</span>
				</div>
				<p
					className={cn(
						"text-sm truncate",
						!message.read ? "text-foreground font-medium" : "text-muted-foreground",
					)}
				>
					{message.subject}
				</p>
				<p className="text-xs text-muted-foreground truncate mt-0.5">
					{message.preview}
				</p>
				<div className="mt-1.5">
					<Badge
						variant="outline"
						className={cn(
							"text-[10px] px-1.5 py-0 h-4",
							message.type === "system"
								? "border-violet-300 text-violet-600 dark:text-violet-400"
								: "border-emerald-300 text-emerald-600 dark:text-emerald-400",
						)}
					>
						{message.type === "system" ? "System" : "Direct"}
					</Badge>
				</div>
			</div>
		</div>
	);
});

// ─── Detail Panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
	message: InboxMessage | null;
	onArchive: (id: string) => void;
	onDelete: (id: string) => void;
}

function DetailPanel({ message, onArchive, onDelete }: DetailPanelProps) {
	const handleReply = () => {
		toast.success("Reply feature coming soon.");
	};

	if (!message) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
				<Inbox className="h-12 w-12 mb-4 opacity-30" />
				<p className="text-sm font-medium">No message selected</p>
				<p className="text-xs mt-1">Choose a message from the list to read it</p>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col min-h-0">
			{/* Detail header */}
			<div className="flex items-start justify-between gap-4 p-6 border-b">
				<div className="flex items-start gap-3 min-w-0">
					<Avatar className="h-10 w-10 flex-shrink-0">
						<AvatarFallback
							className={cn(
								"font-semibold",
								message.type === "system"
									? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
									: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
							)}
						>
							{message.type === "system" ? (
								<Bell className="h-5 w-5" />
							) : (
								getInitials(message.sender)
							)}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<h3 className="font-semibold text-base leading-tight">{message.subject}</h3>
						<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
							<span className="text-sm font-medium">{message.sender}</span>
							{message.senderEmail && (
								<span className="text-xs text-muted-foreground">
									&lt;{message.senderEmail}&gt;
								</span>
							)}
						</div>
						<p className="text-xs text-muted-foreground mt-0.5">
							{formatDetailTimestamp(message.timestamp)}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-1 flex-shrink-0">
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={() => {
							onArchive(message.id);
							toast.success("Message archived.");
						}}
						title="Archive"
					>
						<Archive className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
						onClick={() => {
							onDelete(message.id);
							toast.success("Message deleted.");
						}}
						title="Delete"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Body */}
			<div className="flex-1 overflow-y-auto p-6">
				<p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
					{message.body}
				</p>
			</div>

			{/* Footer actions */}
			{message.type === "direct" && (
				<div className="border-t p-4">
					<Button
						variant="outline"
						size="sm"
						className="flex items-center gap-2"
						onClick={handleReply}
					>
						<Reply className="h-4 w-4" />
						Reply
					</Button>
				</div>
			)}
		</div>
	);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MessagesPage() {
	const {
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
	} = useInbox();

	const [activeMessage, setActiveMessage] = useState<InboxMessage | null>(null);
	const [composeOpen, setComposeOpen] = useState(false);

	const handleRowClick = useCallback(
		(msg: InboxMessage) => {
			setActiveMessage(msg);
			if (!msg.read) markAsRead(msg.id);
		},
		[markAsRead],
	);

	const handleArchive = useCallback(
		(id: string) => {
			setActiveMessage((current) => (current?.id === id ? null : current));
			archiveMessage(id);
		},
		[archiveMessage],
	);

	const handleDelete = useCallback(
		(id: string) => {
			setActiveMessage((current) => (current?.id === id ? null : current));
			deleteMessage(id);
		},
		[deleteMessage],
	);

	const handleBulkArchive = () => {
		if (activeMessage && selectedIds.has(activeMessage.id)) setActiveMessage(null);
		bulkArchive();
		toast.success("Selected messages archived.");
	};

	const handleBulkDelete = () => {
		if (activeMessage && selectedIds.has(activeMessage.id)) setActiveMessage(null);
		bulkDelete();
		toast.success("Selected messages deleted.");
	};

	const handleBulkMarkAsRead = () => {
		bulkMarkAsRead();
		toast.success("Marked as read.");
	};

	const allSelected = messages.length > 0 && selectedIds.size === messages.length;
	const someSelected = selectedIds.size > 0;

	const tabCounts = {
		all: messages.length,
		unread: unreadCount,
	};

	return (
		<div className="space-y-4">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
					<p className="text-muted-foreground mt-1">
						{unreadCount > 0
							? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
							: "All caught up"}
					</p>
				</div>
				<Button
					className="flex items-center gap-2"
					onClick={() => setComposeOpen(true)}
				>
					<Pencil className="h-4 w-4" />
					Compose
				</Button>
			</div>

			{/* Inbox Panel */}
			<Card className="overflow-hidden">
				<div className="flex h-[calc(100vh-14rem)] min-h-[500px]">
					{/* Left — List */}
					<div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col border-r">
						{/* Toolbar */}
						<div className="flex items-center justify-between gap-2 px-4 py-3 border-b">
							<div className="flex items-center gap-2">
								<Checkbox
									checked={allSelected}
									onCheckedChange={toggleSelectAll}
									aria-label="Select all"
								/>
								{someSelected ? (
									<span className="text-xs text-muted-foreground">
										{selectedIds.size} selected
									</span>
								) : (
									<Tabs
										value={filter}
										onValueChange={(v) => {
											setFilter(v as InboxFilter);
											setActiveMessage(null);
										}}
									>
										<TabsList className="h-8">
											<TabsTrigger value="all" className="text-xs px-3 h-6">
												All
												{tabCounts.all > 0 && (
													<span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-medium">
														{tabCounts.all}
													</span>
												)}
											</TabsTrigger>
											<TabsTrigger value="unread" className="text-xs px-3 h-6">
												Unread
												{tabCounts.unread > 0 && (
													<span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-medium">
														{tabCounts.unread}
													</span>
												)}
											</TabsTrigger>
											<TabsTrigger value="archived" className="text-xs px-3 h-6">
												Archived
											</TabsTrigger>
										</TabsList>
									</Tabs>
								)}
							</div>

							{/* Bulk actions */}
							{someSelected ? (
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7"
										title="Mark as read"
										onClick={handleBulkMarkAsRead}
									>
										<MailOpen className="h-3.5 w-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7"
										title="Archive"
										onClick={handleBulkArchive}
									>
										<Archive className="h-3.5 w-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
										title="Delete"
										onClick={handleBulkDelete}
									>
										<Trash2 className="h-3.5 w-3.5" />
									</Button>
									<Separator orientation="vertical" className="h-5 mx-1" />
									<Button
										variant="ghost"
										size="sm"
										className="h-7 text-xs"
										onClick={clearSelection}
									>
										Cancel
									</Button>
								</div>
							) : (
								filter !== "archived" && unreadCount > 0 && (
									<Button
										variant="ghost"
										size="sm"
										className="h-7 text-xs flex items-center gap-1.5"
										onClick={() => {
											markAllAsRead();
											toast.success("All messages marked as read.");
										}}
									>
										<CheckCheck className="h-3.5 w-3.5" />
										Mark all read
									</Button>
								)
							)}
						</div>

						{/* Message list */}
						<div className="flex-1 overflow-y-auto">
							{messages.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
									{filter === "archived" ? (
										<Archive className="h-10 w-10 mb-3 opacity-30" />
									) : filter === "unread" ? (
										<CheckCheck className="h-10 w-10 mb-3 opacity-30" />
									) : (
										<MessageSquare className="h-10 w-10 mb-3 opacity-30" />
									)}
									<p className="text-sm font-medium">
										{filter === "archived"
											? "No archived messages"
											: filter === "unread"
												? "No unread messages"
												: "Your inbox is empty"}
									</p>
								</div>
							) : (
								messages.map((msg) => (
									<MessageListItem
										key={msg.id}
										message={msg}
										isSelected={selectedIds.has(msg.id)}
										isActive={activeMessage?.id === msg.id}
										toggleSelect={toggleSelect}
										onRowClick={handleRowClick}
									/>
								))
							)}
						</div>
					</div>

					{/* Right — Detail */}
					<div className="hidden lg:flex flex-1 flex-col min-w-0">
						<DetailPanel
							message={activeMessage}
							onArchive={handleArchive}
							onDelete={handleDelete}
						/>
					</div>
				</div>
			</Card>

			{/* Compose Dialog */}
			<ComposeDialog
				open={composeOpen}
				onOpenChange={setComposeOpen}
				onSent={refresh}
			/>
		</div>
	);
}

// ─── Memoised list item wrapper ───────────────────────────────────────────────
// Wrapping the row in its own memoised component lets React skip re-rendering
// rows whose `isSelected` / `isActive` / `message` props didn't change. It also
// keeps the per-row callbacks stable across renders (they bind on `msg.id`),
// so `memo` actually short-circuits instead of getting a fresh closure on
// every parent render.

interface MessageListItemProps {
	message: InboxMessage;
	isSelected: boolean;
	isActive: boolean;
	toggleSelect: (id: string) => void;
	onRowClick: (msg: InboxMessage) => void;
}

const MessageListItem = memo(function MessageListItem({
	message,
	isSelected,
	isActive,
	toggleSelect,
	onRowClick,
}: MessageListItemProps) {
	const handleSelect = useCallback(
		() => toggleSelect(message.id),
		[toggleSelect, message.id],
	);
	const handleClick = useCallback(
		() => onRowClick(message),
		[onRowClick, message],
	);

	return (
		<MessageRow
			message={message}
			isSelected={isSelected}
			isActive={isActive}
			onSelect={handleSelect}
			onClick={handleClick}
		/>
	);
});
