// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
	baseURL: "https://ed2wss.vercel.app", // production URL.
	description:
		"A tool to convert text files exported from EncoreDecks so that they can be exported to the Weiss Schwarz Simulator by Blake Thoennes.", //website's description.
	type: "website",
	image: {
		url: "https://ed2wss.vercel.app/favicons/favicon-128x128.png", // website's thumbnail.
		alt: "OpenGraph thumbnail, fleur-de-lis symbol.", // website's thumbnail description.
		width: 128,
		height: 128
	},
	siteName: "ED2WSS Import Converter", // website's name,
	twitter: {
		card: "summary_large_image"
	}
}

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: "ED2WSS Import Converter", // website's name.
	short_name: "ED2WSS", // website's short name.
	description:
		"A tool to convert text files exported from EncoreDecks so that they can be exported to the Weiss Schwarz Simulator by Blake Thoennes.", // websites description.
	theme_color: "#000", // primary color.
	background_color: "#000", // background color.
	display: "minimal-ui",
	icons: [
		{
			src: "/favicons/favicon-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable"
		}
	]
}
