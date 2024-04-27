import { renderHook } from "@testing-library/react"
import { act, useReducer } from "react"
import { describe, expect, it } from "vitest"
import { initState } from "./context"
import { gameReducer } from "./reducer"

describe("useReducer for game state management", () => {
	it("updates guesses correctly when dispatching setGuesses", () => {
		const value = "1"
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [state, dispatch] = result.current

		const index = state.guesses.findIndex((g) => g === "")
		const newGuesses = [...state.guesses]
		newGuesses[index] = value

		// Dispatch an action to update guesses
		act(() => {
			dispatch({ type: "setGuesses", value: newGuesses })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the guesses to be updated to the new value
		expect(updatedState.guesses).toEqual(newGuesses)
	})

	it("updates currentGuess correctly when dispatching setCurrentGuess", () => {
		const guessValue = "1+3*15"
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [_, dispatch] = result.current

		// Dispatch an action to update currentGuess
		act(() => {
			dispatch({ type: "setCurrentGuess", value: guessValue })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the currentGuess to be updated to the new value
		expect(updatedState.currentGuess).toEqual(guessValue)
	})

	it("updates solution correctly when dispatching setSolution", () => {
		const solution = 76
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [_, dispatch] = result.current

		// Dispatch an action to update solution
		act(() => {
			dispatch({ type: "setSolution", value: solution })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the solution to be updated to the new value
		expect(updatedState.solution).toEqual(solution)
	})

	it("updates calculation correctly when dispatching setCalculation", () => {
		const calculation = "1+3*15"
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [_, dispatch] = result.current

		// Dispatch an action to update calculation
		act(() => {
			dispatch({ type: "setCalculation", value: calculation })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the calculation to be updated to the new value
		expect(updatedState.calculation).toEqual(calculation)
	})

	it("updates hasWon correctly when dispatching setHasWon", () => {
		const hasWon = true
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [_, dispatch] = result.current

		// Dispatch an action to update hasWon
		act(() => {
			dispatch({ type: "setHasWon", value: hasWon })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the hasWon to be updated to the new value
		expect(updatedState.hasWon).toEqual(hasWon)
	})

	it("updates currentTileValue correctly when dispatching setCurrentTileValue", () => {
		const currentTileValue = "*"
		const { result } = renderHook(() => useReducer(gameReducer, initState))
		const [_, dispatch] = result.current

		// Dispatch an action to update currentTileValue
		act(() => {
			dispatch({ type: "setCurrentTileValue", value: currentTileValue })
		})

		// Re-check the destructured state after the update
		const [updatedState] = result.current

		// Expect the currentTileValue to be updated to the new value
		expect(updatedState.currentTileValue).toEqual(currentTileValue)
	})
})
