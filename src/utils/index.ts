export const NUM_GUESSES = 6
export const CALC_LENGTH = 6

export const numbers = Array.from({ length: 10 }, (_, i) => i.toString())
export const operators = ["+", "-", "*", "/"]
export const authorizedControls = ["enter", "delete", "backspace"]

/**
 * Check if current tile value is:
 * - a number
 * - an math operator
 * - an authorized control
 */
export const isValidTileValue = (value: string) => {
	const charCode = value.charCodeAt(0)
	return isNumberOrOperator(charCode) || authorizedControls.includes(value)
}

/**
 * Check if a charCode number is matching correct ASCII values
 */
export const isNumberOrOperator = (charCode: number) => {
	return (
		(charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0)) ||
		charCode === "+".charCodeAt(0) ||
		charCode === "-".charCodeAt(0) ||
		charCode === "*".charCodeAt(0) ||
		charCode === "/".charCodeAt(0)
	)
}

/**
 * Helper function to style each cell corresponding to their state
 */
export function getCellStyle(
	char: string,
	index: number,
	calculation: string,
	animateRow: boolean,
): string {
	const animation = animateRow ? "animate-flip-horizontally" : ""
	if (char === calculation[index]) {
		return `bg-green-500 ${animation}`
	} else if (calculation.includes(char)) {
		return `bg-yellow-500 ${animation}`
	} else {
		return `bg-gray-500 ${animation}`
	}
}
