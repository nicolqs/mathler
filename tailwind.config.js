/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			keyframes: {
				flip: {
					"0%, 100%": { transform: "rotateX(0deg)" },
					"100%": { transform: "rotateX(360deg)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
			},
			animation: {
				"flip-horizontally": "flip 2s ease-in-out forwards",
				wiggle: "wiggle 1s ease-in-out infinite",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				".preserve-3d": {
					transformStyle: "preserve-3d",
				},
			}
			addUtilities(newUtilities)
		},
	],
}
