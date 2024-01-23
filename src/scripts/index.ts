const textArea = document.querySelector<HTMLTextAreaElement>("#input-area")
const convertButton = document.getElementById("convert-button")
const outputArea = document.querySelector<HTMLTextAreaElement>("#output-area")

let inputString: string
const selectedSets = new Set<string>()

if (textArea && convertButton && outputArea) {
	const handleClick = (outputTextElement: HTMLTextAreaElement) => {
		if (inputString !== textArea.value) selectedSets.clear()

		inputString = textArea.value

		const inputLines = inputString.split("\n")

		const outputNumbers: string[] = []

		const setReleases = new Set<string>()

		inputLines.forEach((line) => {
			const found = line.match(/.+\/.+(-.+)+.*/)

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

				if (selectedSets.has(setRelease)) {
					individualNumber = "E" + individualNumber
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

		if (outputTextElement) outputTextElement.value = outputString

		let cardNumbersString: string = ""

		setReleases.forEach((cardNumber) => {
			cardNumbersString = cardNumbersString.concat(cardNumber, ", ")
		})

		const setsDisplayArea =
			document.querySelector<HTMLTextAreaElement>("#sets-display-area")

		if (setsDisplayArea) setsDisplayArea.value = cardNumbersString.slice(0, -1)

		const setsInputArea =
			document.querySelector<HTMLTextAreaElement>("#sets-input-area")

		if (setsInputArea) setsInputArea.disabled = false

		const container = document.querySelector("#checkboxContainer")
		if (!container) return

		container.innerHTML = ""

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
				console.log(label.innerHTML, checkbox.checked)
				if (checkbox.checked) selectedSets.add(label.innerHTML)
				else selectedSets.delete(label.innerHTML)

				console.log(selectedSets)
			})
		})
	}

	convertButton.addEventListener("click", () => handleClick(outputArea))
}
