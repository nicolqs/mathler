import { evaluate } from "mathjs"
import { useGame } from "../store/context"
import { CALC_LENGTH, areArraysEqual, isNumberOrOperator } from "../utils"

function useBoardActions() {
	const { state, dispatch } = useGame()
	const { guesses, currentGuess, solution, calculation, currentTileValue } =
		state

	const processEnterKey = () => {
		if (currentGuess.length !== CALC_LENGTH) return

		// Evaluate the actual current guess calculation
		const result = evaluate(currentGuess)
		if (result !== solution) {
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
		// Also works when user entered a valid sequence but in different order
		// eg.: 1+5*15 === 15*5+1
		if (
			calculation === currentGuess ||
			areArraysEqual(calcMatches.sort(), curGuessMatches.sort())
		) {
			dispatch({ type: "setHasWon", value: true })
			if (calculation !== currentGuess) {
				dispatch({ type: "setCalculation", value: currentGuess })
			}
		}

		updateGuesses()
	}

	const updateGuesses = () => {
		const index = guesses.findIndex((guess) => guess === "")
		if (index === -1) return // Return if no empty guess found

		const guessesClone = [...guesses]
		guessesClone[index] = currentGuess
		dispatch({ type: "setGuesses", value: guessesClone })
		dispatch({ type: "setCurrentGuess", value: "" })
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
