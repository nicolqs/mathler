import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		alias: {},
		setupFiles: ["./src/setupTests.ts"],
		coverage: {
			// include: ["./src/**/*.{test,spec}.{mjs,cjs,ts,mts,cts,jsx,tsx}"],
			exclude: [...configDefaults.exclude, "./build/**", "./postcss.config.js"],
		},
	},
})
