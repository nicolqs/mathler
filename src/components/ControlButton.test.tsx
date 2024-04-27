import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import ControlButton from "./ControlButton"

// Mock the useGame hook
vi.mock("../store/context", () => ({
	useGame: vi.fn(() => ({
		state: {
			handleControlClick: vi.fn(),
		},
	})),
}))

describe("ControlButton", () => {
	it("renders correctly with required props", () => {
		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass("bg-slate-200 hover:bg-slate-300")
	})

	it("calls handleControlClick on click", () => {
		const mockHandleControlClick = vi.fn()

		// vi.mocked(useGame).mockReturnValue({
		// 	state: {
		// 		handleControlClick: mockHandleControlClick,
		// 	},
		// })

		render(<ControlButton text="Click me" />)
		const button = screen.getByRole("button", { name: "Click me" })
		fireEvent.click(button)
		expect(mockHandleControlClick).toHaveBeenCalledTimes(1)
	})

	it("applies additional className if provided", () => {
		render(<ControlButton text="Click me" className="text-xl" />)
		const button = screen.getByRole("button", { name: "Click me" })
		expect(button).toHaveClass("text-xl")
	})
})
