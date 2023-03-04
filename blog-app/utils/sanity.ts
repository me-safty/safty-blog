import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
	apiVersion: "2022-12-17",
	//useCdn: process.env.NODE_ENV === "production",
	useCdn: false,
}

export const sanityClint = createClient(config)

export const urlFor = (sours: SanityImageSource) =>
	imageUrlBuilder(config).image(sours)
