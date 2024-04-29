import { Transition } from "@tailwindui/react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import puzzles from "../data/puzzles"
import useBoardActions from "../hooks/useBoardActions"
import { useGame } from "../store/context"
import { NUM_GUESSES, getGuess, isValidTileValue } from "../utils"
import GuessLine from "./GuessLine"

function Board() {
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

	const [errorMsg, setErrorMsg] = useState<string>("")

	// Pick the daily Puzzle
	useEffect(() => {
		const dailyPuzzle = puzzles[0] //Math.floor(Math.random() * puzzles.length)]
		dispatch({ type: "setSolution", value: dailyPuzzle.solution })
		dispatch({ type: "setCalculation", value: dailyPuzzle.calculation })
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
	 * Main game logic. It manages the game lifecycle:
	 * - Win
	 * - Loss
	 * - Wrong guess
	 * - Any new game action (via keyboard or button)
	 */
	useEffect(() => {
		if (calculation === null) return

		// Won game
		if (guesses.includes(calculation)) {
			return
		}

		// Game over
		if (guesses[NUM_GUESSES - 1] !== "") {
			setErrorMsg(`The solution was ${calculation}`)
			return
		}

		if (currentTileValue === "enter") {
			// Process game on Enter key
			const currentGuessStatus = processEnterKey()
			if (currentGuessStatus === false) {
				setErrorMsg(`Your guess is not equal to ${solution}`)
			}
		} else {
			// Appends value if it's a valid character and under length limit
			appendValueIfNeeded()
		}

		if (currentTileValue !== "")
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
			<div className="text-3xl animate-pulse font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-2">
				{solution}
			</div>
			<Transition
				show={hasWon}
				enter="ease-out duration-[2000ms]"
				enterFrom="opacity-0 scale-90"
				enterTo="opacity-100 scale-100"
			>
				<div
					className="text-green-600 font-bold text-2xl mb-4"
					data-testid={"win-msg"}
				>
					🙌🏼 Congrats! You Won! 🙌🏼
				</div>
			</Transition>
			{guesses.map((guess, i) => {
				return (
					<GuessLine
						key={i}
						guess={getGuess(guess, i, currentGuessIndex, currentGuess)}
						calculation={calculation}
						isFinal={currentGuessIndex > i || currentGuessIndex === -1}
						isWinningRow={i === currentGuessIndex - 1 && hasWon}
						row={i}
					/>
				)
			})}
			<div
				className={twMerge(
					"text-md md:text-2xl font-bold text-center h-10 pt-2 text-red-600 transition-opacity duration-300 ease-linear",
					errorMsg ? "opacity-100" : "opacity-0",
				)}
				data-testid={"error-msg"}
			>
				{errorMsg}
			</div>
		</div>
	)
}

export default Board
