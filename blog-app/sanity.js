import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	apiVersion: "2022-12-17",
	useCdn: process.env.NODE_ENV === "production",
}

export const sanityClint = createClient(config)

export const urlFor = (sours) => imageUrlBuilder(config).image(sours)
