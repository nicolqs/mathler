import { Transition } from "@tailwindui/react"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import puzzles from "../data/puzzles"
import useBoardActions from "../hooks/useBoardActions"
import { useGame } from "../store/context"
import { NUM_GUESSES, getGuess, isValidTileValue } from "../utils"
import Controls from "./Controls"
import GuessLine from "./GuessLine"

export interface Puzzle {
	solution: number
	calculation: string
}

const Board: React.FC = () => {
	const { state, dispatch } = useGame()
	const { appendValueIfNeeded, processEnterKey } = useBoardActions()
	const {
		guesses,
		currentGuess,
		solution,
		calculation,
		hasWon,
		currentTileValue,
	} = state

	const [showTransition, setShowTransition] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>("")

	// Pick the daily Puzzle
	useEffect(() => {
		const dailyPuzzle = puzzles[0] //Math.floor(Math.random() * puzzles.length)]
		dispatch({ type: "setSolution", value: dailyPuzzle.solution })
		dispatch({ type: "setCalculation", value: dailyPuzzle.calculation })

		setTimeout(() => setShowTransition(true), 800)
	}, [dispatch])

	/**
	 * Add listener for keydown event to call onKeyPress()
	 */
	useEffect(() => {
		const onKeyPress = (event: KeyboardEvent) => {
			const value = event.key.toLowerCase()
			if (value && isValidTileValue(value)) {
				dispatch({ type: "setCurrentTileValue", value })
			}
		}

		// Set up the event listener & clean up on unmount
		window.addEventListener("keydown", onKeyPress)
		return () => {
			window.removeEventListener("keydown", onKeyPress)
		}
	}, [dispatch])

	/**
	 * Handle the backspace / delete action
	 */
	useEffect(() => {
		if (["backspace", "delete"].includes(currentTileValue)) {
			setErrorMsg("")
			dispatch({ type: "setCurrentGuess", value: currentGuess.slice(0, -1) })
		}
	}, [currentTileValue, currentGuess, dispatch])

	/**
	 *
	 */
	useEffect(() => {
		if (calculation === null) return

		// Won game
		if (guesses.includes(calculation)) {
			return
		}

		// Game over
		if (guesses[NUM_GUESSES - 1] !== "") {
			setErrorMsg("You lost! Try again")
			return
		}

		if (currentTileValue === "enter") {
			const currentGuessStatus = processEnterKey()
			if (!currentGuessStatus) {
				setErrorMsg(`Your guess is not equal to ${solution}`)
			}
		} else {
			// Appends value if it's a valid character and under length limit
			appendValueIfNeeded(currentTileValue, currentGuess)
		}

		dispatch({ type: "setCurrentTileValue", value: "" })
	}, [
		guesses,
		solution,
		calculation,
		currentTileValue,
		currentGuess,
		dispatch,
		processEnterKey,
		appendValueIfNeeded,
	])

	const currentGuessIndex = guesses.findIndex((guess) => guess === "")

	if (calculation == null) return null

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="">Find the hidden calculation that equals</div>
			<Transition
				show={showTransition}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
			>
				<div className="text-3xl animate-pulse font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-3">
					{solution}
				</div>
			</Transition>
			{guesses.map((guess, i) => {
				return (
					<GuessLine
						key={i}
						guess={getGuess(guess, i, currentGuessIndex, currentGuess)}
						calculation={calculation}
						isFinal={currentGuessIndex > i || currentGuessIndex === -1}
						winningRow={i === currentGuessIndex - 1 && hasWon}
					/>
				)
			})}
			<div
				className={twMerge(
					"text-md md:text-2xl font-bold text-center h-10 pt-2 text-red-600 transition-opacity duration-300 ease-linear",
					errorMsg ? "opacity-100" : "opacity-0",
				)}
			>
				{errorMsg}
			</div>
			<Controls />
		</div>
	)
}

export default Board
