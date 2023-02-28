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

export default async function editCommentAPI(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "PUT") {
		try {
			await sanityClint.createOrReplace(JSON.parse(req.body))
			res.status(200).json({ message: "comment edited" })
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ message: "Could't edit the comment", error })
		}
	} else {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
}
