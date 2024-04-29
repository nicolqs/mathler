import { evaluate } from "mathjs"
import sound from "../assets/sound.wav"
import { useGame } from "../store/context"
import {
	CALC_LENGTH,
	Status,
	areArraysEqual,
	isNumberOrOperator,
} from "../utils"

function useBoardActions() {
	const { state, dispatch } = useGame()
	const {
		guesses,
		currentGuess,
		solution,
		calculation,
		currentTileValue,
		controlButtonStatuses,
	} = state

	const processEnterKey = (): boolean | null => {
		if (currentGuess.length !== CALC_LENGTH) return null

		// Evaluate the actual current guess calculation
		try {
			const result = evaluate(currentGuess)
			if (result !== solution) return false
		} catch {
			return false
		}

		updateGameStatus()
		return true
	}

	const updateGameStatus = () => {
		if (calculation === null || solution === null) return

		const regex = /\d+|\+|\*|\//g
		const calcMatches = calculation.match(regex) ?? []
		const curGuessMatches = currentGuess.match(regex) ?? []

		// If user entered the correct & exact calculation
		// Commutative solutions are accepted:
		// eg.: 1+5*15 === 15*5+1
		if (
			calculation === currentGuess ||
			areArraysEqual(calcMatches.sort(), curGuessMatches.sort())
		) {
			dispatch({ type: "setHasWon", value: true })
			if (calculation !== currentGuess) {
				dispatch({ type: "setCalculation", value: currentGuess })
			}

			// Play winning sound!
			playWinSound()
		}

		updateGuesses()
	}

	const playWinSound = () => {
		new Audio(sound).play()
	}

	const updateGuesses = () => {
		const index = guesses.findIndex((guess) => guess === "")
		if (index === -1) return // Return if no empty guess found

		const guessesClone = [...guesses]
		guessesClone[index] = currentGuess
		dispatch({ type: "setGuesses", value: guessesClone })
		dispatch({ type: "setCurrentGuess", value: "" })

		updateControlButtonStatuses()
	}

	const updateControlButtonStatuses = () => {
		currentGuess.split("").map((char, i) => {
			if (!calculation?.includes(char)) {
				controlButtonStatuses.set(char, Status.Incorrect)
				return null
			}

			// Don't update a correct button
			if (controlButtonStatuses.get(char) === Status.Correct) return null

			const status = calculation[i] === char ? Status.Correct : Status.Misplaced
			controlButtonStatuses.set(char, status)
			return null
		})
	}

	const appendValueIfNeeded = () => {
		if (
			currentGuess.length < CALC_LENGTH &&
			isNumberOrOperator(currentTileValue.charCodeAt(0))
		) {
			dispatch({
				type: "setCurrentGuess",
				value: currentGuess + currentTileValue,
			})
		}
	}

	return {
		appendValueIfNeeded,
		processEnterKey,
	}
}

export default useBoardActions
