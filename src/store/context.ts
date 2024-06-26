import React, { createContext, useContext } from "react"
import { NUM_GUESSES } from "../utils"

export interface StateType {
	guesses: string[]
	currentGuess: string
	solution: number | null
	calculation: string | null
	hasWon: boolean
	currentTileValue: string
	controlButtonStatuses: Map<string, string>
}

export type ActionType =
	| { type: "setGuesses"; value: string[] }
	| { type: "setCurrentGuess"; value: string }
	| { type: "setSolution"; value: number }
	| { type: "setCalculation"; value: string }
	| { type: "setHasWon"; value: boolean }
	| { type: "setCurrentTileValue"; value: string }
	| { type: "setControlButtonStatuses"; value: Map<string, string> }

export const initState: StateType = {
	guesses: Array(NUM_GUESSES).fill(""),
	currentGuess: "",
	solution: null,
	calculation: null,
	hasWon: false,
	currentTileValue: "",
	controlButtonStatuses: new Map<string, string>(),
}

export const GameContext = createContext<{
	state: StateType
	dispatch: React.Dispatch<ActionType>
}>({
	state: initState,
	dispatch: () => undefined,
})

export const useGame = () => useContext(GameContext)
