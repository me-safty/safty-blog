import { NextPage } from "next"
import { Post } from "../typing"
import Image from "next/image"
import { urlFor } from "../sanity"
import Link from "next/link"
import { motion } from "framer-motion"
export interface Props {
	posts: Post[]
}
const Trends: NextPage<Props> = ({ posts }) => {
	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-[70%] p-8 rounded-xl bg-orange-300 group relative"
		>
			<div>
				<h1 className="text-3xl font-medium mb-1 text-white">Trending</h1>
				<div className="flex w-20 h-1 gap-1">
					<div className="w-[75%] group-hover:w-[30%] duration-150 rounded-xl bg-green-500"></div>
					<div className="w-[25%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-3 relative z-1">
				{posts.map((post, i) => (
					<Link
						href={`posts/${post.slug.current}`}
						key={post.title}
					>
						<div className="flex gap-4 text-zinc-700 bg-zinc-50 bg-opacity-30 rounded-xl p-[5.3px] px-3 group/2 hover:items-center hover:gap-2 duration-150">
							<p className="text-white text-3xl group-hover/2:text-5xl duration-150 font-medium opacity-80">
								0{i + 1}
							</p>
							<div className="mt-2">
								<Link href={`/users/${post.author.slug.current}`}>
									<div className="flex gap-2 items-center">
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
								<h1 className=" font-medium text-xl my-1 group-hover/2:underline">
									{post.title}
								</h1>
								<div className="flex items-center gap-3">
									<p className="text-xs text-gray-700">
										{new Date(post._createdAt).toDateString()}
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</motion.div>
	)
}

export default Trends
