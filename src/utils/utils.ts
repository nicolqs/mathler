export const isNumberOrOperator = (charCode: number, key: string) => {
	return (
		(key.length === 1 &&
			charCode >= "0".charCodeAt(0) &&
			charCode <= "9".charCodeAt(0)) ||
		charCode === "+".charCodeAt(0) ||
		charCode === "-".charCodeAt(0) ||
		charCode === "*".charCodeAt(0) ||
		charCode === "/".charCodeAt(0)
	)
}

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
