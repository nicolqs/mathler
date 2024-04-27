import { twMerge } from "tailwind-merge"
import { useGame } from "../store/context"

interface ControlButtonProps {
	text: string
	className?: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ text, className }) => {
	const { state } = useGame()
	const { handleControlClick } = state

	return (
		<button
			className={twMerge(
				"flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 text-gray-900 min-w-8 h-12",
				className,
			)}
			onClick={handleControlClick}
		>
			{text}
		</button>
	)
}

export default ControlButton
