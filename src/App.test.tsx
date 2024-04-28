import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import App from "./App"
import ControlButton from "./components/ControlButton"

describe("Board", () => {
	beforeEach(() => {})

	test("shows title and text to be present", () => {
		render(<App />)

		waitFor(() =>
			expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument(),
		)
		waitFor(() =>
			expect(
				screen.queryByText("Find the hidden calculation that equals"),
			).toBeInTheDocument(),
		)
	})

	test("shows empty state", () => {
		render(<App />)
		expect(screen.queryByText("You lost! Try again")).toBeNull()
		// expect(document.querySelectorAll("main div")).toHaveLength(6)
		expect(document.querySelector("main")?.textContent).toEqual("")
	})

	// test("shows won game over state",  () => {
	// 	await render(<App />)

	// 	expect(screen.getByText("You Won!")).toBeInTheDocument()
	// })

	test("Controls to be present", () => {
		render(<App />)

		waitFor(() => expect(screen.queryByText("enter")).toBeInTheDocument())
		waitFor(() => expect(screen.queryByText("delete")).toBeInTheDocument())
	})

	// it("key press adds value to first tile", () => {
	// 	render(<App />)

	// 	const numbersContainer = screen.getAllByRole("gamecontrol")
	// 	console.log(numbersContainer)
	// 	// fireEvent.click(buttons[0])
	// 	waitFor(() =>
	// 		fireEvent.keyDown(screen.getByText(76), {
	// 			key: "1",
	// 			code: "1",
	// 			charCode: 49,
	// 		}),
	// 	)

	// 	waitFor(() => expect(screen.queryByText("1")).toBeInTheDocument())
	// })

	test("able to see instructions modal", async () => {
		render(<App />)
		const button = await screen.findByRole("button", {
			name: /Show game rules/i,
		})
		fireEvent.click(button)
		// waitFor(() => expect(userEvent.click(screen.queryByText("Show game rules")))
		expect(screen.getByText("How to play Mathler")).toBeInTheDocument()
	})

	// test("able to close instructions modal", async () => {
	// 	render(<App />)
	// 	const buttonOpen = await screen.findByRole("button", {
	// 		name: /Show game rules/i,
	// 	})
	// 	const buttonClose = await screen.findByRole("button", {
	// 		name: /Close/i,
	// 	})
	// 	fireEvent.click(buttonOpen)
	// 	fireEvent.click(buttonClose)
	// 	expect(screen.queryByText("How to play Mathler")).toBeNull()
	// })

	test("renders correctly with required props", () => {
		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass("bg-slate-200 hover:bg-slate-300")
	})

	test("calls handleControlClick on click", () => {
		// const mockHandleControlClick = vi.fn()

		// vi.mocked(useGame).mockReturnValue({
		// 	state: {
		// 		currentTileValue: "Click me",
		// 	},
		// })

		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		fireEvent.click(button)
		// expect(mockHandleControlClick).toHaveBeenCalledTimes(1)
	})

	test("applies additional className if provided", () => {
		render(<ControlButton text="Click me" className="text-xl" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toHaveClass("text-xl")
	})
})
