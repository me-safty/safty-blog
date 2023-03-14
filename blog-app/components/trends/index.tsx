import { NextPage } from "next"
import { Post } from "../../typing"
import Image from "next/image"
import { urlFor } from "../../lib/sanity"
import Link from "next/link"
import { motion } from "framer-motion"
export interface Props {
	posts: Post[]
}
const Trends: NextPage<Props> = ({ posts }) => {
	const topPosts = posts
		.sort((a, b) => b.comments.length - a.comments.length)
		.slice(0, 3)
	return (
		<motion.div
			initial={{ x: -30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="px-4 py-8 sm:p-8 rounded-xl bg-orange-300 group relative"
		>
			<div>
				<h1 className="text-3xl font-medium mb-1 text-white">Trending</h1>
				<div className="flex w-20 h-1 gap-1">
					<div className="w-[75%] group-hover:w-[30%] duration-150 rounded-xl bg-green-500"></div>
					<div className="w-[25%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-3 relative z-1">
				{topPosts.map((post, i) => (
					<div
						key={post.title}
						className="flex gap-2 sm:gap-4 text-zinc-700 bg-zinc-50 bg-opacity-30 rounded-xl p-[5.3px] px-3 group/2 hover:items-center hover:gap-2 duration-150"
					>
						<Link href={`posts/${post.slug.current}`}>
							<p className="text-white text-2xl sm:text-3xl group-hover/2:text-5xl duration-150 font-medium opacity-80">
								0{i + 1}
							</p>
						</Link>
						<div className="mt-2">
							<Link href={`/users/${post.author.slug.current}`} className="w-fit block">
								<div className="flex gap-2 items-center w-fit">
									<Image
										src={
											post.author.imglink
												? post.author.imglink
												: urlFor(post.author.image).url()
										}
										alt={post.title}
										width={23}
										height={23}
										className="w-[23px] h-[23px] object-cover rounded-full"
									/>
									<h2 className="text-sm">{post.author.name}</h2>
								</div>
							</Link>
							<Link href={`posts/${post.slug.current}`}>
								<h1
									className="font-medium overflow-hidden sm:text-xl my-1 group-hover/2:underline"
									style={{
										//height: "calc(1 * 1rem * 1.75)",
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: "1",
									}}
								>
									{post.title}
								</h1>
								<div className="flex items-center gap-3">
									<p className="text-xs text-gray-700">
										{new Date(post._createdAt).toDateString()}
									</p>
								</div>
							</Link>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	)
}

export default Trends
