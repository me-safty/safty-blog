import "../styles/globals.css"
import type { AppProps } from "next/app"
import Footer from "../components/Footer"
import { SessionProvider } from "next-auth/react"
import Header from "../components/header"
//import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Header />
			{/*<AnimatePresence
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}
			>*/}
			<Component {...pageProps} />
			{/*</AnimatePresence>*/}
			<Footer />
		</SessionProvider>
	)
}

export default MyApp
