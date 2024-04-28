export const NUM_GUESSES = 6
export const CALC_LENGTH = 6

export const numbers = Array.from({ length: 10 }, (_, i) => i.toString())
export const operators = ["+", "-", "*", "/"]
export const authorizedControls = ["enter", "delete", "backspace"]

export enum Status {
	Correct = "correct",
	Incorrect = "incorrect",
	Misplaced = "misplaced",
}

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
	}
	return `bg-gray-500 ${animation}`
}

/**
 * Helper to get the correct Guess at current guess index
 */
export const getGuess = (
	guess: string,
	i: number,
	currentGuessIndex: number,
	currentGuess: string,
) => (i === currentGuessIndex ? currentGuess : guess ?? "").padEnd(CALC_LENGTH)

/**
 * Check if arrays equal
 * => in roder to accept cumulative solutions (e.g. 1+5*15 === 15*5+1)
 *
 * example:
 * ['1', '+', '5', '*', '15'] (5) ['5', '*', '15', '+', '1']
 */
export const areArraysEqual = (arr1: string[], arr2: string[]) =>
	arr1.length === arr2.length &&
	arr1.every((value, index) => value === arr2[index])
