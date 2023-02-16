import { FC, useState } from "react"
import { Post } from "../../../typing"
import { SubmitHandler, useForm } from "react-hook-form"
import { urlFor } from "../../../sanity"
import PortableText from "react-portable-text"
import Image from "next/image"
import dynamic from "next/dynamic"
const MarkdownMarkdown = dynamic(
	() =>
		import("@uiw/react-md-editor").then((mod) => {
			return mod.default.Markdown
		}),
	{ ssr: false }
)

interface IFormProps {
	_id: string
	name: string
	email: string
	comment: string
}

interface PostPreviewProps {
	post: Post
}

const PostPreview: FC<PostPreviewProps> = ({ post }) => {
	const [submit, setSubmit] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormProps>()
	const onSubmit: SubmitHandler<IFormProps> = async (data) => {
		await fetch("/api/create-comment", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(() => {
				setSubmit(true)
			})
			.catch((error) => {
				console.log(error)
				setSubmit(false)
			})
	}
	return (
		<div className="container">
			<img
				alt={post.title}
				className="w-full h-52 md:h-96 object-cover"
				src={urlFor(post.mainImage).url()}
			/>
			<article className="px-3">
				<h1 className="text-3xl mt-10 capitalize">{post.title}</h1>
				<p className="mt-2 text-gray-600">{post.description}...</p>
				<div className="mt-6 flex items-center gap-3">
					<Image
						src={
							post.author.imglink
								? post.author.imglink
								: urlFor(post.author.image).url()
						}
						alt="author image"
						width={48}
						height={48}
						className="w-12 h-12 rounded-full object-cover min-w-[3rem]"
					/>
					<p className="text-gray-700">
						Blog Post By{" "}
						<span className="text-blue-500 cursor-pointer hover:text-blue-400 duration-300">
							{post.author.name}
						</span>{" "}
						<br />
						<span className="text-gray-400 text-sm">
							{new Date(post._createdAt).toLocaleString()}
						</span>
					</p>
				</div>
				<div className="mt-10 text-lg">
					{post.body ? (
						<PortableText
							dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
							projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
							content={post.body}
							serializers={{
								h1: (props: any) => <h1 {...props} />,
								h2: (props: any) => <h1 {...props} />,
								li: ({ children }: any) => <li>{children}</li>,
								link: ({ href, children }: any) => (
									<a href={href}>{children}</a>
								),
							}}
						/>
					) : (
						<div className="">
							<MarkdownMarkdown
								source={post.mdbody}
								//style={{ whiteSpace: "pre-wrap" }}
							/>
						</div>
					)}
				</div>
			</article>
			<hr className=" border border-green-600 mx-auto max-w-4xl my-10" />
			{submit ? (
				<div className="flex flex-col bg-green-600  mx-auto max-w-5xl text-white px-9 py-12">
					<h1 className="text-4xl font-bold mb-2">
						Thank you for submitting your comment!
					</h1>
					<p className="text-xl">
						Once it has been approved, it will appear below
					</p>
				</div>
			) : (
				<div className="mx-auto max-w-5xl">
					<p className="text-green-600">Enjoyed this article?</p>
					<h1 className="text-3xl font-bold">Leave a comment below!</h1>
					<hr className="mt-1" />
					<form
						className="my-5"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("_id")}
							type="hidden"
							name="_id"
							value={post._id}
						/>
						<label
							htmlFor="name"
							className="block mb-1"
						>
							Name
						</label>
						<input
							{...register("name", { required: true })}
							type="text"
							name="name"
							id="name"
							className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
							placeholder="Your name"
						/>
						<label
							htmlFor="email"
							className="block mb-1"
						>
							Email
						</label>
						<input
							{...register("email", { required: true })}
							type="email"
							name="email"
							id="email"
							placeholder="example@email.com"
							className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
						/>
						<label
							htmlFor="comment"
							className="block mb-1"
						>
							Comment
						</label>
						<textarea
							{...register("comment", { required: true })}
							name="comment"
							id="comment"
							rows={10}
							placeholder="Enter some long form content."
							className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
						/>
						<div className="mb-3">
							{errors.name && (
								<p className="text-red-600">- The name field is required</p>
							)}
							{errors.email && (
								<p className="text-red-600">- The email field is required</p>
							)}
							{errors.comment && (
								<p className="text-red-600">- The comment field is required</p>
							)}
						</div>
						<input
							type="submit"
							value="Submit"
							className="bg-green-600 text-white w-full p-2 rounded text-lg cursor-pointer shadow-md hover:bg-green-500 duration-300"
						/>
					</form>
				</div>
			)}
			<div className="p-11 shadow-md shadow-gray-300 mx-auto max-w-5xl my-16">
				<h1 className="text-3xl font-semibold">Comments</h1>
				<hr className="mt-2" />
				<div className="mt-5 space-y-3">
					{!post.comments.length && (
						<h1 className="text-xl">No comments yet!</h1>
					)}
					{post.comments.map((comment) => (
						<div key={comment._id}>
							<p className="text-lg font-semibold">
								<span className="text-green-600">{comment.name}:</span>{" "}
								{comment.comment}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostPreview
