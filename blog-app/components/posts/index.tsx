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
			{showDeferentFirstBlog && <ExpandBoxPost post={posts[0]} />}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-4 pb-10">
				{posts.slice(showDeferentFirstBlog ? 1 : 0).map((post, i) => (
					<motion.div
						initial={{ y: 70, opacity: 0, scale: 1 }}
						whileInView={{ y: 0, opacity: 1 }}
						whileTap={{ scale: 0.97 }}
						transition={{ duration: 0.2, delay: i / 10 }}
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
