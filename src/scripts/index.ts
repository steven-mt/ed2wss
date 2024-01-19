import { convert } from "./convert"

const textArea = document.querySelector<HTMLTextAreaElement>("#input-area")
const convertButton = document.getElementById("convert-button")
const outputArea = document.querySelector<HTMLTextAreaElement>("#output-area")

const handleClick = (input: string, outputTextElement: HTMLTextAreaElement) => {
	const output = convert(input)

	if (outputTextElement) outputTextElement.value = output
}

if (textArea && convertButton && outputArea) {
	textArea.addEventListener("input", () => {
		textArea.style.height = "auto"
		textArea.style.height =
			Math.min(textArea.scrollHeight, 300).toString() + "px"
	})

	convertButton.addEventListener("click", () =>
		handleClick(textArea.value, outputArea)
	)
}
