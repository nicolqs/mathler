import ControlButton from "./ControlButton"

const numbers = Array.from({ length: 10 }, (_, i) => i.toString())
const operators = ["+", "-", "*", "/"]

const Controls: React.FC = () => {
	return (
		<div className="flex flex-col gap-2 mt-3">
			<div className="flex justify-center ">
				{numbers.map((n, i) => (
					<ControlButton key={i} text={n} className="bg-cyan-400 rounded-lg" />
				))}
			</div>
			<div className="flex justify-between ">
				<ControlButton text={"Enter"} className={"w-16"} />
				{operators.map((operator, i) => (
					<ControlButton
						key={i}
						text={operator}
						className={"w-12 bg-cyan-400 rounded-lg"}
					/>
				))}
				<ControlButton text={"Delete"} className={"w-16 "} />
			</div>
		</div>
	)
}

export default Controls
