;(() => {
	const copyButton = document.getElementById("copy-button")
	if (!copyButton) return

	const tooltip = document.getElementById("tooltip-span")
	if (!tooltip) return

	copyButton.addEventListener("click", async () => {
		const outputArea =
			document.querySelector<HTMLTextAreaElement>("#output-area")
		if (!outputArea) return

		await navigator.clipboard.writeText(outputArea.value)

		tooltip.textContent = "Copied to clipboard"
	})

	copyButton.addEventListener("mouseout", () => {
		tooltip.textContent = "Copy to clipboard"
	})
})()
