import posthog from "posthog-js";

export type AnalyticsProps = Record<string, unknown>;

export function track(event: string, props?: AnalyticsProps): void {
	if (typeof window === "undefined") return;
	if (!posthog.__loaded) return;
	posthog.capture(event, props);
}
