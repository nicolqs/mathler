import { twMerge } from "tailwind-merge"

interface ControlButtonProps {
	text: string
	className?: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ text, className }) => {
	return (
		<button
			className={twMerge(
				"flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-gray-900 min-w-8 h-12",
				className,
			)}
		>
			{text}
		</button>
	)
}

export default ControlButton
