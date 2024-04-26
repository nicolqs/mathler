import React from "react"

interface TileProps {
	value: string
	status: "green" | "yellow" | "grey"
}

const Tile: React.FC<TileProps> = ({ value, status }) => {
	const statusClasses = {
		green: "bg-green-500",
		yellow: "bg-yellow-500",
		grey: "bg-gray-500",
	}

	return <div className={`p-4 ${statusClasses[status]}`}>{value}</div>
}

export default Tile
