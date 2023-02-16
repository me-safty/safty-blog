import { motion } from "framer-motion"
import Link from "next/link"
import React, { FC } from "react"
import { Post } from "../../typing"
import ExpandBoxPost from "./expand-post-box"
import PostBox from "./post-box"

interface PostsProps {
	posts: Post[]
	showDeferentFirstBlog?: boolean
}

const Posts: FC<PostsProps> = ({ posts, showDeferentFirstBlog = true }) => {
	return (
		<div className="container">
			{showDeferentFirstBlog && (
				<Link
					key={posts[0]._id}
					href={`/posts/${posts[0].slug.current}`}
				>
					<ExpandBoxPost post={posts[0]} />
				</Link>
			)}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-4 pb-10">
				{posts.slice(showDeferentFirstBlog ? 1 : 0).map((post, i) => (
					<Link
						key={post._id}
						href={`/posts/${post.slug.current}`}
					>
						<motion.div
							initial={{ y: 70, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: i / 10 }}
						>
							<PostBox post={post} />
						</motion.div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Posts
