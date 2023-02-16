import type { NextPage } from "next"
import { sanityClint } from "../sanity"
import { Author, category, Post } from "../typing"
import Head from "next/head"
import Posts from "../components/posts"
import Landing from "../components/Landing"

interface Props {
	posts: Post[]
	catagories: category[]
}

const Home: NextPage<Props> = ({ posts, catagories }) => {
	return (
		<>
			<Head>
				<title>safty blog</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<Landing
				catagories={catagories}
				posts={posts.slice(1, 4)}
			/>
			<Posts posts={posts} />
		</>
	)
}

export default Home

export const getStaticProps = async () => {
	const query = `*[_type == "post"]{
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
		category-> {
			title
		}
  }`
	const posts = await sanityClint.fetch(query)
	const categoryQuery = `*[_type == "category"]{
		_id,
		title,
		"posts": *[_type == "post" && references(^._id) ]{
			_id,
			title,
			slug
		},
	}`
	const catagories = await sanityClint.fetch(categoryQuery)
	return {
		props: {
			posts,
			catagories,
		},
		revalidate: 3600,
	}
}
