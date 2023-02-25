import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import Head from "next/head"
import { FC } from "react"
import BlogForm from "../components/blog-form"
import { sanityClint } from "../utils/sanity"
import { category } from "../typing"
import { authOptions } from "./api/auth/[...nextauth]"

interface userPagePops {
	categories: category[]
}

const PostBlog: FC<userPagePops> = ({ categories }) => {
	return (
		<>
			<Head>
				<title>write a blog</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main>
				<BlogForm categories={categories} />
			</main>
		</>
	)
}

export default PostBlog

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions)
	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}
	const query = `*[_type == "category"]{
		_id,
		title,
	}`
	const categories = await sanityClint.fetch(query)
	if (!categories) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			categories,
		},
	}
}
