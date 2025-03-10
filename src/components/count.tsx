import { signal } from "@preact/signals";

export const Counter = () => {
	const countSignal = signal(0);

	const updateCount = () => {
		countSignal.value++;
	};

	return (
		<div class="flex flex-col gap-2 p-2 w-full max-w-md">
			<h1 class="text-center font-bold">Count</h1>
			<span>Current: {countSignal}</span>
			<button
				onClick={updateCount}
				class="border rounded-md py-1 px-2 cursor-pointer"
			>
				Update
			</button>
		</div>
	);
};
