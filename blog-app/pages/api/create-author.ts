// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "next-sanity"

interface Data {
	message?: string
	error?: unknown
}

export const sanityConfig = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	useCdn: process.env.NODE_ENV === "production",
	apiVersion: "2022-12-17",
	token: process.env.SANITY_API_TOKEN,
}

export const sanityClint = createClient(sanityConfig)

export default async function createAuthor(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { name, email, image } = req.body
		try {
			await sanityClint.create({
				_type: "author",
				name,
				email,
				imglink: image,
				slug: {
					_type: "slug",
					current: email.toLowerCase().split("@")[0],
				},
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ message: "Could't create the author", error })
		}
		console.log("author created")
		res.status(200).json({ message: "author created" })
	} else {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
}
