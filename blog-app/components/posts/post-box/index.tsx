import React, { FC } from "react"
import { urlFor } from "../../../lib/sanity"
import { Post } from "../../../typing"
import Image from "next/image"
import Link from "next/link"
import RightArrow from "../../icons/RightArrow"

interface PostBoxProps {
	post: Post
}

const PostBox: FC<PostBoxProps> = ({ post }) => {
	return (
		<div className="relative group h-full cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg duration-300">
			<Link href={`/posts/${post.slug.current}`}>
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
					<h1
						className="font-semibold text-lg my-3 overflow-hidden"
						style={{
							height: "calc(2 * 1rem * 1.75)",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: "2",
						}}
					>
						{post.title}
					</h1>
					<p
						className="text-sm overflow-hidden"
						style={{
							height: "calc(3 * 1rem * 1.25)",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: "3",
						}}
					>
						{post.description}
					</p>
				</div>
			</Link>
			<Link href={`/users/${post.author.slug.current}`}>
				<div className="flex gap-5 px-5 pb-5">
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
			</Link>
		</div>
	)
}

export default PostBox
