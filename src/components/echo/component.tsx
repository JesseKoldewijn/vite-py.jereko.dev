import { computed } from "@preact/signals";
import { echoComponentLogic } from "./logic";

export const Echo = () => {
	const logic = echoComponentLogic();
	const { message, echoResponse, inputRef, updateMessage, fetchEcho } = logic;

	const isEnabled = computed(
		() => (inputRef.current?.value?.length ?? 0) > 0
	);

	return (
		<div class="flex flex-col gap-2 p-2 w-full max-w-md">
			<h1 class="text-center font-bold">Echo</h1>
			<div>
				<span>Input: {message}</span>
				<br />
				<span>Echo: {echoResponse}</span>
			</div>
			<form onSubmit={fetchEcho} class="flex flex-col gap-2">
				<input
					type="text"
					ref={inputRef}
					onKeyUp={updateMessage}
					onKeyDown={updateMessage}
					onChange={updateMessage}
					placeholder="Type something..."
					class="border rounded-md px-2 py-1"
				/>
				<button
					type="submit"
					class="border rounded-md py-1 px-2 cursor-pointe"
					disabled={isEnabled}
				>
					Echo
				</button>
			</form>
		</div>
	);
};
