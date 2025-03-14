import { Signal } from "@preact/signals";
import { RefObject } from "preact";
import { ReactNode } from "preact/compat";

export const getCookiesCount = () => {
	const cookies = document.cookie.split(";").map((cookie) => {
		const [key, value] = cookie.split("=");
		return { key: key.trim(), value };
	});
	return cookies.find((cookie) => cookie.key === "count");
};

export const fetchCountResponse =
	({
		buttonRef,
		countResponse,
	}: {
		buttonRef: RefObject<HTMLButtonElement>;
		countResponse: Signal<ReactNode>;
	}) =>
	async (e: any) => {
		e.preventDefault();
		if (!buttonRef.current) return;

		const cookieCount = getCookiesCount();

		const count = parseInt(
			cookieCount?.value ?? (buttonRef.current.dataset.count || "0")
		);
		const newCount = count + 1;
		countResponse.value = newCount.toString();

		const response = await fetch("/api/count", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input: count }),
		});

		if (!response.ok) {
			// rollback count
			const newCount = count - 1;
			countResponse.value = newCount.toString();
			buttonRef.current.dataset.count = countResponse.value;
			return;
		}

		countResponse.value = newCount.toString();
		buttonRef.current.dataset.count = countResponse.value;
	};
