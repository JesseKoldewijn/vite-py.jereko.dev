import { computed } from "@preact/signals";
import { countComponentLogic } from "./logic";

export const Counter = () => {
	const logic = countComponentLogic();
	const { message, countResponse, buttonRef, fetchCount } = logic;

	const hasMessage = computed(() => {
		return (
			message.value !== null &&
			message.value !== undefined &&
			message.value !== ""
		);
	});

	return (
		<div class="flex flex-col gap-2 p-2 w-full max-w-md">
			<h1 class="text-center font-bold">Count</h1>
			<span>Response: {countResponse}</span>
			{hasMessage ? <span>{message}</span> : null}
			<button
				onClick={fetchCount}
				class="border rounded-md py-1 px-2 cursor-pointer"
				ref={buttonRef}
				data-count={countResponse.value}
			>
				Update
			</button>
		</div>
	);
};
