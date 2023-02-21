/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()
module.exports = removeImports({
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		domains: [
			"cdn.sanity.io",
			"lh3.googleusercontent.com",
			"platform-lookaside.fbsbx.com",
		],
	},
})
