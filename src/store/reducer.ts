import { ActionType, StateType } from "./context"

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
