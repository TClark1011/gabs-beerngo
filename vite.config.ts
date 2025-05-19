import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		TanStackRouterVite({
			generatedRouteTree: "src/generated/route-tree.gen.ts",
		}) as any,
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "GABs Beerngo",
				short_name: "Beerngo",
				description: "Play some Beerngo with your buds",
				background_color: "#1A202C",
				theme_color: "#1A202C",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
