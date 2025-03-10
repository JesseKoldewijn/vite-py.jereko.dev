import { signal } from "@preact/signals";

export const Echo = () => {
	const message = signal<string>();

	const updateMessage = (e: Event) => {
		const target = e.target as HTMLInputElement;
		message.value = target.value;
	};

	return (
		<div>
			<h1>Echo: {message}</h1>
			<input
				type="text"
				onKeyUp={updateMessage}
				onKeyDown={updateMessage}
				onChange={updateMessage}
				placeholder="Type something..."
			/>
		</div>
	);
};
