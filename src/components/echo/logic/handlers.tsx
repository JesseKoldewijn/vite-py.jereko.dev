import { RefObject } from "preact";
import { ResponseObject } from ".";
import { Signal } from "@preact/signals";
import { ReactNode } from "preact/compat";

export const updateEchoMessage =
	({
		inputRef,
		message,
	}: {
		inputRef: RefObject<HTMLInputElement>;
		message: Signal<string | undefined>;
	}) =>
	() => {
		const target = inputRef.current;
		if (!target) return;
		message.value = target.value;
	};

export const fetchEchoResponse =
	({
		inputRef,
		echoResponse,
	}: {
		inputRef: RefObject<HTMLInputElement>;
		echoResponse: Signal<ReactNode>;
	}) =>
	async (e: SubmitEvent) => {
		e.preventDefault();
		const response = await fetch("/api/echo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input: inputRef.current?.value }),
		});
		const data = (await response.json()) as ResponseObject;

		if (data.status === "error") {
			echoResponse.value = <span>{data.message}</span>;
		} else {
			echoResponse.value = <span>{data.body.input}</span>;
		}
	};
