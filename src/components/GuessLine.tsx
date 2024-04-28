import { memo } from "react"
import { twMerge } from "tailwind-merge"
import { getCellStyle } from "../utils"

interface GuessLineProps {
	guess: string
	calculation: string
	isFinal: boolean
	isWinningRow: boolean
	row: number
}

const GuessLine: React.FC<GuessLineProps> = ({
	guess,
	calculation,
	isFinal,
	isWinningRow,
	row,
}) => {
	const winingRowStyle =
		"border-green-500 transition-border ease-linear duration-900 border-2 rounded animate-pulse p-2"
	const animationStyle =
		"transition ease-in border-black animate-[wiggle_1s_ease-in-out_infinite] border-sky-400"

	return (
		<div
			className={twMerge(
				"flex justify-center gap-1 ",
				isWinningRow ? winingRowStyle : "",
			)}
		>
			{guess.split("").map((char: string, i: number) => {
				const cellStyle = isFinal
					? getCellStyle(char, i, calculation, isWinningRow)
					: ""
				const animationClass = char !== " " && !isFinal ? animationStyle : ""

				return (
					<div
						key={i}
						className={twMerge(
							"w-14 h-14 border-solid border-2 flex items-center justify-center font-bold rounded",
							cellStyle,
							animationClass,
						)}
						data-testid={`number-box-${row}-${i}`}
					>
						{char}
					</div>
				)
			})}
		</div>
	)
}

export default memo(GuessLine)
