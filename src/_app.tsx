import { Counter } from "./components/count/component";
import { Echo } from "./components/echo/component";

export const App = () => {
	return (
		<div class="flex flex-col justify-center items-center">
			<Counter />
			<Echo />
		</div>
	);
};
