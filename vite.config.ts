import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const apiTarget =
	process.env.NODE_ENV === "development"
		? "http://127.0.0.1:5328/api"
		: "/api";

// https://vite.dev/config/
export default defineConfig({
	plugins: [preact()],
	server: {
		proxy: {
			"/api": {
				target: apiTarget,
				changeOrigin: true,
				rewrite: (path) => {
					console.log("path", {
						path,
						totalPath: path.replace(/^\/api/, apiTarget),
					});
					return path.replace(/^\/api/, "");
				},
			},
		},
	},
});
