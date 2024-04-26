const NUM_GUESSES = 6

function reducer(state: any, action: any) {
	const { guesses, currentGuess, calculation } = state

	if (guesses.includes(calculation) || guesses[NUM_GUESSES - 1] !== "") {
		return
	}
}

export default reducer
