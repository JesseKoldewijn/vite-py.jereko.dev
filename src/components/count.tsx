import { signal } from "@preact/signals";

export const Counter = () => {
	const countSignal = signal(0);

	const updateCount = () => {
		countSignal.value++;
	};

	return (
		<div>
			<h1>Count: {countSignal}</h1>
			<button onClick={updateCount}>Update</button>
		</div>
	);
};
