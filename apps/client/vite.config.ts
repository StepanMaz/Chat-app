import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import http from "http";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			"/socket.io": {
				target: "ws://localhost:3000",
				changeOrigin: true,
				secure: false,
				ws: true,
				agent: new http.Agent(),
			},
		},
	},
});
