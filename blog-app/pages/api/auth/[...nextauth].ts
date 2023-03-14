import NextAuth, { AuthOptions } from "next-auth"
//import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
//import FacebookProvider from "next-auth/providers/facebook"
import { sanityClint } from "../../../lib/sanity"
import { Author } from "../../../typing"

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		//GithubProvider({
		//	clientId: process.env.GITHUB_ID as string,
		//	clientSecret: process.env.GITHUB_SECRET as string,
		//}),
		// ...add more providers here
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		//FacebookProvider({
		//	clientId: process.env.FACEBOOK_CLIENT_ID as string,
		//	clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		//}),
	],
	callbacks: {
		//@ts-ignore
		async signIn({ user }) {
			const isAllowedToSignIn = true
			if (isAllowedToSignIn) {
				try {
					const authorQuery = `*[_type == "author"]{
						email
					}`
					const authors = await sanityClint.fetch(authorQuery)
					const existingEmail = authors.find(
						(e: Author) => e.email == user.email
					)
					if (!existingEmail) {
						try {
							await fetch(`${process.env.NEXTAUTH_URL}/api/create-author`, {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									name: user.name,
									email: user.email,
									image: user.image,
								}),
							})
						} catch (error) {
							console.log(error)
						}
					}
				} catch (error) {
					console.log(error)
				}
				return true
			} else {
				return false
			}
		},
		async session({ session }) {
			// Send properties to the client, like an access_token and user id from a provider.
			try {
				const query = `*[_type == "author" && email == $email][0]{
					_id,
					name,
					email,
				}`
				const author = await sanityClint.fetch(query, {
					email: session.user?.email,
				})
				//@ts-ignore
				session.user.id = author._id
				return session
			} catch (error) {
				console.log(error)
			}
			return session
		},
	},
}

export default NextAuth(authOptions)
