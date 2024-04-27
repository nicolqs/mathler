import { useState } from "react"
import GuessLine from "./GuessLine"

const Instructions: React.FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false)

	return (
		<div className="flex flex-col items-center">
			<button
				type="button"
				onClick={() => setShowModal(true)}
				className="text-white bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-64 mt-14"
			>
				Show game rules
			</button>
			{showModal && (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="w-auto my-6 mx-auto max-w-3xl">
							<div className="flex flex-col bg-white border-4 border-gray-100 rounded-xl min-w-[23em] max-w-xl p-4">
								{/*body*/}
								<div className="relative pt-3 px-6 flex-auto">
									<button
										className="absolute top-0 right-3 p-1 ml-auto bg-transparent border-0 text-black  text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
											×
										</span>
									</button>
									<p className="my-4 text-blueGray-500 text-md md:text-lg leading-relaxed">
										<h2 className="font-bold text-2xl mb-2 pb-2 mx-auto border-b border-solid border-blueGray-200">
											How to play Mathler
										</h2>
										<p className="mt-2 md:mt-4">
											Mathler is a math-based game inspired by Wordle. It
											requires you to use the operations +, -, *, and / as well
											as the digits 0-9 to create an equation that equals the
											answer given.
										</p>
										<p className="mt-2 md:mt-4">
											Unlike Wordle, you get the answer in advance.{" "}
										</p>
										<p className="font-bold mt-2 md:mt-4">
											Try to find the hidden calculation in 6 guesses!
										</p>
										<p className="mt-2 md:mt-4">
											After each guess, the color of the tiles will change to
											show how close you are to the solution.
										</p>
										<ul className="list-disc ml-5 mb-5">
											<li>Green are in the correct place.</li>
											<li>
												Yellow are in the solution, but in a different place.
											</li>
											<li>Gray are not in the solution.</li>
										</ul>
										<GuessLine
											guess={"1+3*25"}
											calculation={"1+5*35"}
											isFinal
											winningRow={false}
										/>
									</p>
									<div className="flex items-center justify-end pt-5 border-t border-solid border-blueGray-200 rounded-b">
										<button
											className="text-white bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 hover:bg-gradient-to-br rounded font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
											type="button"
											onClick={() => setShowModal(false)}
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}
		</div>
	)
}

export default Instructions
