let inputString: string

const selectedSets = new Set<string>()

const setReleases = new Set<string>()

const parseInput = () => {
	const textArea = document.querySelector<HTMLTextAreaElement>("#input-area")
	if (!textArea) return

	if (inputString !== textArea.value) selectedSets.clear()

	inputString = textArea.value

	const inputLines = inputString.split("\n")

	const outputNumbers: string[] = []

	inputLines.forEach((line) => {
		const found = line.match(/.+\/.+(-.+)+.*/)

		// TODO: reverse card order(character+event separate from climax cards)
		// TODO: option to remove "E" prefix

		if (found) {
			const foundLine = found[0]

			const foundLineSplit = foundLine.split("\t")

			const cardNumber = foundLineSplit[0]
			if (!cardNumber) return

			const amount = Number(foundLineSplit[1])

			if (isNaN(amount)) {
				throw new Error(`No amount for ${cardNumber}`)
			} else if (amount > 4)
				throw new Error(`There are more than 4 cards of ${cardNumber}`)

			const cardNumberSplit = cardNumber.split("-")
			const setRelease = cardNumberSplit[0]
			if (!setRelease) return
			let individualNumber = cardNumberSplit[1]
			if (!individualNumber) return

			setReleases.add(setRelease)

			// Add "E" prefix or add number to set if the prefix already exists
			if (individualNumber.startsWith("E")) {
				selectedSets.add(setRelease)
			} else if (selectedSets.has(setRelease)) {
				if (individualNumber.startsWith("T")) {
					individualNumber =
						individualNumber[0] + "E" + individualNumber.slice(1)
				} else {
					individualNumber = "E" + individualNumber
				}
			}

			for (let index = 0; index < amount; index++) {
				outputNumbers.push(`${setRelease}-${individualNumber}`)
			}
		}
	})

	let outputString: string = ""
	outputNumbers.forEach((outputNumber) => {
		outputString = outputString.concat(outputNumber, "\n")
	})

	const outputArea = document.querySelector<HTMLTextAreaElement>("#output-area")

	if (outputArea) outputArea.value = outputString
}

const handleClick = () => {
	parseInput()

	const container = document.querySelector("#checkboxContainer")
	if (!container) return

	container.textContent = ""

	setReleases.forEach((setRelease, index) => {
		const div = document.createElement("div")
		div.style.display = "flex"
		div.style.gap = "0.5rem"

		const checkbox = document.createElement("input")
		checkbox.type = "checkbox"
		checkbox.id = `checkbox-${index}`
		if (selectedSets.has(setRelease)) checkbox.checked = true
		div.appendChild(checkbox)

		const label = document.createElement("label")
		label.htmlFor = `checkbox-${index}`
		label.innerHTML = setRelease
		div.appendChild(label)

		container.appendChild(div)

		checkbox.addEventListener("change", () => {
			if (checkbox.checked) selectedSets.add(label.innerHTML)
			else selectedSets.delete(label.innerHTML)
		})
	})
}

const convertButton = document.getElementById("convert-button")

if (convertButton) convertButton.addEventListener("click", () => handleClick())
