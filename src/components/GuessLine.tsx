import { memo } from "react"
import { twMerge } from "tailwind-merge"
import { getCellStyle } from "../utils/utils"

interface GuessLineProps {
	guess: string
	calculation: string | null
	isFinal: boolean
	winningRow: boolean
}

const GuessLine: React.FC<GuessLineProps> = ({
	guess,
	calculation,
	isFinal,
	winningRow,
}) => {
	if (!calculation) return null

	return (
		<div
			className={twMerge(
				"flex justify-center gap-1 ",
				winningRow ? "border-green-500 border-2 rounded animate-pulse p-2" : 0,
			)}
		>
			{guess.split("").map((char: string, i: number) => {
				let cellStyle = isFinal
					? getCellStyle(char, i, calculation, winningRow)
					: ""
				let animate =
					char !== " " && !isFinal
						? "transition ease-in border-black animate-[wiggle_1s_ease-in-out_infinite] border-sky-400"
						: ""
				return (
					<div
						key={i}
						className={twMerge(
							"w-14 h-14 border-solid  border-2 flex items-center justify-center font-bold rounded",
							cellStyle,
							animate,
						)}
					>
						{char}
					</div>
				)
			})}
		</div>
	)
}

export default memo(GuessLine)