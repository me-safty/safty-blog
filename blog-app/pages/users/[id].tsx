import { GetStaticProps } from "next"
import Head from "next/head"
import { FC } from "react"
import User from "../../components/user"
import { sanityClint } from "../../utils/sanity"
import { Author } from "../../typing"

interface userPagePops {
	author: Author
}

const UserPage: FC<userPagePops> = ({ author }) => {
	return (
		<>
			<Head>
				<title>{author.name}</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main>
				<User author={author} />
			</main>
		</>
	)
}

export default UserPage

export const getStaticPaths = async () => {
	const query = `*[_type == "author"]{
    email,
  }`
	const authors = await sanityClint.fetch(query)
	const paths = authors.map((author: Author) => ({
		params: {
			id: author.email.toLowerCase().split("@")[0],
		},
	}))
	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "author" && slug.current == $id][0]{
		_id,
		name,
		email,
		imglink,
		image,
	  'posts': *[
			_type == "post" && 
			author._ref == ^._id
	  ]{
			_id,
			_createdAt,
			title,
			description,
			mainImage,
			author-> {
				name,
				email,
				image,
				imglink,
				slug
			},
			slug,
			body,
			category-> {
				title
			}
		},
	}`
	const author = await sanityClint.fetch(query, {
		id: params?.id,
	})
	if (!author) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			author,
		},
		revalidate: 60,
	}
}
