import { Transition } from "@tailwindui/react"
import { evaluate } from "mathjs"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import puzzles from "../data/puzzles"
import { useGame } from "../store/context"
import {
	CALC_LENGTH,
	NUM_GUESSES,
	isNumberOrOperator,
	isValidTileValue,
} from "../utils"
import Controls from "./Controls"
import GuessLine from "./GuessLine"

export interface Puzzle {
	solution: number
	calculation: string
}

const Board: React.FC = () => {
	const { state, dispatch } = useGame()
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
	 * Handle the backspace / delete action
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

		if (currentTileValue === "enter" && currentGuess.length === CALC_LENGTH) {
			const result = evaluate(currentGuess)
			if (result !== solution) {
				setErrorMsg(`Your guess is not equal to ${solution}`)
				return
			} else if (result === solution) {
				const regex = /\d+|\+|\*|\//g

				const calcMatches = calculation.match(regex) ?? [] // 1+5*15
				const curGuessmatches = currentGuess.match(regex) ?? [] // 1+3*25
				const arr1 = [...calcMatches].sort()
				const arr2 = [...curGuessmatches].sort()

				if (calculation === currentGuess) {
					dispatch({ type: "setHasWon", value: true })
				} else if (arr1.every((v: string, i: number) => v === arr2[i])) {
					console.log(`Good but Different to ${solution}`)
					dispatch({ type: "setCalculation", value: currentGuess })
					dispatch({ type: "setHasWon", value: true })
				}
			}

			const currentGuessIndex = guesses.findIndex((guess) => guess === "")
			const guessesClone = [...guesses]
			guessesClone[currentGuessIndex] = currentGuess
			dispatch({ type: "setGuesses", value: guessesClone })
			dispatch({ type: "setCurrentGuess", value: "" })
		} else if (
			currentGuess.length < CALC_LENGTH &&
			isNumberOrOperator(currentTileValue.charCodeAt(0))
		) {
			dispatch({
				type: "setCurrentGuess",
				value: currentGuess + currentTileValue,
			})
		}
		dispatch({ type: "setCurrentTileValue", value: "" })
	}, [guesses, solution, calculation, currentTileValue, currentGuess, dispatch])

	const currentGuessIndex = guesses.findIndex((guess) => guess === "")

	if (calculation == null) return null

	const getGuess = (guess: string, i: number) =>
		(i === currentGuessIndex ? currentGuess : guess ?? "").padEnd(CALC_LENGTH)

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
						guess={getGuess(guess, i)}
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
