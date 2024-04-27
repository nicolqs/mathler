import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import Board from "./Board"

describe("Board", () => {
	beforeEach(() => {})

	it("shows title and text to be present", () => {
		render(<Board />)

		waitFor(() => expect(screen.queryByText("MATHLER")).toBeInTheDocument())
		waitFor(() =>
			expect(
				screen.queryByText("Find the hidden calculation that equals"),
			).toBeInTheDocument(),
		)
	})

	it("Controls to be present", () => {
		render(<Board />)

		waitFor(() => expect(screen.queryByText("enter")).toBeInTheDocument())
		waitFor(() => expect(screen.queryByText("delete")).toBeInTheDocument())
	})

	it("key press adds value to first tile", () => {
		render(<Board />)

		waitFor(() =>
			fireEvent.keyDown(screen.getByText(76), {
				key: "1",
				code: "1",
				charCode: 49,
			}),
		)

		waitFor(() => expect(screen.queryByText("1")).toBeInTheDocument())
	})
})
