// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "next-sanity"

interface Data {
	message?: string | unknown
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

export default async function createPost(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { _id, slug, title, mdbody, imageId, description, categoryId } =
			JSON.parse(req.body)
		try {
			await sanityClint.create({
				_type: "post",
				title,
				description,
				author: {
					_type: "reference",
					_ref: _id,
				},
				category: {
					_type: "reference",
					_ref: categoryId,
				},
				mdbody,
				slug: {
					_type: "slug",
					current: slug,
				},
				mainImage: {
					_type: "image",
					asset: {
						_ref: imageId,
						_type: "reference",
					},
				},
			})
			console.log(req.body)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: "Could't create the blog", error })
		}
		console.log("blog created")
		res.status(200).json({ message: "blog created" })
	} else {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
}
