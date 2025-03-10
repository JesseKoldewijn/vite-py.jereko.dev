import { render } from "preact";
import { App } from "./_app.tsx";

import "./styles/tailwind.css";

render(<App />, document.getElementById("app")!);
