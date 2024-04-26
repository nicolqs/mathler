/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				flip: {
					"0%, 100%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(360deg)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
			},
			animation: {
				"flip-horizontally": "flip 0.5s ease-in-out forwards",
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
