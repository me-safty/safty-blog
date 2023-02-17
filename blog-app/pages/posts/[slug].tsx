import { GetStaticProps } from "next"
import { getServerSession } from "next-auth"
import { FC } from "react"
import PostPreview from "../../components/posts/post-preview"
import { sanityClint } from "../../sanity"
import { Post } from "../../typing"

interface PostProps {
	post: Post
}

const PostPage: FC<PostProps> = ({ post }) => {
	return (
		<main>
			<PostPreview post={post} />
		</main>
	)
}

export default PostPage

export const getStaticPaths = async () => {
	const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`
	const posts = await sanityClint.fetch(query)
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}))
	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug][0]{
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
			slug,
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
		},
		slug,
		body,
		mdbody,
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
		category-> {
			title
		}
	}`
	const post = await sanityClint.fetch(query, {
		slug: params?.slug,
	})
	if (!post) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			post: post,
		},
		revalidate: 1,
	}
}
