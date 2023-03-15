import { motion } from "framer-motion"
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
		<div className="container overflow-hidden">
			{showDeferentFirstBlog && <ExpandBoxPost post={posts[0]} />}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-4 pb-10">
				{posts.slice(showDeferentFirstBlog ? 1 : 0).map((post, i) => (
					<motion.div
						initial={{ x: -40, opacity: 0, scale: 1 }}
						whileInView={{ x: 0, opacity: 1 }}
						whileTap={{ scale: 0.97 }}
						transition={{ duration: 0.5, delay: i / 7 }}
						key={post._id}
					>
						<PostBox post={post} />
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default Posts
