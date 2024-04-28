import { useEffect, useReducer, useState } from "react"
import { GameContext, initState } from "../store/context"
import { gameReducer } from "../store/reducer"
import Board from "./Board"
import Controls from "./Controls"
import Instructions from "./Instructions"

const Mathler: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initState)
	// eslint-disable-next-line
	const [showGame, setShowGame] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => setShowGame(true), 300)
	}, [])

	return (
		<GameContext.Provider value={{ state, dispatch }}>
			<main className="flex flex-col items-center ">
				<header className="m-4 text-3xl border-b-4 rounded-lg">
					<h1 className="fade-in-scale title-fade-in text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
						MATHLER
					</h1>
				</header>
				<div className="flex flex-col items-center gap-3 fade-in-scale game-fade-in">
					<Board />
					<Controls />
				</div>
				<Instructions />
			</main>
		</GameContext.Provider>
	)
}

export default Mathler
