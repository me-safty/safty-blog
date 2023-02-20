import type { NextPage } from "next"
import { sanityClint } from "../sanity"
import { category, Post } from "../typing"
import Head from "next/head"
import Posts from "../components/posts"
import Landing from "../components/landing"

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
				<meta
					name="description"
					content="Safty Blog is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic."
				/>
			</Head>
			<Landing
				catagories={catagories}
				posts={posts}
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
		},
		'comments': *[
	    _type == "comment" &&
	    post._ref == ^._id
	  ]{
			_createdAt,
			comment,
			author-> {
				name,
				imglink
			}
		},
		'categories': *[_type == "category"]{
			_id,
			title,
			"posts": *[_type == "post" && references(^._id) ]{
				_id,
				title,
				slug
			},
		},
  }`
	const posts = await sanityClint.fetch(query)
	const catagories = posts[0].categories
	return {
		props: {
			posts,
			catagories,
		},
		revalidate: 1,
	}
}
