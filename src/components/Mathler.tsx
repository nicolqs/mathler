import { Transition } from "@tailwindui/react"
import { useEffect, useState } from "react"
import Board from "./Board"
import Instructions from "./Instructions"

const Mathler: React.FC = () => {
	const [canShow, setCanShow] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => setCanShow(true), 300)
	}, [])

	return (
		<main className="flex flex-col items-center ">
			<header className="m-5 text-3xl border-b-4 rounded-lg">
				<Transition
					show={canShow}
					enter="transition-opacity ease-linear duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
						MATHLER
					</h1>
				</Transition>
			</header>
			<Transition
				show={canShow}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="flex flex-col items-center gap-8">
					<Board />
					<Instructions />
				</div>
			</Transition>
		</main>
	)
}

export default Mathler
