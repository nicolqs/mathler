import { useReducer } from "react"
import { GameContext, initState } from "../store/context"
import { gameReducer } from "../store/reducer"
import Board from "./Board"
import Controls from "./Controls"
import Instructions from "./Instructions"

const Mathler: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initState)

	return (
		<GameContext.Provider value={{ state, dispatch }}>
			<main className="flex flex-col items-center ">
				<header className="fade-in-scale title-fade-in m-5 text-3xl border-b-4 rounded-lg">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
						MATHLER
					</h1>
				</header>
				<div className="flex flex-col items-center gap-8 fade-in-scale game-fade-in ">
					<Board />
					<Controls />
					<Instructions />
				</div>
			</main>
		</GameContext.Provider>
	)
}

export default Mathler
