import React, { createContext, useContext } from "react"

const NUM_GUESSES = 6

export interface StateType {
	guesses: string[]
	currentGuess: string
	solution: number | null
	calculation: string | null
	hasWon: boolean
	handleControlClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type ActionType =
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

export const useGame = () => useContext(GameContext)
