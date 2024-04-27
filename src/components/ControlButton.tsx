import { twMerge } from "tailwind-merge"
import { useGame } from "../store/context"
import { isValidTileValue } from "../utils"

interface ControlButtonProps {
	text: string
	className?: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ text, className }) => {
	const { dispatch } = useGame()

	// Mouse event handler for game button click
	const handleGameButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		const value = event.currentTarget.textContent?.toLowerCase()
		if (value && isValidTileValue(value)) {
			dispatch({ type: "setCurrentTileValue", value: value })
		}
	}

	return (
		<button
			className={twMerge(
				"flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 text-gray-900 min-w-8 h-12",
				className,
			)}
			onClick={handleGameButtonClick}
		>
			{text}
		</button>
	)
}

export default ControlButton
