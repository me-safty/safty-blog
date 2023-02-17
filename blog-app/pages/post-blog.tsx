import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { FC } from "react"
import BlogForm from "../components/BlogForm"
import { sanityClint } from "../sanity"
import { Author, category } from "../typing"
import { authOptions } from "./api/auth/[...nextauth]"
interface userPagePops {
	author: Author
	categories: category[]
}

const PostBlog: FC<userPagePops> = ({ author, categories }) => {
	return (
		<main>
			<BlogForm
				author={author}
				categories={categories}
			/>
		</main>
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
	const query = `*[_type == "author" && slug.current == $id][0]{
		_id,
		name,
		email,
		imglink,
		image,
    "categories": *[_type == "category"]{
			_id,
			title,
		},
	}`
	const author = await sanityClint.fetch(query, {
		id: session?.user?.email?.toLowerCase().split("@")[0],
	})
	if (!author) {
		return {
			notFound: true,
		}
	}
	const categories = author.categories
	return {
		props: {
			author,
			categories,
		},
	}
}
