import React, { FC } from "react"
import { urlFor } from "../../../sanity"
import { Post } from "../../../typing"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import RightArrow from "../../RightArrow"
interface PostBoxProps {
	post: Post
}

const PostBox: FC<PostBoxProps> = ({ post }) => {
	return (
		<div
			//whileTap={{ scale: 0.95 }}
			className="relative group h-full cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md duration-300"
		>
			{/*<div className=" duration-300 group-hover:w-full bg-slate-400 z-0 group-hover:h-full absolute top-0 left-0"></div>*/}
			<div className="overflow-hidden rounded-xl relative">
				<Image
					width={240}
					height={300}
					alt={post.title}
					className="object-cover h-[240px] w-full group-hover:scale-110 scale-105 group-hover:rotate-1 duration-300"
					src={urlFor(post.mainImage).url()}
				/>
				<div className="flex items-center justify-center absolute -top-full duration-200 group-hover:top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-xl">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
						<RightArrow className="scale-75" />
					</div>
				</div>
			</div>
			<div className="p-5">
				<div>
					<p className="text-green-600 text-lg font-medium">
						{post.category.title}
					</p>
					<div className="flex w-14 h-1 gap-1">
						<div className="w-[85%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300"></div>
						<div className="w-[15%] group-hover:w-[70%] duration-150 rounded full bg-fuchsia-500"></div>
					</div>
				</div>
				<h3 className="font-semibold text-lg my-3">{post.title}</h3>
				<p className="text-sm">{post.description}</p>
				{/*<Link href={`/users/${post.author.slug.current}`}>
					<div className="flex gap-5 mt-5">
						<Image
							width={44}
							height={44}
							alt={post.author.name}
							className="w-11 h-11 rounded-full object-cover"
							src={
								post.author.imglink
									? post.author.imglink
									: urlFor(post.author.image).url()
							}
							style={{
								minWidth: "2.75rem",
							}}
						/>
						<div>
							<h1 className=" font-medium">{post.author.name}</h1>
							<p className="text-sm">
								{new Date(post._createdAt).toDateString()}
							</p>
						</div>
					</div>
				</Link>*/}
			</div>
		</div>
	)
}

export default PostBox
