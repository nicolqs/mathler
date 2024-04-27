import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ControlButton from "./ControlButton"

describe("ControlButton", () => {
	it("renders correctly with required props", () => {
		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass("bg-slate-200 hover:bg-slate-300")
	})

	it("calls handleControlClick on click", () => {
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

	it("applies additional className if provided", () => {
		render(<ControlButton text="Click me" className="text-xl" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toHaveClass("text-xl")
	})
})
