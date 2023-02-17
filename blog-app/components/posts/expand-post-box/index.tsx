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
	console.log(post)
	return (
		<motion.div
			whileHover={{ scale: 1.01 }}
			whileTap={{ scale: 0.97 }}
			transition={{ duration: 0.2 }}
			className="group my-[50px] flex"
		>
			<Link href={post.slug.current}>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="relative min-w-[500px] cursor-pointer min-h-[320px] max-w-[500px] max-h-[320px] rounded-xl overflow-hidden"
				>
					<Image
						src={urlFor(post.mainImage).url()}
						alt={post.title}
						width={500}
						height={320}
						className="group-hover:scale-110 scale-105 group-hover:rotate-1 duration-300 min-w-[500px] min-h-[320px] max-w-[500px] max-h-[320px] object-cover"
					/>
					<div className="flex items-center justify-center absolute -top-full duration-200 group-hover:top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-xl">
						<div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
							<RightArrow className="scale-75" />
						</div>
					</div>
				</motion.div>
			</Link>
			<motion.div
				className="ml-10 py-3"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
			>
				<div>
					<p className="text-green-600 text-xl font-medium">
						{post.category.title}
					</p>
					<div className="flex w-[70px] h-1 gap-1">
						<div className="w-[85%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
						<div className="w-[15%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
					</div>
				</div>
				<h1 className=" text-4xl font-medium my-3">{post.title}</h1>
				<p className="text-sm text-gray-600 mb-5">{post.description}</p>
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
							className="w-[50px] h-[50px] object-cover rounded-full"
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
