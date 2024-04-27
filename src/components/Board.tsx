import { Transition } from "@tailwindui/react"
import { evaluate } from "mathjs"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import puzzles from "../data/puzzles"
import { useGame } from "../store/context"
import { isNumberOrOperator } from "../utils"
import Controls from "./Controls"
import GuessLine from "./GuessLine"

const NUM_GUESSES = 6
const CALC_LENGTH = 6

export interface Puzzle {
	solution: number
	calculation: string
}

const Board: React.FC = () => {
	const { state, dispatch } = useGame()
	const { guesses, currentGuess, solution, calculation, hasWon } = state

	const [showTransition, setShowTransition] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>("")

	// Pick the daily Puzzle
	useEffect(() => {
		const dailyPuzzle = puzzles[0] //Math.floor(Math.random() * puzzles.length)]
		dispatch({ type: "setSolution", value: dailyPuzzle.solution })
		dispatch({ type: "setCalculation", value: dailyPuzzle.calculation })

		setTimeout(() => setShowTransition(true), 800)
	}, [dispatch])

	useEffect(() => {
		if (solution === null || calculation === null) return

		const updateBoard = (
			keyboardEvent: KeyboardEvent | null,
			mouseEvent: React.MouseEvent<HTMLButtonElement> | null,
		) => {
			// To refactor and put it in Store
			let value
			if (keyboardEvent != null) {
				value = keyboardEvent.key
			} else if (mouseEvent != null) {
				value = mouseEvent.currentTarget.textContent || ""
				console.log(value)
			} else {
				return
			}
			// to refactor

			setErrorMsg("")

			// Game over if player has found the calculation or has already made NUM_GUESSES
			if (guesses.includes(calculation)) {
				return
			}
			if (guesses[NUM_GUESSES - 1] !== "") {
				setErrorMsg("You lost! Try again")
			}

			const charCode = value.toLowerCase().charCodeAt(0)

			if (["Backspace", "Delete"].includes(value)) {
				dispatch({ type: "setCurrentGuess", value: currentGuess.slice(0, -1) })
			} else if (value === "Enter" && currentGuess.length === CALC_LENGTH) {
				const result = evaluate(currentGuess)
				if (result !== solution) {
					console.log(`Wrong calc ! Your guess is not equal to ${solution}`)
					setErrorMsg(`Your guess is not equal to ${solution}`)
					return
				} else if (result === solution) {
					console.log(calculation, currentGuess)
					// const regex = /\d+|\+|\-|\*|\//g
					const regex = /(\d+\.?\d*|\+|\*|\/|\(|\))/g

					const calcMatches = calculation?.match(regex) // 1+5*15
					const curGuessmatches = currentGuess.match(regex) ?? [] // 1+3*25

					console.log(calcMatches, curGuessmatches)

					if (calculation === currentGuess) {
						dispatch({ type: "setHasWon", value: true })
					} else if (result !== solution) {
						console.log(`Good but Different to ${solution}`)
						setErrorMsg(`Good but diff`)
						// setTimeout(() => setErrorMsg(false), 3000)
						return
					}
				}

				const currentGuessIndex = guesses.findIndex((guess) => guess === "")
				const guessesClone = [...guesses]
				guessesClone[currentGuessIndex] = currentGuess
				dispatch({ type: "setGuesses", value: guessesClone })
				dispatch({ type: "setCurrentGuess", value: "" })
			} else if (
				currentGuess.length < CALC_LENGTH &&
				((keyboardEvent != null && isNumberOrOperator(charCode, value)) ||
					(mouseEvent != null && value))
			) {
				console.log("=>", currentGuess + value.toLowerCase())
				dispatch({
					type: "setCurrentGuess",
					value: currentGuess + value.toLowerCase(),
				})
			}
		}

		const onPressKey = (event: KeyboardEvent) => {
			updateBoard(event, null)
		}
		const handleControlClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			updateBoard(null, event)
		}
		dispatch({ type: "setHandleControlClick", value: handleControlClick })

		window.addEventListener("keydown", onPressKey)

		return () => {
			window.removeEventListener("keydown", onPressKey)
		}
	}, [guesses, solution, currentGuess, calculation, dispatch])

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
