const fileElement = document.querySelector<HTMLInputElement>("#file-input")

fileElement?.addEventListener("change", (ev) => {
	let fileExtension: string = ""

	if (fileElement.value.lastIndexOf(".") > 0)
		fileExtension = fileElement.value.substring(
			fileElement.value.lastIndexOf(".") + 1,
			fileElement.value.length
		)

	if (fileExtension.toLowerCase() !== "txt") {
		alert("You must select a text file")
		return
	}

	const fileList = (ev.target as HTMLInputElement).files
	if (!fileList) return

	const selectedFile = fileList[0]
	if (!selectedFile) return

	const reader = new FileReader()

	reader.onload = (ev) => {
		const textArea = document.querySelector<HTMLTextAreaElement>("#input-area")
		if (!textArea) return

		const textFromFile = ev.target?.result?.toString()
		if (typeof textFromFile !== "string") return

		textArea.textContent = textFromFile
	}

	reader.readAsText(selectedFile)
})

let inputString: string

let isNewInput: boolean

const setReleases = new Set<string>()

const selectedSets = new Set<string>()

const parseInput = () => {
	const textArea = document.querySelector<HTMLTextAreaElement>("#input-area")
	if (!textArea) return

	if (inputString !== textArea.value) {
		isNewInput = true
		setReleases.clear()
		selectedSets.clear()
	} else isNewInput = false

	inputString = textArea.value

	const inputLines = inputString.split("\n")

	const outputLines: string[] = []

	inputLines.forEach((line) => {
		const found = line.match(/.+\/.+(-.+)+.*/)

		// TODO: reverse card order(character+event separate from climax cards)

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
			if (isNewInput) {
				if (individualNumber.startsWith("E")) {
					selectedSets.add(setRelease)
				}
			} else {
				if (selectedSets.has(setRelease)) {
					if (individualNumber.startsWith("T")) {
						individualNumber =
							individualNumber[0] + "E" + individualNumber.slice(1)
					} else {
						individualNumber = "E" + individualNumber
					}
				} else {
					if (individualNumber.startsWith("TE")) {
						individualNumber = individualNumber[0] + individualNumber.slice(2)
					} else if (individualNumber.startsWith("E")) {
						individualNumber = individualNumber.slice(1)
					}
				}
			}

			outputLines.push(`${setRelease}-${individualNumber}\t${amount}`)
		}
	})

	let outputString: string = ""
	outputLines.forEach((outputNumber) => {
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

			parseInput()
		})
	})
}

const convertButton = document.getElementById("convert-button")

if (convertButton) convertButton.addEventListener("click", () => handleClick())
