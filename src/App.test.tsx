import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import App from "./App"
import ControlButton from "./components/ControlButton"
import { CALC_LENGTH, NUM_GUESSES, numbers, operators } from "./utils"

describe("Board", () => {
	beforeEach(() => {})

	it("Tests keydown event updates board", async () => {
		const key = "2"
		render(<App />)

		const numberDiv = screen.getByTestId(`number-box-0-0`)
		await fireEvent.keyDown(numberDiv, {
			key,
			code: key,
			charCode: key.charCodeAt(0),
		})
		expect(numberDiv.textContent).toEqual(key)
	})

	it("Tests mouse click event updates board", async () => {
		const key = "5"
		render(<App />)

		await fireEvent(
			screen.getByTestId(`control-button-${key}`),
			new MouseEvent("click", { bubbles: true }),
		)

		const numberDiv = screen.getByTestId(`number-box-0-0`)
		expect(numberDiv.textContent).toEqual(key)
	})

	it("Shows title and text", async () => {
		render(<App />)

		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
		expect(
			screen.getByText("Find the hidden calculation that equals"),
		).toBeInTheDocument()
	})

	it("Shows empty state", () => {
		render(<App />)
		expect(screen.queryByText("The solution was 1+5*15")).toBeNull()
		expect(screen.queryByText("Congrats! You Won!")).toBeNull()
	})

	it("Checks all control buttons to be present", async () => {
		render(<App />)

		expect(screen.getByText("Enter")).toBeInTheDocument()
		expect(screen.getByText("Delete")).toBeInTheDocument()
		operators.map((op) => expect(screen.getByText(op)).toBeInTheDocument())
		numbers.map((number) =>
			expect(screen.getByText(number)).toBeInTheDocument(),
		)
	})

	it("Test error message and backspace key press", async () => {
		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Tests a series of number that are NOT equal to the solution
		 */
		const randomNums = ["1", "0", "3", "7", "4", "6"]
		randomNums.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(key)
		})
		fireEvent.keyDown(domEl, { key: "Enter" })

		expect(await screen.getByTestId("error-msg").textContent).toEqual(
			"Your guess is not equal to 76",
		)

		/**
		 * Hit Backspace all the way back to the 1st cell
		 */
		const backspaceArray = new Array(CALC_LENGTH).fill("backspace")
		backspaceArray.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = await screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(" ")
		})
	})

	it("Test correct solution with misplaced numbers", async () => {
		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Tests misplaced numbers . Will check "*" is misplaced
		 */
		const misplacedNums = ["1", "1", "*", "7", "-", "1"]
		misplacedNums.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(key)
		})
		fireEvent.keyDown(domEl, { key: "Enter" })

		const numberDiv = screen.getByTestId(`number-box-0-2`)
		expect(numberDiv.classList.contains("bg-yellow-500")).toBe(true)
	})

	it("Test error message bad math calculation", async () => {
		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Tests bad math calculation
		 */
		const badMath = ["1", "0", "3", "7", "-", "*"]
		badMath.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(key)
		})
		fireEvent.keyDown(domEl, { key: "Enter" })

		expect(await screen.getByTestId("error-msg").textContent).toEqual(
			"Your guess is not equal to 76",
		)

		/**
		 * Hit Backspace all the way back to the 1st cell
		 */
		const backspaceArray = new Array(CALC_LENGTH).fill("backspace")
		backspaceArray.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = await screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(" ")
		})
	})

	it("Shows winning state", async () => {
		// Audio play() function
		HTMLMediaElement.prototype.play = () => Promise.resolve()

		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Winning solution
		 */
		const winningNums = ["1", "+", "5", "*", "1", "5"]
		winningNums.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = await screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(key)
		})
		fireEvent.keyDown(domEl, { key: "Enter" })

		expect(await screen.getByTestId("win-msg").textContent).toEqual(
			"🙌🏼 Congrats! You Won! 🙌🏼",
		)
	})

	it("Shows winning with commutative solution", async () => {
		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Winning commutative solutions are accepted
		 * [1 + 5 * 1 5] => [5 * 1 5 + 1]
		 */
		const winningNums = ["5", "*", "1", "5", "+", "1"]
		winningNums.map(async (key, i) => {
			fireEvent.keyDown(domEl, { key, code: key, charCode: key.charCodeAt(0) })
			const numberDiv = await screen.getByTestId(`number-box-0-${i}`)
			expect(numberDiv.textContent).toEqual(key)
		})
		fireEvent.keyDown(domEl, { key: "Enter" })

		expect(await screen.getByTestId("win-msg").textContent).toEqual(
			"🙌🏼 Congrats! You Won! 🙌🏼",
		)
	})

	it("Shows lost state", async () => {
		render(<App />)
		const domEl = screen.getByText("MATHLER")

		/**
		 * Fill board with all wrong calculation but with the right solution
		 */
		const num_guesses = new Array(NUM_GUESSES).fill(null)
		num_guesses.map((_, row) => {
			const wrongCalcNums = ["1", "1", "*", "7", "-", "1"]
			wrongCalcNums.map(async (key, i) => {
				fireEvent.keyDown(domEl, {
					key,
					code: key,
					charCode: key.charCodeAt(0),
				})
				const numberDiv = await screen.getByTestId(`number-box-${row}-${i}`)
				expect(numberDiv.textContent).toEqual(key)
			})
			fireEvent.keyDown(domEl, { key: "Enter" })
		})

		// Check the last cell of last row is set
		expect(await screen.getByTestId("number-box-5-5").textContent).toEqual("1")

		// Check lost err msg
		expect(await screen.getByTestId("error-msg").textContent).toEqual(
			`The solution was 1+5*15`,
		)
	})

	it("able to see instructions modal", async () => {
		render(<App />)
		const button = await screen.findByRole("button", {
			name: /Show game rules/i,
		})
		fireEvent.click(button)
		expect(screen.getByText("How to play Mathler")).toBeInTheDocument()
	})

	it("ControlButton renders correctly with required props", () => {
		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass("hover:bg-slate-300")
	})

	it("ControlButton calls handleControlClick on click", () => {
		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		fireEvent.click(button)
	})

	it("ControlButton applies additional className if provided", () => {
		render(<ControlButton text="Click me" className="text-xl" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toHaveClass("text-xl")
	})
})
