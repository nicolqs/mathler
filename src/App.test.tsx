import { render, screen } from "@testing-library/react"
import { describe } from "vitest"
import App from "./App"

describe("renders learn react link", () => {
	render(<App />)
	const linkElement = screen.getByText(/learn react/i)
	// expect(linkElement).toBeInTheDocument();
})
