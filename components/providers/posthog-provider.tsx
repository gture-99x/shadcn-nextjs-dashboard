"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
		if (!key || typeof window === "undefined") return;
		if (posthog.__loaded) return;
		posthog.init(key, {
			api_host:
				process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
			capture_pageview: false,
			capture_pageleave: true,
			person_profiles: "identified_only",
		});
	}, []);

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PageviewTracker() {
	const pathname = usePathname();
	const search = useSearchParams();

	useEffect(() => {
		if (!pathname || typeof window === "undefined") return;
		if (!posthog.__loaded) return;
		const query = search?.toString();
		const url = pathname + (query ? `?${query}` : "");
		posthog.capture("$pageview", {
			$current_url: window.location.origin + url,
		});
	}, [pathname, search]);

	return null;
}
