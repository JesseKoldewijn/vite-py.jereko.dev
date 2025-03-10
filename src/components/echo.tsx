import { signal } from "@preact/signals";
import { ReactNode } from "preact/compat";
import { useRef } from "preact/hooks";

interface InputObject {
	input: string;
}

interface ResponseObject {
	body: InputObject;
	status: "success" | "error";
	message?: string;
}

export const Echo = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const message = signal<string>();
	const echoResponse = signal<ReactNode>(null);

	const updateMessage = () => {
		const target = inputRef.current;
		if (!target) return;
		message.value = target.value;
	};

	const fetchEcho = async (e: SubmitEvent) => {
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

	return (
		<div>
			<h1>Echo</h1>
			<div>
				<span>Input: {message}</span>
				<br />
				<span>Echo: {echoResponse}</span>
			</div>
			<form onSubmit={fetchEcho}>
				<input
					type="text"
					ref={inputRef}
					onKeyUp={updateMessage}
					onKeyDown={updateMessage}
					onChange={updateMessage}
					placeholder="Type something..."
				/>
				<button type="submit">Echo</button>
			</form>
		</div>
	);
};
