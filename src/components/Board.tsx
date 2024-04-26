import { Transition } from "@tailwindui/react"
import { evaluate } from "mathjs"
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import puzzles from "../data/puzzles"
import { isNumberOrOperator } from "../utils/utils"
import Controls from "./Controls"
import GuessLine from "./GuessLine"

const NUM_GUESSES = 6
const CALC_LENGTH = 6

export interface Puzzle {
	solution: number
	calculation: string
}

const Board: React.FC = () => {
	// const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

	const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(""))
	const [currentGuess, setCurrentGuess] = useState<string>("")
	const [solution, setSolution] = useState<number | null>(null)
	const [calculation, setCalculation] = useState<string | null>(null)
	const [hasWon, setHasWon] = useState<boolean>(false)
	const [canShow, setCanShow] = useState<boolean>(false)
	const [showWarningMsg, setShowWarningMsg] = useState<boolean>(false)

	// Pick the daily Puzzle
	useEffect(() => {
		const dailyPuzzle = puzzles[0] //Math.floor(Math.random() * puzzles.length)]
		setSolution(dailyPuzzle.solution)
		setCalculation(dailyPuzzle.calculation)
		setTimeout(() => setCanShow(true), 800)
	}, [])

	useEffect(() => {
		if (solution === null) return

		const updateBoard = (keyboardEvent: KeyboardEvent) => {
			// setShowWarningMsg(false)

			// Game over if player has found the calculation or has already made NUM_GUESSES
			if (guesses.includes(calculation) || guesses[NUM_GUESSES - 1] !== "") {
				return
			}

			const charCode = keyboardEvent.key.toLowerCase().charCodeAt(0)
			setCurrentGuess((prevGuess) => {
				if (keyboardEvent.key == "Backspace") {
					return prevGuess.slice(0, -1)
				} else if (
					keyboardEvent.key == "Enter" &&
					prevGuess.length === CALC_LENGTH
				) {
					const result = evaluate(prevGuess)
					if (result != solution) {
						console.log(`Wrong calc ! Your guess is not equal to ${solution}`)
						setShowWarningMsg(true)
						return prevGuess
					} else if (result == solution) {
						console.log(calculation, prevGuess)
						// const regex = /\d+|\+|\-|\*|\//g
						const regex = /(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g

						const calcMatches = calculation?.match(regex) // 1+5*15
						const curGuessmatches = prevGuess.match(regex) ?? [] // 1+3*25

						console.log(calcMatches, curGuessmatches)

						if (calculation === prevGuess) {
							setHasWon(true)
						} else if (result !== solution) {
							console.log(`Good but Different to ${solution}`)
							setShowWarningMsg(true)
							// setTimeout(() => setShowWarningMsg(false), 3000)
							return prevGuess
						}
					}

					const currentGuessIndex = guesses.findIndex((guess) => guess === "")
					const guessesClone = [...guesses]
					guessesClone[currentGuessIndex] = prevGuess
					setGuesses(guessesClone)
					return ""
				} else if (
					prevGuess.length < CALC_LENGTH &&
					isNumberOrOperator(charCode, keyboardEvent.key)
				) {
					return prevGuess + keyboardEvent.key.toLowerCase()
				}
				return prevGuess
			})
		}

		const onClickControlButton = (event: MouseEvent) => {
			console.log("clicked!", event?.target)
		}

		const onPressKey = (event: KeyboardEvent) => {
			updateBoard(event)
		}

		window.addEventListener("keydown", onPressKey)

		return () => {
			window.removeEventListener("keydown", onPressKey)
		}
	}, [guesses, solution])

	const currentGuessIndex = guesses.findIndex((guess) => guess === "")

	if (calculation == null) return null

	return (
		// <GameContext.Provider value={tasks}>
		<div className="flex flex-col items-center gap-1">
			<div className="">Find the hidden calculation that equals</div>
			<Transition
				show={canShow}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="text-3xl animate-pulse font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-3">
					{solution}
				</div>
			</Transition>
			{guesses.map((guess, i) => {
				return (
					<GuessLine
						key={i}
						guess={(i === currentGuessIndex
							? currentGuess
							: guess ?? ""
						).padEnd(CALC_LENGTH)}
						calculation={calculation}
						isFinal={currentGuessIndex > i || currentGuessIndex === -1}
						winningRow={i === currentGuessIndex - 1 && hasWon}
					/>
				)
			})}
			<Controls />
			<div
				className={twMerge(
					"flex flex-row text-md md:text-2xl text-red-600 text-center mt-4",
					showWarningMsg ? "block" : "hidden",
				)}
			>
				<p>Oh, snapp!</p>
				<p>{`Your guess is not equal to ${solution}`}</p>
				<p>Try again!</p>
			</div>
		</div>
		// </GameContext.Provider>
	)
}

export default Board
