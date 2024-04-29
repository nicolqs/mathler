import { numbers, operators } from "../utils"
import ControlButton from "./ControlButton"

function Controls() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-center">
				{numbers.map((n, i) => (
					<ControlButton key={i} text={n} className="rounded-lg" />
				))}
			</div>
			<div className="flex justify-between">
				<ControlButton text={"Enter"} className={"w-16"} />
				{operators.map((operator, i) => (
					<ControlButton
						key={i}
						text={operator}
						className={"w-12 rounded-lg"}
					/>
				))}
				<ControlButton text={"Delete"} className={"w-16 "} />
			</div>
		</div>
	)
}

export default Controls
