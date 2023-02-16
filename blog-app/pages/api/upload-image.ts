// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "next-sanity"
//import { basename } from "path"
import { createReadStream, PathLike } from "fs"

interface Data {
	image?: unknown
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

const sanityClint = createClient(sanityConfig)

export default async function uploadImage(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		try {
			//const storageRef = ref(storage, `/images/${file?.name}`)
			//// progress can be paused and resumed. It also exposes progress updates.
			//// Receives the storage reference and the file to upload.
			//const uploadTask = uploadBytesResumable(storageRef, file)
			//uploadTask.on(
			//	"state_changed",
			//	(snapshot) => {
			//		const percent = Math.round(
			//			(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			//		)
			//		// update progress
			//		setPercent(percent)
			//	},
			//	(err) => console.log(err),
			//	() => {
			//		// download url
			//		getDownloadURL(uploadTask.snapshot.ref).then((url) => {
			//			console.log(url)
			//			setLink(url)
			//		})
			//	}
			//)

			//await sanityClint.assets
			//	.upload(
			//		"image",
			//		//createReadStream(filePath) as unknown as
			//		//	| Buffer
			//		//	| File
			//		//	| Blob
			//		//	| ReadableStream<any>,
			//		req.body
			//	)
			//	.then((imageAsset) => {
			//		return res.status(200).json({ image: imageAsset })
			//	})

			//if (!img) {
			//	return res.status(404).json({ image: img })
			//}
			return res.status(200).json({ image: req.body })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: "Could't create the blog", error })
		}
	} else {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
}
