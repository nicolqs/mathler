import { twMerge } from "tailwind-merge"
import { useGame } from "../store/context"
import { Status, isValidTileValue } from "../utils"

interface ControlButtonProps {
	text: string
	className?: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ text, className }) => {
	const { state, dispatch } = useGame()

	// Mouse event handler for game button click
	const handleGameButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		const value = event.currentTarget.textContent?.toLowerCase()
		if (value && isValidTileValue(value)) {
			dispatch({ type: "setCurrentTileValue", value: value })
		}
	}

	const getButtonBackground = (): string => {
		if (!state.controlButtonStatuses) return ""

		const status = state.controlButtonStatuses.get(text)
		switch (status) {
			case Status.Correct:
				return "bg-green-500"
			case Status.Incorrect:
				return "bg-gray-500"
			case Status.Misplaced:
				return "bg-yellow-500"
			default:
				return "bg-slate-200"
		}
	}

	return (
		<button
			className={twMerge(
				"flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 text-gray-900 min-w-8 h-12",
				className,
				getButtonBackground(),
			)}
			onClick={handleGameButtonClick}
			data-testid={`control-button-${text}`}
		>
			{text}
		</button>
	)
}

export default ControlButton
