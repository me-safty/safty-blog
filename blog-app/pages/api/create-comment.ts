import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "next-sanity"

interface Data {
	message?: string
	error?: unknown
}

export const sanityConfig = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	//useCdn: process.env.NODE_ENV === "production",
	useCdn: false,
	apiVersion: "2022-12-17",
	token: process.env.SANITY_API_TOKEN,
}

export const sanityClint = createClient(sanityConfig)

export default async function createComment(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { _id, name, email, comment, userId } = JSON.parse(req.body)
		try {
			await sanityClint.create({
				_type: "comment",
				post: {
					_type: "reference",
					_ref: _id,
				},
				author: {
					_type: "reference",
					_ref: userId,
				},
				name,
				email,
				comment,
			})
			res.status(200).json({ message: "Comment submitted" })
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ message: "Could't submit the comment", error })
		}
	} else {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
}
