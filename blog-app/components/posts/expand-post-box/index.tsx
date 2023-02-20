import Image from "next/image"
import { FC } from "react"
import { urlFor } from "../../../sanity"
import { Post } from "../../../typing"
import { motion } from "framer-motion"
import Link from "next/link"
import RightArrow from "../../RightArrow"
export interface ExpandBoxPostProps {
	post: Post
}

const ExpandBoxPost: FC<ExpandBoxPostProps> = ({ post }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.01 }}
			whileTap={{ scale: 0.97 }}
			transition={{ duration: 0.2 }}
			className="group my-[50px] rounded-xl flex flex-col sm:flex-row gap-4 sm:gap-7 lg:gap-10 shadow-md sm:shadow-none"
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="relative cursor-pointer rounded-xl overflow-hidden sm:w-[50%]"
			>
				<Link href={`/posts/${post.slug.current}`}>
					<Image
						src={urlFor(post.mainImage).url()}
						alt={post.title}
						width={500}
						height={320}
						className="w-full h-[220px] lg:h-[320px] group-hover:scale-110 scale-105 group-hover:rotate-1 duration-300 object-cover"
					/>
					<div className="flex items-center justify-center absolute -top-full duration-200 group-hover:top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-xl">
						<div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
							<RightArrow className="scale-75" />
						</div>
					</div>
				</Link>
			</motion.div>
			<motion.div
				className="py-1 lg:py-5 sm:w-[50%] px-5 pb-5 sm:px-0 sm:pb-0"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
			>
				<Link href={`/posts/${post.slug.current}`}>
					<div>
						<p className="text-green-600 text-lg lg:text-xl font-medium">
							{post.category.title}
						</p>
						<div className="flex w-14 lg:w-[70px] h-1 gap-1">
							<div className="w-[85%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
							<div className="w-[15%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
						</div>
					</div>
					<h1
						className="text-lg lg:text-4xl font-medium my-2 lg:my-3 overflow-hidden"
						style={{
							//height: "calc(2 * 1rem * 2.5)",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: "2",
						}}
					>
						{post.title}
					</h1>
					<p
						className="text-sm lg:text-lg mb-5 sm:mb-2 lg:mb-5 overflow-hidden"
						style={{
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: "3",
						}}
					>
						{post.description}
					</p>
				</Link>
				<Link
					href={`/users/${post.author.slug.current}`}
					className="w-fit block"
				>
					<div className="flex gap-4 items-center w-fit">
						<Image
							src={
								post.author.imglink
									? post.author.imglink
									: urlFor(post.author.image)?.url()
							}
							alt={post.title}
							width={70}
							height={70}
							className="w-[45px] h-[45px] lg:w-[50px] lg:h-[50px] object-cover rounded-full"
						/>
						<div>
							<h1 className=" font-medium">{post.author.name}</h1>
							<p className="text-sm">
								{new Date(post._createdAt).toDateString()}
							</p>
						</div>
					</div>
				</Link>
			</motion.div>
		</motion.div>
	)
}

export default ExpandBoxPost
