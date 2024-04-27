import React, { createContext, useContext } from "react"

const NUM_GUESSES = 6

type StateType = {
	guesses: string[]
	currentGuess: string
	solution: number | null
	calculation: string | null
	hasWon: boolean
	handleControlClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type ActionType =
	| { type: "setGuesses"; value: string[] }
	| { type: "setCurrentGuess"; value: string }
	| { type: "setSolution"; value: number }
	| { type: "setCalculation"; value: string }
	| { type: "setHasWon"; value: boolean }
	| {
			type: "setHandleControlClick"
			value: (event: React.MouseEvent<HTMLButtonElement>) => void
	  }

export const initState: StateType = {
	guesses: Array(NUM_GUESSES).fill(""),
	currentGuess: "",
	solution: null,
	calculation: null,
	hasWon: false,
}

export const GameContext = createContext<{
	state: StateType
	dispatch: React.Dispatch<ActionType>
}>({
	state: initState,
	dispatch: () => undefined,
})

// Reducer function
export const gameReducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case "setGuesses":
			return {
				...state,
				guesses: action.value,
			}
		case "setCurrentGuess":
			return {
				...state,
				currentGuess: action.value,
			}
		case "setSolution":
			return {
				...state,
				solution: action.value,
			}
		case "setCalculation":
			return {
				...state,
				calculation: action.value,
			}
		case "setHasWon":
			return {
				...state,
				hasWon: action.value,
			}
		case "setHandleControlClick":
			return {
				...state,
				handleControlClick: action.value,
			}
		default:
			return state
	}
}

export const useGame = () => useContext(GameContext)
