import { signal } from "@preact/signals";
import { ReactNode } from "preact/compat";
import { useRef } from "preact/hooks";
import { fetchEchoResponse, updateEchoMessage } from "./handlers";

export interface InputObject {
	input: string;
}

export interface ResponseObject {
	body: InputObject;
	status: "success" | "error";
	message?: string;
}

export const echoComponentLogic = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const message = signal<string>();
	const echoResponse = signal<ReactNode>(null);

	return {
		inputRef,
		message,
		echoResponse,
		updateMessage: updateEchoMessage({
			inputRef,
			message,
		}),
		fetchEcho: fetchEchoResponse({
			inputRef,
			echoResponse,
		}),
	};
};
