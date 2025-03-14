import { signal } from "@preact/signals";
import { ReactNode } from "preact/compat";
import { useRef } from "preact/hooks";
import { fetchCountResponse, getCookiesCount } from "./handlers";

export interface InputObject {
	count: string;
}

export interface ResponseObject {
	body: InputObject;
	status: "success" | "error";
	message?: string;
}

export const countComponentLogic = () => {
	const cookieCount = getCookiesCount();

	const buttonRef = useRef<HTMLButtonElement>(null);

	const message = signal<string | null>(null);
	const countResponse = signal<ReactNode>(cookieCount?.value ?? null);

	return {
		buttonRef,
		message,
		countResponse,
		fetchCount: fetchCountResponse({
			buttonRef,
			countResponse,
		}),
	};
};
