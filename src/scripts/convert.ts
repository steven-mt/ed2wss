export const convert = (inputText: string) => {
	const inputLines = inputText.split("\n")

	let totalCardAmount = 0

	let output: string = ""

	inputLines.forEach((line) => {
		// const found = line.match(/[A-Z0-9]+\/[A-Z0-9]+(-[A-Z0-9]+)+\t[0-9].*/)
		const found = line.match(/[A-Z0-9]+\/[A-Z0-9]+(-[A-Z0-9]+)+.*/)

		if (found) {
			const foundLine = found[0]

			const splitFoundLine = foundLine.split("\t")

			const cardID = splitFoundLine[0]

			if (!cardID) return

			const amount = Number(splitFoundLine[1])

			if (isNaN(amount)) {
				throw new Error(`No amount for ${cardID}`)
			} else if (amount > 4)
				throw new Error(`There are more than 4 cards of ${cardID}`)

			totalCardAmount += amount

			if (cardID && amount) {
				for (let index = 0; index < amount; index++) {
					output = output.concat(cardID, "\n")
				}
			}
		}
	})

	if (totalCardAmount < 50) throw new Error("Number of cards is less than 50")
	else if (totalCardAmount > 50)
		throw new Error("Number of cards is more than 50")

	console.log(output)
	return output.trim()
}
